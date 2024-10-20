export interface Reservation {
  clientId: number;
  id: number;
  client: {
    id: number;
    name: string;
    number: string;
    email: string;
  };
  room: {
    id: number;
    number: string;
    status: string;
    price: number;
  };
  pricePerNight: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
}
