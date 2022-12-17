import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { useFetchFeedbackPageQuery } from "../../../services/projectPages.service";

import "swiper/css";
import "./feedback.scss";

const Feedback = () => {
  const { data, isLoading } = useFetchFeedbackPageQuery();

  return (
    !isLoading && (
      <section className="feedback">
        <div className="feedback__container">
          <h2 className="feedback__title">Отзывы</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          slides-per-view={1}
          space-between={50}
          navigation
          pagination={{ clickable: true }}
          autoplay
          id="feedback-swiper"
        >
          {data.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <div className="swiper-slide">
                  <div className="feedback__container">
                    <div className="feedback__slide">
                      <img
                        src={"http://80.78.246.20/" + el.author_image.path}
                        alt="logo.jpg"
                        className="feedback__slide-logo"
                      />
                      <div className="feedback__slide-container">
                        <p className="feedback__review">{el.value}</p>
                        <p className="feedback__author">{el.author_name}</p>
                        <p className="feedback__working">
                          {el.author_profession}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    )
  );
};

export default Feedback;
