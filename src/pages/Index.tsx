import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Testimonial data
const testimonials = [
  {
    quote: "Omotive Design Agency did an outstanding job designing the websites for Nassummit, Nashouse, Nastravel, and Nasdaily. The sites are intuitive, visually engaging, and perfectly aligned with our brand. Highly recommend!",
    authorName: "Nuseir Yassin",
    authorTitle: "Founder & CEO at Nas Company",
    authorImage: "https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
  },
  {
    quote: "Was a pleasure working with Omotive on launching ExitStack. They understood the vision and worked efficiently, with great communications, to execute it. Looking forward to working with them again!",
    authorName: "Rahat Ahmed",
    authorTitle: "Founding CEO, Anchorless Bangladesh",
    authorImage: "https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b306fbc1a90c60620ce1b6_Rahat%20Ahmed.png"
  },
  {
    quote: "Omotive has a structured process for UI/UX design. Their human centered design approach the key for us to collaborate. They delivered on their promises very well and was open to constructive feedback.",
    authorName: "Ishti Alam",
    authorTitle: "Investments at Anchorless Bangladesh",
    authorImage: "https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42131553bf680ce6418b6_Ishti-alam.png"
  },
  {
    quote: "Mufidul is an exceptional product designer with passion to make something very unique. Through working with him we developed a great friendship. He has a firm grasp for the vision of the project.",
    authorName: "Damien Harris",
    authorTitle: "Enterprise Technology at Bloomberg L.P",
    authorImage: "https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67cfe710ff85e927f4fb2fa3_damien-haris.png"
  }
];

// Services data
const services = [
  { num: '01', title: 'Website & Branding', href: '/sevices/service-one', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b1f4e6d7d4e41d3a380f52_core-service-1-low.webp' },
  { num: '02', title: 'Mobile Apps', href: '/sevices/mobile-application-design', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706942a9764c6d4d158f2_core-service-mobile-app-low.webp' },
  { num: '03', title: 'Web Application', href: '/sevices/web-application', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706c08d1c3060ecb941c7_core-service-web-app-low.webp' },
  { num: '04', title: 'Webflow Development', href: '/service-two', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706f0f53741a37050423c_core-service-webflow-low.webp' },
];

const serviceDescriptions = [
  <>Experience <strong>responsive web design</strong>, <strong>custom branding packages</strong>, and <strong>user-centric website development</strong> tailored to your business goals.</>,
  <>Delivering user-centric <strong>mobile app solutions</strong> that combine creativity with strategy to drive business growth</>,
  <>Delivering user-centric <strong>web application solutions</strong> that combine creativity with strategy to drive business growth</>,
  <>Delivering user-centric <strong>Webflow development</strong> solutions that combine creativity with strategy to drive business growth</>
];

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeCoreService, setActiveCoreService] = useState(0);

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
      <path d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z" fill="currentColor" />
    </svg>
  );

  const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={16} viewBox="0 0 22 16" fill="none" className="testimonail_icon">
      <g opacity="0.8">
        <path d="M9.18681 1.14286C9.18681 0.511675 8.67514 0 8.04396 0H1.14286C0.511675 0 0 0.511676 0 1.14286V8.1203C0 8.75148 0.511675 9.26316 1.14286 9.26316H3.16862C4.01655 9.26316 4.5692 10.1541 4.1925 10.9137L2.48882 14.3494C2.11212 15.1091 2.66477 16 3.5127 16H5.18021C5.59178 16 5.97157 15.7787 6.1745 15.4206L9.03825 10.3674C9.13563 10.1956 9.18681 10.0014 9.18681 9.80394V1.14286Z" fill="currentColor" />
        <path d="M21.7143 1.14286C21.7143 0.511675 21.2026 0 20.5714 0H13.6703C13.0391 0 12.5275 0.511676 12.5275 1.14286V8.1203C12.5275 8.75148 13.0391 9.26316 13.6703 9.26316H15.6961C16.544 9.26316 17.0967 10.1541 16.72 10.9137L15.0163 14.3494C14.6396 15.1091 15.1922 16 16.0402 16H17.7077C18.1193 16 18.499 15.7787 18.702 15.4206L21.5657 10.3674C21.6631 10.1956 21.7143 10.0014 21.7143 9.80394V1.14286Z" fill="currentColor" />
      </g>
    </svg>
  );

  return (
    <div className="page-wrapper">
      {/* Animated Navigation */}
      <motion.nav 
        className={`nav_component ${isNavHidden ? 'nav-hidden' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="padding-global">
          <div className="container-large">
            <div className={`nav_wrapper ${isScrolled ? 'scrolled' : ''}`}>
              <Link to="/" className="nav_logo-link w-inline-block">
                <motion.img
                  src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ac925dc3a152594b6bcc01_logo.svg"
                  loading="eager"
                  width={124}
                  height={28}
                  alt="Omotive Logo"
                  className="nav_logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
              
              <div className="nav_menu-wrapper">
                <nav id="main-menu" role="navigation" className="nav_menu">
                  <ul role="list" className="nav_list">
                    <li className="nav_list-item">
                      <Link to="/projects" className="nav_link">works</Link>
                    </li>
                    <li 
                      className="nav_list-item"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="nav_dropdown w-dropdown">
                        <div className="nav_link w-dropdown-toggle">
                          <Link to="/services" className="nav_link is-dropdown">services</Link>
                        </div>
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.nav
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.25 }}
                              className="nav_dropdown-list w-dropdown-list"
                              style={{ display: 'block' }}
                            >
                              <div className="nav_dropdown-list-inner">
                                <div role="list" className="nav_services_list display-vertical">
                                  {services.map((item, index) => (
                                    <Link
                                      key={item.num}
                                      to={item.href}
                                      className={`nav_services_list-item w-inline-block ${index === activeServiceIndex ? 'is-active' : ''}`}
                                      onMouseEnter={() => setActiveServiceIndex(index)}
                                    >
                                      <div>{item.num}</div>
                                      <div>{item.title}</div>
                                    </Link>
                                  ))}
                                </div>
                                <div className="nav_services_media">
                                  {services.map((item, index) => (
                                    <motion.img
                                      key={item.num}
                                      src={item.image}
                                      loading="lazy"
                                      alt={item.title}
                                      className={`nav_service_image ${index === activeServiceIndex ? 'is-active' : ''}`}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: index === activeServiceIndex ? 1 : 0 }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  ))}
                                </div>
                                <div className="nav_services_content">
                                  {services.map((item, index) => (
                                    <motion.div 
                                      key={item.num} 
                                      className={`nav_services_content-inner ${index === activeServiceIndex ? 'is-active' : ''}`}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: index === activeServiceIndex ? 1 : 0, y: index === activeServiceIndex ? 0 : 10 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <div className="margin-bottom margin-medium text-weight-medium">Service</div>
                                      <div className="margin-bottom margin-small">
                                        <div className="nav_service_title body-xl text-color-primary">{item.title}</div>
                                      </div>
                                      <p className="nav_service_subtext">
                                        Delivering user-centric solutions that combine creativity with strategy to drive business growth
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.nav>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                    <li className="nav_list-item">
                      <Link to="/about" className="nav_link">About</Link>
                    </li>
                  </ul>
                </nav>
                <div className="nav_button is-magnatic">
                  <Link to="/contact" className="button is-small w-inline-block">
                    <div className="button-text">Let's chat</div>
                    <div className="button-hover-bg" />
                  </Link>
                </div>
              </div>
              
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                className="nav_menu-button"
              >
                <span className={`nav_menu-bar cc-top ${isMobileMenuOpen ? 'nav-open' : ''}`} />
                <span className={`nav_menu-bar cc-middle ${isMobileMenuOpen ? 'nav-open' : ''}`} />
                <span className={`nav_menu-bar cc-bottom ${isMobileMenuOpen ? 'nav-open' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mobile-menu-wrapper is-open"
          >
            <div className="mobile-menu_content">
              <motion.div 
                role="list" 
                className="mobile-menu_list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { to: '/projects', label: 'Projects' },
                  { to: '/services', label: 'Services' },
                  { to: '/about', label: 'About Us' }
                ].map((item) => (
                  <motion.div key={item.to} variants={fadeInUp}>
                    <Link to={item.to} className="mobile-menu_list_item w-inline-block" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="mobile-menu_link heading-style-h3 text-weight-medium">{item.label}</div>
                      <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                        <ArrowIcon />
                        <div data-gradient="1" className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <Link to="/contact" className="button is-small w-inline-block" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="button-text">Contact us</div>
                  <div className="button-hover-bg" />
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="main-wrapper">
        {/* Hero Header with Animations */}
        <header id="header" className="section_home-header">
          <div className="padding-global padding-xxlarge">
            <div className="container-large">
              <motion.div 
                className="header_component"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <div className="header_content">
                  <motion.div className="header_content_right" variants={fadeInUp}>
                    <div className="clutch-badge">
                      <div>5.0 rating on</div>
                      <a href="https://clutch.co/profile/omotive#highlights" target="_blank" className="clutch-link w-inline-block">
                        <img src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ad9ed90e735bf1e8fe9095_clutch_logo.svg.svg" loading="eager" width={50} height={14} alt="clutch icon" />
                      </a>
                    </div>
                    <h1 className="home-header_title">
                      <motion.div 
                        className="display-inline"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        AI+UI Design Services<span className="br"> </span>to
                      </motion.div>
                      <motion.div 
                        className="display-inline text-style-secondary-font"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        grow your business
                      </motion.div>
                    </h1>
                  </motion.div>
                  <motion.div 
                    className="home-header_content-inner display-vertical is-left"
                    variants={fadeInUp}
                  >
                    <p className="text-size-large">
                      Struggling to turn design into revenue? <br />
                      We craft UI/UX solutions that deliver millions in business growth.
                    </p>
                    <motion.div 
                      className="is-magnatic"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link to="/book-a-call" className="button is-small w-inline-block is-gradient">
                        <div className="button-text">Book a free call</div>
                        <div className="button-hover-bg" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div
                  className="home-header_lightbox"
                  variants={scaleIn}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <figure className="header_media position-relative overflow-hidden">
                    <video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e738b4941759e4f6bbd513_Screenshot%202025-10-09%20at%2012.22.24%E2%80%AFAM.avif" className="cover-image">
                      <source src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d717e0e3c2bd466c76f_banner-showreel.webm" type="video/webm" />
                      <source src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d714ee010ce2010de44_banner-showreel.mp4" type="video/mp4" />
                    </video>
                  </figure>
                  <motion.div 
                    className="position-absolute is-magnatic"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  >
                    <button type="button" className="home-header_lightbox_button button">
                      <div className="button-text">PLAY REEL</div>
                      <div className="button-hover-bg" />
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Client Logos with Scroll Animation */}
        <motion.section 
          className="section_client-logos overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="padding-global padding-xlarge">
            <div className="container-large">
              <motion.div 
                className="client-logos_component"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67adab7f109ea0ce63c3ff5f_nas-house.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b429026535397fbda12509_mymenu-logo.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4291146efe5712ec684cf_nasdaily-logo.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f12e3eb736dc8ba34f988_exitstack-logo.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4296a18fbfc438e57163f_nastravel-logo.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42978d5f25f6f99420436_reviewxpo-logo.svg',
                  'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42988a54127b5b18d2668_nassummit-log.svg',
                ].map((logo, index) => (
                  <motion.div 
                    key={index} 
                    className="client-logo_wrap"
                    variants={fadeIn}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={logo} loading="lazy" alt="" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <section className="section_home-projects">
          <div className="padding-global padding-section">
            <div className="container-large">
              <motion.div 
                className="section_header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section_title heading-style-h1">
                  Our solutions<span className="br"> </span>are{" "}
                  <span className="text-style-secondary-font">making $millions</span>
                </h2>
              </motion.div>
              
              <motion.div 
                className="home-project_grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {[
                  { href: '/projects/omoskillo', img: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b08fea00250a4417c8fe10_Omoskillo-website-mockup-low.webp', title: 'Omoskillo', subtitle: 'Website design' },
                  { href: '/projects/omostate', img: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b096e2d2812e66e167f5ae_omostate-application-mockup-low.webp', title: 'Omostate Real estate', subtitle: 'Application design', negative: true },
                  { href: '/projects/omoskillo', img: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b0976a39cf14b1edd4a611_omoskillo-app-design-mockup-low.webp', title: 'Omoskillo E-learning', subtitle: 'Mobile Application' },
                  { href: '/projects/exitstack', img: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f05a9ca55ec1f45ee0ae4_exitstack-mockup-low.webp', title: 'Exitstack', subtitle: 'Web Application', negative: true },
                ].map((project, index) => (
                  <motion.div 
                    key={index}
                    className={project.negative ? 'project_item-negative' : ''}
                    variants={fadeInUp}
                  >
                    <motion.div 
                      className="project_single-item"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to={project.href} className="project_figure position-relative overflow-hidden w-inline-block">
                        <motion.img
                          className="cover-image"
                          src={project.img}
                          alt={project.title}
                          loading="lazy"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </Link>
                      <div className="project_content">
                        <h3 className="heading-style-h2">
                          <div className="display-inline">{project.title} </div>
                          <div className="display-inline text-style-secondary-font">{project.subtitle}</div>
                        </h3>
                        <motion.div 
                          className="is-magnatic"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link to={project.href} className="button w-inline-block is-secondary">
                            <div>View case study</div>
                            <div className="button-hover-bg-two" />
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="margin-top margin-large display-flex is-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/projects" className="button w-inline-block is-secondary">
                    <div>Explore all projects</div>
                    <div className="button-hover-bg-two" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="section_core-service overflow-hidden">
          <div className="padding-global padding-section">
            <div className="container-large">
              <motion.div 
                className="section_header is-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section_title heading-style-h1 text-color-alternate">
                  Core <span className="text-style-secondary-font">Services</span>
                </h2>
              </motion.div>
              
              <div className="core-service_grid">
                <motion.div 
                  className="core-service_left display-vertical is-left"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {services.map((service, index) => (
                    <motion.div
                      key={service.num}
                      variants={fadeInUp}
                      onMouseEnter={() => setActiveCoreService(index)}
                      onClick={() => setActiveCoreService(index)}
                    >
                      <Link
                        to={service.href}
                        className={`core-service_link w-inline-block display-flex position-relative ${index === activeCoreService ? 'is-active' : ''}`}
                      >
                        <div className="core-service_content display-flex is-left">
                          <div className="heading-style-h3">{service.num}</div>
                          <h3 className="heading-style-h2">{service.title}</h3>
                        </div>
                        <div className="core-service_icon display-flex is-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                            <path d="M12.129 9.9165L3 9.9165L3 8.4165L12.129 8.4165L8.106 4.3935L9.1665 3.333L15 9.1665L9.1665 15L8.106 13.9395L12.129 9.9165Z" fill="currentColor" />
                          </svg>
                        </div>
                        <motion.div 
                          className="core-service-border position-absolute"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: index === activeCoreService ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                
                <div className="core-service_right display-vertical">
                  <div className="core-service_media">
                    {services.map((service, index) => (
                      <motion.figure
                        key={service.num}
                        className={`core-service_figure position-relative overflow-hidden ${index === activeCoreService ? 'is-active' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === activeCoreService ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ position: index === activeCoreService ? 'relative' : 'absolute' }}
                      >
                        <img className="cover-image" src={service.image} alt={service.title} loading="lazy" />
                      </motion.figure>
                    ))}
                  </div>
                  <div className="core-service_right_content-wrap">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.num}
                        className={`core-service_right_content ${index === activeCoreService ? 'is-active' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: index === activeCoreService ? 1 : 0, y: index === activeCoreService ? 0 : 20 }}
                        transition={{ duration: 0.4 }}
                        style={{ position: index === activeCoreService ? 'relative' : 'absolute', visibility: index === activeCoreService ? 'visible' : 'hidden' }}
                      >
                        <h3 className="heading-style-h2 text-color-alternate">{service.title}</h3>
                        <p className="core-service_text body-l">{serviceDescriptions[index]}</p>
                        <motion.div className="is-magnatic" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link to={service.href} className="footer_social-link is-service w-inline-block">
                            <div>Learn More</div>
                            <div className="footer_social-overlay" />
                            <div className="button-hover-bg" />
                          </Link>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Swiper */}
        <section className="section_testimonial overflow-hidden">
          <div className="padding-global">
            <div className="container-large">
              <motion.div 
                className="section_header is-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section_title heading-style-h1 text-color-alternate">
                  Loved by <span className="text-style-secondary-font">Hundreds</span>
                </h2>
              </motion.div>
              
              <motion.div 
                className="testimonail_grid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true, el: '.testimonial-pagination' }}
                  breakpoints={{
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="testimonial-swiper"
                >
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                      <motion.div 
                        className="testimonail_item is-dark"
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="testimonail_content">
                          <QuoteIcon />
                          <p className="testimonail_text">{testimonial.quote}</p>
                        </div>
                        <div className="testimonail_author">
                          <img src={testimonial.authorImage} loading="lazy" alt={testimonial.authorName} className="testimonail_author-image" />
                          <div className="testimonail_author-content">
                            <div className="testimonail_author_name body-l">{testimonial.authorName}</div>
                            <div className="testimonail_author_designation">{testimonial.authorTitle}</div>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="testimonial-pagination" />
              </motion.div>
            </div>
          </div>
          
          <picture className="bg-absolute-shape">
            <source srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b31c19114d5e14877eb4c4_dark-section-bg-high-mobile.png" media="(max-width: 375px)" />
            <img className="cover-image" src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b31d0fa5f73003e7a9cff0_dark-section-bg-low-desktop.webp" alt="" loading="lazy" />
          </picture>
          <img src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern.png" loading="lazy" alt="" className="dark_bg-pattern" />
        </section>

        {/* Book a Call Section */}
        <section className="section_articles">
          <div className="padding-global padding-section">
            <div className="container-large">
              <motion.div 
                className="section_header is-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section_title heading-style-h1">
                  <span className="text-style-secondary-font">Book a free</span> Call
                </h2>
              </motion.div>
              <motion.div 
                className="booking-embed"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="code-embed w-embed w-script">
                  <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-30min" className="cal-inline-container">
                    <cal-inline data-theme="light" data-layout="month_view" style={{ maxHeight: "inherit", height: "inherit", minHeight: "inherit", display: "flex", position: "relative", flexWrap: "wrap", width: "100%" }} className="cal-element-embed-light">
                      <iframe className="cal-embed" name="cal-embed=30min" title="Book a call" data-cal-link="mufidul-tapadar-nwmykh/30min" allow="payment" src="https://app.cal.com/mufidul-tapadar-nwmykh/30min/embed?embed=30min&layout=month_view&theme=light&embedType=inline" style={{ height: 570, width: "100%" }} />
                    </cal-inline>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer_component">
          <motion.div 
            className="padding-global padding-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="container-large">
              <div className="footer_header-grid">
                <motion.div 
                  className="footer_header_content"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="heading-style-h1 margin-bottom margin-medium">
                    <div className="display-inline">Let's </div>
                    <div className="display-inline text-style-secondary-font">create</div>
                    <div className="display-inline"> something together</div>
                  </h2>
                  <div className="footer_header_contact">
                    <a href="mailto:info@omotive.agency" className="footer_contact_email body-l w-inline-block">
                      <div>info@omotive.agency</div>
                    </a>
                    <div className="footer_header_social display-flex is-left gap-small">
                      {[
                        { href: 'https://www.instagram.com/omotive.agency/', label: 'Instagram' },
                        { href: 'https://dribbble.com/Omotive', label: 'Dribble' },
                        { href: 'https://www.behance.net/designopsagency', label: 'Behance' },
                        { href: 'https://www.linkedin.com/company/omotive-agency/', label: 'Linkedin' },
                      ].map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          className="footer_social-link w-inline-block"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div>{social.label}</div>
                          <div className="footer_social-overlay" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                  className="footer_header_cta"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/book-a-call" className="button w-inline-block is-gradient">
                      <div className="button-text">Book a free call</div>
                      <div className="button-hover-bg" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <div className="padding-global padding-large">
            <div className="container-large">
              <div className="footer-links_component">
                <div className="footer_logo-wrap">
                  <Link to="/" className="footer_logo-link w-inline-block">
                    <img src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d91a4f83f2e7d339ef5cd6_omotive-footer-logo.svg" loading="lazy" alt="Omotive Logo" className="footer_logo" />
                  </Link>
                  <p className="footer_subtext">Your reliable design partner, crafting user experiences that drive business growth.</p>
                </div>
                <div className="footer_link-wrapper">
                  <div className="footer_link-list">
                    <div className="footer_link-title">Pages</div>
                    <Link to="/" className="footer_link">Home</Link>
                    <Link to="/projects" className="footer_link">Projects</Link>
                    <Link to="/about" className="footer_link">About Us</Link>
                    <Link to="/services" className="footer_link">Services</Link>
                    <Link to="/contact" className="footer_link">Contact</Link>
                  </div>
                  <div className="footer_link-list">
                    <div className="footer_link-title">Services</div>
                    {services.map((service) => (
                      <Link key={service.num} to={service.href} className="footer_link">{service.title}</Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="footer_copyright-component">
                <a href="#header" className="back-to-top w-inline-block">
                  <img src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d9261eb0261c57f846fabb_arrow-up.svg" loading="lazy" alt="" />
                </a>
                <div className="footer_copyright-text">Made with Love in NYC ❤</div>
                <motion.a 
                  href="#header" 
                  className="back-to-top w-inline-block"
                  whileHover={{ y: -3 }}
                >
                  <div>Back to top</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" className="bac-to-top-arrow">
                    <path d="M11.6199 8.77888L7.81655 4.97555C7.36738 4.52638 6.63238 4.52638 6.18322 4.97555L2.37988 8.77888" stroke="currentColor" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
          
          <picture className="bg-absolute-shape">
            <source srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f16dc9f1294ba1936b7fc_footer-gradient-bg-shape-mobil.png" media="(max-width: 375px)" />
            <img className="cover-image" src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f167b98ff3be489cafd02_footer-gradient-bg-shape-low.webp" alt="" loading="lazy" />
          </picture>
          <img src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern.png" loading="lazy" alt="" className="pattern-bg pointer-events-none" />
        </footer>
      </main>
    </div>
  );
};

export default Index;
