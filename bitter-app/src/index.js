import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import Home from './components/home/home.component'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './services/auth.service'
import Interceptor from './services/interceptor.service'

Interceptor.initializeInterceptor()

const isLoggedIn = AuthService.isLoggedIn()

ReactDOM.render(
  
  <BrowserRouter>
    <Routes>
      {!isLoggedIn && (
        <Route path='/' element={<App />} />
      )}
      {isLoggedIn && (
        <Route path='/home' element={ <Home />} />
      )}
      <Route path='*' element={ <Navigate to={isLoggedIn ? '/home' : '/'} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);