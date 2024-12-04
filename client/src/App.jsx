import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Signup } from "./pages/Signup";
import Signin from "./pages/Signin";

import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
