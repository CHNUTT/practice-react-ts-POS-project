import { ChangeEvent, useState } from 'react';
import MainPanel from './components/MainPanel';
import OrdersPanel from './components/OrdersPanel';
import { Order } from './components/OrdersPanel/OrderItem/OrderItem';
import { Item } from './components/MainPanel/CardItem/CardItem';
import TopBar from './components/TopBar';
import { Category } from './components/TopBar/TopBar';

const items = [
  {
    id: '1',
    name: 'Beef Steak',
    price: 20,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '2',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '3',
    name: 'Beef Steak',
    price: 20,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '4',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '5',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '6',
    name: 'Beef Steak',
    price: 20,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '7',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '8',
    name: 'Beef Steak',
    price: 20,
    image: 'https://playswellwithbutter.com/wp-content/uploads/2021/01/Cast-Iron-Steak-16.jpg',
  },
  {
    id: '9',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
  {
    id: '10',
    name: 'Fried Chicken',
    price: 18,
    image: 'https://thegirlinspired.com/wp-content/uploads/2022/07/Fried-Chicken-28.jpg',
  },
];

const itemsObj: { [key: string]: Item } = items.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {});

type Cart = {
  orders: Order[];
  total: number;
};

const intiOrders: Cart = {
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
  const [orders, setOrders] = useState<Cart>(intiOrders);
  const [customerName, setCustomerName] = useState<string>('');
  const [tableNo, setTableNo] = useState<string>('');

  const resetToInit = () => {
    setOrders({ orders: [], total: 0 });
    setCustomerName('');
    setTableNo('');
  };

  const handleIncreaseQty = (id: string) => {
    setOrders(({ orders, total }) => {
      let price = 0;
      const updateOrders = orders.map((orderItem) => {
        if (orderItem.item.id === id) {
          price = itemsObj[id].price;
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
    setOrders(({ orders, total }) => {
      let price = 0;
      const updateOrders = orders.map((orderItem) => {
        if (orderItem.item.id === id && orderItem.qty > 1) {
          price = itemsObj[id].price;
          return { ...orderItem, qty: orderItem.qty + 1 };
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
    setOrders(({ orders, total }) => {
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
    console.log('orders: ', orders);
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

  return (
    <div className="bg-[#bbbbbb2a] min-w-screen max-w-screen min-h-screen flex justify-between">
      <div className="flex flex-col w-full pl-6 pr-6">
        <TopBar categories={categories} />
        <MainPanel items={items} />
      </div>
      <OrdersPanel
        cart={orders}
        onIncrease={handleIncreaseQty}
        onDecrease={handleDecreaseQty}
        onRemove={handleRemoveItem}
        onOrder={handlePressOrder}
        onCancel={handleCancelOrder}
        onNameChange={handleCustomerName}
        onTableChange={handleTableNo}
      />
    </div>
  );
};

export default App;
