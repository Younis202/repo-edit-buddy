import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  isDark?: boolean;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  isDark?: boolean;
}

const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={16}
    viewBox="0 0 22 16"
    fill="none"
    className="testimonail_icon"
  >
    <g opacity="0.8">
      <path
        d="M9.18681 1.14286C9.18681 0.511675 8.67514 0 8.04396 0H1.14286C0.511675 0 0 0.511676 0 1.14286V8.1203C0 8.75148 0.511675 9.26316 1.14286 9.26316H3.16862C4.01655 9.26316 4.5692 10.1541 4.1925 10.9137L2.48882 14.3494C2.11212 15.1091 2.66477 16 3.5127 16H5.18021C5.59178 16 5.97157 15.7787 6.1745 15.4206L9.03825 10.3674C9.13563 10.1956 9.18681 10.0014 9.18681 9.80394V1.14286Z"
        fill="currentColor"
      />
      <path
        d="M21.7143 1.14286C21.7143 0.511675 21.2026 0 20.5714 0H13.6703C13.0391 0 12.5275 0.511676 12.5275 1.14286V8.1203C12.5275 8.75148 13.0391 9.26316 13.6703 9.26316H15.6961C16.544 9.26316 17.0967 10.1541 16.72 10.9137L15.0163 14.3494C14.6396 15.1091 15.1922 16 16.0402 16H17.7077C18.1193 16 18.499 15.7787 18.702 15.4206L21.5657 10.3674C21.6631 10.1956 21.7143 10.0014 21.7143 9.80394V1.14286Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export const TestimonialSlider = ({ testimonials, isDark = true }: TestimonialSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        el: '.testimonial-pagination',
      }}
      breakpoints={{
        640: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="testimonial-swiper"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className={`testimonail_item ${isDark ? 'is-dark' : 'is-two'}`}>
            <div className="testimonail_content">
              <QuoteIcon />
              <p className="testimonail_text">{testimonial.quote}</p>
            </div>
            <div className="testimonail_author">
              <img
                src={testimonial.authorImage}
                loading="lazy"
                alt={testimonial.authorName}
                className="testimonail_author-image"
              />
              <div className="testimonail_author-content">
                <div className="testimonail_author_name body-l">
                  {testimonial.authorName}
                </div>
                <div className="testimonail_author_designation">
                  {testimonial.authorTitle}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="testimonial-pagination" />
    </Swiper>
  );
};

export default TestimonialSlider;
