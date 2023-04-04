import SignupForm from "./components/LoginSignUp/SignUpForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/HomePage/Home";
function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={<SignupForm/>}></Route>
       <Route path="/home/:idToken" element={<Home/>}></Route>

       </Routes>
    </div>
  );
}

export default App;