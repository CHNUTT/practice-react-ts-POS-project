import { getByRole, getByText, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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

const handleIncreaseButtonClickMock = vi.fn(() => {});
const handleDecreaseButtonClickMock = vi.fn(() => {});
const handleRemoveButtonClickMock = vi.fn(() => {});

describe('OrderItem Component', () => {
  it('should have all necessary elements (img, name, price, increase btn, decrease btn, qty, delete btn', () => {
    render(
      <OrderItem
        item={order.item}
        qty={order.qty}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={() => {}}
      />
    );

    const item = screen.getByRole('presentation', { name: `order for ${order.item.name}` });

    expect(item).toBeInTheDocument();
    expect(getByText(item, order.item.name));
    expect(getByText(item, '$20,000'));
    expect(getByRole(item, 'img', { name: order.item.name }));
    expect(getByRole(item, 'button', { name: 'decrease quantity' }));
    expect(getByRole(item, 'button', { name: 'increase quantity' }));
    expect(getByRole(item, 'button', { name: 'remove item' }));
  });

  it('should allow user to click decrease and increase button', async () => {
    render(
      <OrderItem
        item={order.item}
        qty={order.qty}
        onIncrease={handleIncreaseButtonClickMock}
        onDecrease={handleDecreaseButtonClickMock}
        onRemove={() => {}}
      />
    );

    const increaseButton = screen.getByRole('button', { name: 'increase quantity' });
    await userEvent.click(increaseButton);
    expect(handleIncreaseButtonClickMock).toHaveBeenCalledTimes(1);

    const decreaseButton = screen.getByRole('button', { name: 'decrease quantity' });
    await userEvent.click(decreaseButton);
    expect(handleDecreaseButtonClickMock).toHaveBeenCalledTimes(1);
  });

  it('should allow user to click remove item from orders', async () => {
    render(
      <OrderItem
        item={order.item}
        qty={order.qty}
        onIncrease={() => {}}
        onDecrease={() => {}}
        onRemove={handleRemoveButtonClickMock}
      />
    );

    const removeButton = screen.getByRole('button', { name: 'remove item' });
    await userEvent.click(removeButton);
    expect(handleRemoveButtonClickMock).toHaveBeenCalledTimes(1);
  });
});
