# Re-análise: repos original vs ios_orchestrator (Coruna)

Comparação entre o repositório de referência (khanhduytran0/coruna, localmente `coruna_repo`) e o código em `ios_orchestrator/exploits/coruna`, para identificar o que pode ter sido deixado para trás e causar erros (nomeadamente crash no Stage 3 em iOS 15.8.6 com bluebird).

---

## 1. Resumo do que o repo original **não** suporta para bluebird

- O README do khanhduytran0/coruna indica **tested on**: jacurutu, terrorbird, cassowary. O Stage1 bluebird está em `other/` e **não** está na lista de testados.
- No **group.html** original:
  - `hPL3On: this.getModuleByName` e `ZKvD0e: this.getModuleByURL` — dentro do IIFE, `this` é o global; `getModuleByName` está no objeto devolvido, não em `window`, logo no original `obChTK.hPL3On` fica **undefined** quando o bluebird chama. O nosso fix: `hPL3On: c` (referência direta à função).
  - Não há normalização **Xn → exploitPrimitive**: o bluebird coloca a primitiva em `P.zn.Xn` (tr, Mr, br, dr, etc.), enquanto o loader e o Stage3 esperam `platformState.exploitPrimitive` com `addrof`, `fakeobj`, `read32`, `readString`, etc. No original, com bluebird, `exploitPrimitive` ficaria null e a chain falharia. Nós normalizamos Xn e definimos `exploitPrimitive = Xn` com aliases.
- No **platform_module.js** original:
  - Não existe `platformState.Nn`. O bluebird e o Stage3_VariantA usam `P.zn.Nn.fGOrHX`, `P.zn.Nn.oGn3OG`, etc. Como `zn === platformState`, seria `platformState.Nn` — no original **não existe**, logo `P.zn.Nn` é undefined e o acesso a `.fGOrHX` lança. Nós: estado inicial `Nn: {}` e em `applyVersionOffsets()` fazemos `platformState.Nn = n`.
  - Na tabela **LTgSl5** do original, o bloco para **150600** tem só `ShQCsB: true, RbKS6p: false`; os offsets `oGn3OG`, `CN3rr_`, `EMDU4o`, `fGOrHX` aparecem apenas no bloco **110000**. Para iOS 15.8.6 o merge de offsets acaba por incluir o 110000, logo `versionFlags` fica com esses campos — mas como não há `Nn`, o bluebird continua a falhar em `P.zn.Nn.fGOrHX`. No nosso código, além de `Nn`, garantimos explicitamente o bloco 150600 com `oGn3OG`, `CN3rr_`, `EMDU4o`, `fGOrHX` para o bluebird quando o runtime ainda é LTgSl5.

Conclusão: no repo original, a chain com **bluebird** não está fechada (obChTK, exploitPrimitive, Nn, offsets). As nossas alterações são necessárias para bluebird.

---

## 2. APIs da primitiva usadas pelo Stage3 e que faltavam no bluebird

O **Stage3_VariantB** (e VariantA) assumem uma primitiva com nomes de método iguais aos dos Stage1 cassowary/terrorbird/jacurutu. O bluebird expõe nomes diferentes (tr, Mr, br, dr, Ar, readInt64FromOffset, etc.). Já tínhamos adicionado:

- `addrof` (← tr), `fakeobj` (← Mr), `read32` (← br), `write32` (← dr)
- `readRawBigInt`, `read32FromInt64`, `readInt64FromInt64`, `copyBigInt`, `writeInt64ToOffset`
- `readString`, `readStringFromInt64`

Faltavam duas que o Stage3 usa explicitamente:

| Método                 | Uso no Stage3_VariantB                         | Implementação para bluebird |
|------------------------|------------------------------------------------|-----------------------------|
| `readByte(addr)`       | Leitura de um byte (ex.: export trie, símbolos) | `(ep.br(addr & ~3) >>> (8*(addr%4))) & 0xff` |
| `readDoubleAsPointer(addr)` | Leitura de 8 bytes como double (comparação de ponteiros) | Ler dois `br(addr)`/`br(addr+4)` e construir double via `Float64Array(Uint32Array([lo,hi]).buffer)[0]` |

Estes dois aliases foram adicionados em `group.html` na função `ensureReadString(platformModule.platformState.exploitPrimitive)`, para que a primitiva (incluindo a do bluebird) tenha a mesma API esperada pelo Stage3.

---

## 3. Fluxo original vs nosso (Stage 3 e crash)

- **Original:** Após Stage 3, o `finally` chama `exploitPrimitive.cleanup()`. Não há guard de “já executámos”; um reload volta a correr a chain. Se o Stage 3 causar crash (ex.: primitiva incompleta, leitura inválida), o Safari pode entrar no ciclo “Um problema ocorreu repetidamente” ao recarregar e tentar Stage 3 de novo.
- **Nosso:** 
  - Marcamos a sessão como “tentada” **antes** de carregar o Stage 3 (`sessionStorage.setItem(CORUNA_DONE_KEY, "1")`), para que um reload não volte a executar a chain e evite o ciclo de crashes.
  - No sucesso (`platform === 0`) também gravamos o mesmo flag.

---

## 4. Ficheiros comparados

| Ficheiro            | Repo original (coruna_repo)     | ios_orchestrator/exploits/coruna |
|---------------------|---------------------------------|-----------------------------------|
| group.html          | obChTK com `this.getModule*`, sem normalização Xn, sem guard sessionStorage, baseUrl de fqMaGkNg() | obChTK com funções reais, Xn→exploitPrimitive, readByte/readDoubleAsPointer, CORUNA_DONE_KEY, baseUrl de location |
| platform_module.js  | Sem `Nn`; LTgSl5 150600 só ShQCsB/RbKS6p       | `Nn: {}` + `platformState.Nn = n`; bloco 150600 com oGn3OG, CN3rr_, EMDU4o, fGOrHX |
| Stage1 bluebird     | Idêntico em other/              | Copiado para exploits/coruna      |
| Stage3_VariantB/A   | Esperam readByte, readDoubleAsPointer, readStringFromInt64, etc. | Iguais; a primitiva é preenchida pelo loader com os aliases acima |

---

## 5. Conclusão

- O repositório original **não** está preparado para correr a chain com Stage1 bluebird até ao Stage 3 sem as alterações que fizemos (obChTK, exploitPrimitive, Nn, offsets LTgSl5 150600, aliases da primitiva).
- O erro “ao chegar no Stage 3 e dar problema repetido” pode ser causado por:  
  (1) primitiva incompleta (falta de `readByte` / `readDoubleAsPointer`),  
  (2) crash dentro do Stage 3 e reload em ciclo.  
  Com os aliases **readByte** e **readDoubleAsPointer** e o guard de sessionStorage antes do Stage 3, reduzimos (1) e (2). Recomenda-se novo deploy e teste no dispositivo.

---

## 6. Outros repositórios Coruna (referência)

Para referência e para confirmar que não falta nada na nossa base (khanhduytran0/coruna), foram verificados mais três repositórios públicos:

| Repo | Conteúdo | Uso para o nosso payload/chain |
|------|----------|----------------------------------|
| **[matteyeux/coruna](https://github.com/matteyeux/coruna)** | Deobfuscated JS e blobs de b27.icu: módulos com nomes hash (Fq2t1Q_dbfd6e84.js, YGPUu7_8dbfa3fd.js, KRfmo6_166411bd.js), config/fallback, final_payload_A/B com .macho.bin, .shellcode.bin, .blob*.bin, pastas kernel_exploit, powerd_implant, shellcode. | Layout e naming **diferentes** do khanhduytran0 (não há group.html + Stage1/2/3 + payloads/manifest.json). Útil para análise alternativa; **não** é drop-in para a nossa chain. |
| **[Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP](https://github.com/Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP)** | README + `coruna-dump.zip` (~1.2 MB): samples/ (28 JS), extracted_wasm/, extracted_binaries/ (Mach-O, shellcode), decoded_payloads/, analysis_scripts/. | Dump de amostras e artefactos extraídos; conteúdo dentro do zip. A nossa chain espera `payloads/bootstrap.dylib` + manifest + hash dirs como no khanhduytran0; **não** precisamos de alterar nada com base neste dump. |
| **[zeroxjf/iOS-Coruna-Reconstruction](https://github.com/zeroxjf/iOS-Coruna-Reconstruction)** | Reconstrução em clean-room: README enorme (análise Stage1/2/3, bootstrap, 0x80000/0x90000/0xF0000), clean-room/ (C headers + src), tools/ (coruna_payload_tool.py). **Sem binários** (exploit binaries excluded). | Apenas **análise e documentação**. Referencia `live-site/payloads/bootstrap.dylib` como input de análise; não publica ficheiros. Nada a copiar para o nosso payloads/. |

**Conclusão:** Nenhum destes três exige alterações no nosso código ou na estrutura de payloads. O bootstrap e o layout que usamos vêm do khanhduytran0/coruna; os outros servem como referência de análise.
