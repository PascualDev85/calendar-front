import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";

import { localizer, getMessagesES } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.9,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (e) => {
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e);
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn animated__faster">
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </div>
  );
};
