import React from "react";
import VideoSlider from "../ui/VideoSlider";

const videoUrls = [
  "https://www.youtube.com/watch?v=MgHd0kReWbs&list=PLqlcOBtOB5tVDz77i_S9ZVQGJv0Xuijh4&index=10",
  "https://www.youtube.com/watch?v=RX4H8mbJWig&list=PLqlcOBtOB5tV2DtzUJRnlL47itjeZeOoc",
  "https://www.youtube.com/watch?v=w_8yhPXQCM0&list=PLqlcOBtOB5tVhJWISK9pKGPL9y18EkPPv",
  "https://www.youtube.com/watch?v=ShlJXQ9Aoes&list=PLqlcOBtOB5tW1iHMYVpuXS13xxWxBc4O4",
  "https://www.youtube.com/watch?v=HGPLCfap6Rg&list=PLqlcOBtOB5tUkP14zy5a5EaBjcAzQju8D",
];

const Videos = () => {
  return (
    <div className="px-[70px] py-20">
      <VideoSlider videoUrls={videoUrls} />
    </div>
  );
};

export default Videos;
