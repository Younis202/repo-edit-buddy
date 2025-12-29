import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CoreService {
  num: string;
  title: string;
  description: ReactNode;
  image: string;
  href: string;
}

interface CoreServiceTabsProps {
  services: CoreService[];
  isDark?: boolean;
}

export const CoreServiceTabs = ({ services, isDark = true }: CoreServiceTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="core-service_grid">
      <div className="core-service_left display-flex is-vertical">
        {services.map((service, index) => (
          <div
            key={service.num}
            className={`core-service_link w-inline-block ${index === activeIndex ? 'is-active' : ''} ${!isDark ? 'is-two' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            style={{ cursor: 'pointer' }}
          >
            <motion.div 
              className="core-service-border"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: index === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className={`core-service_icon ${!isDark ? '' : ''}`}>
              <div>{service.num}</div>
              <div
                className="core-service_icon-gradient"
                style={{
                  transform: index === activeIndex ? 'translateY(0%)' : 'translateY(100%)',
                  transition: 'transform 0.25s ease-in'
                }}
              />
            </div>
            <div className="core-service_link_text">{service.title}</div>
          </div>
        ))}
      </div>
      <div className="core-service_right">
        <div className="core-service_right_media-wrap">
          {services.map((service, index) => (
            <motion.figure
              key={service.num}
              className="core-service_media position-absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: index === activeIndex ? 'relative' : 'absolute' }}
            >
              <img
                className="cover-image"
                src={service.image}
                alt={service.title}
                loading="lazy"
              />
            </motion.figure>
          ))}
        </div>
        <div className="core-service_right_content-wrap">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              className={`core-service_right_content ${index === activeIndex ? 'is-active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0,
                y: index === activeIndex ? 0 : 20
              }}
              transition={{ duration: 0.3 }}
              style={{ 
                position: index === activeIndex ? 'relative' : 'absolute',
                visibility: index === activeIndex ? 'visible' : 'hidden'
              }}
            >
              <h3 className="heading-style-h2 text-color-alternate">{service.title}</h3>
              <p className="core-service_text body-l">{service.description}</p>
              <div className="is-magnatic">
                <a href={service.href} className="footer_social-link is-service w-inline-block">
                  <div>Learn More</div>
                  <div className="footer_social-overlay" />
                  <div className="button-hover-bg" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreServiceTabs;
