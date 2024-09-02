import { CardType } from '@/contentful/cards';
import { LandingSectionType } from '@/contentful/landingSections';

type ItemType = LandingSectionType | CardType;

const findSection = (section: string, array: ItemType[]) => {
  return array.find((item: ItemType) => item.section === section);
};

export default findSection;
