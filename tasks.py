"""Task tracker - core logic."""


def add_task(tasks, title, priority="normal", due=None, assignee=None):
    """Add a new task to the list."""
    task = {
        "id": len(tasks) + 1,
        "title": title,
        "done": False,
        "priority": priority,
        "due": due,
        "assignee": assignee,
    }
    tasks.append(task)
    return task


def assign_task(tasks, task_id, assignee):
    """Assign a team member to an existing task."""
    for task in tasks:
        if task["id"] == task_id:
            task["assignee"] = assignee
            return task
    return None


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
        due = task.get("due")
        due_label = f"  (due: {due})" if due else ""
        assignee = task.get("assignee")
        assignee_label = f"  @{assignee}" if assignee else ""
        lines.append(f"  [{status}] {task['id']}. {task['title']}{priority_label}{due_label}{assignee_label}")
    return "\n".join(lines)
