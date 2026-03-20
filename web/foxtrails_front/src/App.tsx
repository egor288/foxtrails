import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Generation from "./pages/Generation";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/profile" element = {<Profile />}/>
        <Route path = "/signIn" element = {<SignIn />}/>
        <Route path = "/signUp" element = {<SignUp />}/>
        <Route path = "/generation" element = {<Generation />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;