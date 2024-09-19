'use client';
import { CampaignType } from '@/contentful/campaign';
import { PageType } from '@/contentful/pages';
import Image from 'next/image';
import Card from '../ui/Card';
import SharedCard from '../ui/SharedCard';
import { useState, useMemo, useEffect } from 'react';
import SearchBar from '../ui/SearchBar';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../ui/Map'), { ssr: false });

interface CampaignsProps {
  page: PageType;
  campaigns: CampaignType[];
}

export const Campaigns = ({ page, campaigns }: CampaignsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const partnerParam = searchParams.get('partner');

  useEffect(() => {
    if (partnerParam) {
      setSearchTerm(partnerParam);
    }
  }, [partnerParam]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const searchFields = [
        campaign.bannerTitle,
        campaign.subtitle,
        campaign.partner,
        campaign.location?.city,
        campaign.location?.country,
      ];
      return searchFields.some(
        (field) =>
          field && field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [campaigns, searchTerm]);

  const isFiltering = searchTerm !== '';

  const highlightedCampaigns = isFiltering
    ? []
    : campaigns.filter((campaign) => campaign.isHighlighted);
  const regularCampaigns = isFiltering
    ? filteredCampaigns
    : campaigns.filter((campaign) => !campaign.isHighlighted);

  const cardStyles = {
    mainDivColor: 'bg-white',
    mainDivPadding: 'p-0 xl:p-0',
    image:
      'min-h-[30vh] max-h-[30vh] rounded-lg md:min-h-[35vh] object-cover shadow-xl',
    mainDivHeight: 'h-full',
    titleFont: 'text-xl',
    contentWrapper: 'h-full',
    linkWrapper: 'h-full flex flex-col justify-between',
  };

  const campaignsWithLocation = campaigns.filter(
    (campaign) => campaign.location
  );

  return (
    <div className="flex flex-col px-4 py-20 md:px-[60px] md:py-[120px]">
      <h2 className="mb-8 text-center font-playfair-display text-4xl tracking-widest md:text-6xl">
        {page.page}
      </h2>
      <div className="w-1/2 self-center">
        <SearchBar onSearch={setSearchTerm} initialValue={partnerParam || ''} />
      </div>

      {!isFiltering && (
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
                      className="h-[600px] w-full rounded-lg object-cover"
                    />
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 transform p-4">
                      <Card
                        card={{
                          title: campaign.bannerTitle,
                          subtitle: campaign.subtitle,
                          section: 'projects',
                          campaign,
                        }}
                        buttonLabel="See more"
                        subtitleSize="text-lg md:text-xl 2xl:text-2xl max-w-[500px]"
                        linkTo={`/campaigns/${campaign.id}`}
                      />
                    </div>
                  </div>
                  <div className="px-5 md:hidden">
                    <SharedCard
                      cardData={{
                        title: campaign.bannerTitle,
                        description: campaign.subtitle,
                        image: campaign.bannerImage,
                        section: 'projects',
                        campaign,
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
      )}

      {regularCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-3">
          {regularCampaigns.map((campaign) => (
            <SharedCard
              key={campaign.id}
              cardData={{
                title: campaign.bannerTitle,
                description: campaign.subtitle,
                image: campaign.bannerImage,
                section: 'projects',
                campaign,
              }}
              styles={cardStyles}
              linkTo={`/campaigns/${campaign.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-2xl font-semibold text-gray-600">
            No campaigns related to {searchTerm}
          </p>
        </div>
      )}

      {campaignsWithLocation.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h2 className="mb-8 text-center font-playfair-display text-4xl tracking-widest md:text-6xl">
            Love letters around the world
          </h2>
          <Map
            locations={campaignsWithLocation.map((campaign) => ({
              ...campaign.location!,
              id: campaign.id,
              title: campaign.subtitle,
            }))}
          />
        </div>
      )}
    </div>
  );
};
