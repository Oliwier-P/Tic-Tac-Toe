import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Singleplayer from './pages/Singleplayer';
import Multiplayer from './pages/Multiplayer';
import './style.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/singleplayer' element={<Singleplayer />} />
          <Route path='/multiplayer' element={<Multiplayer />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
