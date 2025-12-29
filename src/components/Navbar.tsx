import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isLight?: boolean;
}

const servicesItems = [
  { num: '01', title: 'Website & Branding', href: '/sevices/service-one', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67adfa1f0bf9c103b13afa27_dropdown-service.jpg' },
  { num: '02', title: 'Mobile Apps', href: '/sevices/mobile-application-design', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d705308d1c3060ecb7eb16_dropdown-Mobile%20Apps.jpg' },
  { num: '03', title: 'Web Application', href: '/sevices/web-application', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d70549c5c4b283a4831d4e_dropdown-web-application.jpg' },
  { num: '04', title: 'Webflow Development', href: '/service-two', image: 'https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d7054ab1eecae2159d6173_dropdown-webflow.jpg' },
];

export const Navbar = ({ isLight = false }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    setIsScrolled(currentScrollY > 50);
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsNavHidden(true);
    } else {
      setIsNavHidden(false);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" fill="none">
      <path
        d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      <nav className={`nav_component ${isNavHidden ? 'nav-hidden' : ''}`}>
        <div className="padding-global">
          <div className="container-large">
            <div className={`nav_wrapper ${isScrolled ? 'scrolled' : ''}`}>
              <Link to="/" className="nav_logo-link w-inline-block">
                <img
                  src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ac925dc3a152594b6bcc01_logo.svg"
                  loading="eager"
                  width={124}
                  height={28}
                  alt="Omotive Logo"
                  className="nav_logo"
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
                              transition={{ duration: 0.2 }}
                              className="nav_dropdown-list w-dropdown-list"
                              style={{ display: 'block' }}
                            >
                              <div className="nav_dropdown-list-inner">
                                <div role="list" className="nav_services_list display-vertical">
                                  {servicesItems.map((item, index) => (
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
                                  {servicesItems.map((item, index) => (
                                    <img
                                      key={item.num}
                                      src={item.image}
                                      loading="lazy"
                                      alt={item.title}
                                      className={`nav_service_image ${index === activeServiceIndex ? 'is-active' : ''}`}
                                    />
                                  ))}
                                </div>
                                <div className="nav_services_content">
                                  {servicesItems.map((item, index) => (
                                    <div key={item.num} className={`nav_services_content-inner ${index === activeServiceIndex ? 'is-active' : ''}`}>
                                      <div className="margin-bottom margin-medium text-weight-medium">Service</div>
                                      <div className="margin-bottom margin-small">
                                        <div className="nav_service_title body-xl text-color-primary">{item.title}</div>
                                      </div>
                                      <p className="nav_service_subtext">
                                        Delivering user-centric solutions that combine creativity with strategy to drive business growth
                                      </p>
                                    </div>
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
      </nav>

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
              <div role="list" className="mobile-menu_list">
                <Link to="/projects" className="mobile-menu_list_item w-inline-block">
                  <div className="mobile-menu_link heading-style-h3 text-weight-medium">Projects</div>
                  <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                    <ArrowIcon />
                    <div data-gradient="1" className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none" />
                  </div>
                </Link>
                <Link to="/services" className="mobile-menu_list_item w-inline-block">
                  <div className="mobile-menu_link heading-style-h3 text-weight-medium">Services</div>
                  <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                    <ArrowIcon />
                    <div data-gradient="1" className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none" />
                  </div>
                </Link>
                <Link to="/about" className="mobile-menu_list_item w-inline-block">
                  <div className="mobile-menu_link heading-style-h3 text-weight-medium">About Us</div>
                  <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                    <ArrowIcon />
                    <div data-gradient="1" className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none" />
                  </div>
                </Link>
              </div>
              <Link to="/contact" className="button is-small w-inline-block">
                <div className="button-text">Contact us</div>
                <div className="button-hover-bg" />
              </Link>
              <div className="mobile-menu_bottom">
                <div className="mobile-menu_contact-info">
                  <a href="mailto:info@omotive.agency" className="body-m text-color-gray">info@omotive.agency</a>
                </div>
                <div className="mobile-menu_social-wrapper">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mobile-menu_social_link">Instagram</a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mobile-menu_social_link">LinkedIn</a>
                  <a href="https://www.behance.net" target="_blank" rel="noopener noreferrer" className="mobile-menu_social_link">Behance</a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="mobile-menu_social_link">Dribbble</a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
