import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/calendarModal.scss";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { user } = useAuthStore();
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    return formSubmitted && formValues.title.trim().length < 2
      ? "form-control is-invalid"
      : "form-control";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const isMyEvent = () => {
    return (
      user.uid === activeEvent?.user._id ||
      user.uid === activeEvent?.user.id ||
      activeEvent?.user._id === ""
    );
  };

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing = "start") => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas Incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    const errorMessage =
      "El título es obligatorio y debe tener al menos 2 letras";
    if (formValues.title.trim().length < 2) {
      setErrMsg(errorMessage);
      return;
    }

    await startSavingEvent(formValues);

    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="title-event">
        <h1>
          Nuevo evento
          <i className="fa-sharp fa-solid fa-calendar"></i>
        </h1>
      </div>

      <form onSubmit={onSubmit} className="container p-4">
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            minDate={formValues.end}
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            showTimeSelect
            dateFormat="Pp"
            locale={"es"}
            timeCaption="Hora"
            disabled={!isMyEvent()}
          />
        </div>

        <div className="form-group mb-4">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            className="form-control"
            showTimeSelect
            dateFormat="Pp"
            locale={"es"}
            timeCaption="Hora"
            disabled={!isMyEvent()}
          />
        </div>

        <div className="form-group mb-2">
          <label>Título y Notas</label>
          <input
            type="text"
            className={titleClass}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
            disabled={!isMyEvent()}
          />

          <small className="invalid-feedback">{errMsg}</small>
          <small
            id="emailHelp"
            className={`form-text text-muted  ${errMsg && "d-none"}`}
          >
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
            disabled={!isMyEvent()}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
