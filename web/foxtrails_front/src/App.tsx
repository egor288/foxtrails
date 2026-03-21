import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Generation from "./pages/Generation"
import TourDetails from "./pages/TourDetails"
import Travels from "./pages/Travels"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/signIn" element = {<SignIn />}/>
        <Route path = "/signUp" element = {<SignUp />}/>
        <Route path = "/generation" element = {<Generation />}/>
        <Route path = "/tourDetails" element = {<TourDetails/>}/>
        <Route path = "/travels" element = {<Travels/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;