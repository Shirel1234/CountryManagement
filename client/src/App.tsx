import { Routes, Route } from "react-router-dom";
import DataList from "./components/pages/DataList";
import "./styles/global.scss";
import EditCountryForm from "./components/forms/EditCountryForm";
import NavBar from "./components/ui/NavBar";
import SignUp from "./components/forms/SignUp";
import LoginForm from "./components/forms/LoginForm";
import LandingPage from "./components/pages/LandingPage";
import EditUserForm from "./components/forms/EditUserForm";
import ResetPassword from "./components/dialogs/ResetPassword";
import AdminDashboard from "./components/pages/AdminPage";
import RequestAccess from "./components/forms/RequestAccess";
import CountriesTable from "./components/tables/CountriesTable";
import UsersTable from "./components/tables/UsersTable";
import RequestsTable from "./components/tables/RequestsTable";
import { ROUTES } from "./constants";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
        <Route path={ROUTES.HOME} element={<DataList />} />
        <Route path={ROUTES.MANAGE_COUNTRIES} element={<CountriesTable />} />
        <Route
          path={ROUTES.EDIT_COUNTRY(":id")}
          element={<EditCountryForm />}
        />
        <Route path={ROUTES.MANAGE_USERS} element={<UsersTable />} />
        <Route path={ROUTES.EDIT_USER(":id")} element={<EditUserForm />} />
        <Route path={ROUTES.UPDATE_PROFILE(":id")} element={<EditUserForm />} />
        <Route path={ROUTES.MANAGE_REQUESTS} element={<RequestsTable />} />
        <Route
          path={ROUTES.REQUEST_ACCESS(":id")}
          element={<RequestAccess />}
        />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default App;
