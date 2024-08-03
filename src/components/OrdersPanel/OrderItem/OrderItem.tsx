import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatter } from '../../../helpers';
import { Item } from '../../MainPanel/CardItem/CardItem';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export type Order = {
  item: Item;
  qty: number;
};

type OrderItemProp = {
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
} & Order;

const OrderItem = ({ item, qty, onIncrease, onDecrease, onRemove }: OrderItemProp) => {
  return (
    <div className="flex w-full items-center" role="presentation" aria-label={`order for ${item.name}`}>
      <div className="w-[80px] h-[80px] xl:w-[100px] xl:h-[100px]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full rounded-3xl object-center object-cover"
        />
      </div>
      <div className="flex flex-col pl-6 py-1 flex-1 justify-between ">
        <div className="flex flex-col">
          <span className="font-bold">{item.name}</span>
          <span className=" text-[#717171] font-bold">{formatter.format(item.price)}</span>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex justify-start items-center">
            <button
              aria-label="decrease quantity"
              type="button"
              onClick={() => onDecrease(item.id)}
              className="bg-[#FFCA40] px-2 rounded-md font-bold flex justify-center"
            >
              <span className="-mt-[2px]">-</span>
            </button>
            <div className="text-[#717171] font-bold px-2 xl:px-4">{qty}</div>
            <button
              aria-label="increase quantity"
              type="button"
              onClick={() => onIncrease(item.id)}
              className="bg-[#FFCA40] px-2 rounded-md font-bold flex justify-center"
            >
              <span className="-mt-[2px]">+</span>
            </button>
          </div>
          <button type="button" aria-label="remove item" onClick={() => onRemove(item.id)}>
            <FontAwesomeIcon icon={faTrashCan} className="text-[#C8151C] text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
