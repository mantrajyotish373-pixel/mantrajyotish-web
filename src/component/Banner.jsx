import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.webp";

const banners = [
  {
    image: banner1,
    route: "/wallet",
  },
  {
    image: banner2,
    route: "/chat",
  },
  {
    image: banner3,
    route: "/pooja",
  },
];

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="mx-4 mt-4 rounded-[28px] overflow-hidden cursor-pointer shadow-md">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index} onClick={() => navigate(item.route)}>
            <div className="w-full rounded-[28px] overflow-hidden">
              <img
                src={item.image}
                alt="Astro Banner"
                className="w-full h-auto object-cover block"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;