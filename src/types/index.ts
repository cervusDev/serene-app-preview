// Booking entity
export interface Booking {
  id: number;
  date: string;
  clientId: number;
  serviceId: number;
  therapistId: number;
  start_time: string;
  client?: Client;
  service?: Service;
  therapist?: Therapist;
}

export interface BookingPayload {
  date: string;
  clientId: number;
  serviceId: number;
  therapistId: number;
  start_time: string;
}

// Client entity
export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  password?: string;
}

export interface ClientPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
}

// Slot entity
export interface Slot {
  id: number;
  date: string;
  endTime: string;
  startTime: string;
  therapistId: number;
  therapist?: Therapist;
}

export interface SlotPayload {
  date: string;
  endTime: string;
  startTime: string;
  therapistId: number;
}

// Service entity
export interface Service {
  id: number;
  duration: number;
  price: string;
  name: string;
  active: boolean;
}

export interface ServicePayload {
  duration: number;
  price: string;
  name: string;
  active: boolean;
}

// Therapist entity
export interface Therapist {
  id: number;
  name: string;
  phone: string;
  bio: string;
  specialty: string;
}

export interface TherapistPayload {
  name: string;
  phone: string;
  bio: string;
  specialty: string;
}
