from pathlib import Path

def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent

def absolute(path) -> Path:
    return get_project_root() / Path(path)