import { useEffect, useState } from 'react';

interface StackItemProps {
  id: number;
  category: string;
  name: string;
  content: string;
}

const StackItem = ({ id, name, content }: StackItemProps) => {
  // 초기값을 null로 해서 아직 판별 전임을 나타냅니다.
  const [hasImage, setHasImage] = useState<boolean | null>(null);
  const imageUrl = `/images/stack/${id}.png`;

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
  }, [imageUrl]);

  return (
    <div className="p-4 rounded flex items-center gap-4">
      {/* 이미지가 있으면 보여주고, 없으면 아예 렌더링하지 않습니다.
          아직 확인 중(null)일 땐 보이지 않도록 할 수 있습니다. */}
      {hasImage && (
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12"
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
