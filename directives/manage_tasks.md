# Directive: Manage Tasks

## Goal
Add, complete, assign, and delete tasks via the CLI or dashboard.

## Inputs
- Task title (required)
- Priority: `--high`, `--low`, or default `normal`
- Due date: `--due YYYY-MM-DD`
- Assignee: `--assign <name>`

## Execution Scripts
- `execution/cli.py` — CLI interface for all task operations
- `execution/tasks.py` — Core task logic (add, complete, assign, delete, list)
- `execution/storage.py` — JSON file persistence (save/load tasks and team)

## Commands
```bash
python execution/cli.py add "Task name"
python execution/cli.py add "Task name" --high --due 2026-02-14 --assign Joey
python execution/cli.py list
python execution/cli.py done <task_id>
python execution/cli.py delete <task_id>
python execution/cli.py assign <task_id> <name>
python execution/cli.py admin
python execution/cli.py team
python execution/cli.py team add <name> <role>
python execution/cli.py team remove <name>
```

## Outputs
- Tasks stored in `tasks.json` (gitignored, runtime data)
- Team members stored in `team.json` (gitignored, runtime data)
- Dashboard displays tasks at: https://dashboard-omega-flame.vercel.app

## Edge Cases
- Duplicate team members are blocked (case-insensitive check)
- Task IDs are auto-incremented
- Completing or deleting a non-existent task returns "not found"
