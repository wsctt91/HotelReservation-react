import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";
import { bookings } from "./data-bookings";
import { hotels } from "./data-hotels";
import { guests } from "./data-guests";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

// *上传虚拟数据模块
async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteHotels() {
  const { error } = await supabase.from("hotels").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createHotels() {
  const { error } = await supabase.from("hotels").insert(hotels);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a hotelId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and hotelIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((guest) => guest.id);
  const { data: hotelsIds } = await supabase
    .from("hotels")
    .select("id")
    .order("id");
  const allHotelIds = hotelsIds.map((hotel) => hotel.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of hotels, as they don't have and ID yet
    const hotel = hotels.at(booking.hotelId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const hotelPrice = numNights * (hotel.regularPrice - hotel.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = hotelPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      hotelPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      hotelId: allHotelIds.at(booking.hotelId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

// uploader组件 上传数据
function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  // !上传所有数据的时候，需要注意顺序，先删除bookings，再删除guests，再删除hotels
  // !然后再创建guests，hotels，bookings(最后创建bookings，需要得到guests和hotels的id)
  // 「消耗2天时间debug」
  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteHotels();

    // Bookings need to be created LAST
    await createGuests();
    await createHotels();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "#333333",
      }}
    >
      <h3>データアップロード</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        すべてをアップロード
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        仮予約のみ
      </Button>
    </div>
  );
}

export default Uploader;
