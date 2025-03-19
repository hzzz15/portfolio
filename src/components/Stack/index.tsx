import { useState } from "react";
import SectionTitle from "../SectionTitle";
import StackItem from "./StackItem";
import { DataProps } from "@/types";

interface StackProps {
  stack: DataProps["stack"];
}

const Stack = ({ stack }: StackProps) => {
  const categories = Array.from(new Set(stack.map((item) => item.category)));
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredStack = stack.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <SectionTitle>🛠️Stack</SectionTitle>
      <div className="flex">
        {/* Left category list */}
        <div className="w-1/4">
          <ul className="list-none">
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 ${
                  selectedCategory === category ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/* Right side: filtered stack items */}
        <div className="w-3/4">
          <div className="flex flex-col gap-4">
            {filteredStack.map((item) => (
              <StackItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
