import { render } from '@testing-library/react';
import OrderItem from './OrderItem';

const order = {
  item: {
    id: '1',
    name: 'Beef Steak',
    price: 20000,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  qty: 1,
};

describe('OrderItem Component', () => {
  it('should have all necessary elements (img, name, price, increase btn, decrease btn, qty, delete btn', () => {
    render(<OrderItem item={order.item} qty={order.qty} />);
  });
});
