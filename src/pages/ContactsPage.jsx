import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setDescription,
  setPhone,
  setName,
  deleteState,
} from "../store/reducers/form.slice";
import { useCreateFeedbackMutation } from "../services/feedback.service";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Header, Footer, MobileNav } from "../components/client";
import { useFetchContactsPageQuery } from "../services/contactsPage.service";

import "./contacts.scss";

const ContactsPage = () => {
  const { data, isLoading } = useFetchContactsPageQuery();

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
    !isLoading && (
      <>
        <Header />
        <div>
          <section className="contacts">
            <h2 className="contacts__title">
              {data.filter((el) => el.name === "title")[0].value}
            </h2>
            <p
              className="contacts__title-description wrapper"
              style={{ textAlign: "center" }}
            >
              {data.filter((el) => el.name === "main-description")[0].value}
            </p>
            <div className="contacts__container wrapper">
              <ul className="contacts__list">
                {data
                  .filter((element) => element.name === "address")
                  .map((el, index) => (
                    <li className="contacts__list-item" key={index}>
                      {el.value}
                    </li>
                  ))}
              </ul>

              <form
                className="contacts-form"
                onSubmit={(event) => event.preventDefault()}
              >
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
                  className="contacts__form-input"
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
                  className="contacts__form-input"
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
                  className="contacts__form-input"
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
                  className="contacts__form-input"
                  v-model="text"
                ></textarea>
                <button
                  className="application__btn white"
                  onClick={() => {
                    createFeedback();
                  }}
                >
                  Отправить
                </button>
              </form>
            </div>
          </section>
          <section className="contacts-map">
            {/* <iframe
              src="https://yandex.ru/map-widget/v1/-/CCU4vDR01B"
              frameBorder="1"
              width="100%"
              height="470px"
            ></iframe> */}
            <YMaps>
              <Map
                state={{ center: [47.254993, 39.770106], zoom: 14 }}
                width="100%"
                height="470px"
              >
                <Placemark
                  geometry={[47.254993, 39.770106]}
                  options={{ balloonContentLayout: <div>123</div> }}
                />
              </Map>
            </YMaps>
          </section>
        </div>
        <Footer />
        <MobileNav />
      </>
    )
  );
};

export default ContactsPage;
