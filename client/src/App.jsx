import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./components/pages/Layout";
import { SignIn } from "./components/pages/SignIn";
import { SignUp } from "./components/pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
