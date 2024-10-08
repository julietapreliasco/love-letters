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

interface PlaceContentProps {
  place: PlaceType;
}

export default function PlaceContent({ place }: PlaceContentProps) {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState<number | null>(
    null
  );
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const hasInitialContent = Boolean(
    place.description || place.trailer || place.press
  );
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

    return (
      <div className="flex flex-col gap-10 px-10 py-10 md:px-20 md:py-20 xl:px-48 xl:py-20">
        {hasInitialContent && (
          <h3 className="font-futura text-2xl font-medium leading-normal tracking-widest md:text-4xl md:leading-normal lg:text-5xl lg:leading-normal">
            {place.title}
          </h3>
        )}
        {place.description && (
          <div className="mb-6">
            {documentToReactComponents(place.description)}
          </div>
        )}
        {place.trailer && (
          <div className="flex flex-col items-center gap-5 font-lato md:text-xl">
            <VideoPlayer
              videoUrl={place.trailer.videoUrl}
              thumbnail={place.trailer.thumbnail}
            />
            <p>{place.trailer.title}</p>
          </div>
        )}
        {place.press && place.press.length > 0 && (
          <PressSection press={place.press} />
        )}
      </div>
    );
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
