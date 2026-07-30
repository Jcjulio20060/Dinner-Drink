import { useState } from 'react';

function App() {
  const [hello, setHello] = useState('Hello, World!')

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text3xl">{hello}</h1>
    </div>
  )
}

export default App
