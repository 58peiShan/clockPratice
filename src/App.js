import {Routes, Route } from 'react-router-dom'
import React from 'react';
// 這不需要了
import './App.css';
import Login from './pages/login'
import LoginClass from './pages/loginClass'
// lazy load (沒切換路由時，載入沒意義)
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