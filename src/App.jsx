import { useState } from 'react'
import './App.css'
import ChatWidget from './content/content';

function App() {

  return (
    <div className='h-[400px] w-[200px] bg-blue-400'>
      <ChatWidget />
    </div>
  );
}

export default App
