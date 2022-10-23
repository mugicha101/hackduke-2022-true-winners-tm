import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';

import Presentation from './components/presentation/Presentation';
import Canvas from './components/Canvas';
import Poll from './components/Poll';
import Edit from './components/edit/Edit';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function ProfilePage() {
  let { panel } = useParams();
  let { slide } = useParams();

  return <Poll panel={panel} slide={slide}/>
}

function App() {
  return (
    <div className="App">
      <div className="center">
        <Routes>
          <Route path="/" element={<Presentation />}/>
          <Route path="/edit" element={<Edit />}/>
          <Route path="/heisenberg" element={<Canvas />}/>
          <Route path="/poll/:panel/:slide" element={<ProfilePage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
