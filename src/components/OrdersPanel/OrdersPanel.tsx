import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderItem, { Order } from './OrderItem/OrderItem';
import { faFileLines, faUser } from '@fortawesome/free-regular-svg-icons';
import { formatter } from '../../helpers';
import { ChangeEvent } from 'react';

type Cart = {
  orders: Order[];
  total: number;
};

type OrdersPanelProps = {
  cart: Cart;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onOrder: () => void;
  onCancel: () => void;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTableChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OrdersPanel = ({
  cart: { orders, total },
  onIncrease,
  onDecrease,
  onRemove,
  onOrder,
  onCancel,
  onNameChange,
  onTableChange,
}: OrdersPanelProps) => {
  return (
    <div className="flex flex-col min-w-[320px] xl:min-w-[400px] pl-4 pr-6 xl:pr-10 pt-8 border-l-[1px] border-[#E2E2E2] border-solid">
      <div className="px-4">
        <h2 className="font-bold text-3xl">My Orders</h2>
        <p className="mt-4 text-[#717171] font-bold">Your orders will be appear here</p>
      </div>
      <ul className="mt-8">
        {orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <li key={order.item.id} aria-label={`${order.item.name}`} className="mt-4 first-of-type:mt-0">
              <OrderItem
                item={order.item}
                qty={order.qty}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            </li>
          ))}
      </ul>
      <div className="mt-8 flex items-center justify-between" role="group" aria-labelledby="order-total">
        <div className="flex">
          <FontAwesomeIcon icon={faFileLines} className="text-2xl" />
          <span id="order-total" className="ml-3 font-bold">
            Total
          </span>
        </div>
        <span className="font-bold">{formatter.format(total)}</span>
      </div>
      <fieldset className="mt-8">
        <legend className="mt-8 font-bold" id="customer-detail">
          <FontAwesomeIcon icon={faUser} className="mr-4 text-xl" />
          Customer Detail
        </legend>
        <form aria-labelledby="customer-detail">
          <div className="mt-5">
            <label id="name-input" className="text-sm">
              Your name
            </label>
            <input
              placeholder="enter your name here"
              aria-labelledby="name-input"
              onChange={onNameChange}
              className="border rounded-md mt-1 bg-transparent py-2 px-4 text-sm w-full"
            />
          </div>
          <div className="mt-5">
            <label id="table-no-input" className="text-sm">
              No. Table
            </label>
            <input
              aria-labelledby="table-no-input"
              placeholder="ex. 5A"
              onChange={onTableChange}
              className="border rounded-md mt-1 bg-transparent py-2 px-4 text-sm w-full"
            />
          </div>
        </form>
      </fieldset>
      <button onClick={onOrder} className="w-full bg-[#FFCA40] mt-14 text-xs font-bold p-4 rounded-md">
        Order Now
      </button>
      <button
        onClick={onCancel}
        className="mt-4 border-[1px] border-[#838383] inset-1 p-4 rounded-md text-xs font-bold"
      >
        Cancel
      </button>
    </div>
  );
};

export default OrdersPanel;
