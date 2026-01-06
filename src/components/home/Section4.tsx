import React from 'react';

const StarIcon = () => (
  <svg aria-label="Star icon" fill="none" role="img" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0.5L13.4609 8.15625H21.5078L14.9844 12.8828L17.4844 20.5L11 15.8125L4.47656 20.5L6.97656 12.8828L0.453125 8.15625H8.5L11 0.5Z" fill="#F3756D" />
  </svg>
);

const PlayIcon = () => (
  <svg aria-hidden="true" className="css-82n8sf e11de7sb0" focusable={false} viewBox="0 0 120 120">
    <path clipRule="evenodd" d="M48.8204 82.2042C48.0075 81.7691 47.5 80.922 47.5 80L47.5 40C47.5 39.078 48.0075 38.2309 48.8204 37.7958C49.6333 37.3608 50.6196 37.4084 51.3868 37.9199L81.3868 57.9199C82.0823 58.3835 82.5 59.1641 82.5 60C82.5 60.8359 82.0823 61.6165 81.3868 62.0801L51.3868 82.0801C50.6196 82.5916 49.6333 82.6392 48.8204 82.2042ZM52.5 75.3287L75.4931 60L52.5 44.6713L52.5 75.3287Z" fill="white" fillRule="evenodd" />
  </svg>
);

interface VideoCardProps {
  videoSrc: string;
  productHref: string;
  productImage: string;
  productTitle: string;
  productSubtitle: string;
}

const VideoCard = ({ videoSrc, productHref, productImage, productTitle, productSubtitle }: VideoCardProps) => (
  <div className="css-t7h8wa evwaukm0">
    <div className="wrap">
      <div className="productMediaCard">
        <div className="productMediaCard_media">
          <button aria-label="Play video" className="play-button">
            <span className="css-11qxqh7 e13u1hot0">
              <PlayIcon />
            </span>
          </button>
          <video className="productMediaCard_media_asset" loop playsInline src={videoSrc} tabIndex={-1} />
        </div>
      </div>
      <div className="product-info-wrap">
        <a className="overlay-link" href={productHref}>Link to {productTitle} - {productSubtitle} product</a>
        <div className="product-info-container">
          <div className="product-info">
            <div className="product-info-image css-103pskz e1nv8j4y0">
              <img alt={`${productTitle} - ${productSubtitle} image`} className="css-0 e1nv8j4y1" decoding="async" loading="lazy" src={productImage} />
            </div>
            <div className="product-info-body">
              <h4 className="title">{productTitle}</h4>
              <p className="subtitle">{productSubtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface ReviewCardProps {
  content: string;
  name: string;
  location: string;
}

const ReviewCard = ({ content, name, location }: ReviewCardProps) => (
  <div className="css-pm7ku3 eqi9v9q0">
    <div className="feedbackCard_content">{content}</div>
    <div className="feedbackCard_source">
      <div className="user-info">
        <div className="name-handle">
          <strong className="name">{name}</strong>
          <small className="handle">{location}, Verified Buyer</small>
        </div>
      </div>
    </div>
  </div>
);

interface PressCardProps {
  content: string;
  logoSrc: string;
  logoAlt: string;
}

const PressCard = ({ content, logoSrc, logoAlt }: PressCardProps) => (
  <div className="css-11ttxr7 eqi9v9q0">
    <div className="feedbackCard_content">{content}</div>
    <div className="feedbackCard_logo">
      <img alt={logoAlt} className="css-0 e1nv8j4y1" decoding="async" loading="lazy" src={logoSrc} />
    </div>
  </div>
);

const Section4: React.FC = () => {
  return (
    <section className="css-nejygk e1cm9nc20">
      <div className="css-6aa05y">
        <div className="css-1llzy2o">
          <div className="css-12m0k8p e1qsklw40">
            <div className="anim-reveal" style={{ opacity: 1, transform: 'none' }}>
              <div className="css-fusls1 ed1k4l40">
                <div className="css-1lcvmkc">
                  <div className="pageSectionHead_head css-vurnku">
                    <h2 className="pageSectionHead_head_title">The reviews are pouring in</h2>
                  </div>
                  <div className="pageSectionHead_body css-vurnku">
                    <div aria-label="Rated 4.8 out of 5 stars" className="css-1wl92z8 ef3daqn0">
                      <ul className="rating-stars">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <li key={i}><StarIcon /></li>
                        ))}
                      </ul>
                      <a className="rating-total" href="/purification/larq-bottle-purevis/reviews">based on 14207 reviews</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-10ubj93 e7xkx6q0">
                <div className="css-raub1f epel50u0">
                  <div className="css-1it8wzf epel50u1">
                    <VideoCard
                      videoSrc="https://res.cloudinary.com/larq/video/upload/v1743173521/selected-reviews-videos/bottle-filtered-flip-top/optimized/640/bottle-filtered-flip-top-01.mp4"
                      productHref="/purification/larq-bottle-filtered-flip-top?sku=BFDGW074A"
                      productImage="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_400/v1738137667/SKU/SPA/v3/BFDGW074A.png"
                      productTitle="LARQ Bottle Filtered Flip Top"
                      productSubtitle="Granite White"
                    />
                    <ReviewCard
                      content="I love the LARQ concept. Not using plastic bottle. I always carry in all my long holidays around the world the jag if I stay in a house or a bottle if I stay in Hotels. Water taste good no nasty things has been left if you use the LARQ item. Customer care very good and attentive too."
                      name="Maria Grazia Baiguini"
                      location="Italy"
                    />
                  </div>
                  <div className="css-1it8wzf epel50u1">
                    <ReviewCard
                      content="Highly recommended for health-conscious individuals, families, and anyone who wants to ensure their drinking water is as clean and safe as possible while reducing their environmental impact."
                      name="Manoj Andol"
                      location="United States"
                    />
                    <ReviewCard
                      content="The great taste of the water. I've never had a water bottle that didn't get stinky/nasty tasting water. This one is the first. Also keeps water cold for a long time. Love this product!!"
                      name="Rebecca Dendler"
                      location="United States"
                    />
                    <PressCard
                      content="The result is that every glass of water tastes crisp and fresh."
                      logoSrc="https://res.cloudinary.com/larq/image/upload/v1743228143/selected-reviews-logo/the-oprah-magazine.png"
                      logoAlt="The Oprah Magazine logo"
                    />
                  </div>
                  <div className="css-1it8wzf epel50u1">
                    <PressCard
                      content="What's the Next Status Water Bottle? Three of our experts named the LARQ bottle as one to watch."
                      logoSrc="https://res.cloudinary.com/larq/image/upload/v1743228143/selected-reviews-logo/the-strategist.png"
                      logoAlt="The Strategist logo"
                    />
                    <VideoCard
                      videoSrc="https://res.cloudinary.com/larq/video/upload/v1743173381/selected-reviews-videos/bottle-filtered-flip-top/optimized/640/bottle-filtered-flip-top-03.mp4"
                      productHref="/purification/larq-bottle-filtered-flip-top?sku=BFDGW074A"
                      productImage="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_400/v1738137667/SKU/SPA/v3/BFDGW074A.png"
                      productTitle="LARQ Bottle Filtered Flip Top"
                      productSubtitle="Granite White"
                    />
                  </div>
                  <div className="css-1it8wzf epel50u1">
                    <VideoCard
                      videoSrc="https://res.cloudinary.com/larq/video/upload/v1743173375/selected-reviews-videos/bottle-filtered-flip-top/optimized/640/bottle-filtered-flip-top-02.mp4"
                      productHref="/purification/larq-bottle-filtered-flip-top?sku=BFDOB074A"
                      productImage="https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_400/v1738137667/SKU/SPA/v3/BFDOB074A.png"
                      productTitle="LARQ Bottle Filtered Flip Top"
                      productSubtitle="Obsidian Black"
                    />
                    <PressCard
                      content="You Should Ditch Your Old Water Dispenser For The High-Tech LARQ Pitcher PureVis™."
                      logoSrc="https://res.cloudinary.com/larq/image/upload/v1743228143/selected-reviews-logo/best-products.png"
                      logoAlt="Best Products logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
