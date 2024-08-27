import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import { fetchCards } from "@/contentful/cards";

const Home: React.FC = async () => {
  const cards = await fetchCards({ preview: false });

  return (
    <>
      <div>
        <Button label="Join us" />
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </>
  );
};

export default Home;
