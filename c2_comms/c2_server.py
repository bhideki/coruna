import asyncio
from typing import Dict, Optional
from asyncio import Queue
from .session import Session # Importação relativa

class C2Server:
    def __init__(self, c2_ip: str, c2_port: int, session_notification_queue: Queue):
        self.c2_ip = c2_ip
        self.c2_port = c2_port
        self.active_sessions: Dict[str, Session] = {} # Dicionário de sessões ativas
        self.session_notification_queue = session_notification_queue # Para notificar o console
        self.server: Optional[asyncio.Server] = None

    async def _handle_client_connection(self, reader, writer):
        peername = writer.get_extra_info('peername')
        session = Session(reader, writer, peername, session_type="full_access_shell") # Assumindo full access por enquanto
        self.active_sessions[session.id] = session
        print(f"[*] Nova conexão de shell de {session.ip_address}:{session.port} - ID: {session.id}")
        
        # Notificar o InteractiveConsole sobre a nova sessão
        await self.session_notification_queue.put(f"NEW_SESSION:{session.id}:{session.ip_address}")

        try:
            while True:
                # Aqui você gerenciaria a interação da shell, leitura de output, etc.
                # await session.read_output() # Descomente quando implementar
                await asyncio.sleep(1) # Simula o processamento da shell
        except Exception as e:
            print(f"[-] Erro na sessão {session.id}: {e}")
        finally:
            print(f"[*] Sessão {session.id} de {session.ip_address} encerrada.")
            # Remover a sessão quando ela terminar
            if session.id in self.active_sessions:
                del self.active_sessions[session.id]
            writer.close()
            await writer.wait_closed()
            await self.session_notification_queue.put(f"SESSION_CLOSED:{session.id}")

    def get_sessions_summary(self) -> list[dict]:
        """Retorna um resumo das sessões ativas para exibição."""
        return [session.to_dict() for session in self.active_sessions.values()]

    def get_session_by_id(self, session_id: str) -> Session | None:
        """Retorna uma instância de Session pelo ID."""
        return self.active_sessions.get(session_id)
        
    async def start(self):
        self.server = await asyncio.start_server(
            self._handle_client_connection, self.c2_ip, self.c2_port
        )
        print(f"[*] C2 Server ouvindo em {self.c2_ip}:{self.c2_port}...")
        async with self.server:
            await self.server.serve_forever()

    def stop(self):
        if self.server:
            self.server.close()
            # print("[*] C2 Server desligado.")