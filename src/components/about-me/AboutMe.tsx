'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Card from '../ui/Card';

interface AboutMeProps {
  data: PageType;
}

const AboutMe = ({ data }: AboutMeProps) => {
  const { description, bannerDescription, bannerTitle, bannerImg } = data;

  let imageIndex = 0;
  let paragraphIndex = 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
        paragraphIndex++;
        return (
          <p
            key={paragraphIndex}
            className="mb-4 font-lato lg:text-xl xl:text-2xl"
          >
            {children}
          </p>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        const imageUrl = 'https:' + file.url;
        imageIndex++;
        console.log(file);
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={imageIndex}
            width={file.details.image.width}
            height={file.details.image.height}
            src={imageUrl}
            alt={title || ''}
            className="max-h-[500px] w-full object-cover object-top md:max-h-[437px] md:min-w-[40vw]"
          />
        );
      },
    },
  };

  const contentComponents = documentToReactComponents(
    description!,
    renderOptions
  );

  const groupedContent: JSX.Element[] = [];
  const contentArray = Array.isArray(contentComponents)
    ? contentComponents
    : [contentComponents];

  let i = 0;
  let isOdd;

  while (i < contentArray.length) {
    if (contentArray[i].type === 'img') {
      isOdd = groupedContent.length % 2 === 0;

      const nextParagraphs = contentArray.slice(i + 1, i + 3);

      groupedContent.push(
        <div
          key={i}
          className={`flex flex-col gap-5 md:flex-row md:justify-between md:gap-0 ${
            !isOdd ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="self-center">{contentArray[i]}</div>
          <div
            className={`py-5 md:max-w-[50%] md:py-0 ${isOdd ? 'md:ml-10' : 'md:mr-10'}`}
          >
            {nextParagraphs}
          </div>
        </div>
      );

      i += 1 + nextParagraphs.length;
    } else {
      i++;
    }
  }

  const remainingParagraphs = contentArray.slice(i);
  if (remainingParagraphs.length) {
    const lastImage = contentArray.find(
      (item) => item.type === 'img' && item.key === '3'
    );

    if (lastImage) {
      groupedContent.push(
        <div
          key="last-group"
          className={`flex flex-col gap-10 md:flex-row md:justify-between md:gap-0 ${
            groupedContent.length % 2 === 0 ? '' : 'md:flex-row-reverse'
          }`}
        >
          <div className="">{lastImage}</div>
          <div
            className={`py-5 md:max-w-[50%] md:py-0 ${isOdd ? 'md:ml-10' : 'md:mr-10'}`}
          >
            {remainingParagraphs}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col">
      <div className="h-screen w-full md:relative">
        {bannerImg && (
          <Image
            src={bannerImg.src}
            alt="Love Letters Home Banner"
            fill
            className="z-0 object-cover"
            priority
          />
        )}
      </div>
      <div className="flex h-auto w-full justify-center px-10 py-[42px] md:absolute md:left-10 md:top-[60%] md:max-w-[600px] md:-translate-y-1/2 md:p-0">
        <Card
          card={{
            title: bannerTitle,
            description: bannerDescription,
            section: 'aboutMePage',
          }}
          descriptionSize="md:text-lg 2xl:text-xl"
        />
      </div>
      <div className="space-y-10 px-6 py-10 md:px-24 md:py-20">
        {groupedContent}
      </div>
    </div>
  );
};

export default AboutMe;
