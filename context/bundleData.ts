export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  discount: string | null;
  options: string[];
  initialQty: number;
  image: string;
}

export interface Step {
  id: number;
  title: string;
  iconName: string;
  products: Product[];
}

export interface PrePopulatedItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  quantity: number;
  notes: string;
}

export interface BundleDataset {
  steps: Step[];
  prePopulatedItems: PrePopulatedItem[];
}

export const bundleData: BundleDataset = {
  steps: [
    {
      id: 1,
      title: "Choose your cameras",
      iconName: "cameraIcon",
      products: [
        {
          id: "cam_battery_pro",
          name: "Wyze Battery Cam Pro",
          description: "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed. Learn More",
          price: 89.98,
          originalPrice: null,
          discount: null,
          options: ["White", "Grey"],
          initialQty: 0,
          image: "/assets/images/WyzeBatteryCamPro.png"
        },
        {
          id: "cam_v4",
          name: "Wyze Cam v4",
          description: "The clearest Wyze Cam ever made. Learn More",
          price: 27.98,
          originalPrice: 35.98,
          discount: "Save 22%",
          options: ["Black", "White"],
          initialQty: 1,
          image: "/assets/images/WyzeCamv4.png"
        },
        {
          id: "cam_pan_v3",
          name: "Wyze Cam Pan v3",
          description: "360° pan and 180° tilt security camera. Learn More",
          price: 23.99,
          originalPrice: 28.99,
          discount: "Save 17%",
          options: ["White"],
          initialQty: 2,
          image: "/assets/images/WyzeCamPanv3.png"
        },
        {
          id: "cam_floodlight_v2",
          name: "Wyze Cam Floodlight v2",
          description: "2K floodlight camera with a 160° wide-angle view for your garage. Learn More",
          price: 69.98,
          originalPrice: null,
          discount: null,
          options: ["White", "Black"],
          initialQty: 0,
          image: "/assets/images/WyzeCamFloodlightv2.png"
        },
        {
          id: "cam_duo_doorbell",
          name: "Wyze Duo Cam Doorbell",
          description: "Two cameras. Two views. Double the porch protection. Learn More",
          price: 69.98,
          originalPrice: 89.98,
          discount: "Save 22%",
          options: ["White", "Black"],
          initialQty: 0,
          image: "/assets/images/WyzeDuoCamDoorbell.png"
        }
      ]
    },
    {
      id: 2,
      title: "Choose your plan",
      iconName: "planIcon",
      products: [
        {
          id: "plan_unlimited",
          name: "Cam Unlimited",
          description: "AI alerts, unlimited video length, and back-to-back recordings.",
          price: 9.99,
          originalPrice: 12.99,
          discount: "Save 23%",
          options: [],
          initialQty: 1,
          image: "/assets/icons/camUnlimitedIcon.svg"
        }
      ]
    },
    {
      id: 3,
      title: "Choose your sensors",
      iconName: "sensorsIcon",
      products: [
        {
          id: "sensor_motion",
          name: "Wyze Sense Motion Sensor",
          description: "Detect motion up to 30 feet away.",
          price: 29.99,
          originalPrice: null,
          discount: null,
          options: [],
          initialQty: 2,
          image: ""
        }
      ]
    },
    {
      id: 4,
      title: "Add extra protection",
      iconName: "extraIcon",
      products: [
        {
          id: "acc_sdcard",
          name: "Wyze MicroSD Card (256GB)",
          description: "High-endurance microSD card for continuous local recording.",
          price: 20.98,
          originalPrice: null,
          discount: null,
          options: [],
          initialQty: 2,
          image: "/assets/images/WyzeMicroSDCard (256GB).png"
        }
      ]
    }
  ],
  prePopulatedItems: [
    {
      id: "pre_hub",
      name: "Wyze Sense Hub (Required)",
      category: "Sensors",
      price: 0.00,
      originalPrice: 29.92,
      quantity: 1,
      notes: "FREE"
    },
    {
      id: "pre_shipping",
      name: "Fast Shipping",
      category: "Shipping",
      price: 0.00,
      originalPrice: 5.99,
      quantity: 1,
      notes: "FREE"
    }
  ]
};
