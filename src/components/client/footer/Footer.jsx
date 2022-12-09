import React from "react";
import { Link } from "react-router-dom";
import { useFetchFooterQuery } from "../../../services/footer.service";

function ListItem({ props }) {
  return (
    <Link to={props.value}>
      <li className="footer__li">{props.name}</li>
    </Link>
  );
}

const Header = () => {
  const { data, isLoading } = useFetchFooterQuery();

  return (
    !isLoading && (
      <footer className="footer">
        <div className="footer-wrapper wrapper">
          <div className="footer-social">
            <Link to="/">
              <img
                className="footer-social__logo"
                src="~/assets/img/footer-logo.png"
                alt="Heidster Studio"
              />
            </Link>
            <div className="footer-social__links">
              {data
                .filter((element) => element.name === "social")
                .map((el, index) => (
                  <Link to="/" key={index} className="footer-social__link">
                    <img src="getImg(link)" alt={el.value} />
                  </Link>
                ))}
            </div>
            <p className="footer-copy">
              {data.filter((el) => el.name === "footnote")[0].value}
            </p>
          </div>

          {data
            .filter((element) => element.type === "menu")
            .map((menu, index) => (
              <div key={index} className="footer-menu">
                <h4 className="footer__title">{menu.menu.elements[0].name}</h4>
                <ul className="footer__ul">
                  {menu.menu.elements
                    .filter((item) => item.value !== "title")
                    .map((elList, index) => (
                      <ListItem key={menu.id + "-" + index} props={elList} />
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </footer>
    )
  );
};

export default Header;
