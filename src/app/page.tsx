import AboutMeSection from '@/components/landing/AboutMeSection';
import InitialBanner from '@/components/landing/InitialBanner';
import AboutLoveLetters from '@/components/landing/AboutLoveLetters';
import Videos from '@/components/landing/Videos';
import { fetchLandingSections } from '@/contentful/landingSections';
import findSection from '@/utils/findSection';
import ProjectsSection from '@/components/landing/ProjectsSection';
import ContactUs from '@/components/landing/ContactUs';
import Partners from '@/components/landing/Partners';
import Press from '@/components/landing/Press';
import Banner from '@/components/landing/Banner';
import { BannerType } from '@/types';

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
  const partners = findSection('partners', landingSections);
  const press = findSection('press', landingSections);

  const campaignLinks = [
    { title: 'Allentown', link: '/#partners' },
    { title: 'Bethlehem', link: '/' },
    {
      title: 'Ending gun violence',
      link: '/about-me',
    },
    { title: 'Moravian Uniersity', link: '/campaigns' },
  ];

  return (
    <div>
      <Banner
        bannerData={initialBanner!}
        bannerType={BannerType.CAMPAIGN_BANNER}
        campaignData={{ campaignLinks: campaignLinks, title: 'Lehigh Valley' }}
      />
      <AboutLoveLetters aboutLoveLettersData={aboutLoveLettersSection!} />
      <AboutMeSection aboutMeData={aboutMe!} />
      <ProjectsSection projectData={project!} />
      <Videos videosData={videos!} />
      <Partners partnersData={partners!} />
      <ContactUs contactUsData={contactUs!} />
      <Press pressData={press!} />
    </div>
  );
};

export default Home;
