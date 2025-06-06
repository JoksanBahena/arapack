interface ItemProps {
  id: string;
  label: string;
  color: string;
}

const Item: React.FC<ItemProps> = ({ id, label, color }) => {
  return (
    <div
      className={`p-2 rounded ${color} text-white cursor-pointer`}
      data-swapy-item={id}
    >
      {label}
    </div>
  );
};

export default Item;
