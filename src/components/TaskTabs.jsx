import React from 'react';

export default function TaskTabs({ tab, setTab }) {
  return (
    <div className="flex gap-2 my-[24px]">
      {['ongoing', 'done', 'overdue'].map(t => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-4 py-2 rounded-lg cursor-pointer w-full ${tab === t ? 'bg-[#8885ff] text-white font-semibold' : 'bg-gray-200'}`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}