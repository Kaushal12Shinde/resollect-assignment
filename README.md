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
- **Automatic Checking**: System checks for overdue tasks every minute
- **Visual Indicators**: Overdue tasks are highlighted with red styling
- **Status Display**: Each task shows its current status (Ongoing/Completed/Overdue)

### 🔄 Real-time Features
- **Database Sync**: All changes are saved to Firebase Firestore
- **State Persistence**: Tasks persist across browser sessions
- **Error Handling**: Graceful error handling with user feedback
- **Loading States**: Visual feedback during async operations

## Technical Stack

- **Frontend**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Backend**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## State Structure

```javascript
{
  tasks: {
    tasks: [],           // Array of task objects
    tab: 'ongoing',      // Current active tab
    doRender: false,     // Trigger for re-renders
    loading: false,      // Loading state
    error: null          // Error state
  }
}
```

## Task Object Structure

```javascript
{
  id: 'firebase-doc-id',
  title: 'Task title',
  deadline: '2024-01-01T10:00:00.000Z',
  isCompleted: false
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase environment variables in `.env`:
   ```
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_APP_ID=your_app_id
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Adding Tasks**: Fill in the task title and deadline, then click "Add Task"
2. **Completing Tasks**: Click "Complete" on any ongoing task
3. **Viewing Categories**: Use the tabs to switch between Ongoing, Done, and Overdue tasks
4. **Deleting Tasks**: Click "Delete" to remove a task permanently

## Redux Actions

- `fetchTasksAsync`: Load all tasks from Firebase
- `addTaskAsync`: Add a new task to Firebase and state
- `updateTaskAsync`: Update task completion status
- `deleteTaskAsync`: Remove task from Firebase and state
- `setTab`: Switch between task categories
- `triggerRender`: Manually trigger re-render
- `checkOverdueTasks`: Check for overdue tasks and update state
