export type HotelBooking = {
  id?: number;
  hotelId: number;
  name: string;
  address: string;
  clientId: number;
};

export type HotelBookingComplete = HotelBooking & {
  clientName: string;
  hotelName: string;
};
