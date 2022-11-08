import CarouselItem from "./CarouselItem";

const bannerData = [
  {
    image: "https://res.cloudinary.com/dzrf760el/image/upload/v1667923903/tech_main_carousel/0_94ztetxE4kXB4TWJ_dk16bf.png",
    prev: 5,
    id: 1,
    next: 2
  },
  {
    image: "https://res.cloudinary.com/dzrf760el/image/upload/v1667923902/tech_main_carousel/computer-repair-engineer-pc_ljmujg.jpg",
    prev: 1,
    id: 2,
    next: 3
  },
  {
    image: "https://res.cloudinary.com/dzrf760el/image/upload/v1667923902/tech_main_carousel/network-installation-and-maintenance_czdigp.jpg",
    prev: 2,
    id: 3,
    next: 4
  },
  {
    image: "https://res.cloudinary.com/dzrf760el/image/upload/v1667923902/tech_main_carousel/man-holding-a-cell-phone-and-a-laptop-on-a-desk-free-photo_hftzni.jpg",
    prev: 3,
    id: 4,
    next: 5
  },
  {
    image: "https://res.cloudinary.com/dzrf760el/image/upload/v1667923902/tech_main_carousel/contact-us-support-service-and-information-connect-concept-female-s-hands-is-using-mobile-phone-and-laptop-for-corporate-information-contact-via-email-support-customer-communication-contact-services-photo_mw8at4.jpg",
    prev: 4,
    id: 5,
    next: 1
  }
]

const Carousel = () => {
  
  return (
    <div  className="carousel w-full rounded-sm">
      {
        bannerData.map(slide => <CarouselItem key={slide.id} slideData={slide} />)
      }
    </div>
  );
};

export default Carousel;
