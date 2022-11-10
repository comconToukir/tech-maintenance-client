import React from "react";
import MetaData from "../../../Layout/MetaData";
import Carousel from "../Carousel/Carousel";
import HomePageReviews from "../HomePageReviews/HomePageReviews";
import HomePageServices from "../HomePageServices/HomePageServices";
import SubscribeCTA from "../SubscribeCTA/SubscribeCTA";

const Home = () => {
  return (
    <div>
      <MetaData />
      <Carousel />
      <HomePageServices />
      <HomePageReviews />
      <SubscribeCTA />
    </div>
  );
};

export default Home;
