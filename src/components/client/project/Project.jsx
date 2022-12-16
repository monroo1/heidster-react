import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import AppButton from "../UI/AppButton";

import "swiper/css";
import "swiper/css/bundle";
import "./projects.scss";

const Project = ({ props }) => {
  return (
    <div>
      <section className="project" style={{ overflow: "hidden" }}>
        <div className="project__container">
          <div className="wrapper">
            <h2 className="project__title">
              {props.filter((el) => el.name === "title")[0].value}
            </h2>
            <div className="line" style={{ width: 200 + "px" }} />
            <p className="project__desription">
              {props.filter((el) => el.name === "main-description")[0].value}
            </p>
          </div>
        </div>

        <div className="slider-container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slides-per-view={1}
            space-between={0}
            navigation
            pagination={{ clickable: true }}
            id="swiper-projects"
          >
            {props
              .filter((element) => element.name === "project")
              .map((el) => {
                return (
                  <SwiperSlide key={el.project.file.id}>
                    <img src={"http://80.78.246.20/" + el.project.file.path} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <AppButton value={"Оставить заявку"} margin={true} />
        </div>
      </section>
    </div>
  );
};

export default Project;
