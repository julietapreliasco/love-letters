import AboutMe from '@/components/about-me/AboutMe';
import { fetchPageByName } from '@/contentful/pages';

const AboutMePage = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'About me',
  });

  return (
    <div>
      <AboutMe data={page!} />
    </div>
  );
};

export default AboutMePage;
