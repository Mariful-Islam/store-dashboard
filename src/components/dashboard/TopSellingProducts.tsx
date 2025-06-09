import Carousel from "react-multi-carousel";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../api/api";
import { Tooltip } from "react-tooltip";

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
      <h3 className="font-bold text-center">Top Selling Product</h3>

      <div className="text-[12px] flex gap-6 items-center mt-4">
        <div className="flex gap-2">
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
          <div>Stock</div>
        </div>
        <div className="flex gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300"></div>
          <div>Total Sold</div>
        </div>
      </div>
      
      <div className="my-4 w-full ">
        <Carousel
          additionalTransfrom={0}
          autoPlaySpeed={1500}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          ssr={false}
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
          arrows={false}
        >
          {variants?.map((item: any, index: number) => (
            <div
              className="cursor-pointer m-4 border border-gray-300 p-4 rounded-md hover:bg-gray-100 duration-150 group"
              key={index}
            >
              {/* <img src={image} alt="" /> */}
              <div className="mt-2">
                <div className="font-bold text-blue-500 group-hover:underline h-[100%] ">
                  {item?.product_variant}
                </div>
                <div className="mt-4 text-sm text-orange-400 font-bold">
                  {item?.price}
                </div>
                <div className="mt-4 relative">
                  <div className="bg-gray-300 rounded-full w-full h-3 relative flex items-center text-[11px]">
                    <div
                      style={{
                        width: `${
                          (item?.stock / (item?.stock + item?.total_quantity)) *
                          100
                        }%`,
                      }}
                      className="bg-green-500 hover:bg-green-400 h-3 text-white rounded-l-full flex items-center justify-center font-medium"
                      data-tooltip-id={`tooltip-${index}`}
                      data-tooltip-content={`Stock ${item.stock}`}
                    ></div>

                    <Tooltip
                      id={`tooltip-${index}`}
                      place="top"
                      className="text-lg font-bold "
                      style={{ fontSize: 12, fontWeight: "bold" }}
                    />

                    <div
                      style={{
                        width: `${
                          (item?.total_quantity /
                            (item?.stock + item?.total_quantity)) *
                          100
                        }%`,
                      }}
                      className={`bg-gray-300 hover:bg-gray-200 h-3 text-white rounded-r-full flex items-center justify-center  font-medium`}
                      data-tooltip-id={`total-sold-${index}`}
                      data-tooltip-content={`Sold ${item.total_quantity}`}
                    ></div>

                    <Tooltip
                      id={`total-sold-${index}`}
                      place="top"
                      style={{ fontSize: 12, fontWeight: "bold" }}
                    />
                  </div>
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
