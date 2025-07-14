import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { triggerRender } from '../store/taskslice';

export default function TaskCard({ task, toggleComplete, deleteTask }) {
  const dispatch = useDispatch();

  const isOverdue = () => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    return deadline <= now && !task.isCompleted;
  };

  // Check if task becomes overdue and trigger re-render
  useEffect(() => {
    if (!task.isCompleted) {
      const deadline = new Date(task.deadline);
      const now = new Date();
      const timeUntilDeadline = deadline - now;

      if (timeUntilDeadline > 0) {
        // Task is not overdue yet, set a timer
        const timer = setTimeout(() => {
          dispatch(triggerRender(true));
        }, timeUntilDeadline);

        return () => clearTimeout(timer);
      }
    }
  }, [task.deadline, task.isCompleted, dispatch]);

  const getTimeRemaining = () => {
    const deadline = new Date(task.deadline);
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `due ${days}day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `due ${hours}hr${minutes > 0 ? ` ${minutes}min` : ''}`;
    } else {
      return `due ${minutes}min`;
    }
  };

  const getStatusColor = () => {
    if (task.isCompleted) return 'text-green-600';
    if (isOverdue()) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusText = () => {
    if (task.isCompleted) return 'Completed';
    if (isOverdue()) return 'Overdue';
    return 'Ongoing';
  };

  const shouldShowCompleteButton = () => {
    return !task.isCompleted && !isOverdue();
  };

  return (
    <div className='p-4 rounded-lg task-shadow bg-white'>
      <div className={`flex justify-between rounded-[4px] items-center border-l-[2px] pl-[16px] ${isOverdue() ? 'border-l-red-300 bg-red-50' : 'border-l-[#8885ff]'}`}>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <p className={`text-sm ${getStatusColor()}`}>
            {getTimeRemaining()}
          </p>
          <span className={`text-xs px-2 py-1 rounded ${getStatusColor()} bg-opacity-10`}>
            {getStatusText()}
          </span>
        </div>
        <div className="space-x-2">
          {shouldShowCompleteButton() && (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              onClick={() => toggleComplete(task.id)}
            >
              Complete
            </button>
          )}
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
