# Payload e repositórios — comparação texto a texto

Verificação entre `coruna_repo` (khanhduytran0/coruna) e `ios_orchestrator/exploits/coruna` para **payload** e fluxo de execução. Objetivo: garantir que não alterámos nada que impeça o shell e que não falta nada nos payloads.

---

## 1. Causa mais provável de “não teve nenhum shell”

### 1.1 `payloads/bootstrap.dylib` não existe

- **Stage3_VariantB.js** (linha ~1342) faz `_xhr.open("GET", "payloads/bootstrap.dylib", false)` e usa a resposta para construir o dylib injetado.
- Em **ambos** os projetos (`coruna_repo` e `ios_orchestrator/exploits/coruna`) a pasta `payloads/` contém apenas:
  - `manifest.json`
  - 3 subpastas com um ficheiro cada (ex.: `f8a86cf3.../entry1_type0x0a.bin`).
- **Não existe** `payloads/bootstrap.dylib` em nenhum dos dois.
- O documento **coruna_repo/ANALYSIS.md** descreve o pipeline de desencriptação e indica que o resultado deve incluir `payload/bootstrap.dylib` e as entradas por hash; esse passo gera ficheiros que **não estão** no repositório (provavelmente por serem binários / .gitignore).
- **Consequência:** quando o Stage 3 corre, o pedido a `payloads/bootstrap.dylib` devolve 404 ou corpo vazio. O código usa essa resposta como Mach-O; com buffer vazio ou inválido o Stage 3 falha (ou lança mais tarde). Por isso a chain pode “terminar” sem injectar o dylib real e **não há shell**.
- Foi adicionada uma verificação em **Stage3_VariantB.js**: se o GET a `payloads/bootstrap.dylib` não for 200 ou o corpo for curto (< 1024 bytes), o loader regista um erro claro e lança, para que apareça na UI: *"Missing or invalid payloads/bootstrap.dylib ... Add bootstrap.dylib from the Coruna decryption pipeline"*.

### 1.2 Payloads por hash incompletos

- O **manifest.json** lista 19 hashes com várias entradas cada (ex.: `entry0_type0x08.dylib`, `entry1_type0x09.dylib`, etc.).
- No disco temos só **3** subpastas sob `payloads/`, cada uma com **um** ficheiro (`entry1_type0x0a.bin`).
- Ou seja, a maior parte dos ficheiros referidos no manifest **não existe**. Quando o Stage 3 e o dylib pedem um container por hash, `buildContainer()` chama `fetchBin("payloads/<hash>/<file>")`; para a maioria dos hashes/ficheiros isso resulta em 404. O fluxo de payload está portanto incompleto mesmo que o bootstrap existisse.

**Resumo:** Não ter shell é consistente com: (1) falta de `bootstrap.dylib` e (2) falta da maioria dos payloads por hash. Nada disso foi alterado por nós em relação ao repo de referência; é uma lacuna dos repositórios (payloads desencriptados não commitados).

---

## 2. group.html — diferenças que tocam em payload / init / baseUrl

Comparação direta com o `group.html` do `coruna_repo`:

| Tema | Original (coruna_repo) | Nosso (ios_orchestrator) | Impacto em payload/shell |
|------|------------------------|---------------------------|---------------------------|
| **baseUrl** | `let baseUrl = utilityModule.Ot(fqMaGkNg());` depois `baseUrl.slice(0, baseUrl.lastIndexOf("/") + 1)` | `let baseUrl = window.location.origin + window.location.pathname;` depois o mesmo `slice` | Só afeta o carregamento dos **módulos** Stage1/2/3 (.js). Payloads são pedidos pelo Stage3 com URLs relativas ao documento (`payloads/...`), não ao `baseUrl` do moduleManager. **Não altera** o pedido a `payloads/bootstrap.dylib` nem a `payloads/manifest.json`. |
| **platformModule.init(...)** | `init("", fqMaGkNg(), "", Array(!1)[0], Array(!1)[0], platform, userAgent)` | Igual. | **Nenhuma** alteração. `fixedMachOVal1/2/3` vêm daqui; Stage3 usa-os e continua a pedir payloads por URL relativa. |
| **obChTK / getModuleByURL** | `hPL3On: this.getModuleByName`, `ZKvD0e: this.getModuleByURL` (no original `this` é global → undefined) | `hPL3On: c`, `ZKvD0e: getModuleByURLFn` (funções reais) | Necessário para bluebird; não muda o fluxo de payload. |
| **Xn → exploitPrimitive, Nn, etc.** | Não existe. | Normalização e aliases (addrof, read32, readByte, readDoubleAsPointer, …). | Necessário para bluebird/Stage3; não altera URLs nem existência de ficheiros de payload. |
| **sessionStorage guard** | Não existe. | `CORUNA_DONE_KEY`, `RESULT_SKIPPED`, skip quando já tentado. | Evita re-execução; não altera onde os payloads são pedidos nem o conteúdo de `payloads/`. |
| **Try/catch no load do Stage1** | Não. | Sim, com log de erro. | Só logging; não toca em payload. |

Conclusão: **não alterámos** em `group.html` nada que defina *onde* ou *como* o payload é carregado (bootstrap.dylib e manifest). A única base que mudou é a dos módulos .js; a resolução de `payloads/` é por documento (mesma origem), como no original.

---

## 3. Stage3_VariantB.js — payload e bootstrap

- **fetchBin(url):** em ambos é `xhr.open("GET", url, true)` com URL relativa ao documento. Para `payloads/manifest.json` e `payloads/<hash>/<file>` o comportamento é o mesmo.
- **MachOPayloadBuilder(fixedMachOVal1, fixedMachOVal2, fixedMachOVal3):** argumentos vêm de `platformModule.platformState`, preenchidos por `init("", fqMaGkNg(), "", ...)`. Igual ao original.
- **confirm() antes do manifest (7a7d99...):** em ambos existe; se o utilizador cancelar, não se carrega esse payload. Comportamento igual.
- **Bootstrap.dylib:** no nosso código há agora uma verificação explícita: se o GET a `payloads/bootstrap.dylib` falhar ou o corpo for pequeno, lançamos erro e log claro. No original não há esse check (falha mais tarde ao parsear o buffer).

Nenhuma alteração no Stage3 remove ou muda o pedido a `payloads/bootstrap.dylib` ou aos outros payloads; só tornamos a falha por “bootstrap em falta” visível.

---

## 4. platform_module.js

- **init(..., fixedMachOVal1, fixedMachOVal2, fixedMachOVal3):** assinatura e uso iguais.
- **Nn, versionFlags, LTgSl5 150600:** só adicionámos `Nn` e offsets para bluebird. Não mexemos em nada usado pelo Stage3 para construir URLs de payload (que são relativas ao documento).

---

## 5. O que fazer para passar a ter shell

1. **Obter e colocar `bootstrap.dylib`:**
   - Seguir o pipeline de desencriptação descrito em **coruna_repo/ANALYSIS.md** (chaves, ChaCha20, LZMA, F00DBEEF).
   - Extrair/copiar o **bootstrap.dylib** resultante para `ios_orchestrator/exploits/coruna/payloads/bootstrap.dylib`.
   - Garantir que o servidor HTTP que serve `/coruna/` expõe esse ficheiro em `.../coruna/payloads/bootstrap.dylib`.

2. **Payloads por hash (opcional mas recomendado):**
   - O manifest lista 19 hashes com várias entradas. Para o fluxo completo, é preciso ter as pastas e ficheiros correspondentes em `payloads/<hash>/` conforme o `manifest.json`. Caso contrário, pedidos a hashes que não existem no disco continuarão a dar 404.

3. **C2 / listener:**
   - Os dylibs podem ter **C2 em hardcode**. O README do projeto avisa que, mesmo com drive-by bem-sucedido, a sessão pode não aparecer se o listener (porta, IP) não coincidir com o C2 dos binários.

4. **Testar de novo sem usar o “skip”:**
   - Aba privada ou limpar dados do site para não ter o sessionStorage guard.
   - Na primeira execução, verificar nos logs se aparece o novo erro *"Missing or invalid payloads/bootstrap.dylib"*; se aparecer, confirma que a causa é mesmo a ausência do ficheiro.

---

## 6. Resumo

- **Repositórios:** Comparação texto a texto em `group.html`, Stage3 e platform_module não mostra qualquer alteração que remova ou desvie o carregamento de payload; as diferenças são baseUrl dos módulos, obChTK/Xn/Nn/aliases para bluebird, e guard de sessão.
- **Payload:** O problema que impede o shell é a **falta de ficheiros** em `payloads/`: em particular **bootstrap.dylib** e a maioria das entradas por hash. Isso já era assim no repo de referência (payloads desencriptados não estão no repo). Foi adicionada verificação explícita para bootstrap.dylib para falhar cedo e com mensagem clara.
