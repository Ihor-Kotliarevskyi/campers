'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

interface GalleryItem {
  thumb: string;
  original: string;
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function CamperGallery({ gallery }: { gallery: GalleryItem[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="flex flex-col-reverse gap-4 min-w-0 overflow-hidden">
      {gallery.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="w-full h-24 overflow-hidden"
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="thumb-slide relative w-full h-24 rounded-[10px] overflow-hidden cursor-pointer opacity-50 transition-opacity hover:opacity-[0.85]">
                <Image
                  src={img.thumb}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="relative rounded-2xl overflow-hidden">
        <Swiper
          modules={[Thumbs, FreeMode]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
          loop
          spaceBetween={0}
          className="w-full h-[430px]"
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[430px]">
                <Image
                  src={img.original}
                  alt={`Camper photo ${i + 1}`}
                  fill
                  sizes="600px"
                  className="object-cover object-center"
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-11 h-11 rounded-full border-none cursor-pointer bg-white/45 text-[var(--main)] flex items-center justify-center p-0 transition-colors hover:bg-white/85"
          onClick={() => mainSwiperRef.current?.slidePrev()}
          aria-label="Previous photo"
        >
          <ChevronLeft />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-11 h-11 rounded-full border-none cursor-pointer bg-white/45 text-[var(--main)] flex items-center justify-center p-0 transition-colors hover:bg-white/85"
          onClick={() => mainSwiperRef.current?.slideNext()}
          aria-label="Next photo"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
