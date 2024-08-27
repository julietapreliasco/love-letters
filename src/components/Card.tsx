import { CardType } from "@/contentful/cards";
import React from "react";

interface CardComponentProps {
  card: CardType;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const { title, description, image } = card;

  return (
    <div
      className="relative rounded-lg w-72 h-96 p-5 flex flex-col justify-center items-center text-white text-center"
      style={{
        backgroundImage: `url(${image?.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-50 rounded-lg p-4">
        <h1 className="text-xl font-bold">{title ?? "undefined"}</h1>
        <p className="mt-2 text-sm">{description ?? "undefined"}</p>
      </div>
    </div>
  );
};

export default CardComponent;
