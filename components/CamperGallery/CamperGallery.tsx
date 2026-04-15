'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { useState } from 'react';
import Image from 'next/image';

export default function CamperGallery({ gallery }: { gallery: { thumb: string; original: string }[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper modules={[Thumbs, FreeMode]} thumbs={{ swiper: thumbsSwiper }} loop>
        {gallery.map((img, i) => (
          <SwiperSlide key={i}>
            <Image src={img.original} alt={`slide ${i}`} fill />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper modules={[FreeMode, Thumbs]} onSwiper={setThumbsSwiper} freeMode watchSlidesProgress>
        {gallery.map((img, i) => (
          <SwiperSlide key={i}>
            <Image src={img.thumb} alt={`thumb ${i}`} fill />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}