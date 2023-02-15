import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Test from "./components/Test";
import Home from "./components/Home";
import { RecoilRoot } from "recoil";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
