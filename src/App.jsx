import React from 'react';
import KanbanBoard from './components/ui/KanbanBoard';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.body.addEventListener('submit', (e) => {
      console.warn('💥 A form tried to submit!', e.target);
      e.preventDefault(); // stop it from refreshing
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <KanbanBoard />
    </div>
  );
  
}




export default App;
