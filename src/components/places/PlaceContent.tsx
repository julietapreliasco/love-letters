'use client';

import { useState, useEffect, useRef } from 'react';
import Banner from '@/components/ui/Banner';
import { BannerType } from '@/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PlaceType } from '@/contentful/places';
import Campaign from '@/components/campaign/Campaign';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { useSearchParams } from 'next/navigation';
import PressSection from '@/components/ui/PressSection';
import PartnerSection from '../ui/PartnerSection';

interface PlaceContentProps {
  place: PlaceType;
}

export default function PlaceContent({ place }: PlaceContentProps) {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState<number | null>(
    null
  );
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const hasInitialContent = Boolean(place.description || place.trailer);
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');

  useEffect(() => {
    if (campaignId && place.campaigns) {
      const index = place.campaigns.findIndex(
        (campaign) => campaign.id === campaignId
      );
      if (index !== -1) {
        setActiveCampaignIndex(index);
      }
    } else if (!hasInitialContent) {
      if (place.campaigns && place.campaigns.length > 0) {
        setActiveCampaignIndex(0);
      }
    }
  }, [place, hasInitialContent, campaignId]);

  const handleCampaignChange = (index: number) => {
    setActiveCampaignIndex(index);
  };

  const handleTitleClick = () => {
    if (hasInitialContent) {
      setActiveCampaignIndex(null);
    }
  };

  const renderContent = () => {
    if (
      activeCampaignIndex !== null &&
      place.campaigns &&
      place.campaigns[activeCampaignIndex]
    ) {
      return <Campaign data={place.campaigns[activeCampaignIndex]} />;
    }

    if (!hasInitialContent) {
      return null;
    }

    const allPartners =
      place.campaigns?.flatMap((campaign) => campaign.partner || []) || [];

    if (hasInitialContent) {
      return (
        <div className="flex flex-col gap-10 px-10 py-32 md:px-20 xl:px-48">
          <div className="flex w-full flex-col items-center">
            {allPartners.length > 0 && (
              <div className="w-full md:mb-10">
                <PartnerSection partners={allPartners} isPlacePage={true} />
              </div>
            )}
          </div>

          {place.description && (
            <div className="mb-6">
              {documentToReactComponents(place.description)}
            </div>
          )}
          {place.trailer && (
            <div className="flex flex-col font-lato">
              <p className="mb-6 font-futura text-3xl font-medium tracking-widest md:text-5xl lg:mb-11">
                {place.trailer.title}
              </p>
              <VideoPlayer
                videoUrl={place.trailer.videoUrl}
                thumbnail={place.trailer.thumbnail}
              />
            </div>
          )}
          {place.press && place.press.length > 0 && (
            <PressSection press={place.press} />
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <Banner
        bannerType={BannerType.CAMPAIGN_BANNER}
        placeData={place}
        onCampaignChange={handleCampaignChange}
        activeCampaignIndex={activeCampaignIndex}
        nextSectionRef={nextSectionRef}
        hasInitialContent={hasInitialContent}
        onTitleClick={handleTitleClick}
      />
      <div ref={nextSectionRef}>{renderContent()}</div>
    </div>
  );
}
