import CardItem, { Item } from './CardItem/CardItem';

type MainPanelProp = {
  items: Item[];
  onAddItem: () => void;
};

const MainPanel = ({ items, onAddItem: handleOnAddItem }: MainPanelProp) => {
  return (
    <div className="container mx-auto">
      <div className="grid gap-4 p-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item) => (
          <div key={item.id}>
            <CardItem item={item} onAddItem={handleOnAddItem} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPanel;
