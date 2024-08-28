import { LandingSectionType } from "@/contentful/landingSections";

const findSection = (section: string, sectionsArray: LandingSectionType[]) => {
  return sectionsArray.find(
    (item: LandingSectionType) => item.section === section
  );
};

export default findSection;
