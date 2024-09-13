import { fetchCampaign, fetchCampaigns } from '@/contentful/campaign';
import Campaign from '@/components/campaign/Campaign';
import { notFound } from 'next/navigation';

const CampaignPage = async ({ params }: { params: { campaignId: string } }) => {
  const { campaignId } = params;
  const campaign = await fetchCampaign({ id: campaignId, preview: false });

  if (!campaign) {
    notFound();
  }

  return (
    <div>
      <Campaign data={campaign} />
    </div>
  );
};

export async function generateStaticParams() {
  const campaigns = await fetchCampaigns({ preview: false });
  return campaigns.map((campaign) => ({
    campaignId: campaign.id,
  }));
}

export default CampaignPage;
