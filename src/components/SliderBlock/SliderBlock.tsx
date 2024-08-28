import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './SliderBlock.module.scss';
import { InfoItem } from '~/data/data.types';

interface SliderBlockProps {
  slideListData: InfoItem[];
  isMobile: boolean;
  children?: React.ReactNode;
  className?: string;
  title: string;
}
export function SliderBlock({
  slideListData,
  isMobile,
  children,
  className,
  title,
}: SliderBlockProps) {
  const [data, setData] = useState<InfoItem[]>(() => slideListData);
  const [showTitle, setShowTitle] = useState('');
  const [isHide, setIsHide] = useState(false);

  const timerId1 = useRef<NodeJS.Timeout | null>(null);
  const timerId2 = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsHide(true);
    if (timerId1.current !== null) {
      clearTimeout(timerId1.current);
    }
    if (timerId2.current !== null) {
      clearTimeout(timerId2.current);
    }
    timerId1.current = setTimeout(() => {
      setData(slideListData);
      setShowTitle(title);
    }, 500);
    timerId2.current = setTimeout(() => {
      setIsHide(false);
    }, 700);
  }, [slideListData, setIsHide, title]);

  return (
    <div
      className={classNames(styles.SliderBlockExternalWrapper, className)}
      key={isMobile ? 1 : 2}
    >
      {isMobile && (
        <div className={classNames(styles.title, isHide && styles.titleHide)}>
          {showTitle}
        </div>
      )}
      <div className={styles.SliderBlock}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={!isMobile && !isHide}
          slidesPerView={'auto'}
          spaceBetween={isMobile ? 25 : 80}
          // loop={true}
          pagination={
            isMobile
              ? {
                  clickable: true,
                }
              : undefined
          }
          className={styles.swiper}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} style={{ width: 'auto' }}>
              <div
                className={classNames(
                  styles.slide,
                  isHide && styles.sliderHide,
                )}
              >
                <div className={styles.year}>{item.year}</div>
                <div className={styles.text}>{item.text}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
}
