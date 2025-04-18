# 🗂️ Kanban Task Board

A clean, responsive, drag-and-drop task management app built with React, TailwindCSS, and DnD Kit. This project demonstrates the ability to create, view, and organize tasks into columns by status — using a fully functional and persistently stored Kanban-style UI.

# 🚀 Features
✅ Add tasks with title, description, and status

✅ Drag and drop tasks between “To Do”, “In Progress”, and “Done” columns

✅ Persist tasks to a mock REST API (JSON Server)

✅ Responsive layout with modern UI

✅ Visual indicators for task status and column headers



# 🛠️ Tech Stack

    React + Vite

    TailwindCSS

    DnD Kit (@dnd-kit/core)

    ShadCN UI (Radix + Tailwind variants)

    JSON Server (for mock backend)



# 📦 Getting Started

1. Clone the Repository
    git clone https://github.com/your-username/kanban-task-board.git
    cd kanban-task-board

2. Install Dependencies
    npm install

3. Start the Development Server
    npm run dev

4. Start the Mock API Server
    npx json-server --watch db.json --port 4000

    This will serve your mock tasks at http://localhost:4000/tasks





# ✅ How It Works

All tasks are fetched from and synced to db.json using JSON Server.

DnD Kit handles drag-and-drop functionality between columns.

TailwindCSS + ShadCN provide styling and dialog components.

Task IDs are converted to strings to support dnd-kit and JSON Server syncing.


# 🤔 Known Limitations
No user authentication

No backend filtering or sorting (all handled in frontend)

No unit tests

No Edit or Delete Functionality


# 📬 Feedback & Improvements
Feel free to fork, clone, or suggest improvements! This is a simple but scalable foundation for a full-featured task management tool.

-------------------------------------------------------------------------------------------------------------------------------

# 🧠 Self-Evaluation

## a. Half-Page Summary

This submission is a fully functional Kanban-style task management board built with React, TailwindCSS, DnD Kit, and JSON Server. The application allows users to create, drag, and update tasks between “To Do”, “In Progress”, and “Done” columns. Each task includes a title, optional description, and status.

The UI is clean, responsive, and utilizes shadcn/ui components for the Add Task modal and form elements. Tasks are persistently stored and updated through a mock API powered by JSON Server.

Highlights include visual feedback during drag-and-drop, background color cues per status. 

## b. Self-Criticism

While the project meets all the base requirements, there are areas that could be improved. The code could be more modular and structured with separation of concerns — for example, extracting API calls into reusable utility functions or hooks. API error handling is minimal, and while it doesn’t break the app, it could be improved with user-friendly feedback (like toast messages).

The app doesn’t yet support editing or deleting tasks, and it doesn’t handle the case when the JSON server is offline. These features were considered but not implemented due to time constraints.

The drag-and-drop logic works, but reordering within a column is not yet supported. Also, while the project is small, global state management like context or Zustand could prepare it for better scalability.

There are also a few minor UX issues like accidental task duplication on rapid add-clicking or needing clearer validation feedback.

## c. Improvements (If I Had More Time)

- Add proper reordering of cards within the same column
- Write unit tests for major components and utility functions
- Refactor codebase into reusable hooks (e.g. useTasks, useApi)
- Add localStorage or IndexedDB fallback when API is unavailable
- Improve accessibility (ARIA roles, keyboard navigation)
- Add animations or transitions to enhance drag UX


## d. Technology Rating (Out of 10)

| Technology       | Self Rating |
|------------------|-------------|
| React (w/ Vite)  | 8/10        |
| TailwindCSS      | 9/10        |
| DnD Kit          | 7/10        |
| JSON Server      | 9/10        |
| shadcn/ui        | 8/10        |

---

Overall, this project was a great learning experience and demonstrates a solid grasp of React fundamentals, styling with Tailwind, and implementing drag-and-drop interactions with persistence.





