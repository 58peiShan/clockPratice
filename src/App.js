import {Routes, Route } from 'react-router-dom'
import React from 'react';
import './App.css';
import Login from './pages/login'
import LoginClass from './pages/loginClass'
import CMS from './pages/CMS'
import Work from './pages/work'
import Clock from './pages/clock'


function App() {
  return(
    <div className="App">
    <Routes>
      <Route path="/" element={<LoginClass />} />
      <Route path="/CMS" element={<CMS />} />
      <Route path="/work" element={<Work />} />
      <Route path="/clock" element={<Clock/>} />
    </Routes>
  </div>
  )
}

export default App