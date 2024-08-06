import { render, screen } from '@testing-library/react';
import MainPanel from './MainPanel';

const items = [
  {
    id: '1',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
    category: '1',
  },
  {
    id: '2',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
    category: '2',
  },
  {
    id: '3',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
    category: '1',
  },
  {
    id: '4',
    name: 'Fried Chicken',
    price: 20000,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
    category: '2',
  },
];

describe('MainPanel Component', () => {
  it('should show correct item number', () => {
    render(<MainPanel items={items} onAddItem={() => {}} />);
    const cardItems = screen.getAllByRole('presentation');
    expect(cardItems).toHaveLength(4);
  });
});
