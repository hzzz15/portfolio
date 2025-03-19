import { useState } from 'react';

interface StackItemProps {
  id: number;
  category: string;
  name: string;
  content: string;
}

const StackItem = ({ id, name, content }: StackItemProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="p-4 rounded flex items-center gap-4">
      {!imgError && (
        <img
          src={`/images/stack/${id}.png`}
          alt={name}
          className="w-12 h-12"
          onError={() => setImgError(true)}
        />
      )}
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default StackItem;
