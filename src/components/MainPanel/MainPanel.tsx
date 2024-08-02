import ItemCard, { Item } from '../ItemCard/ItemCard';

type MainPanelProp = {
  items: Item[];
};

const MainPanel = ({ items }: MainPanelProp) => {
  return (
    <div className="grid gap-4 p-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((item) => (
        <div key={item.id}>
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default MainPanel;
