import { useEffect, useState } from 'react';

export type Category = {
  id: string;
  name: string;
};

type TopBarProps = {
  categories: Category[];
  onMenuClick: (id: string) => void;
};

const TopBar = ({ categories, onMenuClick }: TopBarProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const handleOnMenuClicked = (id: string) => {
    setActiveId(id);
    onMenuClick(id);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveId(categories[0].id);
    }
  }, [categories]);

  return (
    <nav className="flex h-[80px] items-center" aria-label="Foodie">
      <img aria-label="logo" src="/src/assets/logo.svg" alt="logo of Foodie" />
      <ul aria-label="menus" className="flex justify-between flex-1 ml-10">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`
              text-xl
              font-bold
              text-[#717171]
              hover:underline
              underline-offset-[12px]
              decoration-[#FFCA40]
              decoration-[3px]
              cursor-pointer
              ${activeId === category.id ? 'underline' : ''}
            `}
            onClick={() => handleOnMenuClicked(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBar;
