// 'use client';
// import { PageType } from '@/contentful/pages';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { BLOCKS } from '@contentful/rich-text-types';
// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';

// interface AboutMeProps {
//   data: PageType;
// }

// const AboutMe = ({ data }: AboutMeProps) => {
//   const { description, bannerDescription, bannerTitle, bannerImg } = data;

//   let imageIndex = 0;
//   let paragraphIndex = 0;

//   const renderOptions = {
//     renderNode: {
//       [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => {
//         paragraphIndex++;
//         return (
//           <p
//             key={paragraphIndex}
//             className="mb-4 font-lato lg:text-xl xl:text-2xl"
//           >
//             {children}
//           </p>
//         );
//       },
//       [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
//         const { file, title } = node.data.target.fields;
//         const imageUrl = 'https:' + file.url;
//         imageIndex++;
//         return (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img
//             key={imageIndex}
//             width={file.details.image.width}
//             height={file.details.image.height}
//             src={imageUrl}
//             alt={title || ''}
//             className="max-h-[500px] w-full object-cover object-top md:max-h-[437px] md:min-w-[40vw]"
//           />
//         );
//       },
//     },
//   };

//   const contentComponents = documentToReactComponents(
//     description!,
//     renderOptions
//   );

//   const groupedContent: JSX.Element[] = [];
//   const contentArray = Array.isArray(contentComponents)
//     ? contentComponents
//     : [contentComponents];

//   let i = 0;
//   let isOdd;

//   while (i < contentArray.length) {
//     if (contentArray[i].type === 'img') {
//       isOdd = groupedContent.length % 2 === 0;

//       const nextParagraphs = contentArray.slice(i + 1, i + 3);

//       groupedContent.push(
//         <div
//           key={i}
//           className={`flex flex-col gap-5 md:flex-row md:justify-between md:gap-0 ${
//             !isOdd ? 'md:flex-row-reverse' : ''
//           }`}
//         >
//           <div className="self-center">{contentArray[i]}</div>
//           <div
//             className={`py-5 md:max-w-[50%] md:py-0 ${
//               isOdd ? 'md:ml-10' : 'md:mr-10'
//             }`}
//           >
//             {nextParagraphs}
//           </div>
//         </div>
//       );

//       i += 1 + nextParagraphs.length;
//     } else {
//       i++;
//     }
//   }

//   const remainingParagraphs = contentArray.slice(i);
//   if (remainingParagraphs.length) {
//     const lastImage = contentArray.find(
//       (item) => item.type === 'img' && item.key === '3'
//     );

//     if (lastImage) {
//       groupedContent.push(
//         <div
//           key="last-group"
//           className={`flex flex-col gap-10 md:flex-row md:justify-between md:gap-0 ${
//             groupedContent.length % 2 === 0 ? '' : 'md:flex-row-reverse'
//           }`}
//         >
//           <div className="">{lastImage}</div>
//           <div
//             className={`py-5 md:max-w-[50%] md:py-0 ${
//               isOdd ? 'md:ml-10' : 'md:mr-10'
//             }`}
//           >
//             {remainingParagraphs}
//           </div>
//         </div>
//       );
//     }
//   }

//   // Animación basada en scroll
//   const { scrollY } = useScroll();
//   const yPosBanner = useTransform(scrollY, [0, 300], ['-100%', '0%']); // Controla el movimiento de arriba hacia abajo
//   const yPosContent = useTransform(scrollY, [0, 300], ['100%', '0%']); // Controla el movimiento de arriba hacia abajo

//   return (
//     <div className="flex h-fit flex-col bg-custom-lighter-gray">
//       <div className="relative flex w-full flex-col items-center justify-center bg-custom-black md:relative md:h-screen md:flex-row">
//         {bannerImg && (
//           <motion.div className="z-0 flex items-center justify-center pt-20 md:h-auto md:w-[60%] md:pt-10">
//             <Image
//               src={bannerImg.src}
//               alt="Love Letters Home Banner"
//               width={bannerImg.width}
//               height={bannerImg.height}
//               className="z-0 w-[85%] self-center object-cover md:h-auto md:w-full"
//               priority
//             />
//           </motion.div>
//         )}
//         <div className="flex w-full p-10 text-center font-playfair-display text-2xl font-semibold text-custom-lighter-gray drop-shadow-2xl md:absolute md:left-10 md:top-[55%] md:max-w-[520px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
//           <span>{bannerTitle}</span>
//         </div>

//         {/* Bloque que aplasta la imagen y el título */}
//         <motion.div
//           className="absolute left-0 top-0 z-10 h-screen w-full bg-custom-gray"
//           style={{ y: yPosBanner }}
//           transition={{ duration: 10, ease: 'easeInOut' }} // Controla la duración y el easing del scroll
//         />
//       </div>
//       <motion.div
//         // style={{ y: yPosContent }}
//         // transition={{ duration: 1.2, ease: 'easeInOut' }}
//         className="space-y-10 px-6 py-10 md:px-24 md:py-20"
//       >
//         {groupedContent}
//       </motion.div>
//     </div>
//   );
// };

// export default AboutMe;

'use client';
import { PageType } from '@/contentful/pages';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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
            className={`py-5 md:max-w-[50%] md:py-0 ${
              isOdd ? 'md:ml-10' : 'md:mr-10'
            }`}
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
            className={`py-5 md:max-w-[50%] md:py-0 ${
              isOdd ? 'md:ml-10' : 'md:mr-10'
            }`}
          >
            {remainingParagraphs}
          </div>
        </div>
      );
    }
  }

  // Animación basada en scroll
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.3]); // Escalar la imagen al hacer scroll

  return (
    <div className="flex flex-col bg-custom-lighter-gray">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-custom-gray md:relative md:h-screen md:flex-row">
        {bannerImg && (
          <motion.div
            className="z-0 flex items-center justify-center pt-20 md:h-auto md:w-[60%] md:pt-10"
            style={{ scale }} // Aplicar escala a la imagen
          >
            <Image
              src={bannerImg.src}
              alt="Love Letters Home Banner"
              width={bannerImg.width}
              height={bannerImg.height}
              className="z-0 w-[85%] self-center object-cover shadow-xl md:h-auto md:w-full"
              priority
            />
          </motion.div>
        )}
        <div className="flex w-full p-10 text-center font-playfair-display text-2xl font-semibold tracking-wider text-custom-lighter-gray drop-shadow-2xl md:absolute md:left-10 md:top-[60%] md:max-w-[620px] md:text-start md:text-[46px] md:leading-[48px] md:text-white">
          <span>{bannerTitle}</span>
        </div>
      </div>
      <div className="space-y-10 px-6 py-10 md:px-24 md:py-20">
        {groupedContent}
      </div>
    </div>
  );
};

export default AboutMe;
