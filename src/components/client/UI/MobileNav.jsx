import home from "../../../images/home.svg";
import services from "../../../images/services.svg";
import projects from "../../../images/projects.svg";
import contacts from "../../../images/contacts.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
  }, []);

  return (
    width < 960 && (
      <section className="mobile-nav">
        <div className="mobile-nav__container">
          <div className="mobile-nav__item">
            <Link to="link.route" className="mobile-nav__link">
              <div className="mobile-nav__link-logo">
                <img src={home} alt="img" className="mobile-nav__link-img" />
              </div>
              <div className="mobile-nav__link-text">Компания</div>
            </Link>
          </div>
          <div className="mobile-nav__item">
            <Link to="link.route" className="mobile-nav__link">
              <div className="mobile-nav__link-logo">
                <img
                  src={services}
                  alt="img"
                  className="mobile-nav__link-img"
                />
              </div>
              <div className="mobile-nav__link-text">Услуги</div>
            </Link>
          </div>
          <div className="mobile-nav__item">
            <Link to="link.route" className="mobile-nav__link">
              <div className="mobile-nav__link-logo">
                <img
                  src={projects}
                  alt="img"
                  className="mobile-nav__link-img"
                />
              </div>
              <div className="mobile-nav__link-text">Проекты</div>
            </Link>
          </div>{" "}
          <div className="mobile-nav__item">
            <Link to="link.route" className="mobile-nav__link">
              <div className="mobile-nav__link-logo">
                <img
                  src={contacts}
                  alt="img"
                  className="mobile-nav__link-img"
                />
              </div>
              <div className="mobile-nav__link-text">Контакты</div>
            </Link>
          </div>
        </div>
      </section>
    )
  );
};

export default MobileNav;
