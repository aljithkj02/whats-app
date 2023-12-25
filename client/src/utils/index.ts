import toast from "react-hot-toast";

let toasterId: string | undefined;

export const handleToast = (status: boolean, message: string) => {
    toast.dismiss(toasterId);
    if(status) {
        toasterId = toast.success(message);
    } else {
        toasterId = toast.error(message);
    }
}

export const handleToken = (token?: string | undefined) => {
    if(token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}