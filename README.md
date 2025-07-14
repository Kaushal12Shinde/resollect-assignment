# 🧠 Smart Todo List

A React-based todo list application built with **Redux**, **Firebase**, and **Tailwind CSS**, focused on real-time task management, overdue detection, and minimal API usage.

---

## 🚀 Features

### ✅ Core Functionality

- **Add Tasks**: Create new tasks with a title and deadline.
- **Update Tasks**: Toggle task status between Ongoing ↔ Done.
- **Delete Tasks**: Remove tasks permanently.
- **Tab-based View**: Switch between Ongoing, Done, and Overdue tasks.

### 🔁 Optimized State Management (Redux)

- Uses a centralized **Redux store** to avoid unnecessary API calls.
- Two core states:
  - `tasks`: All task data (fetched once initially).
  - `doRender`: Boolean flag to control re-renders when due time passes.
- **Local Update Strategy**:
  - 🟢 **Add**: Adds task to both DB and Redux store.
  - 🟠 **Update**: Updates task status in DB and Redux store.
  - 🔴 **Delete**: Removes task from DB and Redux store.
- Each action triggers UI updates **without re-fetching from the database**.

### ⏰ Real-Time Overdue Handling

- No polling / `setInterval` used.
- Each `TaskCard` checks if the current time has passed its due date.
- If yes, triggers `doRender = true` → Redux state changes → UI re-renders.
- Overdue tasks automatically move to the **Overdue tab**, without needing to reload the page or hit the backend.

---

## 🎨 UI Design & Thinking (Stage 1)

- **Component Breakdown**:
  - `TaskPage`: Main page controller.
  - `TaskForm`: Input form for new tasks.
  - `TaskTabs`: Tab-based navigation (Ongoing | Done | Overdue).
  - `TaskCard`: Renders individual tasks and handles actions.
- **Visual Clarity**:
  - Tasks are color-coded.
  - Overdue tasks are highlighted in **red**.
  - Completed tasks shown with ✅ icon or green accent.
- **Tab Design**:
  - Smooth filtering using Redux tab state.
  - No extra DB call when switching tabs.

> **Note**: UI was designed in Excalidraw first as a wireframe to plan layout and structure cleanly before coding.

---

## 🛠️ Tech Stack

| Tool       | Usage                             |
|------------|-----------------------------------|
| React      | Frontend framework                |
| Redux Toolkit | State management (store, slices) |
| Firebase   | Backend for Firestore DB          |
| Tailwind CSS | Utility-first CSS styling       |
| Vite       | Fast development bundler          |

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-repo/smart-todo-list.git
cd smart-todo-list
npm install
npm run dev
