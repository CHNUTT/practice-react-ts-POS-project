import ItemCard from './components/ItemCard';

const item = {
  id: '1',
  name: 'Beef Steak',
  price: 20000,
  image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
};

const App = () => (
  <div className="bg-gray-300 w-screen h-screen flex">
    <ItemCard item={item} />
  </div>
);

export default App;
