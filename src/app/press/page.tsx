import SharedCard, { CardStyles } from '@/components/ui/SharedCard';
import { CardType } from '@/contentful/cards';
import {
  fetchLandingSections,
  LandingSectionType,
} from '@/contentful/landingSections';
import findSection from '@/utils/findSection';

const Press = async () => {
  const landingSections = await fetchLandingSections({ preview: false });
  const press = findSection('press', landingSections) as LandingSectionType;

  const pressCardStyles: CardStyles = {
    mainDivHeight: 'h-full',
    image: 'w-full',
  };

  return (
    <div className="flex flex-col items-center gap-10 px-8 py-20 sm:px-12 md:py-[120px] xl:px-[160px]">
      <h2 className="font-futura text-xl font-medium uppercase leading-normal tracking-wider md:text-3xl md:leading-normal lg:text-4xl lg:leading-normal">
        Press
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {press.cards &&
          press.cards.map((card: CardType, index: number) => (
            <SharedCard
              key={index}
              cardData={card}
              styles={pressCardStyles}
              linkTo={card.url}
              isPress={true}
            />
          ))}
      </div>
    </div>
  );
};

export default Press;
