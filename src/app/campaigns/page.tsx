import React from 'react';
import { Campaigns as CampaignsContent } from '@/components/campaigns/Campaigns';
import { fetchPageByName } from '@/contentful/pages';
import { fetchCampaigns } from '@/contentful/campaign';

const Campaigns = async () => {
  const page = await fetchPageByName({
    preview: false,
    page: 'Campaigns',
  });
  const campaigns = await fetchCampaigns({ preview: false });
  return <CampaignsContent campaigns={campaigns!} page={page!} />;
};

export default Campaigns;
