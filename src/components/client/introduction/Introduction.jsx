import { AppButton } from "../index";

const Introduction = ({ props }) => {
  return (
    <section className="introduction">
      <div className="introduction-title wrapper">
        <h1 className="introduction-title__title">
          {props.filter((el) => el.name === "title")[0].value}
        </h1>
        <span className="introduction-title__subtitle">
          {props.filter((el) => el.name === "sub-title")[0].value}
        </span>
        <p className="introduction-title__description">
          {props.filter((el) => el.name === "main-description")[0].value}
        </p>
        <AppButton
          value={props.filter((el) => el.name === "button")[0].value}
          style={true}
        />
      </div>

      <div className="introduction-description wrapper">
        {props
          .filter(
            (element) =>
              element.type === "first_slider_element" ||
              element.type === "second_slider_element" ||
              element.type === "third_slider_element"
          )
          .map((el, index) => (
            <div key={index} className="introduction-description__card">
              <h2 className="introduction-description__card-title font-semibold flex items-center justify-start">
                <svg
                  className="t997__checkmark"
                  style={{
                    width: 20 + "px",
                    height: 20 + "px",
                    marginRight: 8 + "px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.70711 13.2071L15.2071 7.70711L13.7929 6.29289L9 11.0858L6.20711 8.29289L4.79289 9.70711L8.29289 13.2071L9 13.9142L9.70711 13.2071Z"
                    fill="#141b69"
                  />
                </svg>
                {el.name}
              </h2>
              <p className="introduction-description__card-description">
                {el.value}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Introduction;
