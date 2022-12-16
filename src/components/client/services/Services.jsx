import "./services.scss";

const Services = ({ props }) => {
  return (
    <section className="services">
      <h2 className="services__title">
        {props.filter((el) => el.name === "title")[0].value}
      </h2>
      <p className="services__title-description">
        {props.filter((el) => el.name === "main-description")[0].value}
      </p>
      <div className="services__container wrapper">
        {props
          .filter((element) => element.type === "card")
          .map((el) => {
            return (
              <div className="services__item" key={el.id}>
                <img
                  className="services__item-logo"
                  src={"http://80.78.246.20/" + el.file.path}
                  alt="img"
                />
                <div className="services__item-container">
                  <h3 className="services__item-title">{el.name}</h3>
                  <p className="services__item-description">{el.value}</p>
                  <button className="services__item-btn">Подробнее</button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Services;
