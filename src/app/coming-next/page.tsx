import ComingNext from '@/components/coming-next/ComingNext';
import { fetchPageByName } from '@/contentful/pages';

const ComingNextPage = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Coming next',
  });

  return (
    <div>
      <ComingNext data={page!} />
    </div>
  );
};

export default ComingNextPage;
