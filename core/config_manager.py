import json
import os

class ConfigManager:
    def __init__(self, config_path='config.json'):
        self.config_path = config_path
        self.config = self._load_config()

    def _load_config(self):
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except json.JSONDecodeError as e:
                raise ValueError(f"Config inválido em '{self.config_path}': {e}") from e
        else:
            print(f"[*] Criando arquivo de configuração padrão em '{self.config_path}'.")
            default_config = {
                "c2_bind": "0.0.0.0",
                "c2_port": 8080,
                "web_server_ip": "0.0.0.0",
                "web_server_port": 80,
                "exploit_templates_dir": "exploits/",
                "static_files_dir": "web_server/static/",
            }
            with open(self.config_path, "w", encoding="utf-8") as f:
                json.dump(default_config, f, indent=4)
            return default_config

    def get(self, key, default=None):
        return self.config.get(key, default)

    def set(self, key, value):
        self.config[key] = value

    def save_config(self):
        with open(self.config_path, "w", encoding="utf-8") as f:
            json.dump(self.config, f, indent=4)

if __name__ == "__main__":
    cm = ConfigManager()
    for k, v in cm.config.items():
        print(f"  {k}: {v}")
