import { Booking, Pet } from "../types";

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const petApi = {
  async savePet(pet: Pet): Promise<Pet> {
    await wait(250);
    return pet;
  },
};

export const bookingApi = {
  async createBooking(booking: Booking): Promise<Booking> {
    await wait(350);
    return booking;
  },
};
