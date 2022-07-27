import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Utama from './Pages/Utama';
import Login from './Pages/Login';
import Error from './Pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Utama /> }>Pergin ke halaman utama</Route>
        <Route path='/login' element={ <Login /> }>Pergin ke login</Route>
        <Route path='*' element={ <Error /> } />
      </Routes>
    </Router>
  );
}

export default App;
