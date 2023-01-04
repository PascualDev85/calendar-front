import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-5 px-4 py-3 box-shadow box-s">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;&nbsp;
        {user.name}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>&nbsp;Salir</span>
      </button>
    </div>
  );
};
