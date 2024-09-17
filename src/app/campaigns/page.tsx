import { Suspense } from 'react';
import { Campaigns as CampaignsContent } from '@/components/campaigns/Campaigns';
import { fetchPageByName } from '@/contentful/pages';
import { fetchCampaigns } from '@/contentful/campaign';

const Campaigns = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Campaigns',
  });
  const campaigns = await fetchCampaigns({ preview: false });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignsContent campaigns={campaigns!} page={page!} />
    </Suspense>
  );
};

export default Campaigns;
