import { CampaignType } from '@/contentful/campaign';
import { PageType } from '@/contentful/pages';
import Image from 'next/image';
import Card from '../ui/Card';
import SharedCard from '../ui/SharedCard';

interface CampaignsProps {
  page: PageType;
  campaigns: CampaignType[];
}

export const Campaigns = ({ page, campaigns }: CampaignsProps) => {
  const highlightedCampaigns = campaigns.filter(
    (campaign) => campaign.isHighlighted
  );
  const regularCampaigns = campaigns.filter(
    (campaign) => !campaign.isHighlighted
  );

  const cardStyles = {
    mainDivColor: 'bg-white',
    mainDivPadding: 'p-0 xl:p-0',
    image: 'h-full md:w-[30vw] md:h-[35vh] object-cover',
    mainDivHeight: 'h-full',
    titleFont: 'text-xl',
    contentWrapper: 'h-full',
    linkWrapper: 'h-full flex flex-col justify-between',
  };

  return (
    <div className="flex flex-col px-4 py-12 md:px-[60px] md:py-[120px]">
      <h2 className="mb-8 text-center font-playfair-display text-4xl md:text-6xl">
        {page.page}
      </h2>

      <div className="mb-12 space-y-8">
        {highlightedCampaigns.map((campaign) => (
          <div key={campaign.id} className="relative">
            {campaign.bannerImage && (
              <>
                <div className="hidden md:block">
                  <Image
                    alt={campaign.bannerImage.alt}
                    src={campaign.bannerImage.src}
                    width={1200}
                    height={600}
                    className="h-[600px] w-full object-cover"
                  />
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 transform p-4">
                    <Card
                      card={{
                        title: campaign.bannerTitle,
                        subtitle: campaign.subtitle,
                        section: 'projects',
                      }}
                      buttonLabel="See more"
                      subtitleSize="text-lg md:text-xl 2xl:text-2xl max-w-[500px]"
                    />
                  </div>
                </div>
                <div className="md:hidden">
                  <SharedCard
                    cardData={{
                      title: campaign.bannerTitle,
                      description: campaign.subtitle,
                      image: campaign.bannerImage,
                      section: 'projects',
                    }}
                    styles={cardStyles}
                    linkTo={`/campaigns/${campaign.id}`}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {regularCampaigns.map((campaign) => (
          <SharedCard
            key={campaign.id}
            cardData={{
              title: campaign.bannerTitle,
              description: campaign.subtitle,
              image: campaign.bannerImage,
              section: 'projects',
            }}
            styles={cardStyles}
            linkTo={`/campaigns/${campaign.id}`}
          />
        ))}
      </div>
    </div>
  );
};
