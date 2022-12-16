import { useEffect, useState } from "react";
import AppButton from "../UI/AppButton";

const Price = ({ props }) => {
  const [arrPrices, setArrPrices] = useState([]);

  useEffect(() => {
    let arrPrices = [];
    arrPrices.push(props.filter((element) => element.component === "prices-1"));
    arrPrices.push(props.filter((element) => element.component === "prices-2"));
    arrPrices.push(props.filter((element) => element.component === "prices-3"));
    arrPrices.push(props.filter((element) => element.component === "prices-4"));
    setArrPrices(arrPrices);
  }, []);

  return (
    <section className="prices wrapper">
      <h1 className="prices__title">
        {props.filter((el) => el.component === "prices")[0].value}
      </h1>
      {arrPrices.map((element, i) => (
        <div className="prices__blocks" key={i}>
          <h2 className="prices__blocks-title">
            {element.filter((el) => el.name === "main-description")[0].value}
          </h2>
          {element
            .filter((element) => element.type === "card")
            .map((el, i) => (
              <div className="prices__block" key={i}>
                <div className="prices__block-container">
                  <h3 className="prices__block-title">{el.name}</h3>
                  <span className="prices__block-price">
                    {"от ₽ " + el.price}
                  </span>
                </div>
                <hr />
                <p className="prices__block-description">{el.value}</p>
              </div>
            ))}

          <AppButton value={"Оставить заявку"} margin={true} />
        </div>
      ))}
    </section>
  );
};

export default Price;
