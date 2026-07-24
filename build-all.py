#!/usr/bin/env python3
"""
Unified build script for Subul Technology website.

Runs:
    1. build.py         — main site pages (index, resume, team, invest, careers, EN/AR)
    2. build-project.py — project landing pages (EN/AR)
    3. build-images.py  — convert PNG/JPG to WebP

Usage:
    python build-all.py
"""

import json
import subprocess
import sys
from pathlib import Path


def load_json(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def load_projects(projects_dir: str = "data/projects") -> list[dict]:
    projects = []
    for path in sorted(Path(projects_dir).glob("*.json")):
        if path.name.startswith("_"):
            continue
        projects.append(load_json(path))
    return projects


def run_script(script: str) -> None:
    print(f"\n=== Running {script} ===")
    result = subprocess.run([sys.executable, script], cwd=Path(__file__).parent)
    if result.returncode != 0:
        raise RuntimeError(f"{script} failed with exit code {result.returncode}")


def main():
    # Run all builders
    run_script("build.py")
    run_script("build-project.py")
    
    # Optional: convert images to WebP
    try:
        run_script("build-images.py")
    except RuntimeError:
        print("Warning: build-images.py failed (Pillow may not be installed)")

    print("\n=== All builds complete ===")


if __name__ == "__main__":
    main()
