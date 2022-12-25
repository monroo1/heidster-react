import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setDescription,
  setPhone,
  setName,
  deleteState,
} from "../../../store/reducers/form.slice";
import { useCreateFeedbackMutation } from "../../../services/feedback.service";
import "./formDialog.scss";

const FormDialog = (setIsShowDialog) => {
  const dispatch = useDispatch();

  const [fetchCreateFeedback] = useCreateFeedbackMutation();

  const {
    email,
    emailError,
    name,
    nameError,
    phone,
    phoneError,
    description,
    descriptionError,
  } = useSelector((state) => state.formSlice);

  const createFeedback = async () => {
    if (!emailError && !nameError && !phoneError && !descriptionError) {
      const res = await fetchCreateFeedback({
        name: name,
        phone: phone,
        email: email,
        text: description,
      });
      console.log(res);
      dispatch(deleteState());
    }
  };

  return (
    <div
      className="dialog"
      onClick={(e) => {
        e.stopPropagation();
        setIsShowDialog.handleShow(false);
      }}
    >
      <div
        className="dialog__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3 className="dialog__title">Форма заявки</h3>
        <p className="dialog__des">Заполните короткую форму</p>
        <form onSubmit={(event) => event.preventDefault()}>
          {emailError && (
            <label className="label-form" htmlFor="form-email">
              Неверный формат почты!
            </label>
          )}
          <input
            type="text"
            autoComplete="email"
            name="Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            id="form-email"
            className="dialog__email"
            placeholder="Ваш Email"
          />
          {nameError && (
            <label className="label-form" htmlFor="form-name">
              Неверный формат имени!
            </label>
          )}
          <input
            type="text"
            autoComplete="name"
            name="Name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            id="form-name"
            className="dialog__name"
            placeholder="Ваше имя"
          />
          {phoneError && (
            <label className="label-form" htmlFor="form-phone">
              Неверный формат номера телефона!
            </label>
          )}
          <input
            type="tel"
            autoComplete="tel"
            name="Phone"
            value={phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
            id="form-phone"
            className="dialog__number"
            placeholder="+7 999 999 99 99"
          />
          {descriptionError && (
            <label className="label-form" htmlFor="form-text">
              Неверный формат описания проекта, длина от 15 символов!
            </label>
          )}
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            id="form-text"
            placeholder="Опишите кратко свой проект"
            className="dialog__text"
            v-model="text"
          ></textarea>
          <button
            className="dialog__btn"
            onClick={async () => {
              await createFeedback();
              return setIsShowDialog.handleShow(false);
            }}
          >
            Отправить
          </button>
        </form>
        <p className="dialog__btn-des">
          Нажимая кнопку отправить, вы даете согласие на обработку персональных
          данных.
        </p>
      </div>
    </div>
  );
};

export default FormDialog;
