import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";

export const Register = () => {
  const { errorMessage, startRegister } = useAuthStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const registerSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire(
        "Error en registro",
        "Las contraseñas deben ser iguales",
        "error"
      );
    }

    const { name, password, email } = data;
    startRegister({ name, email, password });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Crendeciales incorrectas", errorMessage, "error");
    }
  }, [errorMessage]);
  return (
    <div className="col-md-6 login-form-2">
      <h3>Registro</h3>
      <form onSubmit={handleSubmit(registerSubmit)}>
        <div className="form-group mb-3">
          <input
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            placeholder="Nombre"
            {...register("name", {
              maxLength: {
                value: 20,
                message: "El nombre debe tener menos de 20 caracteres",
              },
              required: {
                value: true,
                message: "El nombre es requerido",
              },
            })}
          />

          {errors.name && (
            <div className="invalid-feedback invalid-feedback d-block mb-1 text-white">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            placeholder="Correo"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El correo no es valido",
              },
              required: {
                value: true,
                message: "El email es requerido",
              },
            })}
          />

          {errors.email && (
            <div className="invalid-feedback d-block mb-1 text-white">
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
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero",
              },
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
          />

          {errors.password && (
            <div className="invalid-feedback d-block mb-1 text-white">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className={`form-control ${errors.confirmPassword && "is-invalid"}`}
            placeholder="Repita la contraseña"
            {...register("confirmPassword", {
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "La contraseña debe tener al menos una letra mayuscula, una minuscula y un numero",
              },
              required: {
                value: true,
                message: "La contraseña es requerida",
              },
            })}
          />

          {errors.confirmPassword && (
            <div className="invalid-feedback d-block mb-1 text-white">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
        </div>
      </form>
    </div>
  );
};
