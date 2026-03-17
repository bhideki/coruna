# Code Review — iOS Orchestrator / Coruna

Revisão do código, payloads e fluxo do exploit.

---

## 1. Python — Entry point e config

### main.py
- **OK** `os.chdir(_script_dir)` garante paths relativos corretos.
- **OK** `run_in_executor` para `input()` evita bloquear o event loop.
- **OK** Cancelamento do `c2_task` e `web_server.stop()` no shutdown.
- **Risco** Em `run_shell`, o lambda `lambda: input("(shell)> ")` captura a mesma referência; funciona, mas o prompt é fixo (sem problema).
- **Sugestão** Se `exploits_dir` ou `static_dir` não existirem, o servidor sobe mas rotas podem 404; opcional validar no startup e avisar.

### config_manager.py
- **Corrigido** Tratamento de `JSONDecodeError` ao ler `config.json`.
- **Corrigido** Uso de `encoding="utf-8"` em leitura/escrita.
- **OK** Defaults mínimos e coerentes com o uso atual.

---

## 2. Web server

### exploit_http_server.py
- **OK** Middleware de Content-Type para `.js` (Safari).
- **OK** Filtro de log para `BadStatusLine` (HTTPS na porta HTTP).
- **Corrigido** `add_static('/static/')` só é registrado se `static_files_dir` existir.
- **OK** Sem Coruna: resposta 503 com mensagem clara.
- **OK** `app['config']` atribuído em `start()` para uso em handlers (nenhum handler usa hoje; mantido por compatibilidade).

---

## 3. C2 e sessões

### c2_server.py
- **Corrigido** `peername` pode ser `None` em edge cases; uso de `or ("unknown", 0)`.
- **OK** Leitura em loop e append em `session.output_buffer`; handler termina quando a conexão fecha.
- **OK** `finally` remove sessão e fecha writer.
- **OK** `get_sessions_summary` e `get_session_by_id` consistentes com o uso no main.

### session.py
- **OK** `send_command` envia linha com `\n` e dá `drain()`.
- **OK** `get_buffered_output` concatena e limpa o buffer; uso em `run_shell` está correto.
- **Nota** `read_output()` existe mas não é usado (o C2 lê no handler); pode ficar para uso futuro.

---

## 4. group.html — Loader Coruna

### baseUrl e módulos
- **OK** `baseUrl = window.location.origin + pathname` fatiado até a última `/`; em `http://host/coruna/group.html` vira `http://host/coruna/`.
- **OK** `getModuleByURL` usa `e.$ + (M) + ".js"` → carrega Stage* e módulos do mesmo host.
- **OK** Promise de XHR usa `N("")` para rejeição (já corrigido anteriormente).

### Módulos referenciados vs existentes

| Referência no group.html | Arquivo no projeto | Status |
|--------------------------|--------------------|--------|
| platform_module.js | ✅ | OK |
| utility_module.js | ✅ | OK |
| Stage1_16.6_17.2.1_cassowary | ✅ | OK |
| Stage1_16.2_16.5.1_terrorbird | ✅ | OK |
| Stage1_15.6_16.1.2_bluebird | ✅ | OK (copiado de khanhduytran0/coruna/other) |
| Stage1_15.2_15.5_jacurutu | ✅ | OK |
| 7d8f5bae97f37aa318bccd652bf0c1dc38fd8396 | ❌ | **Falta** — 404 se mmrZ0r (iOS 11–15.1); não está nos repos públicos |
| Stage2_16.6_17.2.1_seedbell_pre | ✅ | OK |
| Stage2_17.0_17.2.1_seedbell | ✅ | OK |
| Stage2_16.6_16.7.12_seedbell | ✅ | OK |
| Stage2_16.3_16.5.1_seedbell | ✅ | OK |
| Stage2_15.0_16.2_breezy15 | ✅ | OK (copiado de khanhduytran0/coruna/other) |
| Stage2_13.0_14.x_breezy | ✅ | OK (copiado de khanhduytran0/coruna/other) |
| Stage3_VariantA | ✅ | OK (copiado de khanhduytran0/coruna/other) |
| Stage3_VariantB | ✅ | OK |

**Conclusão:** Quase todos os caminhos cobertos. Só falta o Stage1 mmrZ0r (`7d8f5bae....js`); dispositivos nessa faixa (iOS 11–15.1) darão 404 nesse módulo. Ver `docs/REPOS_ANALYSIS.md` para análise dos três repositórios.

---

## 5. Payloads (exploits/coruna/payloads/)

### Estrutura
- **OK** `manifest.json` existe e está em JSON válido.
- **OK** `bootstrap.dylib` existe (Stage3_VariantB usa em `payloads/bootstrap.dylib`).
- **OK** 20 hashes no manifest; 20 pastas em `payloads/` (incl. `7a7d99099b035b2c6512b6ebeeea6df1ede70fbb` para manifest raw).

### URLs
- Stage3 chama `fetchBin("payloads/manifest.json")` e `fetchBin("payloads/" + hashName + "/" + file)`.
- Com baseUrl `http://host/coruna/`, isso vira `http://host/coruna/payloads/...`, servido pelo `add_static('/coruna/', coruna_dir)`.
- **OK** Estrutura de pastas e nomes de arquivos batem com o manifest (copiados do upstream).

### Conteúdo
- Payloads são binários (dylibs/bins) do kit original; não foram alterados.
- C2 dos implants pode estar fixo nos binários; não validado nesta review.

---

## 6. platform_module.js / utility_module.js

- **OK** Carregados antes do inline script que usa `moduleManager.getModuleByName(...)`.
- **OK** Hashes `57620206d62079baad0e57e6d9ec93120c0f5247` e `14669ca3b1519ba2a8f40be287f646d4d7593eb0` definidos no group.html e exportados pelos módulos.
- Lógica de versão (applyVersionOffsets, versionFlags) e detecção (Lockdown, Simulator) segue o esperado; não re-executada aqui.

---

## 7. Resumo de correções aplicadas nesta review

1. **config_manager.py** — Tratamento de `JSONDecodeError` e encoding UTF-8.
2. **c2_server.py** — `peername` pode ser `None`: fallback para `("unknown", 0)`.
3. **exploit_http_server.py** — Registrar `/static/` só se `static_files_dir` existir.

---

## 8. Recomendações

1. **Módulo faltante** — Apenas `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js` (Stage1 mmrZ0r, iOS 11–15.1) não está disponível nos repos analisados; os outros quatro foram adicionados a partir de khanhduytran0/coruna/other. Ver `docs/REPOS_ANALYSIS.md`.

2. **Validação no startup** — Opcional: em `main()`, checar existência de `exploits/coruna/` e de `exploits/coruna/payloads/bootstrap.dylib` e avisar ou sair com mensagem clara se faltar.

3. **C2 nos payloads** — Se nenhuma sessão aparecer no C2, verificar firewall (porta 8080) e considerar que os implants podem estar apontando para outro endereço; eventual patcheamento dos binários fica fora do escopo desta review.

4. **Erro no carregamento de módulo** — Em `getModuleByURL`, em caso de 404 o `new Function(N)()` pode receber string vazia ou corpo de erro; o loader já rejeita a Promise. Opcional: logar a URL que falhou para facilitar debug.

---

## 9. Checklist final

| Item | Status |
|------|--------|
| main.py loop e shutdown | OK |
| Config com JSON inválido | Tratado |
| Web server sem pasta static | Não quebra; /static/ só existe se a pasta existir |
| C2 peername None | Tratado |
| group.html baseUrl e XHR reject | OK |
| Payloads e manifest | OK e consistentes |
| Stage* faltando para alguns iOS | Documentado; opcional adicionar arquivos |
| bootstrap.dylib | Presente |

Review concluído. Payloads e fluxo principal conferidos; correções aplicadas onde necessário.
