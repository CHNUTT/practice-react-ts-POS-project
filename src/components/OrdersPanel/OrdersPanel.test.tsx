import { getByRole, getByText, render, screen } from '@testing-library/react';
import OrdersPanel from './OrdersPanel';
import userEvent from '@testing-library/user-event';

const items = [
  {
    id: '1',
    name: 'Beef Steak',
    price: 20,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
    category: '1',
  },
  {
    id: '2',
    name: 'Fried Chicken',
    price: 25,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
    category: '1',
  },
  {
    id: '3',
    name: 'Beef Steak',
    price: 15,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
    category: '1',
  },
];

const intiOrders = {
  orders: [
    {
      item: items[0],
      qty: 1,
    },
    {
      item: items[1],
      qty: 2,
    },
    {
      item: items[2],
      qty: 3,
    },
  ],
  total: 1 * items[0].price + 2 * items[1].price + 3 * items[2].price,
};

const handleIncreaseQty = vi.fn();
const handleDecreaseQty = vi.fn();
const handleRemoveItem = vi.fn();
const handlePressOrder = vi.fn();
const handleCancelOrder = vi.fn();
const handleNameChange = vi.fn();
const handleTableChange = vi.fn();

describe('OrderPanel Component', () => {
  beforeEach(() => {
    render(
      <OrdersPanel
        cart={intiOrders}
        onIncrease={handleIncreaseQty}
        onDecrease={handleDecreaseQty}
        onRemove={handleRemoveItem}
        onOrder={handlePressOrder}
        onCancel={handleCancelOrder}
        onNameChange={handleNameChange}
        onTableChange={handleTableChange}
      />
    );
  });
  it('should render header, subheader', () => {
    expect(screen.getByRole('heading', { name: 'My Orders' })).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toHaveTextContent('Your orders will be appear here');
  });
  it('should render list of orders and Total', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    const orderTotal = screen.getByRole('group', { name: 'Total' });
    expect(orderTotal).toBeInTheDocument();
    expect(getByText(orderTotal, '$115'));
  });

  it('should render list of orders', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    for (const itemIndex in listItems) {
      expect(listItems[itemIndex]).toHaveTextContent(intiOrders.orders[itemIndex].item.name);
      expect(listItems[itemIndex]).toHaveTextContent(`$${intiOrders.orders[itemIndex].item.price}`);
      expect(listItems[itemIndex]).toHaveTextContent(intiOrders.orders[itemIndex].qty.toString());
    }
  });

  it('should have Order Now and Cancel Buttons', () => {
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('should allow user to click Order Now button', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Order Now' }));
    expect(handlePressOrder).toHaveBeenCalledTimes(1);
  });
  it('should allow user to click Cancel button', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(handleCancelOrder).toHaveBeenCalledTimes(1);
  });

  it('should have a Customer Detail form and call function correctly', async () => {
    const customerDetailForm = screen.getByRole('form', { name: 'Customer Detail' });
    expect(customerDetailForm).toBeInTheDocument();

    const nameField = getByRole(customerDetailForm, 'textbox', { name: 'Your name' });
    expect(nameField).toBeInTheDocument();
    await userEvent.clear(nameField);
    await userEvent.type(nameField, 'John');
    expect(handleNameChange).toHaveBeenCalled();

    const tableField = getByRole(customerDetailForm, 'textbox', { name: 'No. Table' });
    expect(tableField).toBeInTheDocument();
    await userEvent.clear(tableField);
    await userEvent.type(tableField, '5A');
    expect(handleTableChange).toHaveBeenCalled();
  });
});
