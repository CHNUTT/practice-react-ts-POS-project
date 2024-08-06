import CardItem, { Item } from './CardItem/CardItem';

type MainPanelProp = {
  items: Item[];
  onAddItem: (id: string) => void;
};

const MainPanel = ({ items, onAddItem: handleOnAddItem }: MainPanelProp) => {
  return (
    <div className="container mx-auto">
      <ul className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) => (
          <li key={item.id}>
            <CardItem item={item} onAddItem={handleOnAddItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPanel;
