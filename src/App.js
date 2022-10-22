import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Presentation from './components/presentation/Presentation';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Presentation />}/>
        <Route path="/heisenberg" element={<Canvas />}/>
      </Routes>
    </div>
  );
}

export default App;
