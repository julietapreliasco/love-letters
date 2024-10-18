import Speaking from '@/components/speaking/Speaking';
import { fetchPageByName } from '@/contentful/pages';

const SpeakingPage = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Speaking',
  });

  return (
    <div>
      <Speaking data={page!} />
    </div>
  );
};

export default SpeakingPage;
