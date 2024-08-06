import { ChangeEvent, useState } from 'react';
import MainPanel from './components/MainPanel';
import OrdersPanel from './components/OrdersPanel';
import { Order } from './components/OrdersPanel/OrderItem/OrderItem';
import { Item } from './components/MainPanel/CardItem/CardItem';
import TopBar from './components/TopBar';
import { Category } from './components/TopBar/TopBar';

const items: Item[] = [
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

const itemsObj: { [key: string]: Item } = items.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

type Cart = {
  orders: Order[];
  total: number;
};

const intiCart: Cart = {
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

const categories: Category[] = [
  { id: '1', name: 'Appetizers' },
  // { id: '2', name: 'Soup' },
  { id: '2', name: 'Main' },
  // { id: '3', name: 'Noodle' },
  // { id: '4', name: 'Sauteed' },
  // { id: '5', name: 'Chief Special' },
  { id: '3', name: 'Drink' },
  { id: '4', name: 'Dessert' },
];

const App = () => {
  const [cart, setCart] = useState<Cart>(intiCart);
  const [customerName, setCustomerName] = useState<string>('');
  const [tableNo, setTableNo] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredItems = items.filter((item) => item.category === selectedCategory);

  const resetToInit = () => {
    setCart({ orders: [], total: 0 });
    setCustomerName('');
    setTableNo('');
  };

  const handleAddItemToOrder = (id: string) => {
    const newItem = { ...itemsObj[id] };
    setCart((currentCart) => {
      // Find if the item already exists in the cart
      const existingOrder = currentCart.orders.find((order) => order.item.id === id);

      let updatedOrders;
      let newTotal;

      if (existingOrder) {
        // If the item exists, update the quantity
        updatedOrders = currentCart.orders.map((order) =>
          order.item.id === id ? { ...order, qty: order.qty + 1 } : order
        );
        newTotal = currentCart.total + newItem.price;
      } else {
        // If the item does not exist, add it to the cart
        updatedOrders = [...currentCart.orders, { item: newItem, qty: 1 }];
        newTotal = currentCart.total + newItem.price;
      }

      return {
        orders: updatedOrders,
        total: newTotal,
      };
    });
  };

  const handleIncreaseQty = (id: string) => {
    setCart(({ orders, total }) => {
      let price = 0;
      const updateOrders = orders.map((orderItem) => {
        if (orderItem.item.id === id) {
          price = orderItem.item.price;
          return { ...orderItem, qty: orderItem.qty + 1 };
        }
        return orderItem;
      });

      return {
        orders: updateOrders,
        total: total + price,
      };
    });
  };

  const handleDecreaseQty = (id: string) => {
    setCart(({ orders, total }) => {
      let price = 0;
      const updateOrders = orders.map((orderItem) => {
        if (orderItem.item.id === id && orderItem.qty > 1) {
          price = orderItem.item.price;
          return { ...orderItem, qty: orderItem.qty - 1 };
        }
        return orderItem;
      });

      return {
        orders: updateOrders,
        total: total - price,
      };
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(({ orders, total }) => {
      const removingItem = orders.find((order) => order.item.id === id)!;
      const price = removingItem?.qty * removingItem?.item.price;

      const updatedOrders = orders.filter((order) => order.item.id !== id);

      return {
        orders: updatedOrders,
        total: total - price,
      };
    });
  };

  const handlePressOrder = () => {
    console.log('cart: ', cart);
    console.log('customerName: ', customerName);
    console.log('tableNo: ', tableNo);
    resetToInit();
  };

  const handleCancelOrder = () => {
    resetToInit();
  };

  const handleCustomerName = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  const handleTableNo = (e: ChangeEvent<HTMLInputElement>) => {
    setTableNo(e.target.value);
  };

  const handleCategoryChanged = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="bg-[#bbbbbb2a] min-w-screen max-w-screen min-h-screen flex justify-between">
      <div className="flex flex-col w-full pl-6 pr-6">
        <TopBar categories={categories} onMenuClick={handleCategoryChanged} />
        <main aria-label="main panel">
          <MainPanel items={selectedCategory ? filteredItems : items} onAddItem={handleAddItemToOrder} />
        </main>
      </div>
      <aside aria-label="orders panel">
        <OrdersPanel
          cart={cart}
          onIncrease={handleIncreaseQty}
          onDecrease={handleDecreaseQty}
          onRemove={handleRemoveItem}
          onOrder={handlePressOrder}
          onCancel={handleCancelOrder}
          onNameChange={handleCustomerName}
          onTableChange={handleTableNo}
        />
      </aside>
    </div>
  );
};

export default App;
