"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { bundleData } from "@/context/bundleData";

interface BundleContextType {
  data: any;
  loading: boolean;
  activeStep: number;
  setActiveStep: (step: number) => void;
  selectedQuantities: Record<string, number>;
  selectedOptions: Record<string, string>;
  handleIncrement: (productId: string, option?: string) => void;
  handleDecrement: (productId: string, option?: string) => void;
  handleOptionSelect: (productId: string, option: string) => void;
  saveSystem: () => void;
  selectedItems: any[];
  subtotal: number;
  displayOriginalPrice: number;
  displayTotalPrice: number;
  displaySavings: number;
  financingPrice: string;
}

const BundleContext = createContext<BundleContextType | undefined>(undefined);

export const BundleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(bundleData);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if there is saved data in localStorage
    const savedQtys = localStorage.getItem("bundle_selectedQuantities");
    const savedOpts = localStorage.getItem("bundle_selectedOptions");
    const savedStep = localStorage.getItem("bundle_activeStep");

    if (savedQtys && savedOpts) {
      setSelectedQuantities(JSON.parse(savedQtys));
      setSelectedOptions(JSON.parse(savedOpts));
      if (savedStep) setActiveStep(Number(savedStep));
    } else {
      // Initialize from seed data
      const initialQtys: Record<string, number> = {};
      const initialOpts: Record<string, string> = {};
      bundleData.steps.forEach((step: any) => {
        step.products.forEach((prod: any) => {
          if (prod.options && prod.options.length > 0) {
            // Initialize default options
            initialOpts[prod.id] = prod.options[0];
            
            // If there's an initial quantity, assign it to the default option variant key
            if (prod.initialQty > 0) {
              initialQtys[`${prod.id}_${prod.options[0]}`] = prod.initialQty;
            }
          } else {
            initialQtys[prod.id] = prod.initialQty ?? 0;
          }
        });
      });
      initialQtys["pre_hub"] = 1; // Prepopulated Hub quantity starts at 1
      setSelectedQuantities(initialQtys);
      setSelectedOptions(initialOpts);
    }

    // Fetch fresh data from API endpoint (works on local dev & Vercel production)
    fetch("/api/bundle")
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => {
        console.log("API fetch failed, using static fallback: ", err);
      });
  }, []);

  const handleIncrement = (productId: string, option?: string) => {
    const key = option ? `${productId}_${option}` : productId;
    setSelectedQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: string, option?: string) => {
    const key = option ? `${productId}_${option}` : productId;
    setSelectedQuantities((prev) => {
      const currentQty = prev[key] || 0;
      const minQty = key === "pre_hub" ? 1 : 0; // Prepopulated hub cannot be less than 1
      return {
        ...prev,
        [key]: Math.max(currentQty - 1, minQty),
      };
    });
  };

  const handleOptionSelect = (productId: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: option,
    }));
  };

  const saveSystem = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bundle_selectedQuantities", JSON.stringify(selectedQuantities));
      localStorage.setItem("bundle_selectedOptions", JSON.stringify(selectedOptions));
      localStorage.setItem("bundle_activeStep", activeStep.toString());
      alert("تم حفظ النظام الحالي بنجاح! سيتم استعادته تلقائياً عند تحميل الصفحة.");
    }
  };

  // Extract selected items for review panel (separate row per option/color)
  const getSelectedItems = () => {
    if (!data) return [];
    const items: any[] = [];
    data.steps.forEach((step: any) => {
      step.products.forEach((prod: any) => {
        if (prod.options && prod.options.length > 0) {
          prod.options.forEach((opt: string) => {
            const key = `${prod.id}_${opt}`;
            const qty = selectedQuantities[key] || 0;
            if (qty > 0) {
              items.push({
                ...prod,
                id: key, // Unique ID for list items and controls
                productId: prod.id,
                quantity: qty,
                selectedOption: opt,
              });
            }
          });
        } else {
          const qty = selectedQuantities[prod.id] || 0;
          if (qty > 0) {
            items.push({
              ...prod,
              productId: prod.id,
              quantity: qty,
              selectedOption: "",
            });
          }
        }
      });
    });
    return items;
  };

  const selectedItems = getSelectedItems();
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const selectedOriginalSubtotal = selectedItems.reduce((acc, item) => {
    return acc + (item.originalPrice || item.price) * item.quantity;
  }, 0);

  const hubQty = selectedQuantities["pre_hub"] || 1;
  const displayOriginalPrice = selectedOriginalSubtotal + 29.92 * hubQty;
  const displayTotalPrice = subtotal; // Prepopulated items (hub, shipping) are FREE in our calculations
  const displaySavings = displayOriginalPrice - displayTotalPrice;
  const financingPrice = (displayTotalPrice / 9.791).toFixed(2);

  return (
    <BundleContext.Provider
      value={{
        data,
        loading,
        activeStep,
        setActiveStep,
        selectedQuantities,
        selectedOptions,
        handleIncrement,
        handleDecrement,
        handleOptionSelect,
        saveSystem,
        selectedItems,
        subtotal,
        displayOriginalPrice,
        displayTotalPrice,
        displaySavings,
        financingPrice,
      }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => {
  const context = useContext(BundleContext);
  if (context === undefined) {
    throw new Error("useBundle must be used within a BundleProvider");
  }
  return context;
};
