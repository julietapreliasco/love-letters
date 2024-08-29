const PlayButton = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={141}
    fill="none"
    // {...props}
  >
    <path
      fill="#EEE9DF"
      fillOpacity={0.7}
      d="M70 128.833c32.217 0 58.333-26.116 58.333-58.333S102.217 12.167 70 12.167 11.667 38.283 11.667 70.5 37.783 128.833 70 128.833Z"
    />
    <path
      fill="#29241F"
      stroke="#29241F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m58.333 47.167 35 23.333-35 23.333V47.167Z"
    />
  </svg>
);
export default PlayButton;
