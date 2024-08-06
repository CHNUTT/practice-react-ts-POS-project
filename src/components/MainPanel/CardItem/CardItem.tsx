import { formatter } from '../../../helpers';
import Button from '../../shared/Button';

export type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type CardItemProps = {
  item: Item;
  onAddItem: () => void;
};

const CardItem = ({ item: { name, price, image }, onAddItem }: CardItemProps) => {
  return (
    <div
      role="presentation"
      aria-labelledby="item-name"
      className="h-full rounded-2xl bg-white flex flex-col items-center justify-between py-6 px-4"
    >
      <img
        src={image}
        alt={name}
        className="rounded-full w-[120px] md:w-[168px] h-[120px] md:h-[168px] object-center object-cover"
      />
      <label id="item-name" className="mt-[30px] font-bold text-xl xl:text-2xl text-center">
        {name}
      </label>
      <span className="mt-[10px] font-extrabold text-xl xl:text-2xl text-[#FFCA40]">
        {formatter.format(price)}
      </span>
      <Button onClick={onAddItem} label="Add to Orders" />
    </div>
  );
};

export default CardItem;
