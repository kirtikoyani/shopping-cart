import { ToastPropsWithMessage, useToast } from "vue-toast-notification";
const $toast = useToast();

export function alertLib(toastOptions: ToastPropsWithMessage) {
  $toast.open(
    toastOptions || {
      type: "warning",
      message: "item not valid",
      position: "top-left",
      dismissible: false,
      max: 1,
      toastClassName: "toasting",
    }
  );

  return { toastOptions };
}
