import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/profile" element = {<Profile />}/>
        <Route path = "/signIn" element = {<SignIn />}/>
        <Route path = "/signUp" element = {<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;