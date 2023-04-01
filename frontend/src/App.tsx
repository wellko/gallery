import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/UsersSlice";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";


function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <CssBaseline/>
      <AppToolbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
