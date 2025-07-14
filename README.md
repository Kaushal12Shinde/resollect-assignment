# Smart Todo List

A React-based todo list application with Redux state management and Firebase backend.

## Features

### ✅ Core Functionality
- **Add Tasks**: Create new tasks with title and deadline
- **Update Tasks**: Toggle task completion status (ongoing ↔ complete)
- **Delete Tasks**: Remove tasks from the list
- **Real-time Updates**: Automatic re-rendering when state changes

### 🎯 State Management
- **Redux Store**: Centralized state management with two main states:
  - `tasks`: Array of all tasks
  - `doRender`: Boolean flag to trigger re-renders
- **Automatic Re-rendering**: State updates trigger UI updates automatically

### 📊 Task Categories
- **Ongoing**: Active tasks that are not completed and not overdue
- **Done**: Completed tasks
- **Overdue**: Tasks past their deadline that are not completed

### ⏰ Overdue Detection
- **Automatic Checking**: Rerender is trigger as due time is over
- **Visual Indicators**: Overdue tasks are highlighted with red styling
- **Status Display**: Each task shows its current status (Ongoing/Completed/Overdue)

## Usage

1. **Adding Tasks**: Fill in the task title and deadline, then click "Add Task"
2. **Completing Tasks**: Click "Complete" on any ongoing task
3. **Viewing Categories**: Use the tabs to switch between Ongoing, Done, and Overdue tasks
4. **Deleting Tasks**: Click "Delete" to remove a task permanently
