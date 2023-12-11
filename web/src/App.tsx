import React from 'react';
import Login from './authenticator/Login';
import Register from './authenticator/Register';
import Services from './services/index';
import NavigationHeader from './appHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <NavigationHeader/>
        <main>
          <Routes>
            <Route path="/join" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Services/>}/>
          </Routes>
        </main>
    </BrowserRouter>
  );
};
export default App;
