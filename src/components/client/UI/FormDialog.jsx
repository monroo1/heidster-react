import "./formDialog.scss";

const FormDialog = (setIsShowDialog) => {
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
          <input
            type="text"
            autoComplete="email"
            name="Email"
            id="form-email"
            className="dialog__email"
            placeholder="Ваш Email"
          />
          <input
            type="text"
            autoComplete="name"
            name="Name"
            id="form-name"
            className="dialog__name"
            placeholder="Ваше имя"
          />
          <input
            type="tel"
            autoComplete="tel"
            name="Phone"
            id="form-phone"
            className="dialog__number"
            placeholder="+7 999 999 99 99"
          />
          <textarea
            name="text"
            cols="30"
            rows="5"
            id="form-text"
            placeholder="Опишите кратко свой проект"
            className="dialog__text"
            v-model="text"
          ></textarea>
          <button
            className="dialog__btn"
            onClick={() => setIsShowDialog.handleShow(false)}
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
