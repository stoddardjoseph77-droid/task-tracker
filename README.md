# Task Tracker

A simple Python task tracker built while learning Git and GitHub.

## Usage

```python
from tasks import add_task, list_tasks, complete_task
from storage import load_tasks, save_tasks

tasks = load_tasks()
add_task(tasks, "Learn Git basics")
save_tasks(tasks)
print(list_tasks(tasks))
```
