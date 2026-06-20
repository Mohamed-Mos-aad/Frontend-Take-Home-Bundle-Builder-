"use client"
// ** Hooks && Tools
import React from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  discount: string | null;
  options: string[];
  image?: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductCard({
  product,
  quantity,
  selectedOption,
  onOptionSelect,
  onIncrement,
  onDecrement
}: ProductCardProps) {
  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23F0F4F7'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%236F7882'>${product.name}</text></svg>`;

  return (
    <div className={`flex flex-col gap-2.5 bg-white p-3 rounded-[10px] relative border-2 transition-all duration-150 w-full max-w-sm mx-auto md:max-w-none ${
      quantity > 0 ? 'border-[#4E2FD2B2]' : 'border-transparent'
    } md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(20%-13px)]`}>
      {product.discount && (
        <span className="w-fit bg-[#4E2FD2] rounded-[10px] px-1.5 py-0.5 text-[12px] text-[#FFFFFF] absolute left-3 top-7 z-10">
          {product.discount}
        </span>
      )}
      <img
        className="w-full aspect-square rounded-md bg-[#F0F4F7] object-cover"
        src={product.image || fallbackImage}
        alt={product.name}
      />
      <h2 className="text-[18px] text-[#1F1F1F] font-semibold">{product.name}</h2>
      <p className="text-[14px] text-[#1F1F1F]/75">
        {product.description.includes("Learn More") ? (
          <>
            {product.description.replace("Learn More", "")}
            <a className="text-[#0000EE] underline ml-1" href="#learn-more">Learn More</a>
          </>
        ) : (
          product.description
        )}
      </p>

      {product.options && product.options.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {product.options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionSelect(option)}
              className={`flex justify-center py-1 text-[12px] border-[0.5px] rounded-xs cursor-pointer transition-all duration-150 ${
                selectedOption === option
                  ? "border-[#0AA288] bg-[#1DF0BB0A] text-[#0AA288] font-semibold"
                  : "border-[#CCCCCC] text-[#1F1F1F]/75 hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-auto pt-2">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onDecrement}
            disabled={quantity === 0}
            className="w-5 h-5 flex justify-center items-center bg-[#F0F4F7] rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
          >
            -
          </button>
          <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{quantity}</span>
          <button
            onClick={onIncrement}
            className="w-5 h-5 flex justify-center items-center bg-[#F0F4F7] rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
          >
            +
          </button>
        </div>
        <h3 className="flex gap-1 text-[16px] text-[#575757]">
          {product.originalPrice && (
            <span className="text-[#D8392B] line-through">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="text-[#1F1F1F] font-semibold">${product.price.toFixed(2)}</span>
        </h3>
      </div>
    </div>
  );
}