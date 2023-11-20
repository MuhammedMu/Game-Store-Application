import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotificationComponent() {
  const notifySuccess = () => toast.success("Successfuly added to cart");
  const notifyError = () => toast.error("Error notification");
  const notifyWarning = () => toast.warning("Warning notification");
  const notifyInfo = () => toast.info("Info notification");

  const notifyCustom = () =>
    toast(({ closeToast }) => (
      <div
        className=" w-full h-full  text-white rounded-lg shadow-md"
        onClick={closeToast}
      >
        Custom notification
      </div>
    ));

  return (
    <div className="space-x-5">
      <button onClick={notifySuccess}>Show Success Notification</button>
      <button onClick={notifyError}>Show Error Notification</button>
      <button onClick={notifyWarning}>Show Warning Notification</button>
      <button onClick={notifyInfo}>Show Info Notification</button>
      <button onClick={notifyCustom}>Show Custom Notification</button>
      <ToastContainer
        toastStyle={{ backgroundColor: "#334155", color: "white" }}
      />
    </div>
  );
}

export default NotificationComponent;
