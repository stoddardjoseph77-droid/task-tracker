"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: "high" | "normal" | "low";
  due: string | null;
  assignee: string | null;
};

type TeamMember = {
  name: string;
  role: string;
};

const initialTasks: Task[] = [
  { id: 1, title: "Set up project repo", done: true, priority: "high", due: "2026-02-07", assignee: "Joey" },
  { id: 2, title: "Build dashboard UI", done: false, priority: "high", due: "2026-02-10", assignee: "Joey" },
  { id: 3, title: "Design logo", done: false, priority: "normal", due: "2026-02-14", assignee: "Sarah" },
  { id: 4, title: "Write API docs", done: false, priority: "low", due: null, assignee: "Marcus" },
  { id: 5, title: "Set up CI/CD pipeline", done: false, priority: "normal", due: "2026-02-20", assignee: null },
];

const initialTeam: TeamMember[] = [
  { name: "Joey", role: "Project Lead" },
  { name: "Sarah", role: "Developer" },
  { name: "Marcus", role: "Designer" },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "normal" | "low">("normal");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  const completedCount = tasks.filter((t) => t.done).length;

  function addTask() {
    if (!newTaskTitle.trim()) return;
    const task: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title: newTaskTitle.trim(),
      done: false,
      priority: newTaskPriority,
      due: newTaskDue || null,
      assignee: newTaskAssignee || null,
    };
    setTasks([...tasks, task]);
    setNewTaskTitle("");
    setNewTaskPriority("normal");
    setNewTaskDue("");
    setNewTaskAssignee("");
  }

  function toggleTask(id: number) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function addMember() {
    if (!newMemberName.trim() || !newMemberRole.trim()) return;
    if (team.some((m) => m.name.toLowerCase() === newMemberName.trim().toLowerCase())) return;
    setTeam([...team, { name: newMemberName.trim(), role: newMemberRole.trim() }]);
    setNewMemberName("");
    setNewMemberRole("");
  }

  function removeMember(name: string) {
    setTeam(team.filter((m) => m.name !== name));
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
        <p className="text-sm text-gray-500">Team dashboard</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Team Members</p>
            <p className="text-3xl font-bold text-blue-600">{team.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {tasks.length === 0 && (
                  <p className="px-5 py-8 text-center text-gray-400">No tasks yet. Add one below.</p>
                )}
                {tasks.map((task) => (
                  <div key={task.id} className="px-5 py-3 flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        task.done
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {task.done && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "low"
                              ? "bg-gray-100 text-gray-500"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                        {task.due && (
                          <span className="text-xs text-gray-400">Due: {task.due}</span>
                        )}
                        {task.assignee && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            @{task.assignee}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-300 hover:text-red-500 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Task Form */}
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="New task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as "high" | "normal" | "low")}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="low">Low</option>
                    </select>
                    <input
                      type="date"
                      value={newTaskDue}
                      onChange={(e) => setNewTaskDue(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                    />
                    <select
                      value={newTaskAssignee}
                      onChange={(e) => setNewTaskAssignee(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                    >
                      <option value="">Unassigned</option>
                      {team.map((m) => (
                        <option key={m.name} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={addTask}
                      className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Sidebar */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Team</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {team.length === 0 && (
                  <p className="px-5 py-8 text-center text-gray-400">No team members yet.</p>
                )}
                {team.map((member) => {
                  const memberTasks = tasks.filter((t) => t.assignee === member.name);
                  const memberDone = memberTasks.filter((t) => t.done).length;
                  return (
                    <div key={member.name} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">
                          {member.role} &middot; {memberDone}/{memberTasks.length} done
                        </p>
                      </div>
                      <button
                        onClick={() => removeMember(member.name)}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add Member Form */}
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Role"
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addMember()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addMember}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
