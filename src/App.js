import React,{useState} from 'react';
import Register from './components/Users/Register';
import Login from './components/Users/Login';
import SearchPlace from './pages/path/search_place';  
import TracePath from './pages/path/TracePath';

import User from './pages/users/index';
import PageNotFound from './pages/404/pageNotFound';
import FullWidthTabs from './pages/404/test';

import BookPlace from './pages/BookPlace/BookPlace';

import { About } from './pages/About/About';

import { Route, BrowserRouter, Routes } from "react-router-dom";

import {createTheme,responsiveFontSizes} from '@mui/material/styles';
import {ThemeProvider} from '@mui/styles';

import {TrixProvider} from './Context/TrixContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);
const App = () =>{
  

  return (
    <TrixProvider>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path='' element={<User/>} />
              <Route path="login" element={<Login/>} />
              <Route path="user" element={<User/>}/>
              <Route path="register" element={<Register/>} />
              <Route path="search" element={<SearchPlace/>} />
              <Route path="test" element={<FullWidthTabs/>} />
              <Route path="book-a-place" element={<BookPlace/>} />
              <Route path='about' element={<About/>} />
              <Route path="trace-path" element={<TracePath/>}/>
              <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>  
    </TrixProvider>
  );
}

export default App;
