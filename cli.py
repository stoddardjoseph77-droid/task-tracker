"""Command-line interface for the task tracker."""

import sys
from tasks import add_task, complete_task, delete_task, list_tasks
from storage import load_tasks, save_tasks


def main():
    tasks = load_tasks()

    if len(sys.argv) < 2:
        print("Usage:")
        print("  python cli.py add \"Task name\"")
        print("  python cli.py add \"Task name\" --high")
        print("  python cli.py add \"Task name\" --low")
        print("  python cli.py list")
        print("  python cli.py done <task_id>")
        print("  python cli.py delete <task_id>")
        return

    command = sys.argv[1]

    if command == "add":
        if len(sys.argv) < 3:
            print("Please provide a task name: python cli.py add \"Task name\"")
            return
        title = sys.argv[2]
        priority = "normal"
        if len(sys.argv) > 3:
            flag = sys.argv[3]
            if flag == "--high":
                priority = "high"
            elif flag == "--low":
                priority = "low"
        task = add_task(tasks, title, priority)
        save_tasks(tasks)
        print(f"Added: {task['title']} (#{task['id']})")

    elif command == "list":
        print(list_tasks(tasks))

    elif command == "done":
        if len(sys.argv) < 3:
            print("Please provide a task ID: python cli.py done 1")
            return
        task_id = int(sys.argv[2])
        task = complete_task(tasks, task_id)
        save_tasks(tasks)
        if task:
            print(f"Completed: {task['title']}")
        else:
            print(f"Task #{task_id} not found.")

    elif command == "delete":
        if len(sys.argv) < 3:
            print("Please provide a task ID: python cli.py delete 1")
            return
        task_id = int(sys.argv[2])
        task = delete_task(tasks, task_id)
        save_tasks(tasks)
        if task:
            print(f"Deleted: {task['title']}")
        else:
            print(f"Task #{task_id} not found.")

    else:
        print(f"Unknown command: {command}")


if __name__ == "__main__":
    main()
