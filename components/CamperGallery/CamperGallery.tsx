'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import Icon from '@/components/Icon/Icon';

interface GalleryItem {
  thumb: string;
  original: string;
}

export default function CamperGallery({ gallery }: { gallery: GalleryItem[] }) {
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex-1 relative min-h-0 rounded-[16px] overflow-hidden">
        <Swiper
          onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={gallery.length > 1}
          spaceBetween={0}
          className="w-full h-full"
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <Image
                  src={img.original}
                  alt={`Camper photo ${i + 1}`}
                  fill
                  sizes="(max-width: 100%) 50vw"
                  className="object-cover object-center"
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {gallery.length > 1 && (
          <>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-11 h-11 rounded-full border-none cursor-pointer bg-white/45 text-[var(--main)] flex items-center justify-center p-0 outline-none transition-colors hover:bg-white/85"
              onClick={() => mainSwiperRef.current?.slidePrev()}
              aria-label="Previous photo"
            >
              <Icon id="chevron-left" size={20} />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-11 h-11 rounded-full border-none cursor-pointer bg-white/45 text-[var(--main)] flex items-center justify-center p-0 outline-none transition-colors hover:bg-white/85"
              onClick={() => mainSwiperRef.current?.slideNext()}
              aria-label="Next photo"
            >
              <Icon id="chevron-right" size={20} />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-6 shrink-0">
          {gallery.slice(0, 4).map((img, i) => (
            <button
              key={i}
              className={`block aspect-square relative rounded-[16px] overflow-hidden cursor-pointer transition-opacity p-0 border-none bg-transparent ${activeIndex === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
              onClick={() => mainSwiperRef.current?.slideTo(i)}
              aria-label={`Go to photo ${i + 1}`}
            >
              <Image
                src={img.thumb}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
