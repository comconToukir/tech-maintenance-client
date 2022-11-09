import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import "./Carousel.css";

const CarouselItem = ({ slideData: { image, id, prev, next } }) => {
  const { ref, inView, entry } = useInView({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  return (
    <div ref={ref} id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-image w-full h-[700px]">
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>
      <div
        className={`absolute flex flex-col justify-end gap-5 transform -translate-y-1/2 left-24 top-1/4 animated ${
          inView ? "anim-show" : "anim-hidden"
        }`}
      >
        <h1 className="text-5xl font-bold leading-normal text-white ">
          Get the help <br />
          you need, every <br />
          step of the way
        </h1>
        <p className="text-base-content text-md leading-7">
          Anything technology related help you <br />
          may need now you can access with <br />
          just an order. See what you might need below.
        </p>
        <div>
          <button className="btn  bg-base-200 hover:bg-base-300 border-none text-white w-36 mr-4 tracking-wider">
            See Services
          </button>
        </div>
      </div>
      <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a
          href={`#slide${prev}`}
          className="btn btn-circle bg-white text-base-300 hover:text-white"
        >
          <FaArrowLeft />
        </a>
        <a
          href={`#slide${next}`}
          className="btn btn-circle bg-white text-base-300 hover:text-white"
        >
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
};

export default CarouselItem;
