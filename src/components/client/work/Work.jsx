import "./work.scss";

const Work = ({ props }) => {
  return (
    <section className="work">
      <div className="work__container wrapper">
        <h2 className="work__title">
          {props.filter((el) => el.name === "title")[0].value}
        </h2>

        <div className="work__content">
          <div className="work__line">
            {props
              .filter((element) => element.type === "card")
              .map((el, i) => (
                <span className="work__line-item" key={i}>
                  {i}
                </span>
              ))}
          </div>

          <div className="work__items-container">
            {props
              .filter((element) => element.type === "card")
              .map((el, i) => (
                <div className="work__item" key={i}>
                  <h3 className="work__subtitle">{el.name}</h3>
                  <p className="work__description">{el.value}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
