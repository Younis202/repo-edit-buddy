import React from 'react';

const CheckIcon = () => (
  <svg aria-hidden="true" className="css-82n8sf e11de7sb0" focusable={false} viewBox="0 0 32 32">
    <path d="M21.764 11.49a.668.668 0 0 1 .079.94l-6.756 8a.667.667 0 0 1-.986.036l-3.911-4a.667.667 0 0 1 .953-.932l3.399 3.475 6.282-7.44a.667.667 0 0 1 .94-.078v-.001Z" fill="#153A5B" />
  </svg>
);

const CrossIcon = () => (
  <svg aria-hidden="true" className="css-82n8sf e11de7sb0" focusable={false} viewBox="0 0 32 32">
    <path d="M10.862 10.862c.26-.26.682-.26.943 0L16 15.057l4.195-4.195a.667.667 0 0 1 .943.943L16.943 16l4.195 4.195a.668.668 0 1 1-.943.943L16 16.943l-4.195 4.195a.667.667 0 0 1-.943-.943L15.057 16l-4.195-4.195a.667.667 0 0 1 0-.943Z" fill="#153A5B" />
  </svg>
);

const ColorSwatch = ({ label, title, className }: { label: string; title: string; className: string }) => (
  <div className="colorsPickerSwiper_item" style={{ marginRight: 8 }}>
    <button aria-label={label} className={className} title={title} type="button">
      <span className="swatch">
        <span className="swatch-icon check css-11qxqh7 e1dp28730"><CheckIcon /></span>
        <span className="swatch-icon cross css-11qxqh7 e1dp28730"><CrossIcon /></span>
      </span>
    </button>
  </div>
);

interface ProductCardProps {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  badgeClass?: string;
  title: string;
  colors: { label: string; title: string; className: string }[];
  selectedColor: string;
  sizes?: string[];
  quickInfo: string;
  priceText: string;
  oldPrice?: string;
  currentPrice: string;
}

const ProductCard = ({
  label,
  href,
  imageSrc,
  imageAlt,
  badge,
  badgeClass = "css-65fedf e1h8q5fr0",
  title,
  colors,
  selectedColor,
  sizes,
  quickInfo,
  priceText,
  oldPrice,
  currentPrice,
}: ProductCardProps) => (
  <div className="cardsSwiper_swiper_item">
    <div aria-label={label} className="css-k9fih1 eoes6mn0">
      <div className="css-11j2dj0 e1aghnsr0">
        <div className="css-ktbb9c et5ovjm0"></div>
        <a aria-label={`View ${imageAlt}`} className="productMedia_wrap isLink" href={href}>
          <div className="productMedia">
            <div className="productMedia_asset">
              <img alt={imageAlt} className="productMedia_assetImage" decoding="async" loading="lazy" src={imageSrc} />
            </div>
          </div>
        </a>
      </div>
      <div className="shopCard_content">
        {badge && (
          <div className={badgeClass}>
            <div>{badge}</div>
          </div>
        )}
        <div className="shopCard_content_body">
          <div className="css-1wuezs8 eoz2ert0">
            <a className="productTitle isLink" href={href}>
              <h3>{title}</h3>
            </a>
          </div>
          <div className="shopCard_colorsPicker">
            <div className="shopCard_colorsPicker_colors css-108xz3x e17jh5ji0">
              <div className="colorsPickerSwiper swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden">
                <div aria-label={`Select ${title} color`} className="colorsPickerSwiper_wrapper">
                  {colors.map((color, i) => (
                    <ColorSwatch key={i} {...color} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="shopCard_variantsInfo">
            <div className="css-1mb10vo eglraj20"><span>{selectedColor}</span></div>
            {sizes && (
              <div aria-label={`Select ${title} size`} className="css-8w8d45 e7c9lfa0">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    aria-label={`Select ${size} size`}
                    className={i === 0 ? "css-1bnu34p e1sc3p7b0" : "css-fajmj4 e1sc3p7b0"}
                    disabled={i === 0}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="shopCard_quickInfo css-1iu0ln ebshcfk0">
            <div>{quickInfo}</div>
          </div>
          <div className="css-wn1ko exv7rs90">{priceText}</div>
          <div aria-hidden="true" className="css-cdckcp exbswh30">
            <div className="priceContainer">
              {oldPrice && <span aria-hidden="true" className="priceOld">{oldPrice}</span>}
              <span aria-hidden="true" className="priceCurrent">{currentPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const products: ProductCardProps[] = [
  {
    label: "LARQ Bottle PureVis™ 2 product",
    href: "/purification/larq-bottle-purevis-2?sku=BWEG068A",
    imageSrc: "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1738137667/SKU/SPA/v3/BWEG068A.png",
    imageAlt: "LARQ Bottle PureVis™ 2 Eucalyptus Green",
    badge: "New",
    title: "LARQ Bottle PureVis™ 2",
    colors: [
      { label: "Select Obsidian Black color", title: "Obsidian Black", className: "css-1xfs2ko ek6th1y0" },
      { label: "Select Granite White color", title: "Granite White", className: "css-10sdqrl ek6th1y0" },
      { label: "Select Mojave Dune color", title: "Mojave Dune", className: "css-1rv485k ek6th1y0" },
      { label: "Select Eucalyptus Green color", title: "Eucalyptus Green", className: "css-10037kw ek6th1y0" },
    ],
    selectedColor: "Eucalyptus Green",
    sizes: ["23 oz", "34 oz"],
    quickInfo: "Hydration tracking, Self cleaning, Filtration",
    priceText: "Starting at $114.00 instead of $129.00",
    oldPrice: "$129",
    currentPrice: "$114",
  },
  {
    label: "LARQ Pitcher PureVis™ product",
    href: "/home/larq-pitcher-purevis?sku=PAMB190A",
    imageSrc: "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1738137667/SKU/SPA/v3/PAMB190A.png",
    imageAlt: "LARQ Pitcher PureVis™ Monaco Blue",
    title: "LARQ Pitcher PureVis™",
    colors: [
      { label: "Select Monaco Blue color", title: "Monaco Blue", className: "css-r3dbs5 ek6th1y0" },
      { label: "Select Pure White color", title: "Pure White", className: "css-17l4mkp ek6th1y0" },
    ],
    selectedColor: "Monaco Blue",
    quickInfo: "Hydration tracking, Self cleaning, Filtration",
    priceText: "Starting at $139.00 instead of $168.00",
    oldPrice: "$168",
    currentPrice: "$139",
  },
  {
    label: "LARQ Bottle Swig Top Amber Vittoria product",
    href: "/drinkware/larq-bottle-swig-top-amber-vittoria?sku=BNWAVOB068A",
    imageSrc: "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1738137667/SKU/SPA/v3/BNWAVOB068A.png",
    imageAlt: "LARQ Bottle Swig Top Amber Vittoria Obsidian Black",
    badge: "NEW",
    title: "LARQ Bottle Swig Top Amber Vittoria",
    colors: [
      { label: "Select Obsidian Black color", title: "Obsidian Black", className: "css-ehdhns ek6th1y0" },
      { label: "Select Granite White color", title: "Granite White", className: "css-3nu535 ek6th1y0" },
    ],
    selectedColor: "Obsidian Black",
    sizes: ["23 oz", "34 oz"],
    quickInfo: "Everyday drinkware",
    priceText: "Starting at $39.95",
    currentPrice: "$39.95",
  },
  {
    label: "LARQ Bottle Swig Top product",
    href: "/drinkware/larq-bottle-swig-top?sku=BNWLL068A",
    imageSrc: "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1738137667/SKU/SPA/v3/BNWLL068A.png",
    imageAlt: "LARQ Bottle Swig Top Luberon Lavender",
    badge: "Limited drop",
    badgeClass: "css-1pra4yx e1h8q5fr0",
    title: "LARQ Bottle Swig Top",
    colors: [
      { label: "Select Luberon Lavender color", title: "Luberon Lavender", className: "css-l639bu ek6th1y0" },
      { label: "Select Amalfi Blue color", title: "Amalfi Blue", className: "css-j5fss5 ek6th1y0" },
      { label: "Select Obsidian Black color", title: "Obsidian Black", className: "css-1xfs2ko ek6th1y0" },
      { label: "Select Eucalyptus Green color", title: "Eucalyptus Green", className: "css-vxiyz9 ek6th1y0" },
      { label: "Select Granite White color", title: "Granite White", className: "css-10sdqrl ek6th1y0" },
      { label: "Select Mojave Dune color", title: "Mojave Dune", className: "css-1rv485k ek6th1y0" },
    ],
    selectedColor: "Luberon Lavender",
    sizes: ["23 oz", "34 oz"],
    quickInfo: "Everyday drinkware",
    priceText: "Starting at $34.95",
    currentPrice: "$34.95",
  },
  {
    label: "LARQ Bottle Flip Top product",
    href: "/drinkware/larq-bottle-flip-top?sku=BNFOB068A",
    imageSrc: "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1738137667/SKU/SPA/v3/BNFOB068A.png",
    imageAlt: "LARQ Bottle Flip Top Obsidian Black",
    title: "LARQ Bottle Flip Top",
    colors: [
      { label: "Select Obsidian Black color", title: "Obsidian Black", className: "css-1xfs2ko ek6th1y0" },
      { label: "Select Granite White color", title: "Granite White", className: "css-10sdqrl ek6th1y0" },
      { label: "Select Eucalyptus Green color", title: "Eucalyptus Green", className: "css-vxiyz9 ek6th1y0" },
    ],
    selectedColor: "Obsidian Black",
    sizes: ["23 oz", "34 oz"],
    quickInfo: "Everyday drinkware",
    priceText: "Starting at $34.95",
    currentPrice: "$34.95",
  },
];

const Section2: React.FC = () => {
  return (
    <section className="css-oirdm1 e1cm9nc20">
      <div className="css-1ldhsgj">
        <div className="css-1llzy2o">
          <div className="css-12m0k8p e1qsklw40">
            <div className="anim-reveal" style={{ opacity: 1, transform: 'none' }}>
              <div className="css-krdsss ed1k4l40">
                <div className="css-1lcvmkc">
                  <div className="pageSectionHead_head css-vurnku">
                    <h2 className="pageSectionHead_head_title">LARQ Products</h2>
                    <div className="pageSectionHead_head_addendum">
                      <div className="exmyjcv0 css-1t50len">
                        <button className="css-8k0t7 e10c7x3h0" disabled tabIndex={0} type="button">
                          <span className="btn_element"><span className="btn_label">Featured</span></span>
                        </button>
                        <button aria-label="Show Smart Bottles" className="css-1evqsdi e10c7x3h0" tabIndex={0} type="button">
                          <span className="btn_element"><span className="btn_label">Smart Bottles</span></span>
                        </button>
                        <button aria-label="Show Filtration Bottles" className="css-1evqsdi e10c7x3h0" tabIndex={0} type="button">
                          <span className="btn_element"><span className="btn_label">Filtration Bottles</span></span>
                        </button>
                        <button aria-label="Show Everyday Drinkware" className="css-1evqsdi e10c7x3h0" tabIndex={0} type="button">
                          <span className="btn_element"><span className="btn_label">Everyday Drinkware</span></span>
                        </button>
                        <button aria-label="Show Pitchers" className="css-1evqsdi e10c7x3h0" tabIndex={0} type="button">
                          <span className="btn_element"><span className="btn_label">Pitchers</span></span>
                        </button>
                      </div>
                    </div>
                    <div className="pageSectionHead_head_action">
                      <a aria-label="View all products" className="css-1evqsdi e10c7x3h0" href="/shop" tabIndex={0}>
                        <span className="btn_element"><span className="btn_label">Shop all</span></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="e1h3t6vp0 css-vwxgh7">
                <div className="css-17ju3y3 ek1zip20">
                  <div className="cardsSwiper_inner">
                    <div className="cardsSwiper_swiper">
                      <div className="cardsSwiper_swiper_inner">
                        {products.map((product, index) => (
                          <ProductCard key={index} {...product} />
                        ))}
                      </div>
                    </div>
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

export default Section2;
