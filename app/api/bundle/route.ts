import { NextResponse } from 'next/server';

export async function GET() {
  const bundleData = {
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
            image: "/assets/icons/images/WyzeBatteryCamPro.png"
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
            image: "/assets/icons/images/WyzeCamv4.png"
          },
          {
            id: "cam_pan_v3",
            name: "Wyze Cam Pan v3",
            description: "360° pan and 180° tilt security camera. Learn More",
            price: 34.98,
            originalPrice: 39.98,
            discount: "Save 12%",
            options: ["White"],
            initialQty: 1,
            image: "/assets/icons/images/WyzeCamPanv3.png"
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
            image: "/assets/icons/images/WyzeCamFloodlightv2.png"
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
            image: "/assets/icons/images/WyzeDuoCamDoorbell.png"
          }
        ]
      },
      {
        id: 2,
        title: "Choose your plan",
        iconName: "planIcon",
        products: [
          {
            id: "plan_cam_plus",
            name: "Cam Plus Monthly",
            description: "AI alerts, unlimited video length, and back-to-back recordings.",
            price: 3.99,
            originalPrice: null,
            discount: null,
            options: [],
            initialQty: 0
          }
        ]
      },
      {
        id: 3,
        title: "Choose your sensors",
        iconName: "sensorsIcon",
        products: [
          {
            id: "sensor_entry",
            name: "Wyze Entry Sensor v2",
            description: "Know when doors or windows open.",
            price: 14.99,
            originalPrice: 19.99,
            discount: "Save 25%",
            options: [],
            initialQty: 0
          }
        ]
      },
      {
        id: 4,
        title: "Add extra protection",
        iconName: "extraIcon",
        products: [
          {
            id: "prot_siren",
            name: "Wyze Handheld Siren",
            description: "Scare away intruders instantly.",
            price: 9.99,
            originalPrice: 14.99,
            discount: "Save 33%",
            options: [],
            initialQty: 0
          }
        ]
      }
    ],
    prePopulatedItems: [
      {
        id: "pre_hub",
        name: "Wyze Sense Hub",
        category: "Sensors",
        price: 0.00,
        quantity: 1,
        notes: "Included in bundle"
      },
      {
        id: "pre_mount",
        name: "Wyze Wall Mount Kit",
        category: "Accessory",
        price: 0.00,
        quantity: 1,
        notes: "Included in bundle"
      },
      {
        id: "pre_plan_trial",
        name: "Wyze Cam Plus 3-Month Trial",
        category: "Plan",
        price: 0.00,
        quantity: 1,
        notes: "Included in bundle"
      }
    ]
  };

  return NextResponse.json(bundleData);
}
