import FlipCard from '@/components/ui/FlipCard';
import { CardStyles } from '@/components/ui/SharedCard';
import { CardType } from '@/contentful/cards';
import {
  fetchLandingSections,
  LandingSectionType,
} from '@/contentful/landingSections';
import findSection from '@/utils/findSection';

const Press = async () => {
  const landingSections = await fetchLandingSections({ preview: false });
  const press = findSection('press', landingSections) as LandingSectionType;

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-28 md:py-[150px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:mb-10 md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        Press
      </h2>

      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {press.cards &&
          press.cards.map((card: CardType, index: number) => (
            <FlipCard key={index} pressCard={card} />
          ))}
      </div>
    </div>
  );
};

export default Press;
