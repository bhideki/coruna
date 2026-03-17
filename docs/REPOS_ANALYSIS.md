# Análise dos repositórios Coruna

Comparação dos três repositórios para montar a chain completa do exploit (módulos JS referenciados no `group.html`).

---

## 1. [khanhduytran0/coruna](https://github.com/khanhduytran0/coruna)

**Foco:** Toolkit desofuscado e adaptado para hospedagem local. Inclui apenas as chains testadas pelo autor.

### Estrutura

| Local        | Conteúdo |
|-------------|----------|
| **Raiz**    | `group.html`, `platform_module.js`, `utility_module.js`, Stage1 (jacurutu, terrorbird, cassowary), Stage2 (seedbell ×4), `Stage3_VariantB.js`, pastas `payloads/`, `downloaded/`, `extracted/`, `other/`, `SpringBoardTweak/` |
| **other/**  | Módulos **não** testados pelo autor, mas referenciados no `group.html`: `Stage1_15.6_16.1.2_bluebird.js`, `Stage2_13.0_14.x_breezy.js`, `Stage2_15.0_16.2_breezy15.js`, `Stage3_VariantA.js`, mais `Stage1_13.0_15.1.1_buffout.js` e arquivos por hash (ex.: `377bed74...js`, `7a7d9909...js`) |
| **extracted/** | Binários extraídos (`.bin`) de payloads |
| **payloads/**  | Estrutura decriptada (bootstrap.dylib, manifest, pastas por hash) |

### O que falta na raiz mas existe em `other/`

- `Stage1_15.6_16.1.2_bluebird.js` → **other/**
- `Stage2_13.0_14.x_breezy.js` → **other/**
- `Stage2_15.0_16.2_breezy15.js` → **other/**
- `Stage3_VariantA.js` → **other/**

### O que não existe em nenhum lugar no repo

- **`7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js`** — Stage1 mmrZ0r (iOS 11–15.1). O `group.html` referencia esse hash.

**Verificação em todas as pastas do [khanhduytran0/coruna](https://github.com/khanhduytran0/coruna/tree/main):**

| Pasta | Conteúdo | 7d8f5bae...? |
|-------|----------|--------------|
| Raiz | Stage1/2/3 (jacurutu, terrorbird, cassowary, seedbell×4, VariantB), group.html, platform/utility_module | Não |
| **payloads/** | bootstrap.dylib, manifest.json, 20 subpastas por hash (13344176..., 7a7d9909..., etc.) | Não — payloads são outros hashes; nenhum 7d8f5bae |
| downloaded/ | 17 ficheiros `<hash>.min.js` (blobs encriptados) | Não |
| other/ | bluebird, breezy, breezy15, VariantA, buffout, 377bed74...js, 7a7d9909...js, etc. | Não |
| extracted/ | 3 ficheiros .bin | Não |
| SpringBoardTweak/ | Código (Makefile, .m, control) | Não |

O arquivo `7d8f5bae....js` **não existe em nenhuma pasta** do repositório; só pode vir de outro dump (ex.: Rat5ak zip) com esse nome ou equivalente.

**Conclusão:** Os 4 módulos (bluebird, breezy, breezy15, VariantA) foram copiados de `other/` para o nosso projeto. O 5.º (`7d8f5bae...`) não está no khanhduytran0/coruna.

---

## 2. [Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP](https://github.com/Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP)

**Foco:** Amostras originais do kit (b27.icu): 28 módulos JS, 6 Wasm, 13 binários ARM64, payloads decodificados e scripts de análise.

### Estrutura (dentro de `coruna-dump.zip`)

- **samples/** — 28 JS originais: 13 módulos nomeados por SHA1 (`.js.js`), `config_81502427.js`, `fallback_2d2c721e.js`, `ios_*.js`, `macos_*.js`, exploits (Fq2t1Q, KRfmo6, YGPUu7), `final_payload_A/B_*`, `urls.txt`
- **extracted_wasm/** — 6 Wasm
- **extracted_binaries/** — Mach-O e shellcode ARM64
- **decoded_payloads/** — 12 JS desofuscados
- **analysis_scripts/** — Scripts de RE

### Relação com o nosso projeto

- Nomenclatura **diferente** da do khanhduytran0: aqui são hashes SHA1 e nomes originais (config, fallback, ios_*, macos_*), não `Stage1_*`, `Stage2_*`, `Stage3_*`.
- Para obter algo equivalente a `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js` seria preciso: (1) descompactar o zip, (2) procurar por arquivo com esse hash no nome ou no conteúdo, (3) eventualmente adaptar para o loader do `group.html` (que espera um módulo carregável por URL com esse nome).

**Uso:** Referência para análise e, se necessário, recuperar o Stage1 mmrZ0r se existir no zip com nome/hash compatível.

---

## 3. [matteyeux/coruna](https://github.com/matteyeux/coruna)

**Foco:** JS desofuscado e blobs extraídos de https://b27.icu (primeira tentativa com Claude).

### Conteúdo principal

- **Loader/config:** `config_81502427.js`, `fallback_2d2c721e.js`
- **Exploits RCE:** `Fq2t1Q_dbfd6e84.js` (iOS), `KRfmo6_166411bd.js` (macOS JIT), `YGPUu7_8dbfa3fd.js` (macOS NaN-Boxing)
- **Payload final:** `final_payload_A_16434916.*`, `final_payload_B_6241388a.*` (JS + blobs + macho + shellcode)
- **Plataforma:** `ios_qeqLdN_ca6e6ce1.js`, `ios_uOj89n_bcb56dc5.js`, `macos_stage1_7b7a39f8.js`, `macos_stage2_*`, `yAerzw_d6cb72f5.js`
- **Outros:** `kernel_exploit/`, `powerd_implant/`, `shellcode/`, `urls.txt`

### Relação com o nosso projeto

- Não usa a convenção `Stage1_15.6_16.1.2_bluebird.js` etc. São nomes de hash/ID do kit original.
- Não há `group.html` nem a mesma árvore de stages do khanhduytran0; é um dump alternativo desofuscado.
- **Uso:** Análise e comparação de lógica; não serve para “colar” diretamente os nomes de arquivo no nosso `group.html`.

---

## Resumo: o que foi possível montar

| Módulo referenciado no group.html | Fonte | Ação no nosso projeto |
|-----------------------------------|-------|------------------------|
| Stage1_15.6_16.1.2_bluebird       | khanhduytran0/coruna **other/** | ✅ Copiado para `exploits/coruna/` |
| Stage2_13.0_14.x_breezy           | khanhduytran0/coruna **other/** | ✅ Copiado |
| Stage2_15.0_16.2_breezy15         | khanhduytran0/coruna **other/** | ✅ Copiado |
| Stage3_VariantA                   | khanhduytran0/coruna **other/** | ✅ Copiado |
| 7d8f5bae97f37aa318bccd652bf0c1dc38fd8396 | Não encontrado nos 3 repos (pode estar no zip Rat5ak com outro nome) | ❌ Ainda falta; 404 se o device cair nesse path |

Payloads binários (pasta `payloads/`, `manifest.json`, `bootstrap.dylib`) já vinham do khanhduytran0/coruna e estão completos no nosso projeto.

---

## Referências

- [khanhduytran0/coruna](https://github.com/khanhduytran0/coruna) — toolkit local, `other/` com stages extras
- [Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP](https://github.com/Rat5ak/CORUNA_IOS-MACOS_FULL_DUMP) — dump completo (zip), análise e decoded payloads
- [matteyeux/coruna](https://github.com/matteyeux/coruna) — desofuscação b27.icu, nomes originais
