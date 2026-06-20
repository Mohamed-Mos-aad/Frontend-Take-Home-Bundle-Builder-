"use client";

import React from "react";
import Image from "next/image";
import ProductCard, { Product } from "./ProductCard";
import { useBundle } from "@/context/BundleContext";

interface DropListProps {
  step: number;
  totalSteps?: number;
  title: string;
  icon: { src: any; alt: string };
  isOpen: boolean;
  onToggle: () => void;
  products: Product[];
  nextStepName?: string;
  onNext?: () => void;
}

export default function DropList({
  step,
  totalSteps = 4,
  title,
  icon,
  isOpen,
  onToggle,
  products,
  nextStepName,
  onNext
}: DropListProps) {
  const { selectedQuantities } = useBundle();

  // Calculate the total selected quantity in this step (summing all product variants)
  const selectedCount = products.reduce((acc, p) => {
    if (p.options && p.options.length > 0) {
      const optSum = p.options.reduce((sum, opt) => sum + (selectedQuantities[`${p.id}_${opt}`] || 0), 0);
      return acc + optSum;
    } else {
      return acc + (selectedQuantities[p.id] || 0);
    }
  }, 0);

  return (
    <div className={`w-full flex flex-col ${isOpen && 'bg-[#EDF4FF]'} rounded-[10px] overflow-hidden`}>
      <div className="flex flex-col cursor-pointer" onClick={onToggle}>
        <span className="w-full text-[12px] text-[#484848] uppercase p-3.75 pb-1 text-start border-b">
          step {step} of {totalSteps}
        </span>
        <h1 className={`w-full flex justify-between items-center text-[18px] md:text-[28px] text-[#0B0D10] p-3.75 ${isOpen ? 'pb-0 border-none' : 'border-b'} text-start`}>
          <span className="flex items-center gap-2">
            {icon && icon.src && (
              <Image src={icon.src} alt={icon.alt} width={30} height={31} className="w-7 h-7" />
            )}
            {title}
          </span>
          <span className="flex items-center gap-1.5">
            {selectedCount > 0 && (
              <span className="text-[14px] text-[#4E2FD2] font-semibold">{selectedCount} selected </span>
            )}
            {isOpen ? (
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.12248 0.209382C4.32189 -0.0697919 4.7368 -0.0697896 4.93621 0.209386L8.96458 5.84915C9.20096 6.18009 8.96439 6.63977 8.55771 6.63977L0.500897 6.63977C0.09421 6.63977 -0.142352 6.18008 0.0940317 5.84915L4.12248 0.209382Z" fill="#4E2FD2"/>
              </svg>
            ) : (
              <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.93612 6.43039C4.73671 6.70956 4.32179 6.70956 4.12238 6.43038L0.0940185 0.790616C-0.142361 0.459682 0.0942017 -8.24842e-07 0.500887 -7.89289e-07L8.5577 -8.494e-08C8.96438 -4.93863e-08 9.20095 0.459687 8.96456 0.790621L4.93612 6.43039Z" fill="#4E2FD2"/>
              </svg>
            )}
          </span>
        </h1>
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col justify-center gap-4 p-3.75">
            <div className="flex flex-wrap justify-center xl:justify-start gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
            {nextStepName && onNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="w-fit px-6 py-2 mx-auto border border-[#4E2FD2] rounded-[7px] text-[18px] text-[#4E2FD2] bg-[#EDF4FF] transition-colors duration-150 cursor-pointer font-semibold"
              >
                Next: {nextStepName}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
