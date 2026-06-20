// ** Hooks && Tools
import React from "react";
import { useBundle } from "@/context/BundleContext";

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
}

export default function ProductCard({
  product
}: ProductCardProps) {
  const {
    selectedQuantities,
    selectedOptions,
    handleIncrement,
    handleDecrement,
    handleOptionSelect
  } = useBundle();

  const activeOption = selectedOptions[product.id] || "";
  const quantity = activeOption
    ? (selectedQuantities[`${product.id}_${activeOption}`] || 0)
    : (selectedQuantities[product.id] || 0);

  const hasAnyQuantity = product.options && product.options.length > 0
    ? product.options.some((opt) => (selectedQuantities[`${product.id}_${opt}`] || 0) > 0)
    : (selectedQuantities[product.id] || 0) > 0;

  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23F0F4F7'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%236F7882'>${product.name}</text></svg>`;

  return (
    <div className={`flex flex-col xl:flex-row gap-2.5 xl:gap-4 bg-white p-3 rounded-[10px] relative border-2 transition-all duration-150 w-full max-w-sm mx-auto sm:max-w-none ${
      hasAnyQuantity ? 'border-[#4E2FD2B2]' : 'border-transparent'
    } sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)] xl:w-[calc(50%-8px)]`}>
      
      {/* Left/Top Column (Image & Discount Badge) */}
      <div className="relative w-full aspect-square xl:aspect-auto xl:w-36 xl:h-auto xl:self-stretch xl:shrink-0">
        {product.discount && (
          <span className="w-fit bg-[#4E2FD2] rounded-[10px] px-1.5 py-0.5 text-[12px] text-[#FFFFFF] absolute left-2 top-2 z-10">
            {product.discount}
          </span>
        )}
        <img
          className="w-full h-full xl:aspect-auto rounded-md bg-[#F0F4F7] object-cover"
          src={product.image || fallbackImage}
          alt={product.name}
        />
      </div>

      {/* Right/Bottom Column (Details & Actions) */}
      <div className="flex-grow flex flex-col gap-2 min-w-0">
        <h2 className="text-[18px] text-[#1F1F1F] font-semibold leading-tight">{product.name}</h2>
        <p className="text-[14px] text-[#1F1F1F]/75 leading-snug">
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
          <div className="grid grid-cols-3 gap-1.5 mt-1">
            {product.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(product.id, option)}
                className={`flex justify-center py-1 text-[12px] border-[0.5px] rounded-xs cursor-pointer transition-all duration-150 ${
                  activeOption === option
                    ? "border-[#0AA288] bg-[#1DF0BB0A] text-[#0AA288] font-semibold"
                    : "border-[#CCCCCC] text-[#1F1F1F]/75 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center lg:flex-col lg:items-center lg:gap-2 xl:flex-row xl:justify-between xl:items-center mt-auto pt-2 border-t border-gray-50 xl:border-none">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleDecrement(product.id, activeOption)}
              disabled={quantity === 0}
              className="w-5 h-5 flex justify-center items-center bg-[#F0F4F7] rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
            >
              -
            </button>
            <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{quantity}</span>
            <button
              onClick={() => handleIncrement(product.id, activeOption)}
              className="w-5 h-5 flex justify-center items-center bg-[#F0F4F7] rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
            >
              +
            </button>
          </div>
          <h3 className="flex flex-wrap justify-center gap-1 text-[16px] text-[#575757] lg:text-center">
            {product.originalPrice && (
              <span className="text-[#D8392B] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-[#1F1F1F] font-semibold">${product.price.toFixed(2)}</span>
          </h3>
        </div>
      </div>

    </div>
  );
}