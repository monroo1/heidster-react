import React from "react";
import Logo from "../../../images/arguments-item.svg";
import { API_URL } from "../../../store/index.service";

const Arguments = ({ props }) => {
  return (
    <section className="arguments">
      <h2 className="arguments__title wrapper">
        {props.filter((el) => el.name === "title")[0].value}
      </h2>
      <div className="argumnets__container wrapper">
        <div className="arguments__items">
          {props
            .filter(
              (element) =>
                element.type === "first_slider_element" ||
                element.type === "second_slider_element" ||
                element.type === "third_slider_element"
            )
            .map((el, index) => (
              <article className="arguments__item" key={index}>
                <img src={Logo} className="arguments__item-img" />
                <h3 className="arguments__item-title">{el.name}</h3>
                <p className="arguments__item-description">{el.value}</p>
              </article>
            ))}
        </div>
        <img
          src={
            API_URL +
            "/" +
            props.filter((el) => el.name === "logo")[0].file.path
          }
          className="arguments__img"
        />
      </div>
    </section>
  );
};

export default Arguments;
