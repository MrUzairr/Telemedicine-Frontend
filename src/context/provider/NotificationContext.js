import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from "react-icons/fi";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (message, type = "success", duration = 3000) => {
      const id = Date.now();
      setNotifications((prev) => [
        ...prev,
        { id, message, type, duration },
      ]);
      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Auto-remove notification after duration
  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map(({ id, duration }) =>
      setTimeout(() => removeNotification(id), duration)
    );

    // Cleanup on unmount or notifications change
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications, removeNotification]);

  const getNotificationStyles = (type) => {
    const baseStyles = "relative overflow-hidden rounded-xl shadow-lg border-l-4";
    switch (type) {
      case "success":
        return `${baseStyles} bg-white text-green-700 border-green-500`;
      case "error":
        return `${baseStyles} bg-white text-red-700 border-red-500`;
      case "info":
        return `${baseStyles} bg-white text-blue-700 border-blue-500`;
      case "warning":
        return `${baseStyles} bg-white text-amber-700 border-amber-500`;
      default:
        return `${baseStyles} bg-white text-gray-700 border-gray-500`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <FiInfo className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <FiAlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <FiInfo className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25 }}
              className={getNotificationStyles(notification.type)}
            >
              <div className="p-4 flex items-start">
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close notification"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: notification.duration / 1000, ease: "linear" }}
                className={`h-1 ${
                  notification.type === "success"
                    ? "bg-green-300"
                    : notification.type === "error"
                    ? "bg-red-300"
                    : notification.type === "info"
                    ? "bg-blue-300"
                    : notification.type === "warning"
                    ? "bg-amber-300"
                    : "bg-gray-300"
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
