import React from "react";

const SubscribeCTA = () => {
  return (
    <div className="hero h-auto my-32 lg:w-2/3 mx-auto bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://media.gettyimages.com/id/1250090642/vector/newsletter-and-email-subscribe-banner-vector-design.jpg?s=612x612&w=gi&k=20&c=vVzvMwQWi_jZ0bIdhElRi2X5ZIp0Dxduo79yt2IKG_g="
          className="max-w-sm rounded-lg shadow-2xl"
          alt=""
        />
        <div className="text-center lg:text-start">
          <h1 className="text-3xl w-4/5 font-bold mt-12 lg:mt-0 mx-auto lg:mx-0 ">
            Subscribe to my curated newsletter
          </h1>
          <p className="w-5/6 mt-4 mx-auto lg:mx-0 ">If you are curious about technology consider subscribing to my weekly newsletter and get updated if anything interesting happens.</p>
          <div className="form-control mt-9">
            <label className="input-group justify-center lg:justify-start">
              <input
                type="email"
                placeholder="your email"
                className="input input-bordered "
              />
              <button className="btn">
                Subscribe
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCTA;
