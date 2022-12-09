import { Header, Footer } from "../components/client";
import { useFetchContactsPageQuery } from "../services/contactsPage.service";

const ContactsPage = () => {
  const { data, isLoading } = useFetchContactsPageQuery();

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
              {data.filter((el) => el.name === "sub-title")[0].value}
            </p>
            <div className="contacts__container wrapper">
              <ul className="contacts__list">
                {data
                  .filter((element) => element.name === "contacts")
                  .map((el, index) => (
                    <li className="contacts__list-item" key={index}>
                      {el.value}
                    </li>
                  ))}
              </ul>

              <form className="contacts__form">
                <input
                  className="contacts__form-input"
                  type="email"
                  placeholder="Ваш E-mail"
                />
                <input
                  className="contacts__form-input"
                  type="text"
                  placeholder="Ваше имя"
                />
                <textarea
                  className="contacts__form-input"
                  placeholder="Текст отзыва"
                  rows="450"
                />
                <button
                  className="contacts__form-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  Отправить
                </button>
              </form>
            </div>
          </section>
          <section className="contacts-map">
            <iframe
              src="https://yandex.ru/map-widget/v1/-/CCU4vDR01B"
              frameBorder="1"
              width="100%"
              height="470px"
            ></iframe>
          </section>
        </div>
        <Footer />
      </>
    )
  );
};

export default ContactsPage;
