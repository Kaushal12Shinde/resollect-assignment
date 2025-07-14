import React from 'react';
import TaskPage from './TaskPage';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-[80px]">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#8885ff]">Smart Todo List</h1>
      <TaskPage />
    </div>
  );
}

export default App;
