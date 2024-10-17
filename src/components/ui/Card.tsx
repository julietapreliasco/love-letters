import { CardType } from '@/contentful/cards';
import Image from 'next/image';
import Button from './Button';

interface CardProps {
  card: CardType;
  buttonLabel?: string;
  titleSize?: string;
  descriptionSize?: string;
  subtitleSize?: string;
  linkTo?: string;
}

const Card = ({
  card,
  buttonLabel,
  titleSize,
  descriptionSize,
  linkTo,
  subtitleSize,
}: CardProps) => {
  const { title, subtitle, description, image } = card;

  return (
    <div className="flex w-fit flex-col gap-5 rounded-[10px] bg-white p-10">
      <div className="flex flex-col gap-5 font-futura md:flex-row">
        {image?.src && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="flex h-[120px] w-[120px] self-center object-cover"
          />
        )}
        <div className="flex flex-col items-center justify-center gap-2 text-center text-custom-black md:items-start md:justify-start md:text-start">
          {title && (
            <span
              className={`${titleSize ?? 'text-2xl leading-normal md:text-4xl md:leading-normal'}`}
            >
              {title}
            </span>
          )}
          {subtitle && (
            <span
              className={`${subtitleSize ?? 'max-w-[300px] text-xl uppercase leading-normal md:text-2xl md:leading-normal'} `}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {description && (
        <div>
          <p
            className={`text-center font-lato leading-normal text-custom-black md:text-start md:leading-normal ${descriptionSize ?? 'max-w-[400px] md:text-xl'} `}
          >
            {description}
          </p>
        </div>
      )}
      {buttonLabel && (
        <div className="mt-3 flex justify-center md:mt-1 md:justify-start">
          <Button linkTo={linkTo} label={buttonLabel} />
        </div>
      )}
    </div>
  );
};

export default Card;
