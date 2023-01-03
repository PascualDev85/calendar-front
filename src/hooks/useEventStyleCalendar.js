// hacer un custom hook para obtener el estilo de los eventos

import { useAuthStore } from "./useAuthStore";

export const useEventStyleCalendar = (event, start, end, isSelected) => {
  console.log(event);

  const { user } = useAuthStore();

  // variable para saber si el evento es mio booleana
  const isMyEvent = event.user.uid === user._id || event.user.uid === user.uid;

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
