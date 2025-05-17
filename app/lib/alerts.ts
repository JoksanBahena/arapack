import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const showConfirmDialog = (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText: string,
  confirmCallback: () => void
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4f46e5",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    }
  });
};
