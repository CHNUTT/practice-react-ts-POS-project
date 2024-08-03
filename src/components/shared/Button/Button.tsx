type ButtonProps = {
  onClick: () => void;
  label: string;
};

const Button = ({ onClick, label }: ButtonProps) => (
  <button onClick={onClick} className="w-full bg-[#FFCA40] mt-14 text-xs font-bold p-4 rounded-md">
    {label}
  </button>
);

export default Button;
