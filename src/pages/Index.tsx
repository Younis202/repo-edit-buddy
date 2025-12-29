const Index = () => {
  return (
    <div className="page-wrapper">
      <nav className="nav_component">
        <div className="padding-global">
          <div className="container-large">
            <div className="nav_wrapper">
              <a
                href="/"
                aria-current="page"
                className="nav_logo-link w-inline-block w--current"
              >
                <img
                  src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ac925dc3a152594b6bcc01_logo.svg"
                  loading="eager"
                  width={124}
                  height={28}
                  alt="Omotive Logo"
                  className="nav_logo"
                />
              </a>
              <div className="nav_menu-wrapper">
                <nav id="main-menu" role="navigation" className="nav_menu">
                  <ul role="list" className="nav_list">
                    <li className="nav_list-item">
                      <a href="/projects" className="nav_link">
                        works
                      </a>
                      <div className="mobile-nav-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                            fill="#10131B"
                          />
                        </svg>
                      </div>
                    </li>
                    <li className="nav_list-item">
                      <div
                        data-hover="true"
                        data-delay={0}
                        data-w-id="9cf03c1b-9963-f5c9-751d-ff0b100cb4c3"
                        className="nav_dropdown w-dropdown"
                      >
                        <div
                          className="nav_link w-dropdown-toggle"
                          id="w-dropdown-toggle-0"
                          aria-controls="w-dropdown-list-0"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          role="button"
                          tabIndex={0}
                        >
                          <a href="/services" className="nav_link is-dropdown">
                            services
                          </a>
                        </div>
                        <nav
                          className="nav_dropdown-list w-dropdown-list"
                          id="w-dropdown-list-0"
                          aria-labelledby="w-dropdown-toggle-0"
                          style={{
                            transform:
                              "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            opacity: 0
                          }}
                        >
                          <div className="nav_dropdown-list-inner">
                            <div
                              role="list"
                              className="nav_services_list display-vertical"
                            >
                              <a
                                role="listtiem"
                                href="/sevices/service-one"
                                className="nav_services_list-item is-active w-inline-block"
                                tabIndex={0}
                              >
                                <div>01</div>
                                <div>Website &amp; Branding</div>
                              </a>
                              <a
                                role="listtiem"
                                href="/sevices/mobile-application-design"
                                className="nav_services_list-item w-inline-block"
                                tabIndex={0}
                              >
                                <div>02</div>
                                <div>Mobile Apps</div>
                              </a>
                              <a
                                role="listtiem"
                                href="/sevices/web-application"
                                className="nav_services_list-item w-inline-block"
                                tabIndex={0}
                              >
                                <div>03</div>
                                <div>Web Application</div>
                              </a>
                              <a
                                role="listtiem"
                                href="/service-two"
                                className="nav_services_list-item w-inline-block"
                                tabIndex={0}
                              >
                                <div>04</div>
                                <div>Webflow Developement</div>
                              </a>
                            </div>
                            <div className="nav_services_media">
                              <img
                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67adfa1f0bf9c103b13afa27_dropdown-service.jpg"
                                loading="lazy"
                                alt="A computer monitor sitting on top of a rock."
                                className="nav_service_image is-active"
                              />
                              <img
                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d705308d1c3060ecb7eb16_dropdown-Mobile%20Apps.jpg"
                                loading="lazy"
                                alt=""
                                className="nav_service_image"
                              />
                              <img
                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d70549c5c4b283a4831d4e_dropdown-web-application.jpg"
                                loading="lazy"
                                alt=""
                                className="nav_service_image"
                              />
                              <img
                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d7054ab1eecae2159d6173_dropdown-webflow.jpg"
                                loading="lazy"
                                alt=""
                                className="nav_service_image"
                              />
                            </div>
                            <div className="nav_services_content">
                              <div className="nav_services_content-inner is-active">
                                <div className="margin-bottom margin-medium text-weight-medium">
                                  Service
                                </div>
                                <div className="margin-bottom margin-small">
                                  <div className="nav_service_title body-xl text-color-primary">
                                    Website &amp; Branding
                                  </div>
                                </div>
                                <p className="nav_service_subtext">
                                  Delivering user-centric solutions that combine
                                  creativity with strategy to drive business growth
                                </p>
                              </div>
                              <div className="nav_services_content-inner">
                                <div className="margin-bottom margin-medium text-weight-medium">
                                  Service
                                </div>
                                <div className="margin-bottom margin-small">
                                  <div className="nav_service_title body-xl text-color-primary">
                                    Mobile Apps
                                  </div>
                                </div>
                                <p className="nav_service_subtext">
                                  Delivering user-centric solutions that combine
                                  creativity with strategy to drive business growth
                                </p>
                              </div>
                              <div className="nav_services_content-inner">
                                <div className="margin-bottom margin-medium text-weight-medium">
                                  Service
                                </div>
                                <div className="margin-bottom margin-small">
                                  <div className="nav_service_title body-xl text-color-primary">
                                    Web Application
                                  </div>
                                </div>
                                <p className="nav_service_subtext">
                                  Delivering user-centric solutions that combine
                                  creativity with strategy to drive business growth
                                </p>
                              </div>
                              <div className="nav_services_content-inner">
                                <div className="margin-bottom margin-medium text-weight-medium">
                                  Service
                                </div>
                                <div className="margin-bottom margin-small">
                                  <div className="nav_service_title body-xl text-color-primary">
                                    Webflow Development
                                  </div>
                                </div>
                                <p className="nav_service_subtext">
                                  Delivering user-centric solutions that combine
                                  creativity with strategy to drive business growth
                                </p>
                              </div>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div className="mobile-nav-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                            fill="#10131B"
                          />
                        </svg>
                      </div>
                    </li>
                    <li className="nav_list-item">
                      <a href="/about" className="nav_link">
                        About
                      </a>
                      <div className="mobile-nav-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                            fill="#10131B"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </nav>
                <div
                  className="nav_button is-magnatic"
                  style={{
                    willChange: "transform",
                    transform:
                      "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <a
                    data-w-id="8bb02b6a-0dfa-c39d-4ebf-2f7056810763"
                    href="/contact"
                    className="button is-small w-inline-block is-small"
                  >
                    <div className="button-text">Let's chat</div>
                    <div
                      className="button-hover-bg"
                      style={{
                        transform:
                          "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    ></div>
                  </a>
                </div>
              </div>
              <button
                type="button"
                role="button"
                aria-haspopup="true"
                aria-controls="main-menu"
                aria-label="Open Menu"
                className="nav_menu-button"
              >
                <span className="nav_menu-bar cc-top" />
                <span className="nav_menu-bar cc-middle" />
                <span className="nav_menu-bar cc-bottom" />
              </button>
            </div>
          </div>
        </div>
        <nav className="mobile-menu-wrapper">
          <div className="mobile-menu_content">
            <div role="list" className="mobile-menu_list">
              <a
                role="listitem"
                href="/projects"
                className="mobile-menu_list_item w-inline-block"
              >
                <div className="mobile-menu_link heading-style-h3 text-weight-medium">
                  Projects
                </div>
                <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div
                    gradient={1}
                    className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none"
                  />
                </div>
              </a>
              <a
                role="listitem"
                href="/services"
                className="mobile-menu_list_item w-inline-block"
              >
                <div className="mobile-menu_link heading-style-h3 text-weight-medium">
                  Services
                </div>
                <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div
                    gradient={1}
                    className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none"
                  />
                </div>
              </a>
              <a
                role="listitem"
                href="/about"
                className="mobile-menu_list_item w-inline-block"
              >
                <div className="mobile-menu_link heading-style-h3 text-weight-medium">
                  About Us
                </div>
                <div className="mobile-menu_arrow display-flex is-center position-relative overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M9.13306 5.69139L4.11237 10.7121L3.28741 9.88712L8.3081 4.86643L3.88303 4.86643L3.88303 3.69994L10.2996 3.69994L10.2996 10.1165L9.13306 10.1165L9.13306 5.69139Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div
                    gradient={1}
                    className="mobile-menu_gradient position-absolute z-index-n1 pointer-events-none"
                  />
                </div>
              </a>
            </div>
            <a
              data-w-id="8bb02b6a-0dfa-c39d-4ebf-2f7056810763"
              href="/contact"
              className="button is-small w-inline-block"
            >
              <div className="button-text">Contact us</div>
              <div
                className="button-hover-bg"
                style={{
                  transform:
                    "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d"
                }}
              ></div>
            </a>
            <div className="mobile-menu_bottom display-vertical">
              <div>
                <div className="margin-bottom margin-small">
                  <div className="body-xl text-color-secondary">Get in touch</div>
                </div>
                <a
                  href="#"
                  className="copy-email-wrapper copy-parent is-mobile w-inline-block"
                >
                  <div id="textToCopy" className="footer_cta_text">
                    mufidul@omotive.co
                  </div>
                  <div className="copy-button is-two display-vertical  is-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 24"
                      fill="none"
                      className="copy-button-icon is-two"
                    >
                      <path
                        d="M16.5 12.9V17.1C16.5 20.6 15.1 22 11.6 22H7.4C3.9 22 2.5 20.6 2.5 17.1V12.9C2.5 9.4 3.9 8 7.4 8H11.6C15.1 8 16.5 9.4 16.5 12.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.5 6.9V11.1C22.5 14.6 21.1 16 17.6 16H16.5V12.9C16.5 9.4 15.1 8 11.6 8H8.5V6.9C8.5 3.4 9.9 2 13.4 2H17.6C21.1 2 22.5 3.4 22.5 6.9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div gradient={1} className="copy-button-overlay" />
                  </div>
                  <div gradient={1} className="copy-result">
                    <div>copied!</div>
                  </div>
                </a>
              </div>
              <div className="mobile-menu_social display-vertical">
                <div className="heading-style-h3">Socials</div>
                <div className="mobile-menu_social_links display-flex is-left">
                  <a
                    href="https://dribbble.com/designopsagency"
                    target="_blank"
                    className="mobile-menu_social_link w-inline-block"
                  >
                    <div>Dribble</div>
                  </a>
                  <a
                    href="https://www.behance.net/designopsagency"
                    target="_blank"
                    className="mobile-menu_social_link w-inline-block"
                  >
                    <div>Behance</div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/omotive-agency/?viewAsMember=true"
                    target="_blank"
                    className="mobile-menu_social_link w-inline-block"
                  >
                    <div>Linkedin</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </nav>
      <main className="main-wrapper">
        <header id="header" className="section_home-header">
          <div className="padding-global padding-xxlarge">
            <div className="container-large">
              <div className="header_component">
                <div className="header_content">
                  <div className="header_content_right">
                    <div className="clutch-badge">
                      <div>5.0 rating on</div>
                      <a
                        href="https://clutch.co/profile/omotive#highlights"
                        target="_blank"
                        className="clutch-link w-inline-block"
                      >
                        <img
                          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ad9ed90e735bf1e8fe9095_clutch_logo.svg.svg"
                          loading="eager"
                          width={50}
                          height={14}
                          alt="clutch icon"
                        />
                      </a>
                    </div>
                    <h1 className="home-header_title">
                      <div className="display-inline">
                        AI+UI Design Services<span className="br"> </span>to
                      </div>
                      <div className="display-inline text-style-secondary-font">
                        grow your business
                      </div>
                    </h1>
                  </div>
                  <div className="home-header_content-inner display-vertical is-left">
                    <p className="text-size-large">
                      Struggling to turn design into revenue? <br />
                      We craft UI/UX solutions that deliver millions in business
                      growth.
                    </p>
                    <div
                      className="is-magnatic"
                      style={{
                        willChange: "transform",
                        transform:
                          "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <a
                        data-w-id="8bb02b6a-0dfa-c39d-4ebf-2f7056810763"
                        href="/book-a-call"
                        className="button is-small w-inline-block is-gradient"
                      >
                        <div className="button-text">Book a free call</div>
                        <div
                          className="button-hover-bg"
                          style={{
                            transform:
                              "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="home-header_lightbox w-inline-block w-lightbox"
                  aria-label="open lightbox"
                  aria-haspopup="dialog"
                >
                  <figure className="header_media position-relative overflow-hidden">
                    <video
                      autoPlay="true"
                      loop=""
                      muted=""
                      playsInline="true"
                      poster="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e738b4941759e4f6bbd513_Screenshot%202025-10-09%20at%2012.22.24%E2%80%AFAM.avif"
                      className="cover-image"
                    >
                      <source
                        data-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d717e0e3c2bd466c76f_banner-showreel.webm"
                        type="video/webm"
                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d717e0e3c2bd466c76f_banner-showreel.webm"
                      />
                      <source
                        data-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d714ee010ce2010de44_banner-showreel.mp4"
                        type="video/mp4"
                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/68e94d714ee010ce2010de44_banner-showreel.mp4"
                      />
                    </video>
                  </figure>
                  <div
                    className="position-absolute is-magnatic"
                    style={{
                      willChange: "transform",
                      transform:
                        "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <button
                      data-w-id="567be1f6-53e5-a0f8-4878-36669bd1dc8f"
                      type="button"
                      className="home-header_lightbox_button button"
                    >
                      <div className="button-text">PLAY REEL</div>
                      <div
                        style={{
                          transform:
                            "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                        className="button-hover-bg"
                      />
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>
        <section className="section_client-logos overflow-hidden">
          <div className="padding-global padding-xlarge">
            <div className="container-large">
              <div className="client-logos_component">
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67adab7f109ea0ce63c3ff5f_nas-house.svg"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b429026535397fbda12509_mymenu-logo.svg"
                    loading="lazy"
                    alt="My Menu logo"
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4291146efe5712ec684cf_nasdaily-logo.svg"
                    loading="lazy"
                    alt="Nasdaily logo"
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f12e3eb736dc8ba34f988_exitstack-logo.svg"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4296a18fbfc438e57163f_nastravel-logo.svg"
                    loading="lazy"
                    alt="Nastravel Logo"
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42978d5f25f6f99420436_reviewxpo-logo.svg"
                    loading="lazy"
                    alt="Reviewxpo logo"
                  />
                </div>
                <div className="client-logo_wrap">
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42988a54127b5b18d2668_nassummit-log.svg"
                    loading="lazy"
                    alt="nassummit logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section_home-projects">
          <div className="padding-global padding-section">
            <div className="container-large">
              <div className="section_header">
                <h2 className="section_title heading-style-h1">
                  Our solutions<span className="br"> </span>are{" "}
                  <span className="text-style-secondary-font">
                    making $millions
                  </span>
                </h2>
              </div>
              <div className="home-project_grid">
                <div className="project_single-item">
                  <a
                    href="/projects/omoskillo"
                    className="project_figure position-relative overflow-hidden w-inline-block"
                  >
                    <img
                      className="cover-image"
                      src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b08fea00250a4417c8fe10_Omoskillo-website-mockup-low.webp"
                      data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b08feb2550411c49ff62b2_Omoskillo-website-mockup-high.jpg"
                      alt="omoskillo website mockup"
                      width={614}
                      height={576}
                      loading="lazy"
                      fetchpriority="low"
                      decoding="async"
                    />
                  </a>
                  <div className="project_content">
                    <h3 className="heading-style-h2">
                      <div className="display-inline">Omoskillo </div>
                      <div className="display-inline text-style-secondary-font">
                        Website design
                      </div>
                    </h3>
                    <div
                      className="is-magnatic"
                      style={{
                        willChange: "transform",
                        transform:
                          "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <a
                        href="/projects/omoskillo"
                        className="button w-inline-block is-secondary"
                      >
                        <div>View case study</div>
                        <div className="button-hover-bg-two" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project_item-negative">
                  <div className="project_single-item">
                    <a
                      href="/projects/omostate"
                      className="project_figure position-relative overflow-hidden w-inline-block"
                    >
                      <img
                        className="cover-image"
                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b096e2d2812e66e167f5ae_omostate-application-mockup-low.webp"
                        data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b096e2eca50e5956c77842_omostate-application-mockup-high.jpg"
                        alt="omoskillo website mockup"
                        width={614}
                        height={576}
                        loading="lazy"
                        fetchpriority="low"
                        decoding="async"
                      />
                    </a>
                    <div className="project_content">
                      <h3 className="heading-style-h2">
                        <div className="display-inline">Omostate Real estate </div>
                        <div className="display-inline text-style-secondary-font">
                          Application design
                        </div>
                      </h3>
                      <div
                        className="is-magnatic"
                        style={{
                          willChange: "transform",
                          transform:
                            "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <a
                          href="/projects/omostate"
                          className="button w-inline-block is-secondary"
                        >
                          <div>View case study</div>
                          <div className="button-hover-bg-two" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project_single-item">
                  <a
                    href="/projects/omoskillo"
                    className="project_figure position-relative overflow-hidden w-inline-block"
                  >
                    <img
                      className="cover-image"
                      src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b0976a39cf14b1edd4a611_omoskillo-app-design-mockup-low.webp"
                      data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b0976bc569e1e4c9944a00_omoskillo-app-design-mockup-high.jpg"
                      alt="omoskillo website mockup"
                      width={614}
                      height={576}
                      loading="lazy"
                      fetchpriority="low"
                      decoding="async"
                    />
                  </a>
                  <div className="project_content">
                    <h3 className="heading-style-h2">
                      <div className="display-inline">Omoskillo E-learning </div>
                      <div className="display-inline text-style-secondary-font">
                        App design
                      </div>
                    </h3>
                    <div
                      className="is-magnatic"
                      style={{
                        willChange: "transform",
                        transform:
                          "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <a
                        href="/projects/omoskillo"
                        className="button w-inline-block is-secondary"
                      >
                        <div>View case study</div>
                        <div className="button-hover-bg-two" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project_single-item">
                  <a
                    href="#"
                    className="project_figure position-relative overflow-hidden w-inline-block"
                  >
                    <img
                      className="cover-image"
                      src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b097fd5aa2c7918f1a89d0_mymenu-clickpro-mockup-low.webp"
                      data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b097fda3b03ecab8bdce3b_mymenu-clickpro-mockup-high.jpg"
                      alt="omoskillo website mockup"
                      width={614}
                      height={576}
                      loading="lazy"
                      fetchpriority="low"
                      decoding="async"
                    />
                  </a>
                  <div className="project_content">
                    <h3 className="heading-style-h2">
                      <div className="display-inline">Mymanu clikpro </div>
                      <div className="display-inline text-style-secondary-font">
                        Product design
                      </div>
                    </h3>
                    <div
                      className="is-magnatic"
                      style={{
                        willChange: "transform",
                        transform:
                          "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <a href="#" className="button w-inline-block is-secondary">
                        <div>View case study</div>
                        <div className="button-hover-bg-two" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="margin-top margin-xlarge">
                <div className="display-flex is-center">
                  <div
                    className="is-magnatic"
                    style={{
                      willChange: "transform",
                      transform:
                        "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <a
                      data-w-id="8bb02b6a-0dfa-c39d-4ebf-2f7056810763"
                      href="/projects"
                      className="button is-small w-inline-block"
                    >
                      <div className="button-text">View all work</div>
                      <div
                        className="button-hover-bg"
                        style={{
                          transform:
                            "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                      ></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section_dark">
          <section className="section_core-service">
            <div className="padding-global padding-section is-top-0">
              <div className="container-large">
                <div className="section_header is-center">
                  <h2 className="section_title heading-style-h1 text-color-alternate">
                    Core <span className="text-style-secondary-font">Services</span>
                  </h2>
                </div>
                <div className="core-service_grid">
                  <div className="core-service_left display-vertical is-left">
                    <a
                      href="/sevices/service-one"
                      className="core-service_link is-active w-inline-block display-flex position-relative"
                    >
                      <div className="core-service_content display-flex is-left">
                        <div className="heading-style-h3">01</div>
                        <h3 className="heading-style-h2">Website &amp; Branding</h3>
                      </div>
                      <div className="core-service_icon display-flex is-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M12.129 9.9165L3 9.9165L3 8.4165L12.129 8.4165L8.106 4.3935L9.1665 3.333L15 9.1665L9.1665 15L8.106 13.9395L12.129 9.9165Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="core-service-border position-absolute" />
                    </a>
                    <a
                      href="/sevices/mobile-application-design"
                      className="core-service_link w-inline-block display-flex position-relative"
                    >
                      <div className="core-service_content display-flex is-left">
                        <div className="heading-style-h3">02</div>
                        <h3 className="heading-style-h2">Mobile Apps</h3>
                      </div>
                      <div className="core-service_icon display-flex is-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M12.129 9.9165L3 9.9165L3 8.4165L12.129 8.4165L8.106 4.3935L9.1665 3.333L15 9.1665L9.1665 15L8.106 13.9395L12.129 9.9165Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="core-service-border position-absolute" />
                    </a>
                    <a
                      href="/sevices/web-application"
                      className="core-service_link w-inline-block display-flex position-relative"
                    >
                      <div className="core-service_content display-flex is-left">
                        <div className="heading-style-h3">03</div>
                        <h3 className="heading-style-h2">Web Application</h3>
                      </div>
                      <div className="core-service_icon display-flex is-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M12.129 9.9165L3 9.9165L3 8.4165L12.129 8.4165L8.106 4.3935L9.1665 3.333L15 9.1665L9.1665 15L8.106 13.9395L12.129 9.9165Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="core-service-border position-absolute" />
                    </a>
                    <a
                      href="/service-two"
                      className="core-service_link w-inline-block display-flex position-relative"
                    >
                      <div className="core-service_content display-flex is-left">
                        <div className="heading-style-h3">04</div>
                        <h3 className="heading-style-h2">Webflow Developement</h3>
                      </div>
                      <div className="core-service_icon display-flex is-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M12.129 9.9165L3 9.9165L3 8.4165L12.129 8.4165L8.106 4.3935L9.1665 3.333L15 9.1665L9.1665 15L8.106 13.9395L12.129 9.9165Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="core-service-border position-absolute" />
                    </a>
                  </div>
                  <div
                    id="w-node-_5e8c2d7b-72f2-7980-36ac-aae6922ec255-42cbb208"
                    className="core-service_right display-vertical"
                  >
                    <div className="core-service_media">
                      <figure className="core-service_figure is-active position-relative overflow-hidden">
                        <img
                          className="cover-image"
                          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b1f4e6d7d4e41d3a380f52_core-service-1-low.webp"
                          data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b1f4e6db0bda26bd26cacd_core-service-1-high.jpg"
                          alt=""
                          width={388}
                          height={243}
                          loading="lazy"
                          fetchpriority="low"
                          decoding="async"
                        />
                      </figure>
                      <figure className="core-service_figure position-relative overflow-hidden">
                        <img
                          className="cover-image"
                          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706942a9764c6d4d158f2_core-service-mobile-app-low.webp"
                          data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d70694bedede1779d8aa3c_core-service-mobile-app-high.jpg"
                          alt=""
                          width={388}
                          height={243}
                          loading="lazy"
                          fetchpriority="low"
                          decoding="async"
                        />
                      </figure>
                      <figure className="core-service_figure position-relative overflow-hidden">
                        <img
                          className="cover-image"
                          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706c08d1c3060ecb941c7_core-service-web-app-low.webp"
                          data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706c06561d1219bf28746_core-service-web-app-high.jpg"
                          alt=""
                          width={388}
                          height={243}
                          loading="lazy"
                          fetchpriority="low"
                          decoding="async"
                        />
                      </figure>
                      <figure className="core-service_figure position-relative overflow-hidden">
                        <img
                          className="cover-image"
                          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706f0f53741a37050423c_core-service-webflow-low.webp"
                          data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d706f0a79f0c901c03469c_core-service-webflow-high.jpg"
                          alt=""
                          width={388}
                          height={243}
                          loading="lazy"
                          fetchpriority="low"
                          decoding="async"
                        />
                      </figure>
                    </div>
                    <div className="core-service_right_content-wrap">
                      <div className="core-service_right_content is-active">
                        <h3 className="heading-style-h2 text-color-alternate">
                          Website &amp; Branding
                        </h3>
                        <p className="core-service_text body-l">
                          Experience <strong>responsive web design</strong>,{" "}
                          <strong>custom branding packages</strong>, and
                          <strong>user-centric website development</strong> tailored
                          to your business goals.
                        </p>
                        <div
                          className="is-magnatic"
                          style={{
                            willChange: "transform",
                            transform:
                              "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <a
                            data-w-id="8b01261a-02a7-00c6-a0f5-03418c16637e"
                            href="/sevices/service-one"
                            className="footer_social-link is-service w-inline-block"
                          >
                            <div>Learn More</div>
                            <div className="footer_social-overlay" />
                            <div
                              style={{
                                transform:
                                  "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                                transformStyle: "preserve-3d"
                              }}
                              className="button-hover-bg"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="core-service_right_content">
                        <h3 className="heading-style-h2 text-color-alternate">
                          Mobile Apps
                        </h3>
                        <p className="core-service_text body-l">
                          Delivering user-centric solutions that combine creativity
                          with strategy to drive business growth
                        </p>
                        <div
                          className="is-magnatic"
                          style={{
                            willChange: "transform",
                            transform:
                              "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <a
                            data-w-id="74b1622e-a2d0-bbf4-0006-e83ceba3ac0f"
                            href="/sevices/mobile-application-design"
                            className="footer_social-link is-service w-inline-block"
                          >
                            <div>Learn More</div>
                            <div className="footer_social-overlay" />
                            <div
                              style={{
                                transform:
                                  "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                                transformStyle: "preserve-3d"
                              }}
                              className="button-hover-bg"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="core-service_right_content">
                        <h3 className="heading-style-h2 text-color-alternate">
                          Web Application
                        </h3>
                        <p className="core-service_text body-l">
                          Delivering user-centric solutions that combine creativity
                          with strategy to drive business growth
                        </p>
                        <div
                          className="is-magnatic"
                          style={{
                            willChange: "transform",
                            transform:
                              "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <a
                            data-w-id="c364578e-4cd2-13a0-0ff5-fee5181e4bb7"
                            href="/sevices/web-application"
                            className="footer_social-link is-service w-inline-block"
                          >
                            <div>Learn More</div>
                            <div className="footer_social-overlay" />
                            <div
                              style={{
                                transform:
                                  "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                                transformStyle: "preserve-3d"
                              }}
                              className="button-hover-bg"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="core-service_right_content">
                        <h3 className="heading-style-h2 text-color-alternate">
                          Webflow Developement
                        </h3>
                        <p className="core-service_text body-l">
                          Delivering user-centric solutions that combine creativity
                          with strategy to drive business growth
                        </p>
                        <div
                          className="is-magnatic"
                          style={{
                            willChange: "transform",
                            transform:
                              "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <a
                            data-w-id="4376dfb3-2db8-372e-be2f-c27aa1f8389c"
                            href="/service-two"
                            className="footer_social-link is-service w-inline-block"
                          >
                            <div>Learn More</div>
                            <div className="footer_social-overlay" />
                            <div
                              style={{
                                transform:
                                  "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                                transformStyle: "preserve-3d"
                              }}
                              className="button-hover-bg"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section_testimonial overflow-hidden">
            <div className="padding-global">
              <div className="container-large">
                <div className="section_header is-center">
                  <h2 className="section_title heading-style-h1 text-color-alternate">
                    Loved by{" "}
                    <span className="text-style-secondary-font">Hundreds</span>
                  </h2>
                </div>
                <div className="testimonail_grid">
                  <div className="testimonial-swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-886eb78f1a1756d1"
                      aria-live="polite"
                    >
                      <div
                        className="swiper-slide swiper-slide-active"
                        role="group"
                        aria-label="1 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Omotive Design Agency did an outstanding job designing
                              the websites for Nassummit, Nashouse, Nastravel, and
                              Nasdaily. The sites are intuitive, visually engaging,
                              and perfectly aligned with our brand. Highly
                              recommend!
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                              loading="lazy"
                              alt="Nasir Yassin"
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Nuseir Yassin
                              </div>
                              <div className="testimonail_author_designation">
                                Founder &amp; CEO at Nas Company
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide swiper-slide-next"
                        role="group"
                        aria-label="2 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Was a pleasure working with Omotive on launching
                              ExitStack.&nbsp;&nbsp;They understood the vision and
                              worked efficiently, with great communications, to
                              execute it.&nbsp;&nbsp;Looking forward to working with
                              them again!
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b306fbc1a90c60620ce1b6_Rahat%20Ahmed.png"
                              loading="lazy"
                              alt="Rahat Ahamed"
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Rahat Ahmed
                              </div>
                              <div className="testimonail_author_designation">
                                Founding CEO, Anchorless Bangladesh
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide"
                        role="group"
                        aria-label="3 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Omotive's expertise to detail made the Mymanu Airbuds
                              interface innovative and user-friendly. Their
                              understanding of our vision and commitment to
                              human-centered design exceeded our expectations. I
                              highly recommend Omotive for their creativity,
                              technical skill, and user-focused approach. We look
                              forward to future collaborations.
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b3073e37c5fce4f02305c9_danny-menu.png"
                              loading="lazy"
                              alt="Danny Menu"
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Danny Manu
                              </div>
                              <div className="testimonail_author_designation">
                                Founder &amp; CEO, mymanu
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    />
                  </div>
                  <div className="testimonial-swiper hide-tablet swiper-initialized swiper-horizontal swiper-backface-hidden">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-29faa469f5f11f16"
                      aria-live="polite"
                    >
                      <div
                        className="swiper-slide swiper-slide-active"
                        role="group"
                        aria-label="1 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Omotive design agency took the time to understand my
                              industry. They knew what our visitors wanted, and they
                              did an exceptional job to meet those needs. We've seen
                              great improvements in impression and conversion after
                              the redesign. I vouch for them!
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4211329b6fc32d099d2b1_arifur-rahaman.png"
                              loading="lazy"
                              alt="arifur rahaman "
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Arifur Rahaman
                              </div>
                              <div className="testimonail_author_designation">
                                CEO at ReviewXpo
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide swiper-slide-next"
                        role="group"
                        aria-label="2 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Omotive has a structured process for UI/UX design.
                              Their human centered design approach the key for us to
                              collaborate. They delivered on their promises very
                              well and was open to constructive feedback. Our
                              project came out according to our expectations and I
                              would recommend them for web design.
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42131553bf680ce6418b6_Ishti-alam.png"
                              loading="lazy"
                              alt="Ishti Alam"
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Ishti Alam
                              </div>
                              <div className="testimonail_author_designation">
                                Investments at Anchorless Bangladesh
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="swiper-slide"
                        role="group"
                        aria-label="3 / 3"
                        style={{ width: 408, marginRight: 24 }}
                      >
                        <div className="testimonail_item is-dark">
                          <div className="testimonail_content">
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
                            <p className="testimonail_text">
                              Mufidul is an exceptional product designer with
                              passion to make something very unique. Through working
                              with him we developed a great friendship. He has a
                              firm grasp for the vision of the project and will take
                              the initiative to see it flourish. I am excited to
                              continue working with him into the future!
                            </p>
                          </div>
                          <div className="testimonail_author">
                            <img
                              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67cfe710ff85e927f4fb2fa3_damien-haris.png"
                              loading="lazy"
                              alt=""
                              className="testimonail_author-image"
                            />
                            <div className="testimonail_author-content">
                              <div className="testimonail_author_name body-l">
                                Damien Harris
                              </div>
                              <div className="testimonail_author_designation">
                                Enterprise Technology at Bloomberg L.P
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <picture className="bg-absolute-shape">
            <source
              srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b31c19114d5e14877eb4c4_dark-section-bg-high-mobile.png"
              media="(max-width: 375px)"
            />
            <img
              className="cover-image"
              src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b31d0fa5f73003e7a9cff0_dark-section-bg-low-desktop.webp"
              data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b31cc3d36dc4f7094900a2_dark-section-bg-high-dekstop.png"
              alt=""
              width="100%"
              height="100%"
              loading="lazy"
              fetchpriority="low"
              decoding="async"
            />
          </picture>
          <img
            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern.png"
            loading="lazy"
            sizes="100vw"
            srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern-p-500.png 500w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern-p-800.png 800w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern-p-1080.png 1080w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b32472eff2002c12ff78b7_dark-section-pattern.png 1440w"
            alt=""
            className="dark_bg-pattern"
          />
        </section>
        <section className="section_articles">
          <div className="padding-global padding-section">
            <div className="container-large">
              <div className="section_header is-center">
                <h2 className="section_title heading-style-h1">
                  <span className="text-style-secondary-font">Book a free</span>{" "}
                  Call{" "}
                </h2>
              </div>
              <div className="booking-embed">
                <div className="code-embed w-embed w-script">
                  {/* Cal inline embed code begins */}
                  <div
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    id="my-cal-inline-30min"
                    className="cal-inline-container"
                  >
                    <cal-inline
                      data-theme="light"
                      data-layout="month_view"
                      style={{
                        maxHeight: "inherit",
                        height: "inherit",
                        minHeight: "inherit",
                        display: "flex",
                        position: "relative",
                        flexWrap: "wrap",
                        width: "100%"
                      }}
                      className="cal-element-embed-light"
                      loading="done"
                    >
                      <iframe
                        className="cal-embed"
                        name="cal-embed=30min"
                        title="Book a call"
                        data-cal-link="mufidul-tapadar-nwmykh/30min"
                        allow="payment"
                        src="https://app.cal.com/mufidul-tapadar-nwmykh/30min/embed?embed=30min&layout=month_view&theme=light&embedType=inline"
                        style={{ height: 570, width: "100%" }}
                      />
                    </cal-inline>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n                                        .cal-inline-container::-webkit-scrollbar {\n                                            display: none\n                                        }\n\n                                        .cal-inline-container {\n                                            scrollbar-width: none\n                                        }\n                                    "
                      }}
                    />
                  </div>
                  {/* Cal inline embed code ends */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer_component">
        <div className="padding-global">
          <div className="container-large">
            <div className="footer_spacer">
              <div className="footer_top">
                <h2 className="footer_title heading-style-h1 text-color-alternate">
                  Let’s create{" "}
                  <span className="text-style-secondary-font">
                    Something together
                  </span>
                </h2>
                <div className="footer_cta">
                  <div
                    cl=""
                    className="footer_cta_content display-vertical is-left"
                  >
                    <a
                      href="#"
                      className="copy-email-wrapper copy-parent w-inline-block"
                    >
                      <div
                        id="textToCopy"
                        className="footer_cta_text text-color-alternate"
                      >
                        mufidul@omotive.co
                      </div>
                      <div className="copy-button display-vertical  is-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 25 24"
                          fill="none"
                          className="copy-button-icon"
                        >
                          <path
                            d="M16.5 12.9V17.1C16.5 20.6 15.1 22 11.6 22H7.4C3.9 22 2.5 20.6 2.5 17.1V12.9C2.5 9.4 3.9 8 7.4 8H11.6C15.1 8 16.5 9.4 16.5 12.9Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bottom-path"
                          />
                          <path
                            d="M22.5 6.9V11.1C22.5 14.6 21.1 16 17.6 16H16.5V12.9C16.5 9.4 15.1 8 11.6 8H8.5V6.9C8.5 3.4 9.9 2 13.4 2H17.6C21.1 2 22.5 3.4 22.5 6.9Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="top-path"
                          />
                        </svg>
                        <div gradient={1} className="copy-button-overlay" />
                      </div>
                      <div gradient={1} className="copy-result">
                        <div>copied!</div>
                      </div>
                    </a>
                    <div
                      className="is-magnatic"
                      style={{
                        willChange: "transform",
                        transform:
                          "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <a
                        data-w-id="8bb02b6a-0dfa-c39d-4ebf-2f7056810763"
                        href="/book-a-call"
                        className="button is-small w-inline-block is-gradient"
                      >
                        <div className="button-text">Book a free call</div>
                        <div
                          className="button-hover-bg"
                          style={{
                            transform:
                              "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d"
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>
                  <figure className="footer_cta_figure">
                    <img
                      className="cover-image"
                      src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42ec1622de67a399d8e34_mofidul-tapadar.webp"
                      data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42bec2143b3e4e58b5c93_mofidul-tapadar.jpg"
                      alt=""
                      width={186}
                      height={155}
                      loading="lazy"
                      fetchpriority="low"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="footer_middle">
              <div className="footer_middle-left">
                <a
                  href="/"
                  aria-current="page"
                  className="footer_logo-link w-inline-block w--current"
                >
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67ac925dc3a152594b6bcc01_logo.svg"
                    loading="lazy"
                    alt="Omotive Logo"
                  />
                </a>
                <p className="footer_text text-color-alternate">
                  Delivering user-centric solutions that&nbsp;&nbsp;combine
                  creativity with strategy to drive business growth
                </p>
              </div>
              <div className="footer_middle-right">
                <div className="heading-style-h3 text-color-alternate">Socials</div>
                <div className="footer_social-link-wrapper">
                  <div
                    className="is-magnatic"
                    style={{
                      willChange: "transform",
                      transform:
                        "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <a
                      data-w-id="1dc7bf29-b59a-c97d-ec7d-00e476be4559"
                      href="https://dribbble.com/designopsagency"
                      target="_blank"
                      className="footer_social-link w-inline-block"
                    >
                      <div>Dribbble</div>
                      <div className="footer_social-overlay" />
                      <div
                        className="button-hover-bg"
                        style={{
                          transform:
                            "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                      ></div>
                    </a>
                  </div>
                  <div
                    className="is-magnatic"
                    style={{
                      willChange: "transform",
                      transform:
                        "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <a
                      data-w-id="1dc7bf29-b59a-c97d-ec7d-00e476be455d"
                      href="https://www.behance.net/designopsagency"
                      target="_blank"
                      className="footer_social-link w-inline-block"
                    >
                      <div>Behance</div>
                      <div className="footer_social-overlay" />
                      <div
                        className="button-hover-bg"
                        style={{
                          transform:
                            "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                      ></div>
                    </a>
                  </div>
                  <div
                    className="is-magnatic"
                    style={{
                      willChange: "transform",
                      transform:
                        "translate3d(0rem, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <a
                      data-w-id="1dc7bf29-b59a-c97d-ec7d-00e476be4561"
                      href="https://www.linkedin.com/company/omotive-agency/?viewAsMember=true"
                      target="_blank"
                      className="footer_social-link w-inline-block"
                    >
                      <div>Linkedin</div>
                      <div className="footer_social-overlay" />
                      <div
                        className="button-hover-bg"
                        style={{
                          transform:
                            "translate3d(0px, 130%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                          transformStyle: "preserve-3d"
                        }}
                      ></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer_bottom">
              <div className="footer_service-menu">
                <a
                  href="https://clutch.co/profile/omotive#highlights"
                  target="_blank"
                  className="clutch-link w-inline-block"
                >
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b02ff19b0ad6a3fb5ba114_clutch-logo.svg"
                    loading="lazy"
                    alt="clutch logo"
                  />
                </a>
                <div className="footer_service-link-wrap">
                  <a
                    href="/"
                    aria-current="page"
                    className="text-weight-medium text-color-alternate w--current"
                  >
                    Home
                  </a>
                  <a href="/about" className="footer_service-link">
                    About
                  </a>
                  <a href="/services" className="footer_service-link">
                    Services
                  </a>
                  <a href="/services" className="footer_service-link">
                    Projects
                  </a>
                  <a href="/contact" className="footer_service-link">
                    Contact
                  </a>
                </div>
              </div>
              <div className="footer_divider" />
              <div className="footer_copyright">
                <a href="#" className="download-button w-inline-block">
                  <div gradient={1} className="download-button_text">
                    Download deck
                  </div>
                  <img
                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d9261eb0261c57f846fabb_arrow-up.svg"
                    loading="lazy"
                    alt=""
                  />
                </a>
                <div className="footer_copyright-text">Made with Love in NYC ❤</div>
                <a href="#header" className="back-to-top w-inline-block w--current">
                  <div>Back to top</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="bac-to-top-arrow"
                  >
                    <path
                      d="M11.6199 8.77888L7.81655 4.97555C7.36738 4.52638 6.63238 4.52638 6.18322 4.97555L2.37988 8.77888"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <picture className="bg-absolute-shape">
          <source
            srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f16dc9f1294ba1936b7fc_footer-gradient-bg-shape-mobil.png"
            media="(max-width: 375px)"
          />
          <img
            className="cover-image"
            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f167b98ff3be489cafd02_footer-gradient-bg-shape-low.webp"
            data-lazy-src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f15e0b040e507611785eb_footer-gradient-bg-shape.png"
            alt=""
            width="100%"
            height="100%"
            loading="lazy"
            fetchpriority="low"
            decoding="async"
          />
        </picture>
        <img
          src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern.png"
          loading="lazy"
          sizes="100vw"
          srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern-p-500.png 500w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern-p-800.png 800w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern-p-1080.png 1080w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f1810b655b374941bb843_footer-pattern.png 1440w"
          alt=""
          className="pattern-bg pointer-events-none"
        />
      </footer>
    </div>
  );
};

export default Index;
