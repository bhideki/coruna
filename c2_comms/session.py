import asyncio
import uuid
from datetime import datetime

class Session:
    def __init__(self, reader: asyncio.StreamReader, writer: asyncio.StreamWriter, peername: tuple, session_type: str = "unknown"):
        self.id: str = str(uuid.uuid4())[:8] # ID curto para fácil referência
        self.reader: asyncio.StreamReader = reader
        self.writer: asyncio.StreamWriter = writer
        self.ip_address: str = peername[0]
        self.port: int = peername[1]
        self.connected_at: datetime = datetime.now()
        self.status: str = "active" # Pode ser "active", "backgrounded", "terminated"
        self.type: str = session_type # Ex: "basic_sandbox_shell", "full_access_shell"
        self.output_buffer: list = [] # Para armazenar o output da shell
        self.current_command: str = "" # O comando que está sendo executado no momento

    def to_dict(self):
        return {
            "id": self.id,
            "ip_address": self.ip_address,
            "port": self.port,
            "connected_at": self.connected_at.strftime("%Y-%m-%d %H:%M:%S"),
            "status": self.status,
            "type": self.type
        }

    async def send_command(self, command: str):
        """Envia comando para a shell remota (append \\n)."""
        self.current_command = command
        try:
            self.writer.write((command + "\n").encode())
            await self.writer.drain()
        except Exception as e:
            raise RuntimeError(f"Erro ao enviar comando: {e}") from e

    async def read_output(self, timeout: float = 0.5) -> str:
        """Lê dados disponíveis do reader e adiciona ao buffer. Retorna o que foi lido."""
        try:
            data = await asyncio.wait_for(self.reader.read(65536), timeout=timeout)
            if data:
                text = data.decode("utf-8", errors="replace")
                self.output_buffer.append(text)
                return text
        except asyncio.TimeoutError:
            pass
        except Exception:
            raise
        return ""

    def get_buffered_output(self) -> str:
        """Retorna e limpa o buffer de output."""
        out = "".join(self.output_buffer)
        self.output_buffer.clear()
        return out