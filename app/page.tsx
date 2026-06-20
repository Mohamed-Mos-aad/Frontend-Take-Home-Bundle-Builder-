"use client"
import React, { useState, useEffect } from "react";
// ** Components
import DropList from "@/components/DropList";
// ** Assets
import cameraIcon from '@/public/assets/icons/cameraIcon.svg'
import planIcon from '@/public/assets/icons/planIcon.svg'
import sensorsIcon from '@/public/assets/icons/sensorsIcon.svg'
import extraIcon from '@/public/assets/icons/extraIcon.svg'

const iconMap: Record<string, any> = {
  cameraIcon: cameraIcon,
  planIcon: planIcon,
  sensorsIcon: sensorsIcon,
  extraIcon: extraIcon,
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/bundle")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
        // Initialize state from seed quantities
        const initialQtys: Record<string, number> = {};
        const initialOpts: Record<string, string> = {};
        fetchedData.steps.forEach((step: any) => {
          step.products.forEach((prod: any) => {
            initialQtys[prod.id] = prod.initialQty ?? 0;
            initialOpts[prod.id] = prod.options && prod.options.length > 0 ? prod.options[0] : "";
          });
        });
        setSelectedQuantities(initialQtys);
        setSelectedOptions(initialOpts);
      })
      .catch((err) => console.error("Error fetching bundle data:", err));
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center font-sans dark:bg-black">
        <div className="text-lg text-[#575757] animate-pulse">Loading Bundle Data...</div>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    return {
      src: iconMap[iconName] || null,
      alt: iconName,
    };
  };

  const handleIncrement = (productId: string) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: string) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const handleOptionSelect = (productId: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: option,
    }));
  };

  // Extract selected items for review panel
  const getSelectedItems = () => {
    const items: any[] = [];
    data.steps.forEach((step: any) => {
      step.products.forEach((prod: any) => {
        const qty = selectedQuantities[prod.id] || 0;
        if (qty > 0) {
          items.push({
            ...prod,
            quantity: qty,
            selectedOption: selectedOptions[prod.id] || "",
          });
        }
      });
    });
    return items;
  };

  const selectedItems = getSelectedItems();
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = selectedItems.reduce((acc, item) => {
    if (item.originalPrice) {
      return acc + (item.originalPrice - item.price) * item.quantity;
    }
    return acc;
  }, 0);
  const total = subtotal;

  return (
    <div className="w-full bg-white font-sans dark:bg-black py-12">
      <div className="flex flex-col gap-4">
        {/* Accordion Steps */}
        {data.steps.map((step: any, index: number) => {
          const nextStep = data.steps[index + 1];
          return (
            <DropList
              key={step.id}
              step={step.id}
              totalSteps={data.steps.length}
              icon={getIcon(step.iconName)}
              title={step.title}
              isOpen={activeStep === step.id}
              onToggle={() => setActiveStep(activeStep === step.id ? 0 : step.id)}
              products={step.products}
              selectedQuantities={selectedQuantities}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              nextStepName={nextStep ? nextStep.title : undefined}
              onNext={nextStep ? () => setActiveStep(nextStep.id) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
