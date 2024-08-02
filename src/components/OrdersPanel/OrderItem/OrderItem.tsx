import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatter } from '../../../helpers';
import { Item } from '../../ItemCard/ItemCard';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

type OrderItemProp = {
  item: Item;
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const OrderItem = ({ item, qty, onIncrease, onDecrease, onRemove }: OrderItemProp) => {
  return (
    <div className="flex w-[400px] pl-4 pr-10">
      <div className="flex w-full" role="presentation" aria-label={`order for ${item.name}`}>
        <img
          src={item.image}
          alt={item.name}
          className="rounded-3xl w-[100px]  h-[100px] object-center object-cover"
        />
        <div className="flex flex-col pl-6 py-1 flex-1 justify-between ">
          <div className="flex flex-col">
            <span className="font-bold">{item.name}</span>
            <span className="mt-1 text-[#717171] font-bold">{formatter.format(item.price)}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-start items-center">
              <button
                aria-label="decrease quantity"
                type="button"
                onClick={onDecrease}
                className="bg-[#FFCA40] px-3 rounded-md font-bold flex justify-center"
              >
                <span className="-mt-[2px]">-</span>
              </button>
              <div className="text-[#717171] font-bold px-6">{qty}</div>
              <button
                aria-label="increase quantity"
                type="button"
                onClick={onIncrease}
                className="bg-[#FFCA40] px-3 rounded-md font-bold flex justify-center"
              >
                <span className="-mt-[2px]">+</span>
              </button>
            </div>
            <button type="button" aria-label="remove item" onClick={onRemove}>
              <FontAwesomeIcon icon={faTrashCan} className="text-[#C8151C] text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
