import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const mySwal = withReactContent(Swal);

type SweetAlert2Props = {
  title: string;
  text: string;
  icon?: SweetAlertIcon;
  confirmButtonText: string;
};

export const showAlert = ({ title, text, icon, confirmButtonText }: SweetAlert2Props) => {
  return mySwal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: confirmButtonText,
  });
};

export const showErrorAlert = (text: string) => {
  return showAlert({ title: 'Error', text: text, icon: 'error', confirmButtonText: 'Close' });
};

export const showSuccessAlert = (text: string) => {
  return showAlert({ title: 'Success', text: text, icon: 'success', confirmButtonText: 'OK' });
};
