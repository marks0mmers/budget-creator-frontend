import { toast } from "react-toastify";
import { AjaxError } from "rxjs/ajax";

class ToastInstance {
    public success(message: string) {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    public info(message: string) {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    public warn(message: string) {
        toast.warn(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    public error(message: string): true {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
        return true;
    }

    public ajaxError(ajaxError: AjaxError, message?: string) {
        const text = message || (ajaxError.response && ajaxError.response.message) || ajaxError.message || "Error";
        this.error(text);
    }
}

export const Toast = new ToastInstance();
