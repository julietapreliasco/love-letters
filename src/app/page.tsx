import AboutMeSection from '@/components/landing/AboutMeSection';
import InitialBanner from '@/components/landing/InitialBanner';
import AboutLoveLetters from '@/components/landing/AboutLoveLetters';
import Videos from '@/components/landing/Videos';
import Header from '@/components/layout/Header';
import { fetchLandingSections } from '@/contentful/landingSections';
import findSection from '@/utils/findSection';

const Home: React.FC = async () => {
  const landingSections = await fetchLandingSections({ preview: false });

  const initialBanner = findSection('initialBanner', landingSections);
  const aboutMe = findSection('aboutMe', landingSections);
  const aboutLoveLettersSection = findSection(
    'aboutLoveLetters',
    landingSections
  );
  const videos = findSection('videos', landingSections);

  return (
    <div>
      <Header />

      <InitialBanner bannerData={initialBanner!} />
      <AboutLoveLetters data={aboutLoveLettersSection!} />
      <AboutMeSection aboutMeData={aboutMe!} />
      <Videos videosData={videos!} />
    </div>
  );
};

export default Home;
