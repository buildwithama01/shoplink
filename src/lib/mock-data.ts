export type ProductVariant = { type: string; values: string[] };
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  isActive: boolean;
  variants: ProductVariant[];
  description?: string;
  stock?: number;
};

export type OrderStatus = "Pending" | "Shipped" | "Cancelled" | "Delivered";
export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  itemsCount: number;
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: "Cash on Delivery" | "Bank Transfer";
  shipping: "Pickup" | "Delivery";
  address?: string;
  items: { productId: string; name: string; variant: string; qty: number; price: number }[];
};

export const store = {
  name: "Cruz Gadgets",
  slug: "cruz-gadgets",
  tagline: "Future Forward Gadgets",
  currency: "NGN",
  color: "#16a34a",
  whatsapp: "+2348012345678",
};

export const formatNGN = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const categories = [
  { id: "all", label: "All", icon: "Sparkles" },
  { id: "phones", label: "Phones", icon: "Smartphone" },
  { id: "laptops", label: "Laptops", icon: "Laptop" },
  { id: "accessories", label: "Accessories", icon: "Cable" },
  { id: "audio", label: "Audio", icon: "Headphones" },
];

export const products: Product[] = [
  {
    id: "p1", slug: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", brand: "Samsung",
    category: "phones", price: 1450000, isActive: true,
    variants: [
      { type: "Color", values: ["Black", "Silver", "Gold"] },
      { type: "Storage", values: ["256GB", "512GB", "1TB"] },
    ],
    description: "Flagship Samsung Galaxy with titanium frame, 200MP camera, and integrated S-Pen.",
    stock: 24,
  },
  {
    id: "p2", slug: "iphone-15-pro", name: "iPhone 15 Pro", brand: "Apple",
    category: "phones", price: 1750000, isActive: true,
    variants: [
      { type: "Color", values: ["Natural", "Blue", "White", "Black"] },
      { type: "Storage", values: ["128GB", "256GB", "512GB"] },
    ],
    description: "A17 Pro chip, titanium build, and the most powerful iPhone camera system yet.",
    stock: 12,
  },
  {
    id: "p3", slug: "macbook-air-m2", name: "MacBook Air M2", brand: "Apple",
    category: "laptops", price: 2100000, isActive: true,
    variants: [
      { type: "Color", values: ["Midnight", "Starlight", "Silver"] },
      { type: "Storage", values: ["256GB", "512GB"] },
    ],
    stock: 8,
  },
  {
    id: "p4", slug: "airpods-pro", name: "AirPods Pro", brand: "Apple",
    category: "audio", price: 320000, isActive: true,
    variants: [], stock: 40,
  },
  {
    id: "p5", slug: "samsung-tab-s9", name: "Samsung Tab S9", brand: "Samsung",
    category: "accessories", price: 850000, isActive: true,
    variants: [
      { type: "Color", values: ["Graphite", "Beige"] },
      { type: "Storage", values: ["128GB", "256GB"] },
    ], stock: 15,
  },
  {
    id: "p6", slug: "xiaomi-redmi-note-13", name: "Xiaomi Redmi Note 13", brand: "Xiaomi",
    category: "phones", price: 285000, isActive: true,
    variants: [{ type: "Color", values: ["Black", "Blue", "Green"] }], stock: 60,
  },
  {
    id: "p7", slug: "jbl-speaker", name: "JBL Speaker", brand: "JBL",
    category: "audio", price: 95000, isActive: false,
    variants: [], stock: 0,
  },
  {
    id: "p8", slug: "usb-c-hub", name: "USB-C Hub", brand: "Anker",
    category: "accessories", price: 45000, isActive: true,
    variants: [], stock: 120,
  },
];

export const cartItems = [
  { id: "c1", productId: "p1", name: "Galaxy S24 Ultra", variant: "Black · 256GB", price: 1450000, qty: 1 },
  { id: "c2", productId: "p4", name: "AirPods Pro", variant: "Default", price: 320000, qty: 2 },
  { id: "c3", productId: "p8", name: "USB-C Hub", variant: "Default", price: 45000, qty: 1 },
];

export const orders: Order[] = [
  {
    id: "o1", orderNumber: "10001", customerName: "Adaeze Okafor", email: "ada@example.com",
    phone: "+2348011112222", itemsCount: 3, total: 2160000, status: "Pending",
    date: "2025-04-22", paymentMethod: "Bank Transfer", shipping: "Delivery",
    address: "12 Allen Avenue, Ikeja, Lagos",
    items: [
      { productId: "p1", name: "Galaxy S24 Ultra", variant: "Black · 256GB", qty: 1, price: 1450000 },
      { productId: "p4", name: "AirPods Pro", variant: "Default", qty: 2, price: 320000 },
    ],
  },
  { id: "o2", orderNumber: "10002", customerName: "Tunde Bakare", email: "tunde@example.com", phone: "+2348022223333", itemsCount: 1, total: 1750000, status: "Shipped", date: "2025-04-21", paymentMethod: "Bank Transfer", shipping: "Delivery", items: [{ productId: "p2", name: "iPhone 15 Pro", variant: "Blue · 256GB", qty: 1, price: 1750000 }] },
  { id: "o3", orderNumber: "10003", customerName: "Chioma Eze", email: "chioma@example.com", phone: "+2348033334444", itemsCount: 2, total: 380000, status: "Cancelled", date: "2025-04-20", paymentMethod: "Cash on Delivery", shipping: "Pickup", items: [] },
  { id: "o4", orderNumber: "10004", customerName: "Femi Adeyemi", email: "femi@example.com", phone: "+2348044445555", itemsCount: 1, total: 2100000, status: "Shipped", date: "2025-04-19", paymentMethod: "Bank Transfer", shipping: "Delivery", items: [] },
  { id: "o5", orderNumber: "10005", customerName: "Ngozi Umeh", email: "ngozi@example.com", phone: "+2348055556666", itemsCount: 4, total: 510000, status: "Pending", date: "2025-04-19", paymentMethod: "Cash on Delivery", shipping: "Delivery", items: [] },
  { id: "o6", orderNumber: "10006", customerName: "Kunle Ojo", email: "kunle@example.com", phone: "+2348066667777", itemsCount: 1, total: 95000, status: "Shipped", date: "2025-04-18", paymentMethod: "Bank Transfer", shipping: "Pickup", items: [] },
  { id: "o7", orderNumber: "10007", customerName: "Blessing Akpan", email: "blessing@example.com", phone: "+2348077778888", itemsCount: 2, total: 850000, status: "Pending", date: "2025-04-18", paymentMethod: "Cash on Delivery", shipping: "Delivery", items: [] },
  { id: "o8", orderNumber: "10008", customerName: "Ibrahim Musa", email: "ibrahim@example.com", phone: "+2348088889999", itemsCount: 3, total: 285000, status: "Shipped", date: "2025-04-17", paymentMethod: "Bank Transfer", shipping: "Delivery", items: [] },
];

export const stats = {
  totalSales: 2340000,
  totalOrders: 47,
  pendingOrders: 12,
  productsCount: 23,
};

export const orderTimeline = [
  { label: "Order received", timestamp: "Apr 22, 2025 · 10:24 AM", state: "complete" as const },
  { label: "Payment confirmed", timestamp: "Apr 22, 2025 · 10:31 AM", state: "complete" as const },
  { label: "Order being prepared", timestamp: "Apr 22, 2025 · 11:05 AM", state: "active" as const },
  { label: "Out for delivery", timestamp: "", state: "pending" as const },
  { label: "Delivered", timestamp: "", state: "pending" as const },
];
