const Contact = () => {
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
                                        aria-current="page"
                                        className="button is-small w-inline-block w--current is-small"
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
                            aria-current="page"
                            className="button is-small w-inline-block w--current"
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
                <section className="section_contact">
                    <div className="padding-global padding-section">
                        <div className="container-large">
                            <div className="contact_grid">
                                <div className="contact_left display-vertical">
                                    <h1>
                                        Have a great idea<span className="br"> </span>
                                        <span className="text-style-secondary-font">
                                            Tell us about it.
                                        </span>
                                    </h1>
                                    <div>
                                        <div className="margin-bottom margin-small">
                                            <div className="body-xl text-color-secondary">
                                                Just say hello
                                            </div>
                                        </div>
                                        <a
                                            href="#"
                                            className="copy-email-wrapper copy-parent w-inline-block"
                                        >
                                            <div id="textToCopy2" className="footer_cta_text">
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
                                    <div
                                        tf-sliders="wrapper"
                                        className="client-testimonial-sliders-wrapper"
                                    >
                                        <div className="client-testimonial-navigation-slider-wrapper">
                                            <div
                                                tf-slider="navigation"
                                                className="client-testimonial-navigation-slider splide splide--loop splide--ttb splide--draggable splide--nav is-active is-initialized"
                                                id="splide02"
                                                role="region"
                                                aria-roledescription="carousel"
                                                style={{ height: "243.812px" }}
                                            >
                                                <div
                                                    className="splide__track splide__track--loop splide__track--ttb splide__track--draggable splide__track--nav"
                                                    id="splide02-track"
                                                    style={{ paddingTop: 0, paddingBottom: 0 }}
                                                >
                                                    <div
                                                        className="splide__list"
                                                        id="splide02-list"
                                                        role="presentation"
                                                        aria-orientation="vertical"
                                                        style={{ transform: "translateY(-488px)" }}
                                                    >
                                                        <div
                                                            className="splide__slide splide__slide--clone is-active"
                                                            id="splide02-clone01"
                                                            role="button"
                                                            aria-label="Go to slide 1"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-current="true"
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Nasir Yassin"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone"
                                                            id="splide02-clone02"
                                                            role="button"
                                                            aria-label="Go to slide 2"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Rahat ahmed"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone"
                                                            id="splide02-clone03"
                                                            role="button"
                                                            aria-label="Go to slide 3"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="danny menu"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone"
                                                            id="splide02-clone04"
                                                            role="button"
                                                            aria-label="Go to slide 4"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="damien haris"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-active"
                                                            id="splide02-clone05"
                                                            role="button"
                                                            aria-label="Go to slide 1"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-current="true"
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Nasir Yassin"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone"
                                                            id="splide02-clone06"
                                                            role="button"
                                                            aria-label="Go to slide 2"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Rahat ahmed"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone"
                                                            id="splide02-clone07"
                                                            role="button"
                                                            aria-label="Go to slide 3"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="danny menu"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-prev"
                                                            id="splide02-clone08"
                                                            role="button"
                                                            aria-label="Go to slide 4"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-hidden="true"
                                                            tabIndex={-1}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                                tabIndex={-1}
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="damien haris"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide is-active is-visible"
                                                            id="splide02-slide01"
                                                            role="button"
                                                            aria-label="Go to slide 1"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-controls="splide01-slide01"
                                                            aria-current="true"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Nasir Yassin"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide is-visible is-next"
                                                            id="splide02-slide02"
                                                            role="button"
                                                            aria-label="Go to slide 2"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-controls="splide01-slide02"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Rahat ahmed"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide is-visible"
                                                            id="splide02-slide03"
                                                            role="button"
                                                            aria-label="Go to slide 3"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-controls="splide01-slide03"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="danny menu"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide is-visible"
                                                            id="splide02-slide04"
                                                            role="button"
                                                            aria-label="Go to slide 4"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-controls="splide01-slide04"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="damien haris"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-active is-visible"
                                                            id="splide02-clone09"
                                                            role="button"
                                                            aria-label="Go to slide 1"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-current="true"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Nasir Yassin"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone10"
                                                            role="button"
                                                            aria-label="Go to slide 2"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Rahat ahmed"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone11"
                                                            role="button"
                                                            aria-label="Go to slide 3"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="danny menu"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone12"
                                                            role="button"
                                                            aria-label="Go to slide 4"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="damien haris"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-active is-visible"
                                                            id="splide02-clone13"
                                                            role="button"
                                                            aria-label="Go to slide 1"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            aria-current="true"
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Nasir Yassin"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67b2fb3d53859433ab0046c6_nuseir-yassin.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone14"
                                                            role="button"
                                                            aria-label="Go to slide 2"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={36}
                                                                        height={36}
                                                                        alt="Rahat ahmed"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone15"
                                                            role="button"
                                                            aria-label="Go to slide 3"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="danny menu"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="splide__slide splide__slide--clone is-visible"
                                                            id="splide02-clone16"
                                                            role="button"
                                                            aria-label="Go to slide 4"
                                                            style={{
                                                                marginBottom: 16,
                                                                height: "calc(25% - 12px)"
                                                            }}
                                                            tabIndex={0}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="client-testimonial-pagination"
                                                            >
                                                                <figure className="client-testimonial-meida">
                                                                    <img
                                                                        width={70}
                                                                        height={70}
                                                                        alt="damien haris"
                                                                        loading="lazy"
                                                                        src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                        className="client-testimonial-media-image"
                                                                    />
                                                                </figure>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar"
                                                                >
                                                                    <path
                                                                        d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 82 82"
                                                                    fill="none"
                                                                    className="client-testimonial-media-progressbar-progress"
                                                                >
                                                                    <path
                                                                        d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2.5"
                                                                        pathLength={100}
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="client-testimonial-content-slider-wrapper">
                                            <div
                                                tf-slider="content"
                                                className="client-testimonial-content-slider splide splide--fade splide--ltr splide--draggable is-active is-overflow is-initialized"
                                                id="splide01"
                                                role="region"
                                                aria-roledescription="carousel"
                                            >
                                                <div
                                                    className="splide__track splide__track--fade splide__track--ltr splide__track--draggable"
                                                    id="splide01-track"
                                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                                    aria-live="polite"
                                                    aria-atomic="true"
                                                >
                                                    <div
                                                        className="splide__list"
                                                        id="splide01-list"
                                                        role="presentation"
                                                    >
                                                        <div
                                                            className="splide__slide is-active is-visible"
                                                            id="splide01-slide01"
                                                            role="group"
                                                            aria-roledescription="slide"
                                                            aria-label="1 of 4"
                                                            style={{
                                                                width: "calc(100%)",
                                                                height: "auto",
                                                                transform: "translateX(0%)"
                                                            }}
                                                        >
                                                            <div className="client-testimonial-card">
                                                                <div className="client-testimonial-card-icon" />
                                                                <p className="client-testimonial-card-text">
                                                                    Omotive design agency took the time to understand
                                                                    my industry. They knew what our visitors wanted,
                                                                    and they did an exceptional job to meet those
                                                                    needs. We've seen great improvements in impression
                                                                    and conversion after the redesign. I vouch for
                                                                    them!
                                                                </p>
                                                                <div className="client-testimonial-card-footer">
                                                                    <div className="client-testimonial-card-user">
                                                                        <div className="client-testimonial-card-user-preview">
                                                                            <figure className="client-testimonial-meida">
                                                                                <img
                                                                                    width={70}
                                                                                    height={70}
                                                                                    alt="nasir hussain"
                                                                                    loading="lazy"
                                                                                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9c_user-testimonial-1.png"
                                                                                    className="client-testimonial-media-image"
                                                                                />
                                                                            </figure>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar"
                                                                            >
                                                                                <path
                                                                                    d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                                    fill="currentColor"
                                                                                />
                                                                            </svg>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar-progress"
                                                                            >
                                                                                <path
                                                                                    d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2.5"
                                                                                    pathLength={100}
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="client-testimonial-card-user-name text-bold">
                                                                                Nuseir Yassin
                                                                            </div>
                                                                            <div className="client-testimonial-card-user-designation">
                                                                                Founder &amp; CEO at Nas Company
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="splide__slide is-next"
                                                            id="splide01-slide02"
                                                            role="group"
                                                            aria-roledescription="slide"
                                                            aria-label="2 of 4"
                                                            style={{
                                                                width: "calc(100%)",
                                                                height: "auto",
                                                                transform: "translateX(-100%)"
                                                            }}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="client-testimonial-card">
                                                                <div className="client-testimonial-card-icon" />
                                                                <p className="client-testimonial-card-text">
                                                                    Was a pleasure working with Omotive on launching
                                                                    ExitStack.&nbsp;&nbsp;They understood the vision
                                                                    and worked efficiently, with great communications,
                                                                    to execute it.&nbsp;&nbsp;Looking forward to
                                                                    working with them again!
                                                                </p>
                                                                <div className="client-testimonial-card-footer">
                                                                    <div className="client-testimonial-card-user">
                                                                        <div className="client-testimonial-card-user-preview">
                                                                            <figure className="client-testimonial-meida">
                                                                                <img
                                                                                    width={70}
                                                                                    height={70}
                                                                                    alt="Rahat ahmed"
                                                                                    loading="lazy"
                                                                                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fe9f_user-testimonial-2.png"
                                                                                    className="client-testimonial-media-image"
                                                                                />
                                                                            </figure>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar"
                                                                            >
                                                                                <path
                                                                                    d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                                    fill="currentColor"
                                                                                />
                                                                            </svg>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar-progress"
                                                                            >
                                                                                <path
                                                                                    d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2.5"
                                                                                    pathLength={100}
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="client-testimonial-card-user-name text-bold">
                                                                                Rahat Ahmed
                                                                            </div>
                                                                            <div className="client-testimonial-card-user-designation">
                                                                                Founding CEO, Anchorless Bangladesh
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="splide__slide"
                                                            id="splide01-slide03"
                                                            role="group"
                                                            aria-roledescription="slide"
                                                            aria-label="3 of 4"
                                                            style={{
                                                                width: "calc(100%)",
                                                                height: "auto",
                                                                transform: "translateX(-200%)"
                                                            }}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="client-testimonial-card">
                                                                <div className="client-testimonial-card-icon" />
                                                                <p className="client-testimonial-card-text">
                                                                    Omotive's expertise to detail made the Mymanu
                                                                    Airbuds interface innovative and user-friendly.
                                                                    Their understanding of our vision and commitment
                                                                    to human-centered design exceeded our
                                                                    expectations. I highly recommend Omotive for their
                                                                    creativity, technical skill, and user-focused
                                                                    approach. We look forward to future
                                                                    collaborations.
                                                                </p>
                                                                <div className="client-testimonial-card-footer">
                                                                    <div className="client-testimonial-card-user">
                                                                        <div className="client-testimonial-card-user-preview">
                                                                            <figure className="client-testimonial-meida">
                                                                                <img
                                                                                    width={70}
                                                                                    height={70}
                                                                                    alt="danny menu"
                                                                                    loading="lazy"
                                                                                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea4_user-testimonial-3.png"
                                                                                    className="client-testimonial-media-image"
                                                                                />
                                                                            </figure>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar"
                                                                            >
                                                                                <path
                                                                                    d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                                    fill="currentColor"
                                                                                />
                                                                            </svg>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar-progress"
                                                                            >
                                                                                <path
                                                                                    d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2.5"
                                                                                    pathLength={100}
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="client-testimonial-card-user-name text-bold">
                                                                                Danny Manu
                                                                            </div>
                                                                            <div className="client-testimonial-card-user-designation">
                                                                                Founder &amp; CEO, Mymanu
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="splide__slide"
                                                            id="splide01-slide04"
                                                            role="group"
                                                            aria-roledescription="slide"
                                                            aria-label="4 of 4"
                                                            style={{
                                                                width: "calc(100%)",
                                                                height: "auto",
                                                                transform: "translateX(-300%)"
                                                            }}
                                                            aria-hidden="true"
                                                        >
                                                            <div className="client-testimonial-card">
                                                                <div className="client-testimonial-card-icon" />
                                                                <p className="client-testimonial-card-text">
                                                                    Mufidul is an exceptional product designer with
                                                                    passion to make something very unique. Through
                                                                    working with him we developed a great friendship.
                                                                    He has a firm grasp for the vision of the project
                                                                    and will take the initiative to see it flourish. I
                                                                    am excited to continue working with him into the
                                                                    future!
                                                                </p>
                                                                <div className="client-testimonial-card-footer">
                                                                    <div className="client-testimonial-card-user">
                                                                        <div className="client-testimonial-card-user-preview">
                                                                            <figure className="client-testimonial-meida">
                                                                                <img
                                                                                    width={70}
                                                                                    height={70}
                                                                                    alt="damien haris"
                                                                                    loading="lazy"
                                                                                    src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bda4143cdb248a8ea2fea1_user-testimonial-4.png"
                                                                                    className="client-testimonial-media-image"
                                                                                />
                                                                            </figure>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar"
                                                                            >
                                                                                <path
                                                                                    d="M82 41C82 63.6437 63.6437 82 41 82C18.3563 82 0 63.6437 0 41C0 18.3563 18.3563 0 41 0C63.6437 0 82 18.3563 82 41ZM2.46 41C2.46 62.2851 19.7149 79.54 41 79.54C62.2851 79.54 79.54 62.2851 79.54 41C79.54 19.7149 62.2851 2.46 41 2.46C19.7149 2.46 2.46 19.7149 2.46 41Z"
                                                                                    fill="currentColor"
                                                                                />
                                                                            </svg>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="1em"
                                                                                height="1em"
                                                                                viewBox="0 0 82 82"
                                                                                fill="none"
                                                                                className="client-testimonial-media-progressbar-progress"
                                                                            >
                                                                                <path
                                                                                    d="M62.2565 74.589L62.9249 75.6453L62.2565 74.589C57.8455 77.3805 52.9279 79.2759 47.7844 80.1668C42.641 81.0577 37.3725 80.9268 32.2796 79.7816C27.1866 78.6364 22.3693 76.4994 18.1022 73.4925C13.8353 70.4854 10.2024 66.6675 7.41094 62.2565C4.6195 57.8455 2.7242 52.9279 1.83326 47.7844C0.942314 42.6409 1.07316 37.3725 2.21835 32.2796L0.998802 32.0054L2.21835 32.2796C3.36354 27.1866 5.50061 22.3693 8.5076 18.1022C11.5146 13.8353 15.3325 10.2024 19.7435 7.41095C24.1545 4.61951 29.0722 2.7242 34.2155 1.83326C39.359 0.942305 44.6277 1.07317 49.7205 2.21836C54.8133 3.36355 59.6308 5.50064 63.8977 8.50761L64.4234 7.76164L63.8977 8.50761C68.1647 11.5146 71.7975 15.3325 74.589 19.7435C77.3805 24.1545 79.2759 29.0722 80.1668 34.2155C81.0577 39.359 80.9268 44.6276 79.7816 49.7205C78.6365 54.8133 76.4994 59.6308 73.4923 63.8977L74.4385 64.5645L73.4923 63.8978C70.4854 68.1647 66.6675 71.7977 62.2565 74.589Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2.5"
                                                                                    pathLength={100}
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                        <div>
                                                                            <div className="client-testimonial-card-user-name text-bold">
                                                                                Damien Harris
                                                                            </div>
                                                                            <div className="client-testimonial-card-user-designation">
                                                                                Enterprise Technology at Bloomberg L.P
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review_logo-wrapper display-flex">
                                        <a href="#" className="review_logo-link w-inline-block">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bdac8ba112bbfbf20b80f6_clutch-logo-c.svg"
                                                loading="lazy"
                                                alt="Clutch Logo"
                                            />
                                        </a>
                                        <a href="#" className="review_logo-link w-inline-block">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bdac8b568326871d738810_behance-logo.svg"
                                                loading="lazy"
                                                alt="Behance Logo"
                                            />
                                        </a>
                                        <a href="#" className="review_logo-link w-inline-block">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bdac8b08e1c7c513781dc9_medium-logo.svg"
                                                loading="lazy"
                                                alt="Medium Logo"
                                            />
                                        </a>
                                        <a href="#" className="review_logo-link w-inline-block">
                                            <img
                                                src="https://cdn.prod.website-files.com/679788a93b745e4c42cbb1c5/67bdac8bc99e57b02082b09a_dribbble-logo.svg"
                                                loading="lazy"
                                                alt="dribble logo"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div
                                    id="w-node-a3ba80a6-31fc-eed1-caaa-3754f599e440-05fab082"
                                    className="contact_right"
                                >
                                    <div className="contact_form-block w-form">
                                        <form
                                            id="wf-form-Contact-Form"
                                            name="wf-form-Contact-Form"
                                            data-name="Contact Form"
                                            method="get"
                                            className="contact_form display-vertical"
                                            data-wf-page-id="67bd67370ac28e0c05fab082"
                                            data-wf-element-id="249d2cd8-37f7-9057-fe81-0ac00ca0fc61"
                                            aria-label="Contact Form"
                                        >
                                            <div className="contact_form-inner-block display-flex">
                                                <div className="contact_form_field-wrapper">
                                                    <label
                                                        htmlFor="name"
                                                        className="contact_form_lebel body-l text-weight-medium"
                                                    >
                                                        Name or Company
                                                    </label>
                                                    <input
                                                        className="contact_form_field w-input"
                                                        maxLength={256}
                                                        name="name"
                                                        data-name="Name"
                                                        placeholder="Enter Name"
                                                        type="text"
                                                        id="name"
                                                    />
                                                </div>
                                                <div className="contact_form_field-wrapper">
                                                    <label
                                                        htmlFor="email"
                                                        className="contact_form_lebel body-l text-weight-medium"
                                                    >
                                                        Your Email*
                                                    </label>
                                                    <input
                                                        className="contact_form_field w-input"
                                                        maxLength={256}
                                                        name="email"
                                                        data-name="Email"
                                                        placeholder="Enter Email"
                                                        type="email"
                                                        id="email"
                                                        required=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="contact_form-inner-block">
                                                <label htmlFor="" className="contact_form_lebel">
                                                    I'm interested in*
                                                </label>
                                                <div
                                                    tf-custom-select-multiple=""
                                                    tf-custom-select-wrapper=""
                                                    className="position-relative"
                                                >
                                                    <select
                                                        id="Interested-In"
                                                        name="Interested-In"
                                                        data-name="Interested In"
                                                        required=""
                                                        multiple=""
                                                        tf-custom-select-input=""
                                                        className="contact_form_hidden-input w-select"
                                                        tabIndex={-1}
                                                    >
                                                        <option value="">Select multiple custom option</option>
                                                        <option value="App from scratch">
                                                            App from scratch
                                                        </option>
                                                        <option value="Branding">Branding</option>
                                                        <option value="Website design">Website design</option>
                                                        <option value="Webflow development">
                                                            Webflow development
                                                        </option>
                                                    </select>
                                                    <div className="contact_form_check-wrapper display-flex">
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="App from scratch"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">App from scratch</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="Branding"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">Branding</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="Website design"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">Website design</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="Webflow development"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">
                                                                Webflow development
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contact_form-inner-block">
                                                <label htmlFor="" className="contact_form_lebel">
                                                    Project Budget*
                                                </label>
                                                <div
                                                    tf-custom-select-wrapper=""
                                                    className="position-relative"
                                                >
                                                    <input
                                                        className="contact_form_hidden-input w-input"
                                                        maxLength={256}
                                                        name="Project-Budget"
                                                        data-name="Project Budget"
                                                        placeholder="Project Budget"
                                                        tf-custom-select-input=""
                                                        type="text"
                                                        id="Project-Budget"
                                                        required=""
                                                        tabIndex={-1}
                                                    />
                                                    <div className="contact_form_check-wrapper display-flex">
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="$10K or Below"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">$10K or Below</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="$20k-$30k"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">$20k-$30k</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-submit="ignore"
                                                            tf-custom-select-option-value="20k-50k"
                                                            className="contact_form_check display-flex is-center"
                                                        >
                                                            <div className="checkbox_icon" />
                                                            <div className="checkbox_label">$30k-$50k+</div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="contact_form-inner-block">
                                                <label htmlFor="Message" className="contact_form_lebel">
                                                    Project details*
                                                </label>
                                                <textarea
                                                    placeholder="Write your project details here"
                                                    maxLength={5000}
                                                    id="Message"
                                                    name="Message"
                                                    data-name="Message"
                                                    className="contact_form_text_field w-input"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <input
                                                type="submit"
                                                data-wait="Please wait..."
                                                className="contact_form_button w-button"
                                                defaultValue="Submit"
                                            />
                                        </form>
                                        <div
                                            className="w-form-done"
                                            tabIndex={-1}
                                            role="region"
                                            aria-label="Contact Form success"
                                        >
                                            <div>Thank you! Your submission has been received!</div>
                                        </div>
                                        <div
                                            className="w-form-fail"
                                            tabIndex={-1}
                                            role="region"
                                            aria-label="Contact Form failure"
                                        >
                                            <div>
                                                Oops! Something went wrong while submitting the form.
                                            </div>
                                        </div>
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
                                                    "translate3d(-0.0002rem, -0.0001rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
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
                                                "translate3d(-0.0002rem, -0.00014rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
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
                                    <a href="/about" className="footer_service-link">
                                        About
                                    </a>
                                    <a href="/services" className="footer_service-link">
                                        Services
                                    </a>
                                    <a href="/services" className="footer_service-link">
                                        Projects
                                    </a>
                                    <a
                                        href="/contact"
                                        aria-current="page"
                                        className="footer_service-link w--current"
                                    >
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

export default Contact;
