import { useState } from 'react'
import './App.css'
import ChatWidget from './content/content';

function App() {

  return (
    <div className='h-[500px] w-[500px] bg-blue-400'>
      <ChatWidget />
    </div>
  );
}

export default App
