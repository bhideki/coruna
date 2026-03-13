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
        self.current_command = command
        # Lógica para enviar o comando pela shell (implementar depois)
        # Ex: self.writer.write(command.encode() + b'\n')
        # await self.writer.drain()
        pass 

    async def read_output(self):
        # Lógica para ler o output da shell (implementar depois)
        # Ex: data = await self.reader.read(4096)
        # self.output_buffer.append(data.decode())
        pass 