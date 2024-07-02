import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Content from './components/Content';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Spinner from './components/Spinner';
import Contact from './components/Contact';
import Account from './components/Account';

function App() {
  return (
    <>
      <Spinner></Spinner>
      <Router>
        <div style={{ height: '8vh' }}>
          <Navbar></Navbar>
        </div>
        <Alert></Alert>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/content" element={<Content></Content>}></Route>
            <Route exact path="/account" element={<Account></Account>}></Route>
            <Route exact path="/login" element={<Login></Login>}></Route>
            <Route exact path="/signup" element={<Signup></Signup>}></Route>
            <Route exact path="/logout" element={<Logout />}></Route>
            <Route
              exact
              path="/forgot_password"
              element={<ForgotPassword></ForgotPassword>}
            ></Route>
            <Route
              exact
              path="/reset_password/:resetToken"
              element={<ResetPassword></ResetPassword>}
            ></Route>
            <Route exact path="/about" element={<About></About>}></Route>
            <Route
              exact
              path="/contact_us"
              element={<Contact></Contact>}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
