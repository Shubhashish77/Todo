import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import styled from "styled-components";
import Todolist from "./components/todoList/Todolist";
import { MyContext } from "./context";
import Error from "./components/Error";

const Container = styled.div`
    width: 100vw; 
    height: 100vh;    
`

function App() {
    const context = useContext(MyContext);
    return (
        <Container style={{ background: "#f5f6fa" }}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route active exact path="/login" element={context.state && context.state.user && context.state.user._id ? <Todolist />:<Login />} />
                    <Route active exact path="/register" element={context.state && context.state.user && context.state.user._id ? <Todolist /> : <Register />} />
                    <Route active exact path="/error" element={<Error />} />
                    <Route active exact path="/todolist" element={context.state && context.state.user && context.state.user._id ? <Todolist />: <Login/>} /> 
                    <Route active exact path="*" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;