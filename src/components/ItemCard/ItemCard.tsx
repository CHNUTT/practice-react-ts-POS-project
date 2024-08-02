type ItemCardProps = {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
};

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const ItemCard = ({ item: { name, price, image } }: ItemCardProps) => {
  return (
    <div
      role="presentation"
      aria-labelledby="item-name"
      className="w-[300px] h-[360px] rounded-[22px] bg-white flex flex-col items-center pt-[28px]"
    >
      <img src={image} alt={name} className="rounded-full w-[168px] h-[168px] object-center object-cover" />
      <label id="item-name" className="mt-[30px] font-bold text-[30px]">
        {name}
      </label>
      <span className="mt-[10px] font-extrabold text-[24px] text-[#FFCA40]">{formatter.format(price)}</span>
    </div>
  );
};

export default ItemCard;
