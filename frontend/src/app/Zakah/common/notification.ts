import { toast, Zoom } from "react-toastify";

export interface INotification {
  message: string;
  id: string;
}

export interface IMessageType {
  success: INotification;
  failed: INotification;
}

export const notifications = {
  zakah_calculation: {
    success: {
      message: "Zakah calculation succeeded.",
      id: "zakah_calc_success",
    } as INotification,
    failed: {
      message: "Zakah calculation failed.",
      id: "zakah_calc_failed",
    } as INotification,
  } as IMessageType,
  login: {
    success: {
      message: "Welcome {}.",
      id: "login_success",
    },
    failed: {
      message: "Login failed.",
      id: "login_failed",
    } as INotification,
  } as IMessageType,
  transaction_create: {
    success: {
      message: "Transaction creation succeeded.",
      id: "transaction_success",
    } as INotification,
    failed: {
      message: "Failed to create transaction.",
      id: "transaction_failure",
    } as INotification,
  } as IMessageType,
  zakah_list_update: {
    success: {
      message: "Zakah list has been updated.",
      id: "zakah_list_update_success",
    } as INotification,
    failed: {
      message: "Failed to update zakah list.",
      id: "zakah_list_update_failure",
    } as INotification,
  } as IMessageType,
  transaction_list_update: {
    success: {
      message: "Transaction list has been updated.",
      id: "transaction_list_update_success_{}",
    } as INotification,
    failed: {
      message: "Failed to update transaction list.",
      id: "transaction_list_update_failure_{}",
    } as INotification,
  } as IMessageType,
};

export const notify = {
  error: (message: string, id: string) => {
    toast.error(message, {
      toastId: id,
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  },
  success: (message: string, id: string) => {
    toast.success(message, {
      toastId: id,
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  },
  info: (message: string, id: string) => {
    toast.info(message, {
      toastId: id,
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  },
};
