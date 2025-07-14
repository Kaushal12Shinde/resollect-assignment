import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddTask from '../assets/addtask.svg'

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading } = useSelector(state => state.tasks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;
    
    setIsSubmitting(true);
    try {
      await addTask({ 
        title: title.trim(), 
        deadline, 
        isCompleted: false
      });
      setTitle('');
      setDeadline('');
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() && deadline;
  const isDisabled = isSubmitting || loading || !isFormValid;

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className='px-[20px] rounded-xl flex items-center gap-[10px]'>
        <img src={AddTask}  className='w-[26px] h-[26px]' alt="" />
        <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
        disabled={isSubmitting || loading}
      />
      </div>
      <div className='px-[20px] rounded-xl flex items-center gap-[10px] mb-[16px]'>
        <img src='https://files.svgcdn.io/hugeicons/time-half-pass.svg'  className='w-[26px] h-[26px]' alt="" />
        <input
          type="datetime-local"
          value={deadline}
          placeholder='Enter Deadline'
          onChange={(e) => setDeadline(e.target.value)}
          className="border px-3 py-2 rounded w-full border-none focus:outline-none focus:ring-0 focus:border-transparent"
          disabled={isSubmitting || loading}
        />
      </div>
      <button 
        type="submit" 
        disabled={isDisabled}
        className={`px-4 py-2 rounded-lg w-full font-medium cursor-pointer transition-colors ${
          isDisabled 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-[#8885f0] text-white hover:bg-[#8885ff]'
        }`}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}