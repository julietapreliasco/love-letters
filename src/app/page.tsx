import Card from "@/components/Card";
import { fetchCards } from "@/contentful/cards";


const Home: React.FC = async () => {
  const cards = await fetchCards({ preview: false });
  console.log(cards)

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default Home;
