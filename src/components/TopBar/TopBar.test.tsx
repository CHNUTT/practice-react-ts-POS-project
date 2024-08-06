import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import TopBar from './TopBar';
import userEvent from '@testing-library/user-event';

const categories = [
  { id: '1', name: 'Appetizer' },
  { id: '2', name: 'Main' },
  { id: '3', name: 'Drink' },
  { id: '4', name: 'Dessert' },
];

const handleMenuClicked = vi.fn();

describe('TopBar Component', () => {
  it('should render categories correctly', () => {
    render(<TopBar categories={categories} onMenuClick={() => {}} />);
    const topBar = screen.getByRole('navigation', { name: 'Foodie' });
    expect(topBar).toBeInTheDocument();

    const menuList = getByRole(topBar, 'list', { name: 'menus' });
    expect(menuList).toBeInTheDocument();

    const menus = getAllByRole(menuList, 'listitem');

    for (let index = 1; index < menus.length; index += 1) {
      expect(menus[index]).toHaveTextContent(categories[index - 1].name);
    }

    expect(menus[0]).toHaveClass('underline');
  });

  it('should allow user click on the menu and giving underline on the chosen menu', async () => {
    render(<TopBar categories={categories} onMenuClick={handleMenuClicked} />);

    const menus = screen.getAllByRole('listitem');

    await userEvent.click(menus[2]);
    expect(handleMenuClicked).toHaveBeenCalledOnce();
    expect(handleMenuClicked).toHaveBeenCalledWith('2');
    expect(menus[0]).not.toHaveClass('underline');
    expect(menus[2]).toHaveClass('underline');
  });
});
