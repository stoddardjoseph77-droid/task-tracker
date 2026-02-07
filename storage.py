"""Task tracker - save and load tasks from a JSON file."""

import json
import os

DATA_FILE = "tasks.json"


def save_tasks(tasks):
    """Save tasks list to a JSON file."""
    with open(DATA_FILE, "w") as f:
        json.dump(tasks, f, indent=2)


def load_tasks():
    """Load tasks from JSON file. Returns empty list if no file exists."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)
