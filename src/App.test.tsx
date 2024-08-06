import { getAllByRole, getByRole, getByText, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

const mockedItems = [
  {
    id: '1',
    name: 'Roasted Shrimp Cocktail With Horseradish Sauce',
    price: 20,
    image:
      'https://static01.nyt.com/images/2023/05/17/multimedia/17apperex-shrimp-lzbf/17apperex-shrimp-lzbf-articleLarge.jpg',
    category: '1',
  },
  {
    id: '2',
    name: 'Pink Peppercorn-Marinated Goat Cheese',
    price: 18,
    image:
      'https://static01.nyt.com/images/2024/05/17/multimedia/17LESUDEREX2-jzmq/17LESUDEREX2-jzmq-threeByTwoMediumAt2X.jpg?width=1280&quality=75&auto=webp',
    category: '1',
  },
  {
    id: '3',
    name: 'Oven-Fried Zucchini',
    price: 20,
    image:
      'https://static01.nyt.com/images/2024/07/05/multimedia/MK-Oven-Fried-Zucchinirex-tqmw/MK-Oven-Fried-Zucchinirex-tqmw-mediumThreeByTwo252.jpg',
    category: '1',
  },
  {
    id: '4',
    name: 'Beef Negimaki',
    price: 18,
    image:
      'https://static01.nyt.com/images/2021/12/03/dining/kc-beef-negimaki/merlin_197671455_445ac70d-2752-4a7f-bf2a-855d56a8fd9d-mediumThreeByTwo252.jpg',
    category: '1',
  },
  {
    id: '5',
    name: 'Garlic Butter Steak Bites',
    price: 18,
    image:
      'https://static01.nyt.com/images/2024/05/17/multimedia/yf-steak-bites-cvbm/yf-steak-bites-cvbm-threeByTwoMediumAt2X.jpg?width=1280&quality=75&auto=webp',
    category: '1',
  },
  {
    id: '6',
    name: 'Roasted Beef Tenderloin',
    price: 20,
    image:
      'https://static01.nyt.com/images/2022/12/21/multimedia/15korex1-tenderloin-1-63ce/15korex1-tenderloin-1-63ce-threeByTwoMediumAt2X.jpg?width=1280&quality=75&auto=webp',
    category: '2',
  },
  {
    id: '7',
    name: 'Beef Wellington',
    price: 18,
    image:
      'https://static01.nyt.com/images/2019/12/13/dining/mc-beef-wellington/mc-beef-wellington-articleLarge-v2.jpg?width=1280&quality=75&auto=webp',
    category: '2',
  },
  {
    id: '8',
    name: 'Beef Roast With Melted Tomatoes and Onions',
    price: 20,
    image:
      'https://static01.nyt.com/images/2015/12/09/dining/09COOKING-BEEFROAST3/09COOKING-BEEFROAST3-jumbo.jpg?width=1280&quality=75&auto=webp',
    category: '2',
  },
  {
    id: '9',
    name: 'Sabut Raan (Roast Leg of Lamb)',
    price: 18,
    image:
      'https://static01.nyt.com/images/2018/05/16/dining/16rushdierex/16rushdierex-threeByTwoMediumAt2X.jpg?width=1280&quality=75&auto=webp',
    category: '2',
  },
  {
    id: '10',
    name: 'Standing Rib Roast',
    price: 18,
    image:
      'https://static01.nyt.com/images/2014/11/19/dining/19NEBRASKA/19NEBRASKA-articleLarge.jpg?width=1280&quality=75&auto=webp',
    category: '2',
  },
];

const intiCart = {
  orders: [
    {
      item: mockedItems[0],
      qty: 1,
    },
    {
      item: mockedItems[1],
      qty: 2,
    },
    {
      item: mockedItems[2],
      qty: 3,
    },
  ],
  total: 1 * mockedItems[0].price + 2 * mockedItems[1].price + 3 * mockedItems[2].price,
};

const categories = [
  { id: '1', name: 'Appetizers' },
  // { id: '2', name: 'Soup' },
  { id: '2', name: 'Main' },
  // { id: '3', name: 'Noodle' },
  // { id: '4', name: 'Sauteed' },
  // { id: '5', name: 'Chief Special' },
  { id: '3', name: 'Drink' },
  { id: '4', name: 'Dessert' },
];

describe('App Component', () => {
  // 1) test categories rendered correctly
  it('should render menus correctly', () => {
    render(<App />);
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

  // 2) test click on TopBar filter items
  it('Click on TopBar menu should filter the item correctly', async () => {
    render(<App />);

    const mainPanel = screen.getByRole('main', { name: 'main panel' });
    const items = getAllByRole(mainPanel, 'presentation');
    expect(items).toHaveLength(10);

    const nav = screen.getByRole('navigation', { name: 'Foodie' });
    expect(nav).toBeInTheDocument();

    const mainMenu = getByText(nav, 'Main');
    expect(mainMenu).toBeInTheDocument();

    await userEvent.click(mainMenu);

    const filteredItems = getAllByRole(mainPanel, 'presentation');
    expect(filteredItems).toHaveLength(5);
    for (const index in filteredItems) {
      expect(getByText(filteredItems[index], `${mockedItems[parseInt(index) + 5].name}`)).toBeInTheDocument();
    }
  });

  // 3) test add to cart behave correctly (existed and new item in cart)
  it('Click on TopBar menu should filter the item correctly', async () => {
    render(<App />);

    const mainPanel = screen.getByRole('main', { name: 'main panel' });
    const items = getAllByRole(mainPanel, 'presentation');

    const ordersPanel = screen.getByRole('complementary', { name: 'orders panel' });
    expect(ordersPanel).toBeInTheDocument();
    const orders = getAllByRole(ordersPanel, 'presentation');
    expect(orders).toHaveLength(3);
    for (const index in orders) {
      expect(getByText(orders[index], `${intiCart.orders[index].item.name}`)).toBeInTheDocument();
      expect(getByText(orders[index], `${intiCart.orders[index].qty}`)).toBeInTheDocument();
    }

    await userEvent.click(getByRole(items[1], 'button', { name: 'Add to Orders' }));
    expect(getByText(orders[1], `${intiCart.orders[1].qty + 1}`));

    await userEvent.click(getByRole(items[6], 'button', { name: 'Add to Orders' }));
    const updateOrders = getAllByRole(ordersPanel, 'presentation');
    expect(updateOrders).toHaveLength(4);
    expect(getByText(updateOrders[3], `${mockedItems[6].name}`)).toBeInTheDocument();
    expect(getByText(updateOrders[3], '1')).toBeInTheDocument();
  });
});
