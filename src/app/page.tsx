import AboutMeSection from '@/components/landing/AboutMeSection';
import InitialBanner from '@/components/landing/InitialBanner';
import AboutLoveLetters from '@/components/landing/AboutLoveLetters';
import Videos from '@/components/landing/Videos';
import Header from '@/components/layout/Header';
import { fetchLandingSections } from '@/contentful/landingSections';
import findSection from '@/utils/findSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import ContactUs from '@/components/landing/ContactUs';

const Home: React.FC = async () => {
  const landingSections = await fetchLandingSections({ preview: false });

  const initialBanner = findSection('initialBanner', landingSections);
  const aboutMe = findSection('aboutMe', landingSections);
  const aboutLoveLettersSection = findSection(
    'aboutLoveLetters',
    landingSections
  );
  const videos = findSection('videos', landingSections);
  const project = findSection('projects', landingSections);
  const contactUs = findSection('contactUs', landingSections);

  return (
    <div>
      <Header />

      <InitialBanner bannerData={initialBanner!} />
      <AboutLoveLetters aboutLoveLettersData={aboutLoveLettersSection!} />
      <AboutMeSection aboutMeData={aboutMe!} />
      <ProjectsSection projectData={project!} />
      <Videos videosData={videos!} />
      <ContactUs contactUsData={contactUs!} />
    </div>
  );
};

export default Home;
