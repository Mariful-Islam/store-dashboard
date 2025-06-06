import Carousel from "react-multi-carousel";
import Button from "../Button";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../api/api";

export default function TopSellingProducts() {
  const api = useApi();
  const [variants, setVariants] = useState([]);

  const fetchTopSellingProductVariant = () => {
    api
      .getTopSellingProductVariant()
      .then((res) => {
        setVariants(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTopSellingProductVariant();
  }, []);

  return (
    <div className="w-full p-4 bg-white border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h2 className="text-lg font-bold text-center">Top Selling Product</h2>
      <div className="mt-4">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {variants?.map((item: any, index: number) => (
            <div className="m-4" key={index}>
              {/* <img src={image} alt="" /> */}
              <div className="mt-2">
                <h3 className="font-bold text-blue-500">
                  {item?.product_variant}
                </h3>
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-full w-[200px] h-5 relative flex items-center">
                    <div
                      style={{
                        width: `${
                          (item?.stock / (item?.stock + item?.total_quantity)) *
                          100
                        }%`,
                      }}
                      className="bg-green-500 h-5 text-white rounded-l-full flex items-center justify-center text-[12px] font-medium"
                    >
                      {item?.stock}
                    </div>

                    <div
                      style={{
                        width: `${
                          (item?.total_quantity /
                            (item?.stock + item?.total_quantity)) *
                          100
                        }%`,
                      }}
                      className={`bg-red-500 h-5 text-white rounded-r-full flex items-center justify-center text-[12px] font-medium`}
                    >
                      {item?.total_quantity}
                    </div>

                  </div>
                  {/* <div>
                    <strong className="text-slate-500">Price: </strong>
                    <span>{item?.price}</span>
                  </div> */}
                  {/* <div className="mt-6">
                    <strong className="text-slate-500">
                      Total quantity sold:{" "}
                    </strong>
                    <span>{item?.total_quantity}</span>
                  </div> */}

                  {/* <div>
                    <strong className="text-slate-500">
                      total_sold_amount:{" "}
                    </strong>
                    <span>{item?.total_sold_amount}</span>
                  </div>
                  <div>
                    <strong className="text-slate-500">Stock Left: </strong>
                    <span>{item?.stock}</span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex justify-end mt-2">
        <Link
          to={"#"}
          className="hover:border-b flex gap-3 items-center text-sm"
        >
          more <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
