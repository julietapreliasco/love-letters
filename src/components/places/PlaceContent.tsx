'use client';

import { useState, useEffect, useRef } from 'react';
import Banner from '@/components/landing/Banner';
import { BannerType } from '@/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PlaceType } from '@/contentful/places';
import Campaign from '@/components/campaign/Campaign';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface PlaceContentProps {
  place: PlaceType;
}

const PlaceContent: React.FC<PlaceContentProps> = ({ place }) => {
  const [activeCampaignIndex, setActiveCampaignIndex] = useState<number | null>(
    null
  );
  const nextSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!place.description && !place.trailer) {
      if (place.campaigns && place.campaigns.length > 0) {
        setActiveCampaignIndex(0);
      }
    }
  }, [place]);

  const handleCampaignChange = (index: number) => {
    setActiveCampaignIndex(index);
  };

  const renderContent = () => {
    if (
      activeCampaignIndex !== null &&
      place.campaigns &&
      place.campaigns[activeCampaignIndex]
    ) {
      return <Campaign data={place.campaigns[activeCampaignIndex]} />;
    }

    if (!place.description && !place.trailer) {
      return null;
    }

    return (
      <div className="px-10 py-10 md:px-20 md:py-20 xl:px-48 xl:py-20">
        {place.description && (
          <div className="mb-6">
            {documentToReactComponents(place.description)}
          </div>
        )}
        {place.trailer && (
          <VideoPlayer
            videoUrl={place.trailer.videoUrl}
            thumbnail={place.trailer.thumbnail}
          />
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
      />
      <div ref={nextSectionRef}>{renderContent()}</div>
    </div>
  );
};

export default PlaceContent;
