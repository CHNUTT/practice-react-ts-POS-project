import { getByRole, getByText, render, screen } from '@testing-library/react';
import CardItem from '.';
import userEvent from '@testing-library/user-event';

const item = {
  id: '1',
  name: 'Beef Steak',
  price: 20000,
  image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
};

const handleAddItem = vi.fn();

describe('CardItem Component', () => {
  it(`should have all features (image, item's name, and item's price) which user can see`, () => {
    render(<CardItem item={item} onAddItem={() => {}} />);

    const cardItem = screen.getByRole('presentation', { name: item.name });
    expect(cardItem).toBeInTheDocument();

    const image = getByRole(cardItem, 'img', { name: item.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', item.image);

    const itemName = getByText(cardItem, item.name);
    expect(itemName).toBeInTheDocument();
    expect(itemName).toHaveTextContent(item.name);

    const itemPrice = getByText(cardItem, '$20,000');
    expect(itemPrice).toBeInTheDocument();
    expect(itemPrice).toHaveTextContent('$20,000');

    const addItemBtn = getByRole(cardItem, 'button', { name: 'Add Item' });
    expect(addItemBtn).toBeInTheDocument();
  });

  it('should allow user to click Add Item button', async () => {
    render(<CardItem item={item} onAddItem={handleAddItem} />);

    const addItemBtn = screen.getByRole('button', { name: 'Add Item' });
    await userEvent.click(addItemBtn);

    expect(handleAddItem).toHaveBeenCalledOnce();
  });
});
