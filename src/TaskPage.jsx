// TaskPage.jsx
import React, { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskTabs from './components/TaskTabs';
import TaskCard from './components/TaskCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksAsync, addTaskAsync, deleteTaskAsync, updateTaskAsync, triggerRender, setTab, clearError } from './store/taskslice';

export default function TaskPage() {
  const dispatch = useDispatch();
  const { tasks, tab, doRender, loading, error } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  // Handle doRender state
  useEffect(() => {
    if (doRender) {
      // Reset doRender after a short delay to allow re-render
      setTimeout(() => {
        dispatch(triggerRender(false));
      }, 100);
    }
  }, [doRender, dispatch]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const filteredTasks = tasks?.filter(task => {
    const now = new Date();
    const deadline = new Date(task.deadline);
    const isOverdue = deadline <= now && !task.isCompleted;
    
    if (tab === 'ongoing') return !task.isCompleted && !isOverdue;
    if (tab === 'done') return task.isCompleted;
    if (tab === 'overdue') return isOverdue && !task.isCompleted;
    return false;
  });

  const handleAddTask = async (task) => {
    dispatch(addTaskAsync(task));
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      dispatch(updateTaskAsync({ 
        id, 
        updates: { isCompleted: !task.isCompleted } 
      }));
    }
  };

  const handleDeleteTask = async (id) => {
    dispatch(deleteTaskAsync(id));
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      <TaskForm addTask={handleAddTask} />
      <TaskTabs tab={tab} setTab={(t) => dispatch(setTab(t))} />
      
      {loading && (
        <div className="mt-4 text-center text-gray-600">
          Loading...
        </div>
      )}
      
      <div className="mt-4 space-y-2">
        {filteredTasks?.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            No {tab} tasks found.
          </div>
        )}
        
        {filteredTasks?.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            toggleComplete={handleToggleComplete}
            deleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
