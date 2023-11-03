import { toast } from "react-toastify";
export const ToastSuccess = (msg, position) => {
  return toast.success(msg || "success", {
    position: position || "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
