import asyncio
from typing import Dict, List, Optional

from .session import Session


class C2Server:
    def __init__(self, bind_host: str, port: int):
        self.bind_host = bind_host
        self.port = port
        self.active_sessions: Dict[str, Session] = {}
        self.server: Optional[asyncio.Server] = None

    async def _handle_client_connection(self, reader, writer):
        peername = writer.get_extra_info("peername") or ("unknown", 0)
        session = Session(reader, writer, peername, session_type="full_access_shell")
        self.active_sessions[session.id] = session
        print(f"[*] Nova sessão {session.id} — {session.ip_address}:{session.port}")

        try:
            while True:
                data = await reader.read(65536)
                if not data:
                    break
                text = data.decode("utf-8", errors="replace")
                session.output_buffer.append(text)
        except (ConnectionResetError, BrokenPipeError, asyncio.CancelledError):
            pass
        except Exception as e:
            print(f"[-] Erro na sessão {session.id}: {e}")
        finally:
            print(f"[*] Sessão {session.id} de {session.ip_address} encerrada.")
            # Remover a sessão quando ela terminar
            if session.id in self.active_sessions:
                del self.active_sessions[session.id]
            writer.close()
            await writer.wait_closed()

    def get_sessions_summary(self) -> List[dict]:
        """Retorna um resumo das sessões ativas para exibição."""
        return [session.to_dict() for session in self.active_sessions.values()]

    def get_session_by_id(self, session_id: str) -> Optional[Session]:
        """Retorna uma instância de Session pelo ID."""
        return self.active_sessions.get(session_id)
        
    async def start(self):
        self.server = await asyncio.start_server(
            self._handle_client_connection, self.bind_host, self.port
        )
        print(f"[*] C2 ouvindo em {self.bind_host}:{self.port}")
        async with self.server:
            await self.server.serve_forever()

    def stop(self):
        if self.server:
            self.server.close()
            # print("[*] C2 Server desligado.")