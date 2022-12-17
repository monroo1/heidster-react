import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchHeaderQuery } from "../../../services/header.service";

const Header = () => {
  const [scroll, setScroll] = useState(0);

  const { data, isLoading } = useFetchHeaderQuery();

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    !isLoading && (
      <header className={scroll > 50 ? "headerScroll header" : "header"}>
        <div className="header-nav">
          <Link to="/" className="header-nav__logo">
            <img
              src={
                "http://80.78.246.20/" +
                data.filter((el) => el.name === "logo")[0].file.path
              }
            />
          </Link>
          <div className="header-nav__navbar">
            {data
              .filter((el) => el.name === "menu")[0]
              .menu.elements.map((el, index) => {
                return (
                  <Link
                    key={index}
                    to={el.value === "Компания" ? "/" : "/" + el.value}
                    className="header-nav__link"
                  >
                    {el.name}
                  </Link>
                );
              })}
            <a
              href="mailto:heidster.studio@gmail.com"
              className="header-nav__mail"
            >
              {data.filter((el) => el.name === "button")[0].value}
            </a>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
