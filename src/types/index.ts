export type PetSpecies = "Chó" | "Mèo" | "Chim" | "Thỏ" | "Khác";
export type PetGender = "Đực" | "Cái";
export type BookingStatus = "upcoming" | "completed" | "cancelled";
export type PaymentMethod = "MoMo" | "VNPay" | "Tiền mặt";

export interface HealthRecord {
  id: string;
  type: "Vaccine" | "Tẩy giun" | "Thuốc" | "Khám sức khỏe";
  title: string;
  date: string;
  nextDueDate?: string;
  note?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  weight: number;
  gender: PetGender;
  medicalHistory: string;
  image: string;
  healthRecords: HealthRecord[];
}

export interface Service {
  id: string;
  name: string;
  category: "Grooming" | "Veterinary" | "Hotel" | "Training";
  description: string;
  price: number;
  durationMinutes: number;
  icon: string;
  addOns: { id: string; name: string; price: number }[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  area: string;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  phone: string;
  image: string;
  services: string[];
}

export interface Booking {
  id: string;
  petId: string;
  petName: string;
  serviceId: string;
  serviceName: string;
  clinicId: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhone: string;
  staffName: string;
  date: string;
  time: string;
  addOnNames: string[];
  total: number;
  paymentMethod: PaymentMethod;
  status: BookingStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Đồ ăn" | "Đồ chơi" | "Vệ sinh";
  description: string;
  price: number;
  image: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
