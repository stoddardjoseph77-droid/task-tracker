"""Task tracker - core logic."""


def add_task(tasks, title, priority="normal"):
    """Add a new task to the list."""
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "done": False,
        "priority": priority,
    }
    tasks.append(task)
    return task


def complete_task(tasks, task_id):
    """Mark a task as done."""
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            return task
    return None


def delete_task(tasks, task_id):
    """Delete a task by its ID."""
    for i, task in enumerate(tasks):
        if task["id"] == task_id:
            return tasks.pop(i)
    return None


def list_tasks(tasks):
    """Return a formatted string of all tasks."""
    if not tasks:
        return "No tasks yet."
    lines = []
    for task in tasks:
        status = "done" if task["done"] else "todo"
        priority = task.get("priority", "normal")
        priority_label = " !! HIGH" if priority == "high" else " -- low" if priority == "low" else ""
        lines.append(f"  [{status}] {task['id']}. {task['title']}{priority_label}")
    return "\n".join(lines)
