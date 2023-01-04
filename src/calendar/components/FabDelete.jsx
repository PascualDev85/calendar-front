import { useCalendarStore, useUiStore } from "../../hooks";
import "./styles/fabAddNewOrDelete.scss";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { hasEventOpen } = useUiStore();

  const styleButton = {
    display: hasEventOpen ? "none" : hasEventSelected ? "" : "none",
  };

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab fab-danger"
      onClick={handleDelete}
      style={styleButton}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
