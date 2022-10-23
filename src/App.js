import logo from './logo.svg';
import './App.css';
import { Routes, Route, useParams } from 'react-router-dom';

import Presentation from './components/presentation/Presentation';
import Canvas from './components/Canvas';
import Poll from './components/poll/Poll';
import Edit from './components/edit/Edit';
import Navbar from './components/navbar/Navbar'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function PollPage() {
  let { panel } = useParams();
  let { slide } = useParams();

  return <Poll panel={panel} slide={parseInt(slide)-1}/>
}

function App() {
  return (
    <div className="App">
      <div className="center">
        <Routes>
          <Route path="/" element={<Presentation />}/>
          <Route path="/edit" element={<Edit />}/>
          <Route path="/poll/:panel/:slide" element={<PollPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
