import Register from './components/Users/Register';
import Login from './components/Users/Login';
import SearchPlace from './pages/path/search_place';
import FindPath from './pages/path/find_path';

import User from './pages/users/index';
import PageNotFound from './pages/404/pageNotFound';
import FullWidthTabs from './pages/404/test';

import BookPlace from './pages/BookPlace/BookPlace';


import { Route, BrowserRouter, Routes } from "react-router-dom";

import {createTheme,responsiveFontSizes} from '@mui/material/styles';
import {ThemeProvider} from '@mui/styles';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';


let theme = createTheme();
theme = responsiveFontSizes(theme);
const App = () =>{

  return (
    <>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path='' element={<Login/>} />
              <Route path="login" element={<Login/>} />
              <Route path="user" element={<User/>}/>
              <Route path="register" element={<Register/>} />
              <Route path="search" element={<SearchPlace/>} />
              <Route path="find-path" element={<FindPath/>} />
              <Route path="test" element={<FullWidthTabs/>} />
              <Route path="book-a-place" element={<BookPlace/>} />
              <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
        </ThemeProvider>
    </>
  );
}

export default App;