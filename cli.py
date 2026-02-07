"""Command-line interface for the task tracker."""

import sys
from tasks import add_task, assign_task, complete_task, delete_task, list_by_member, list_tasks
from storage import load_tasks, load_team, save_tasks, save_team


def main():
    tasks = load_tasks()

    if len(sys.argv) < 2:
        print("Usage:")
        print("  python cli.py add \"Task name\"")
        print("  python cli.py add \"Task name\" --high")
        print("  python cli.py add \"Task name\" --low")
        print("  python cli.py add \"Task name\" --due 2026-02-14")
        print("  python cli.py add \"Task name\" --high --due 2026-02-14")
        print("  python cli.py add \"Task name\" --assign Joey")
        print("  python cli.py assign <task_id> <name>")
        print("  python cli.py list")
        print("  python cli.py admin")
        print("  python cli.py team")
        print("  python cli.py team add <name> <role>")
        print("  python cli.py team remove <name>")
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
        due = None
        assignee = None
        extra_args = sys.argv[3:]
        for i, arg in enumerate(extra_args):
            if arg == "--high":
                priority = "high"
            elif arg == "--low":
                priority = "low"
            elif arg == "--due" and i + 1 < len(extra_args):
                due = extra_args[i + 1]
            elif arg == "--assign" and i + 1 < len(extra_args):
                assignee = extra_args[i + 1]
        task = add_task(tasks, title, priority, due, assignee)
        save_tasks(tasks)
        print(f"Added: {task['title']} (#{task['id']})")

    elif command == "list":
        print(list_tasks(tasks))

    elif command == "admin":
        print(list_by_member(tasks))

    elif command == "team":
        team = load_team()
        if len(sys.argv) < 3:
            if not team:
                print("No team members yet. Add one with: python cli.py team add <name> <role>")
            else:
                print("Team:")
                for member in team:
                    print(f"  {member['name']} — {member['role']}")
            return

        action = sys.argv[2]
        if action == "add":
            if len(sys.argv) < 5:
                print("Usage: python cli.py team add <name> <role>")
                return
            name = sys.argv[3]
            role = sys.argv[4]
            for member in team:
                if member["name"].lower() == name.lower():
                    print(f"{name} is already on the team.")
                    return
            team.append({"name": name, "role": role})
            save_team(team)
            print(f"Onboarded: {name} ({role})")
        elif action == "remove":
            if len(sys.argv) < 4:
                print("Usage: python cli.py team remove <name>")
                return
            name = sys.argv[3]
            for i, member in enumerate(team):
                if member["name"].lower() == name.lower():
                    team.pop(i)
                    save_team(team)
                    print(f"Removed: {name}")
                    return
            print(f"{name} not found on the team.")
        else:
            print(f"Unknown team action: {action}")

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

    elif command == "assign":
        if len(sys.argv) < 4:
            print("Usage: python cli.py assign <task_id> <name>")
            return
        task_id = int(sys.argv[2])
        assignee = sys.argv[3]
        task = assign_task(tasks, task_id, assignee)
        save_tasks(tasks)
        if task:
            print(f"Assigned '{task['title']}' to {assignee}")
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
