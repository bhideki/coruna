# Inventário ficheiro a ficheiro — zeroxjf, matteyeux, 34306

Análise de cada ficheiro nos três repositórios para referência e para verificar se algum cobre o módulo faltante `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js` (Stage1 mmrZ0r).

---

## 1. [zeroxjf/iOS-Coruna-Reconstruction](https://github.com/zeroxjf/iOS-Coruna-Reconstruction)

Clean-room reconstruction (iOS 16.2–17.2.1). **Não inclui** terrorbird/cassowary como ficheiros .js; só documentação e contratos C.

| Ficheiro | Tipo | Descrição | 7d8f5bae / mmrZ0r? |
|----------|------|-----------|---------------------|
| **Raiz** | | | |
| `.gitignore` | config | Ignora build/obj | N/A |
| `README.md` | doc | Chain overview, coverage (terrorbird 16.2–16.5.1, cassowary 16.6–17.2.1), disclaimer | Não; só 16.2+ |
| **clean-room/** | | | |
| `clean-room/README.md` | doc | Notas do clean-room, limites | N/A |
| `clean-room/include/coruna_contracts.h` | C | Structs 0xF00DBEEF, selectors, record IDs (0x80000, 0x90000, etc.) | N/A |
| `clean-room/include/coruna_stage_loader.h` | C | Contratos do loader (record store, worker) | N/A |
| `clean-room/src/coruna_contracts.c` | C | Implementação dos contratos (só compilação) | N/A |
| `clean-room/src/coruna_stage_loader.c` | C | Loader-side helpers | N/A |
| **docs/** | | | |
| `docs/CLEAN_ROOM_BLUEPRINT.md` | doc | Blueprint clean-room, módulos, plano | N/A |
| `docs/FULL_RECONSTRUCTION.md` | doc | Reconstrução completa: terrorbird, cassowary, seedbell, Stage3_VariantB, bootstrap.dylib, 0x50000/0x90000/0xF0000. **Não menciona** mmrZ0r nem 7d8f5bae; só 16.2–17.2.1 | **Não** — foco 16.2+ |
| **tools/** | | | |
| `tools/coruna_payload_tool.py` | Python | Inspeção de payloads/records, rebuild de output Stage3 | N/A |

**Conclusão zeroxjf:** Documentação e código C úteis para entender a chain nativa e formatos; **não** contêm o Stage1 mmrZ0r nem qualquer .js com esse hash.

---

## 2. [matteyeux/coruna](https://github.com/matteyeux/coruna)

JS desofuscado e blobs de https://b27.icu. Nomes **originais** (hashes/IDs), não Stage1_* / Stage2_*.

| Ficheiro | Tipo | Descrição | 7d8f5bae / mmrZ0r? |
|----------|------|-----------|---------------------|
| `config_81502427.js` | JS | Loader/config do kit, obfuscado (vKTo89, OLdwIx, etc.) | Não; config genérico |
| `fallback_2d2c721e.js` | JS | Fallback exploit path | Não (não é Stage1 por hash) |
| `Fq2t1Q_dbfd6e84.js` | JS | Exploit iOS (OfflineAudioContext/SVG RCE) | Não; nome diferente |
| `KRfmo6_166411bd.js` | JS | JIT Structure Check Elimination (macOS) | Não |
| `YGPUu7_8dbfa3fd.js` | JS | NaN-Boxing Type Confusion (macOS) | Não |
| `final_payload_A_16434916.js` | JS | Payload final A (shellcode loader) | N/A |
| `final_payload_A_16434916_*.bin` | bin | blob0/1/2, inner, macho, shellcode | N/A |
| `final_payload_B_6241388a.js` + blobs | JS/bin | Payload B | N/A |
| `ios_qeqLdN_ca6e6ce1.js` | JS | Módulo iOS (nome interno) | Não; hash diferente |
| `ios_uOj89n_bcb56dc5.js` | JS | Módulo iOS | Não |
| `macos_stage1_7b7a39f8.js` | JS | Stage1 macOS | Não; macOS |
| `macos_stage2_agTkHY_5264a069.js` | JS | Stage2 macOS | Não |
| `macos_stage2_eOWEVG_55afb1a6.js` | JS | Stage2 macOS | Não |
| `yAerzw_d6cb72f5.js` | JS | Outro módulo | Não |
| `urls.txt` | txt | URLs de entrega | N/A |
| `kernel_exploit/` | dir | Código kernel exploit | N/A |
| `powerd_implant/` | dir | Implant powerd | N/A |
| `shellcode/` | dir | Shellcode | N/A |

**Conclusão matteyeux:** Nomenclatura diferente; **nenhum** ficheiro com o nome `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js`. Os hashes nos nomes (dbfd6e84, 166411bd, etc.) não coincidem com 7d8f5bae.

---

## 3. [34306/coruna_analysis](https://github.com/34306/coruna_analysis)

Análise desofuscada do Coruna (CVE-2024-23222); “heavily used AI”. Inclui **referência explícita** ao hash mmrZ0r mas **não** o ficheiro .js.

| Ficheiro | Tipo | Descrição | 7d8f5bae / mmrZ0r? |
|----------|------|-----------|---------------------|
| `README.md` | doc | Referência ao collab com Duy Tran (khanhduytran0) | N/A |
| `group_loader.html` | HTML | Esqueleto mínimo (gtag); não é o group.html completo | N/A |
| `module_loader.js` | JS | Carregador de módulos (obChTK, ZKvD0e por hash) | Usado para carregar por hash |
| `platform_module.js` | JS | Deteção de plataforma, versão, flags (incl. mmrZ0r) | Define offsets.mmrZ0r |
| `utility_module.js` | JS | Helpers (resolveUrl, crypto, etc.) | N/A |
| `sha256.js` | JS | SHA256 para nomes de módulos | N/A |
| `fingerprint.js` | JS | Fingerprint device/iOS | N/A |
| **exploit_trigger.js** | JS | **Orquestração da chain.** Seleção Stage1 por flags: JtEUci, KeCRDQ, ShQCsB, RbKS6p, **mmrZ0r**. Para **mmrZ0r** chama `ZKvD0e("7d8f5bae97f37aa318bccd652bf0c1dc38fd8396")` — **mesmo hash** que group.html. **Não contém** o código do módulo; só pede o módulo por esse ID. | **Referência sim; ficheiro .js não** |
| `stage1_wasm_primitives.js` | JS | Primitivas WASM (addrof, fakeobj, read64/write64) — lógica genérica / desofuscada | Pode ser análogo a um Stage1; **não** é o 7d8f5bae completo |
| `stage2_pac_bypass.js` | JS | PAC bypass (Intl.Segmenter, etc.); carrega por hashes (477db22c..., 29b874a9..., etc.) | N/A |
| `stage3_sandbox_escape.js` | JS | Sandbox escape (Stage3); hashes 7f809f32..., c03c6f66... | N/A |
| `stage4_payload_stub.js` | JS | Stub payload stage 4 | N/A |
| `stage5_main_payload.js` | JS | Main payload stage 5 | N/A |
| `stage6_README.md` | doc | Notas stage 6 | N/A |
| `stage6_binary_blob.bin` | bin | Blob binário stage 6 | N/A |

**Conclusão 34306:**  
- **exploit_trigger.js** confirma que o path mmrZ0r usa **exatamente** o hash `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396`.  
- O repositório **não inclui** o ficheiro `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js`; só a lógica que o pede ao module loader.  
- **stage1_wasm_primitives.js** é material de análise/desofuscação (primitivas comuns), não o Stage1 mmrZ0r completo carregável pelo group.html.

---

## Resumo: o que cada repo tem em relação ao 7d8f5bae

| Repo | Tem o ficheiro 7d8f5bae....js? | Notas |
|------|--------------------------------|--------|
| zeroxjf/iOS-Coruna-Reconstruction | Não | Só documenta 16.2–17.2.1 (terrorbird, cassowary); não cobre mmrZ0r. |
| matteyeux/coruna | Não | Nomes por hash/ID diferentes; nenhum 7d8f5bae. |
| 34306/coruna_analysis | Não | Referência explícita ao hash em exploit_trigger.js; o .js do módulo não está no repo. |

**Conclusão geral:** Nenhum dos três repositórios contém o ficheiro `7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js`. O path mmrZ0r (iOS 11–15.1) continua sem módulo publicamente disponível; dispositivos nessa faixa darão 404 ao pedir esse .js.

---

## Uso recomendado por repo

- **zeroxjf:** docs (FULL_RECONSTRUCTION, CLEAN_ROOM_BLUEPRINT) e `tools/coruna_payload_tool.py` para entender chain e inspecionar payloads; clean-room C para contratos nativos.
- **matteyeux:** Referência de nomes originais e blobs (b27.icu); não substitui os Stage* do khanhduytran0.
- **34306:** exploit_trigger.js e platform_module.js para cruzar lógica com group.html e confirmar hashes (incl. 7d8f5bae); stage1_wasm_primitives.js como referência de primitivas, não como drop-in do mmrZ0r.
