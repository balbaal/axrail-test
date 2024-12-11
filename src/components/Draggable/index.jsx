import { useState } from 'react';

const Draggable = () => {
  const [tasks, setTasks] = useState({
    'to do': [
      '[supportsvc] - privy sign document',
      '[FE] - slicing LOA template',
      '[ratesvc] Integrate Pricing Direct Ninja Express into Pricingsvc',
      '[pricingsvc] Get Ninja Express Pricing Direct',
      '[billingsvc] Backfill Commission Custom Data',
    ],
    'in progress': [
      'Modal confirmation Perkiraan Biaya isnt appear',
      '[trackingsvc] Webhook Anteraja timestamp',
    ],
    'code review': [
      '[pricingsvc] Investigate Bulk Pricing Update Scheduled',
      '[EndToEnd] 3PL Recon Negative Case by Use Case',
      '[billingsvc] Revamp GET',
    ],
  });

  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (task, fromColumn) => {
    setDraggedTask({ task, fromColumn });
  };

  const onDrop = (toColumn) => {
    if (draggedTask && draggedTask.fromColumn !== toColumn) {
      setTasks((prevTasks) => {
        const fromTasks = [...prevTasks[draggedTask.fromColumn]].filter(
          (task) => task !== draggedTask.task
        );
        const toTasks = [...prevTasks[toColumn], draggedTask.task];

        return {
          ...prevTasks,
          [draggedTask.fromColumn]: fromTasks,
          [toColumn]: toTasks,
        };
      });
    }
    setDraggedTask(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex gap-4'>
      {Object.entries(tasks).map(([column, columnTasks]) => (
        <div
          key={`column-${column}}`}
          className='bg-gray-100 shadow-sm p-4 rounded w-52'
          onDragOver={onDragOver}
          onDrop={() => onDrop(column)}
        >
          <h3 className='mb-2 text-sm uppercase font-medium text-gray-500'>
            {column}
          </h3>
          <div className='flex flex-col gap-2 text-sm'>
            {columnTasks.map((task, i) => (
              <div
                key={`task-${i}`}
                className='bg-white p-2 border border-gray-300 rounded cursor-grab border-l-[3px] border-l-orange-400'
                draggable
                onDragStart={() => onDragStart(task, column)}
              >
                {task}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Draggable;
