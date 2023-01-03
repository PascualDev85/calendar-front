import { addHours } from "date-fns/esm";
import { useCalendarStore, useUiStore } from "../../hooks";
import "./styles/fabAddNewOrDelete.css";

export const FabAddNew = () => {
  const { openDateModal, hasEventOpen } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handelClickNewEvent = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "David",
      },
    });
    openDateModal();
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={handelClickNewEvent}
      style={{ display: hasEventOpen ? "none" : "" }}
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
