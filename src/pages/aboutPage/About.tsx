const About = () => {
    return (
        <div className="page-wrapper">
            <nav className="nav_component">
                <div className="padding-global">
                    <div className="container-large">
                        <div className="nav_wrapper">
                            <a href="/" className="nav_logo-link w-inline-block">
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
                                            <a
                                                href="/about"
                                                aria-current="page"
                                                className="nav_link w--current"
                                            >
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
                                aria-current="page"
                                className="mobile-menu_list_item w-inline-block w--current"
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
                <header className="section_other-header">
                    <div className="padding-global padding-xxlarge">
                        <div className="container-large">
                            <div className="header_component">
                                <div className="header_content">
                                    <h1 className="home-header_title">
                                        <div className="display-inline">
                                            Elevating Brands with<span className="br"> </span>
                                        </div>
                                        <div className="display-inline text-style-secondary-font">
                                            UX/UI &amp; Identity Design
                                        </div>
                                    </h1>
                                    <div className="home-header_content-inner display-vertical is-left">
                                        <p className="header-text text-size-large">
                                            We turn your vision into reality with business-focused UX/UI
                                            and brand-identity designs, helping startups and brands craft
                                            unforgettable experiences with lasting impact
                                        </p>
                                    </div>
                                </div>
                                <figure className="header_media position-relative overflow-hidden">
                                    <img
                                        className="cover-image"
                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b45853da2cccf3e5aa1767_about-hero-high-quality.jpg"
                                        alt="Omotive"
                                        width={1290}
                                        height={644}
                                        loading="eager"
                                        fetchpriority="high"
                                        decoding="sync"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="section_experiance">
                    <div className="padding-global padding-section">
                        <div className="container-large">
                            <div className="header_content">
                                <h2 className="section_title heading-style-h1">
                                    Turning Ideas into<span className="br"></span>Successful business
                                    <span className="br"> </span>
                                    <span className="text-style-secondary-font">that drive</span> ROI
                                </h2>
                                <p className="section-text text-size-large">
                                    We specialize in turning innovative ideas into thriving businesses
                                    with exceptional UX/UI and brand-identity design. We craft
                                    user-centered experiences that captivate and strengthen brands
                                </p>
                            </div>
                            <div className="experiance_grid">
                                <div className="experiance_card display-vertical is-center">
                                    <div className="experiance_card_content text-align-center">
                                        <div className="heading-style-h2">2.3M</div>
                                        <div className="experiance_card_text">Client raised</div>
                                    </div>
                                </div>
                                <div className="experiance_card display-vertical is-center">
                                    <div className="experiance_card_content text-align-center">
                                        <div className="heading-style-h2">100%</div>
                                        <div className="experiance_card_text">Client Satisfaction</div>
                                    </div>
                                </div>
                                <div className="experiance_card display-vertical is-center">
                                    <div className="experiance_card_content text-align-center">
                                        <div className="heading-style-h2">50+</div>
                                        <div className="experiance_card_text">Projects completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_operations">
                    <div className="padding-global padding-section is-top-0">
                        <div className="container-large">
                            <div className="operation_grid">
                                <div
                                    id="w-node-_71bf2356-68f2-0b8e-31a5-7052f3b832e5-45375106"
                                    className="operation_content display-vertical is-left"
                                >
                                    <div className="margin-bottom margin-medium">
                                        <h2 className="heading-style-h1">
                                            What <span className="text-style-secondary-font">We do</span>
                                        </h2>
                                    </div>
                                    <p className="operation_text text-size-large">
                                        We help businesses thrive by transforming their digital presence
                                        with purposeful design. Whether you're a startup or an
                                        established brand, we specialize in creating websites, intuitive
                                        interfaces, and brand identities that drive real growth.
                                        <br />
                                        <br />
                                        We focus on solutions that deliver results—boosting engagement,
                                        increasing conversions, and driving ROI. By combining strategic
                                        UX/UI design and brand development, we bring your vision to life
                                        and strengthen your market position.
                                    </p>
                                    <div className="margin-top margin-large">
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
                                                <div className="button-text">View all project</div>
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
                                <figure className="operation_media position-relative overflow-hidden">
                                    <img
                                        className="cover-image"
                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4732f3d80550bd7fd61b7_about-work.jpg"
                                        alt=""
                                        width={614}
                                        height={488}
                                        loading="lazy"
                                        fetchpriority="low"
                                        decoding="async"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_core-values">
                    <div className="padding-global padding-section is-top-0">
                        <div className="container-large">
                            <div className="section_header is-center">
                                <h2 className="section_title heading-style-h1">
                                    Our <span className="text-style-secondary-font">Core Values</span>
                                </h2>
                            </div>
                            <div className="core-value_gird">
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b475a572811e4459f4e09a_static-design-icon.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">Strategic design</h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We approach every project with dedication and care, treating it
                                        as our own to deliver impactful designs and exceptional results
                                    </p>
                                </div>
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d9231d2e7b3b0c3f05841d_ego-free.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">Ego-free focus</h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We’re a collaborative and open-minded team that creates
                                        exceptional designs by embracing every voice and idea
                                    </p>
                                </div>
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d92340de8dc811a08388d8_graph.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">Lead with innovation</h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We embrace challenges as opportunities to innovate, grow, and
                                        deliver impactful solutions through collaboration and
                                        creativity.
                                    </p>
                                </div>
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67c14cf45a3dd5cefd23b615_chrome-extention.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">Expect the Best</h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We build real connections through trust, kindness, and open
                                        talks, making every interaction simple and smooth
                                    </p>
                                </div>
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67d923bb330856358443adf5_file.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">
                                            Deliver best Every Time
                                        </h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We strive for excellence in every detail, delivering results
                                        that reflect our passion and commitment to quality
                                    </p>
                                </div>
                                <div className="core-value_card">
                                    <div className="margin-bottom margin-custom1">
                                        <img
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b6feaff171efceff6d1921_expansion-icon.svg"
                                            loading="lazy"
                                            alt=""
                                        />
                                    </div>
                                    <div className="margin-bottom margin-custom2">
                                        <h3 className="core-value_card_title">Empathy-driven design</h3>
                                    </div>
                                    <p className="core-value_card_text">
                                        We listen with empathy, value diverse perspectives, and connect
                                        with people through openness and understanding
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section_process">
                    <div className="padding-global">
                        <div className="container-large">
                            <div className="header_content">
                                <h2 className="section_title heading-style-h1 text-color-alternate">
                                    Proven Work Process&nbsp;&nbsp;for
                                    <span className="br hide-mobile-portrait"> </span>
                                    <span className="text-style-secondary-font">
                                        Delivering Exceptional
                                    </span>
                                    <span className="br hide-mobile-portrait"> </span>
                                    <span className="text-style-secondary-font">Results</span>
                                </h2>
                                <p className="section-text text-color-alternate">
                                    Our streamlined work process ensures exceptional results, focusing
                                    on efficiency, collaboration, and quality at every step
                                </p>
                            </div>
                            <div className="process_item_grid">
                                <div className="process_item display-flex is-center">
                                    <div className="process_item_content">
                                        <div>//001</div>
                                        <h3 className="process_item_title heading-style-h2">
                                            Identify Your Business Challenges
                                        </h3>
                                        <p className="body-l">
                                            Identify key challenges and create tailored solutions to drive
                                            your business forward
                                        </p>
                                    </div>
                                    <div className="process_item_icon-wrapper">
                                        <div className="process_item_icon display-flex is-center">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b577a45d72d1df495cccb0_business-step-icon.svg"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </div>
                                        <div className="process_item_button">
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
                                                    className="button is-small w-inline-block is-gradient"
                                                >
                                                    <div className="button-text">View all project</div>
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
                                    <div className="core-service-border position-absolute pointer-events-none" />
                                </div>
                                <div className="process_item display-flex is-center">
                                    <div className="process_item_content">
                                        <div>//002</div>
                                        <h3 className="process_item_title heading-style-h2">
                                            Discover Effective Solutions
                                        </h3>
                                        <p className="body-l">
                                            Find tailored solutions to solve your challenges and boost
                                            your business growth
                                        </p>
                                    </div>
                                    <div className="process_item_icon-wrapper">
                                        <div className="process_item_icon display-flex is-center">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b577a45d72d1df495cccb0_business-step-icon.svg"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </div>
                                        <div className="process_item_button">
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
                                                    className="button is-small w-inline-block is-gradient"
                                                >
                                                    <div className="button-text">View all project</div>
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
                                    <div className="core-service-border position-absolute pointer-events-none" />
                                </div>
                                <div className="process_item display-flex is-center">
                                    <div className="process_item_content">
                                        <div>//003</div>
                                        <h3 className="process_item_title heading-style-h2">
                                            Mix Your Hope &amp; Our Creativity
                                        </h3>
                                        <p className="body-l">
                                            Combining your vision with our creativity to deliver
                                            outstanding results
                                        </p>
                                    </div>
                                    <div className="process_item_icon-wrapper">
                                        <div className="process_item_icon display-flex is-center">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57966ce0989b332aa83a3_eye-search-icon.svg"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </div>
                                        <div className="process_item_button">
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
                                                    className="button is-small w-inline-block is-gradient"
                                                >
                                                    <div className="button-text">View all project</div>
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
                                    <div className="core-service-border position-absolute pointer-events-none" />
                                </div>
                                <div className="process_item display-flex is-center">
                                    <div className="process_item_content">
                                        <div>//004</div>
                                        <h3 className="process_item_title heading-style-h2">
                                            Deliver Outstanding Result
                                        </h3>
                                        <p className="body-l">
                                            Delivering high-quality results that exceed expectations and
                                            drive success
                                        </p>
                                    </div>
                                    <div className="process_item_icon-wrapper">
                                        <div className="process_item_icon display-flex is-center">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57a72027be6ac0c422f7f_result-sheet-icon.svg"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </div>
                                        <div className="process_item_button">
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
                                                    className="button is-small w-inline-block is-gradient"
                                                >
                                                    <div className="button-text">View all project</div>
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
                                    <div className="core-service-border position-absolute pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57ca4658f71648983ee29_process-section-bg.png"
                        loading="lazy"
                        sizes="(max-width: 1440px) 100vw, 1440px"
                        srcSet="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57ca4658f71648983ee29_process-section-bg-p-500.png 500w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57ca4658f71648983ee29_process-section-bg-p-800.png 800w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57ca4658f71648983ee29_process-section-bg-p-1080.png 1080w, https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b57ca4658f71648983ee29_process-section-bg.png 1440w"
                        alt=""
                        className="process_bg-gradient"
                    />
                </section>
                <section className="section_team-member">
                    <div className="padding-global padding-section">
                        <div className="container-large">
                            <div className="section_header is-center">
                                <h2 className="section_title heading-style-h1">
                                    Behind the{" "}
                                    <span className="text-style-secondary-font">Magic</span>
                                </h2>
                            </div>
                            <div className="team-member_grid">
                                <div className="team-member_card">
                                    <figure className="team-member_figure position-relative overflow-hidden">
                                        <img
                                            className="cover-image"
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b47fff6ddf7a8b6dd37239_mufidul%20islam%20tapadar%20high%20quality.jpg"
                                            alt="Founder & Lead product designer"
                                            width={408}
                                            height={425}
                                            loading="lazy"
                                            fetchpriority="low"
                                            decoding="async"
                                        />
                                    </figure>
                                    <div className="team-member_info display-vertical">
                                        <h3 className="heading-style-h2">Mufidul islam tapadar</h3>
                                        <div className="team-member_designation">
                                            Founder &amp; Lead product designer
                                        </div>
                                    </div>
                                </div>
                                <div className="team-member_card">
                                    <figure className="team-member_figure position-relative overflow-hidden">
                                        <img
                                            className="cover-image"
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/688850a9e6e61ea20272cd4b_saim-ahammed-high.jpg"
                                            alt="Business developer"
                                            width={408}
                                            height={425}
                                            loading="lazy"
                                            fetchpriority="low"
                                            decoding="async"
                                        />
                                    </figure>
                                    <div className="team-member_info display-vertical">
                                        <h3 className="heading-style-h2">Siam Hossain</h3>
                                        <div className="team-member_designation">
                                            Business&nbsp;developer
                                        </div>
                                    </div>
                                </div>
                                <div className="team-member_card">
                                    <figure className="team-member_figure position-relative overflow-hidden">
                                        <img
                                            className="cover-image"
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b4817902030315b521d6c8_ahsanul-islam-tapadar-high-quality.jpg"
                                            alt="Head of design"
                                            width={408}
                                            height={425}
                                            loading="lazy"
                                            fetchpriority="low"
                                            decoding="async"
                                        />
                                    </figure>
                                    <div className="team-member_info display-vertical">
                                        <h3 className="heading-style-h2">Ahsanul islam tapadar</h3>
                                        <div className="team-member_designation">Head of design</div>
                                    </div>
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
                                            src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b42bec2143b3e4e58b5c93_mofidul-tapadar.jpg"
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
                                <a href="/" className="footer_logo-link w-inline-block">
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
                                    <a href="/" className="text-weight-medium text-color-alternate">
                                        Home
                                    </a>
                                    <a
                                        href="/about"
                                        aria-current="page"
                                        className="footer_service-link w--current"
                                    >
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
                                <a href="#" className="back-to-top w-inline-block">
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
                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/682f15e0b040e507611785eb_footer-gradient-bg-shape.png"
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

export default About;
