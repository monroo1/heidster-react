import React from "react";

const Benefits = ({ props }) => {
  return (
    <section className="benefits wrapper">
      <div className="benefits-title">
        <h2 className="benefits-title__title">
          {props.filter((el) => el.name === "title")[0].value}
        </h2>
        <span className="benefits-title__description">
          {props.filter((el) => el.name === "sub-title")[0].value}
        </span>
      </div>
      <div className="benefits-content">
        {props
          .filter(
            (element) =>
              element.type === "first_slider_element" ||
              element.type === "second_slider_element" ||
              element.type === "third_slider_element"
          )
          .map((el, index) => (
            <article className="benefits-block" key={index}>
              <h3 className="benefits-block__title">{el.name}</h3>
              <p className="benefits-block__description">{el.value}</p>
              <span className="benefits-block__number">
                {"0" + (index + 1)}
              </span>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Benefits;
