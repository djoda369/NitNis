import classes from "./styles.module.scss";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Card from "../KarticeProdizvoda";
import Link from "next/link";

export default function Highlighted({ heighlits }) {
  return (
    <div className={`${classes.highlighted} `}>
      <div className={classes.container}>
        <div className={classes.highlighted__text}>
          <span className={classes.istaknuti}>Istaknuti proizvodi</span>
          <Link href="/prodavnica">
            <span className={classes.ponuda}>Pogledajte celu ponudu</span>
          </Link>
        </div>
        <Swiper
          // slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="featuedSwiper"
          breakpoints={{
            300: {
              slidesPerView: 1,
            },

            650: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {heighlits.map((shoe) => {
            return (
              <SwiperSlide key={shoe._id}>
                <div className={classes.img__container}>
                  <Card
                    image={shoe.images[0]}
                    name={shoe.name}
                    price={shoe.price}
                    limited={shoe.limited}
                    exclusive={shoe.exclusive}
                    sale={shoe.sale}
                    featured={true}
                    slug={shoe.slug}
                    tip={shoe.tip}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
