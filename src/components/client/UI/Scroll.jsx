import scrollImage from "../../../images/scroll.png";
import { useEffect, useState } from "react";

const ScrollUI = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={scroll > 50 ? "scroll-show scroll-up" : "scroll-up"}
      onClick={handleUpButton}
    >
      <img src={scrollImage} />
    </div>
  );
  //
};

export default ScrollUI;
