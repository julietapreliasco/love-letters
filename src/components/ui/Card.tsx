import { CardType } from "@/contentful/cards";
import Image from "next/image";
import React from "react";
import Button from "./Button";

interface CardProps {
  card: CardType;
  buttonLabel?: string;
}

const Card: React.FC<CardProps> = ({ card, buttonLabel }) => {
  const { title, subtitle, description, image } = card;

  return (
    <div className="bg-white rounded-[10px] w-fit p-10 flex flex-col gap-5">
      <div className="flex flex-col xs:flex-row font-playfair-display gap-5">
        {image?.src && (
          <Image
            src={image.src}
            alt="Brian Rashid"
            width={image.width}
            height={image.height}
            className="w-[120px] h-[120px] object-cover flex self-center"
          />
        )}
        <div className="flex flex-col text-left justify-center text-custom-black">
          {title && (
            <span className="text-2xl md:text-4xl font-bold">{title}</span>
          )}
          {subtitle && (
            <span className="text-xl md:text-2xl max-w-[300px] font-bold">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {description && (
        <div>
          <p className="font-lato max-w-[400px] text-custom-black  md:text-xl">
            {description}
          </p>
        </div>
      )}
      {buttonLabel && (
        <div className="flex justify-center md:justify-start">
          <Button label={buttonLabel} />
        </div>
      )}
    </div>
  );
};

export default Card;
