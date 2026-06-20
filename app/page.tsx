"use client"
// ** Hooks && Tools
import { useState, useEffect } from "react";
import Image from "next/image";
// ** Components
import DropList from "@/components/DropList";
// ** Assets
import cameraIcon from '@/public/assets/icons/cameraIcon.svg'
import planIcon from '@/public/assets/icons/planIcon.svg'
import sensorsIcon from '@/public/assets/icons/sensorsIcon.svg'
import extraIcon from '@/public/assets/icons/extraIcon.svg'
import satisfaction from '@/public/assets/images/satisfaction.png'
import fastShippingIcon from '@/public/assets/icons/fastShippingIcon.svg'
import { BundleProvider, useBundle } from "@/context/BundleContext";

const iconMap: Record<string, any> = {
  cameraIcon: cameraIcon,
  planIcon: planIcon,
  sensorsIcon: sensorsIcon,
  extraIcon: extraIcon,
};

function BundleBuilder() {
  const {
    data,
    loading,
    activeStep,
    setActiveStep,
    selectedQuantities,
    saveSystem,
    selectedItems,
    handleIncrement,
    handleDecrement,
    displayOriginalPrice,
    displayTotalPrice,
    displaySavings,
    financingPrice,
  } = useBundle();

  const getIcon = (iconName: string) => {
    return {
      src: iconMap[iconName] || null,
      alt: iconName,
    };
  };

  if (loading || !data) {
    return (
      <div className="w-full min-h-screen bg-white flex justify-center items-center font-sans dark:bg-black">
        <div className="text-lg text-[#575757] animate-pulse">Loading Bundle Data...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-sans dark:bg-black py-12 px-4 md:px-8 xl:px-15">
      <div className="max-w-360 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-7.25 items-start">
        <div className="w-full xl:col-span-2 flex flex-col gap-4">
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
              nextStepName={nextStep ? nextStep.title : undefined}
              onNext={nextStep ? () => setActiveStep(nextStep.id) : undefined}
            />
          );
        })}
        </div>
        <div className="w-5/6 mx-auto xl:w-full xl:mx-0 xl:col-span-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-8 lg:gap-13 bg-[#EDF4FF] p-6 md:p-9 xl:p-6 rounded-[10px]">
          <div className="flex flex-col">
          <div className="border-b mb-4 pb-2.5">
            <h1 className="text-[28px] text-[#1F1F1F]">Your security system</h1>
            <p className="text-[16px] text-[#1F1F1FBF]">Review your personalized protection system designed to keep what matters most safe.</p>
          </div>

          {/* Cameras */}
          <div className="flex flex-col gap-2 border-b mb-4 pb-2.5">
            <h2>Cameras</h2>
            {selectedItems.filter(item => item.id.startsWith("cam_")).map((item) => (
              <div key={item.id} className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.image || `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23FFFFFF'/></svg>`}
                    alt={item.name}
                    className="w-10.25 h-10.25 rounded-md object-cover bg-white shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] xl:text-[16px] text-[#1F1F1F] font-semibold leading-tight">{item.name}</h3>
                    {item.selectedOption && (
                      <p className="text-[12px] text-[#575757]">Color: {item.selectedOption}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 xl:gap-4 shrink-0">
                  {/* Quantity Controller */}
                  <div className="flex items-center gap-1.5 xl:gap-2">
                    <button
                      onClick={() => handleDecrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
                    >
                      -
                    </button>
                    <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Price Display */}
                  <h3 className="flex gap-1 text-[16px]">
                    {item.originalPrice && (
                      <span className="text-[#6F7882] line-through font-normal">${(item.originalPrice * item.quantity).toFixed(2)}</span>
                    )}
                    <span className="text-[#4E2FD2] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </h3>
                </div>
              </div>
            ))}
            {selectedItems.filter(item => item.id.startsWith("cam_")).length === 0 && (
              <p className="text-sm text-[#575757]/70">No cameras selected.</p>
            )}
          </div>

          {/* Sensors */}
          <div className="flex flex-col gap-2 border-b mb-4 pb-2.5">
            <h2>Sensors</h2>
            
            {/* Wyze Sense Hub (Required) - Pre-populated */}
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-10.25 h-10.25 rounded-md bg-white flex items-center justify-center font-bold text-[#575757] text-[10px] border border-gray-100">Hub</div>
                <div>
                  <h3 className="text-[16px] text-[#1F1F1F] font-semibold">Wyze Sense Hub (Required)</h3>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleDecrement("pre_hub")}
                    disabled={(selectedQuantities["pre_hub"] || 1) <= 1}
                    className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
                  >
                    -
                  </button>
                  <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{selectedQuantities["pre_hub"] || 1}</span>
                  <button
                    onClick={() => handleIncrement("pre_hub")}
                    className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
                  >
                    +
                  </button>
                </div>
                <h3 className="flex gap-1 text-[16px]">
                  <span className="text-[#6F7882] line-through font-normal">${(29.92 * (selectedQuantities["pre_hub"] || 1)).toFixed(2)}</span>
                  <span className="text-[#4E2FD2] font-semibold">FREE</span>
                </h3>
              </div>
            </div>

            {/* Selected Sensors */}
            {selectedItems.filter(item => item.id.startsWith("sensor_")).map((item) => (
              <div key={item.id} className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10.25 h-10.25 rounded-md object-cover bg-white border border-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-10.25 h-10.25 rounded-md bg-white flex items-center justify-center font-bold text-[#575757] text-[10px] border border-gray-100 shrink-0">Sensor</div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-[15px] xl:text-[16px] text-[#1F1F1F] font-semibold leading-tight">{item.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 xl:gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 xl:gap-2">
                    <button
                      onClick={() => handleDecrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
                    >
                      -
                    </button>
                    <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
                    >
                      +
                    </button>
                  </div>
                  <h3 className="flex gap-1 text-[16px]">
                    {item.originalPrice && (
                      <span className="text-[#6F7882] line-through font-normal">${(item.originalPrice * item.quantity).toFixed(2)}</span>
                    )}
                    <span className="text-[#4E2FD2] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* accessories */}
          <div className="flex flex-col gap-2 border-b mb-4 pb-2.5">
            <h2>accessories</h2>
            {selectedItems.filter(item => item.id.startsWith("acc_")).map((item) => (
              <div key={item.id} className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10.25 h-10.25 rounded-md object-cover bg-white border border-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-10.25 h-10.25 rounded-md bg-white flex items-center justify-center font-bold text-[#575757] text-[10px] border border-gray-100 shrink-0">Accessory</div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-[15px] xl:text-[16px] text-[#1F1F1F] font-semibold leading-tight">{item.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 xl:gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 xl:gap-2">
                    <button
                      onClick={() => handleDecrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
                    >
                      -
                    </button>
                    <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
                    >
                      +
                    </button>
                  </div>
                  <h3 className="flex gap-1 text-[16px]">
                    {item.originalPrice && (
                      <span className="text-[#6F7882] line-through font-normal">${(item.originalPrice * item.quantity).toFixed(2)}</span>
                    )}
                    <span className="text-[#4E2FD2] font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* plan */}
          <div className="flex flex-col gap-2 border-b mb-4 pb-2.5">
            <h2>plan</h2>
            {selectedItems.filter(item => item.id.startsWith("plan_")).map((item) => (
              <div key={item.id} className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10.25 h-10.25 rounded-md object-contain bg-white border border-gray-100 p-2 shrink-0"
                    />
                  ) : (
                    <div className="w-10.25 h-10.25 rounded-md bg-white flex items-center justify-center font-bold text-[#575757] text-[10px] border border-gray-100 shrink-0">Plan</div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-[15px] xl:text-[16px] text-[#1F1F1F] font-semibold leading-tight">{item.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 xl:gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 xl:gap-2">
                    <button
                      onClick={() => handleDecrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#1F1F1F] font-bold border-2 border-transparent disabled:border-[#E6EBF0]"
                    >
                      -
                    </button>
                    <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.productId, item.selectedOption)}
                      className="w-5 h-5 flex justify-center items-center bg-white rounded-sm cursor-pointer text-[#1F1F1F] font-bold"
                    >
                      +
                    </button>
                  </div>
                  <h3 className="flex gap-1 text-[16px]">
                    {item.originalPrice && (
                      <span className="text-[#6F7882] line-through font-normal">${(item.originalPrice * item.quantity).toFixed(2)}/mo</span>
                    )}
                    <span className="text-[#4E2FD2] font-semibold">${(item.price * item.quantity).toFixed(2)}/mo</span>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Fast Shipping */}
          <div className="flex flex-col gap-2 pb-2.5">
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Image src={fastShippingIcon} alt="Fast Shipping" className="w-10.25 h-10.25 rounded-md object-contain bg-white border border-gray-100 p-2 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-[15px] xl:text-[16px] text-[#1F1F1F] font-semibold leading-tight">Fast Shipping</h3>
                </div>
              </div>
              <div className="flex items-center gap-3 xl:gap-4 shrink-0">
                <span className="text-[16px] text-[#0B0D10] font-medium w-4 text-center">1</span>
                <h3 className="flex gap-1 text-[16px]">
                  <span className="text-[#6F7882] line-through font-normal">$5.99</span>
                  <span className="text-[#4E2FD2] font-semibold">FREE</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4.5">
          <div className="flex items-center gap-3.5">
            <Image src={satisfaction} alt="satisfaction" className="w-20 h-20 shrink-0"/>
            <div className="flex flex-col gap-1 min-w-0">
              <h2 className="text-[16px] md:text-[18px] text-[#1F1F1F] font-semibold leading-snug">
                30-day hassle-free returns
              </h2>
              <p className="text-[13px] md:text-[14px] text-[#1F1F1F]/80 leading-normal">
                If you're not totally in love with the product, we will refund you 100%.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-between items-center">
            <span className="bg-[#4E2FD2] px-2.5 py-1.5 rounded-[3px] text-[14px] sm:text-[16px] text-white shrink-0">
              as low as ${financingPrice}/mo
            </span>
            <h3 className="text-[24px] sm:text-[28px] text-[#4E2FD2] font-bold shrink-0">
              <span className="text-[16px] sm:text-[20px] text-[#6F7882] line-through font-normal mr-1.5">
                ${displayOriginalPrice.toFixed(2)}
              </span>
              ${displayTotalPrice.toFixed(2)}
            </h3>
          </div>
          <h4 className="text-[14px] text-[#0AA288] text-center font-medium">Congrats! You’re saving ${displaySavings.toFixed(2)} on your security bundle!</h4>
          <button className="bg-[#4E2FD2] px-4 py-3 rounded-sm text-[17px] font-bold text-white hover:bg-[#3d24ab] transition-colors cursor-pointer">Checkout</button>
          <button onClick={saveSystem} className="text-center text-[14px] text-[#484848] underline italic cursor-pointer bg-transparent border-none">Save my system for later</button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <BundleProvider>
      <BundleBuilder />
    </BundleProvider>
  );
}