import { Login, Register } from "../components";
import "./LoginPage.css";

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <Login />
        <Register />
      </div>
    </div>
  );
};
