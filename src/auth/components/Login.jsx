import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks";

export const Login = () => {
  const { startLogin } = useAuthStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const loginSubmit = ({ email, password }) => {
    startLogin({ email, password });
  };

  return (
    <div className="col-md-6 login-form-1">
      <h3>Ingreso</h3>
      <form onSubmit={handleSubmit(loginSubmit)}>
        <div className="form-group mb-3">
          <input
            type="text"
            className={`form-control ${errors.email && "is-invalid"}`}
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "El correo es requerido",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback d-block mb-1">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            placeholder="Contraseña"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback d-block mb-1">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>
      </form>
    </div>
  );
};
