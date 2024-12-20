import Retreats from '@/components/retreats/Retreats';
import { fetchPageByName } from '@/contentful/pages';

const RetreatsPage = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Retreats',
  });

  return (
    <div>
      <Retreats data={page!} />
    </div>
  );
};

export default RetreatsPage;
