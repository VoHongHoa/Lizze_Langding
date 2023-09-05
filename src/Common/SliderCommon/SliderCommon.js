import React from "react";
import Slider from "react-slick";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import banner4 from "../../assets/banner/banner4.png";
import banner5 from "../../assets/banner/banner5.png";
import "./SliderCommon.scss";
export default function SliderCommon() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <Slider {...settings}>
      <div className="slider-item">
        <img src={banner2} alt="Lizze" />
      </div>
      <div className="slider-item">
        <img src={banner3} alt="Lizze" />
      </div>
      <div className="slider-item">
        <img src={banner4} alt="Lizze" />
      </div>
      <div className="slider-item">
        <img src={banner5} alt="Lizze" />
      </div>
    </Slider>
  );
}
