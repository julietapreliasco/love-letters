import InitialBanner from "@/components/landing/InitialBanner";
import { fetchLandingSections } from "@/contentful/landingSections";
import findSection from "@/utils/findSection";

const Home: React.FC = async () => {
  const landingSections = await fetchLandingSections({ preview: false });

  const initialBanner = findSection("initialBanner", landingSections);

  return (
    <div>
      <InitialBanner bannerData={initialBanner!} />
    </div>
  );
};

export default Home;
