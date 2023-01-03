import { Login, Register } from "../components";
import "./style/loginPage.scss";

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row login-content">
        <Login />
        <Register />
      </div>
    </div>
  );
};
