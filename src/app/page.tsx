import AboutMeSection from '@/components/landing/AboutMeSection';
import Banner from '@/components/ui/Banner';
import AboutLoveLetters from '@/components/landing/AboutLoveLetters';
import { fetchLandingSections } from '@/contentful/landingSections';
import findSection from '@/utils/findSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import ContactUs from '@/components/landing/ContactUs';
import Partners from '@/components/landing/Partners';
import Press from '@/components/landing/Press';
import { BannerType } from '@/types';
import { fetchPlaces } from '@/contentful/places';
import { Map } from '@/components/landing/Map';
import { fetchPartners } from '@/contentful/partners';

const Home = async () => {
  const landingSections = await fetchLandingSections({ preview: false });
  const places = await fetchPlaces({ preview: false });

  const initialBanner = findSection('initialBanner', landingSections);
  const aboutMe = findSection('aboutMe', landingSections);
  const aboutLoveLettersSection = findSection(
    'aboutLoveLetters',
    landingSections
  );
  const project = findSection('projects', landingSections);
  const contactUs = findSection('contactUs', landingSections);
  const partners = findSection('partners', landingSections);
  const partnersData = await fetchPartners({ preview: false });
  const press = findSection('press', landingSections);

  return (
    <div>
      <Banner
        bannerType={BannerType.MAIN_BANNER}
        nextSectionId="aboutLoveLetters"
      />
      <AboutLoveLetters aboutLoveLettersData={aboutLoveLettersSection!} />
      <AboutMeSection aboutMeData={aboutMe!} />
      <ProjectsSection projectData={project!} places={places} />
      <Map places={places} />
      <Partners partnersData={partnersData} partnersPageData={partners!} />
      <ContactUs contactUsData={contactUs!} />
      <Press pressData={press!} />
    </div>
  );
};

export default Home;
