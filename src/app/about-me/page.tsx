import AboutMe from '@/components/about-me/AboutMe';
import { fetchPage } from '@/contentful/pages';

const AboutMePage = async () => {
  const page = await fetchPage({
    preview: false,
    id: '369XvOoZWrBOqOsdxKVp6A',
  });

  return (
    <div>
      <AboutMe data={page!} />
    </div>
  );
};

export default AboutMePage;
