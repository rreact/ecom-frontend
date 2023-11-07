import { toast } from "react-toastify";
export const ToastSuccess = (msg, position) => {
  return toast.success(msg || "success", {
    position: position || "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const ToastError = (msg, position) => {
  return toast.error(msg || "error", {
    position: position || "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
