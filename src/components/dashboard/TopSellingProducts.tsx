
import Carousel from 'react-multi-carousel';
import { products } from './sampleItems';
import Product from './Product';





export default function TopSellingProducts() {

  return (
    <div className="w-full p-4 bg-white border border-slate-200 dark:border-slate-600 rounded-md dark:bg-slate-900">
      <h2 className="text-lg font-bold text-center">Top Selling Product</h2>
      <div className='mt-4'>
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
         {products.map((item, index)=>(
          <Product
            key={index}
            name={item.name}
            price={item.price}
            totalSells={item.totalSells}
            image={item.image}
            stockLeft={item.stockLeft}

          />
         ))}

        </Carousel>
      </div>
    </div>
  );
}
