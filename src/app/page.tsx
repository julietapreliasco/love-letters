import Card from "@/components/Card";
import InitialBanner from "@/components/landing/InitialBanner";
import { fetchLandingSections } from "@/contentful/landingSections";

const Home: React.FC = async () => {
  const landingSections = await fetchLandingSections({ preview: false });

  const landingBanner = landingSections.find((item) => item.section === "initialBanner")

  return (
    <div>
      {landingBanner && <InitialBanner bannerData={landingBanner} />}
    </div>
  );
};

export default Home;
