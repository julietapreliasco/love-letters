import AboutMeSection from "@/components/landing/AboutMeSection";
import InitialBanner from "@/components/landing/InitialBanner";
import Header from "@/components/layout/Header";
import { fetchLandingSections } from "@/contentful/landingSections";
import findSection from "@/utils/findSection";

const Home: React.FC = async () => {
  const landingSections = await fetchLandingSections({ preview: false });

  const initialBanner = findSection("initialBanner", landingSections);
  const aboutMe = findSection("aboutMe", landingSections);

  return (
    <div>
      <Header />
      <InitialBanner bannerData={initialBanner!} />
      <AboutMeSection aboutMeData={aboutMe!} />
    </div>
  );
};

export default Home;
