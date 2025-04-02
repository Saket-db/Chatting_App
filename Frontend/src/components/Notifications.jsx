import { useEffect, useState } from "react";
import socket from "../socket";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-3">
      {notifications.map((notif, index) => (
        <div key={index} className="p-2 border-b">
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
