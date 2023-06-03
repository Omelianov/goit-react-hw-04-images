import { toast } from 'react-toastify';

const toastSettings = {
    theme: "colored",
};

export const showSuccessToast = () => {
    toast.success("Hooray! We found what you were looking for 🤗", toastSettings);
};

export const showInfoNothingToast = () => {
    toast.info("It looks like you want to find nothing, please check your query 😕", toastSettings);
};

export const showInfoDuplicationToast = () => {
    toast.info("It looks like there are already pictures found for your request, please check if this will be a new search 🤔", toastSettings);
};

export const showWarnToast = () => {
    toast.warn("Sorry, nothing was found for your request, try something else 🙈", toastSettings);
};

export const showErrorToast = () => {
    toast.error("Oops, something went wrong, please try again 🙊", toastSettings);
};
