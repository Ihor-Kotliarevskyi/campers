'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import styles from './CamperGallery.module.css';

export default function CamperGallery({ gallery }: { gallery: { thumb: string; original: string }[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
    <div className={styles.wrapper}>
      {gallery.length > 1 && (
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className={styles.thumbsSwiper}
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className={styles.thumbSlide}>
                <Image
                  src={img.thumb}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="130px"
                  className={styles.thumbImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className={styles.mainWrapper}>
        <Swiper
          modules={[Thumbs, FreeMode]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
          loop
          spaceBetween={0}
          className={styles.mainSwiper}
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <div className={styles.mainSlide}>
                <Image
                  src={img.original}
                  alt={`Camper photo ${i + 1}`}
                  fill
                  sizes="600px"
                  className={styles.mainImage}
                  priority={i === 0}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          onClick={() => mainSwiperRef.current?.slidePrev()}
          aria-label="Previous photo"
        >
          <ChevronLeft />
        </button>
        <button
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={() => mainSwiperRef.current?.slideNext()}
          aria-label="Next photo"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
