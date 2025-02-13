import { Routes, Route } from "react-router-dom";
import DataList from "./components/DataList";
import "./styles/global.scss";
import EditCountryForm from "./components/EditCountryForm";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import EditUserForm from "./components/EditUserForm";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/AdminDashboard";

const App: React.FC = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<DataList />} />
        <Route path="/edit-country/:id" element={<EditCountryForm />} />
        <Route path="/edit-user/:id" element={<EditUserForm />} />
        <Route path="/update-profile/:id" element={<EditUserForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
      </Routes>
    </>
  );
};

export default App;
