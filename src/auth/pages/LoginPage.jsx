import { Login, Register } from "../components";
import "./style/loginPage.scss";

export const LoginPage = () => {
  return (
    <div className="container login-container animate__animated animate__fadeIn animated__faster">
      <div className="row login-content">
        <Login />
        <Register />
      </div>
    </div>
  );
};
