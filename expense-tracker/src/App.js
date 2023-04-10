import SignupForm from "./components/LoginSignUp/SignUpForm";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/HomePage/Home";
import ProfilePage from "./components/Pages/ProfilePage/Profile";
import ForgotPassword from "./components/LoginSignUp/ForgotPassword";

function App() {

  return (
    <div>
      <Routes>
       <Route path="/" element={<SignupForm/>}></Route>
       <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
       <Route path="/home/:idToken" element={<Home/>}></Route>
       <Route path="/profile/:idToken" element={<ProfilePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
