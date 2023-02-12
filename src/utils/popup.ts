import Swal from "sweetalert2";

export const showSuccessPopup = (titleMessage: string, textMessage: string) => {
  return Swal.fire({
    title: titleMessage,
    text: textMessage,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showFailedPopup = (titleMessage: string, textMessage: string) => {
  return Swal.fire({
    title: titleMessage,
    text: textMessage,
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
  });
};
