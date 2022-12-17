import React, { useEffect, useState } from "react";
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
  const [width, setWidth] = useState(window.innerWidth);
  const { data, isLoading } = useFetchFooterQuery();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, []);

  return (
    !isLoading &&
    width > 980 && (
      <footer className="footer">
        <div className="footer-wrapper wrapper">
          <div className="footer-social">
            <Link to="/">
              <img
                src={
                  "http://80.78.246.20/" +
                  data.filter((el) => el.name === "logo")[0].file.path
                }
              />
            </Link>
            <div className="footer-social__links">
              {data
                .filter((element) => element.name === "social-link")
                .map((el, index) => (
                  <a href={el.value} key={index}>
                    <img
                      src={"http://80.78.246.20/" + el.file.path}
                      alt={el.value}
                      className="footer-social__link"
                    />
                  </a>
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
                <h4 className="footer__title">{menu.menu.name}</h4>
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
