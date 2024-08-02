import MainPanel from './components/MainPanel';

const items = [
  {
    id: '1',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '2',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '3',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '4',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '5',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '6',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '7',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '8',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '9',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '10',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
];

const App = () => (
  <div className="bg-gray-300 min-w-screen max-w-screen min-h-screen">
    <MainPanel items={items} />
  </div>
);

export default App;
