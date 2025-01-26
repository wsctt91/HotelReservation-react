import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

// *apiBookings用来处理预和交互预定相关数据到supabase
// 获取所有的预订
export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    // 为了得到hotels和guests的信息
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, hotels(name), guests(fullName, email)",
      { count: "exact" }
    );

  // 排序 -> FILTER
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }
  // 筛选 -> SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // 分页
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

// 获取一个预订
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, hotels(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// 返回在指定日期之后创建的所有预订。例如，可用于获取过去 30 天内创建的预订。
// date需要是ISO格式的日期字符串
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("予約を読み込むことができませんでした");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("予約を更新できませんでした");
  }
  return data;
}

export async function deleteBooking(id) {
  // !记住：这里的.from().delete().eq().select()方法是删除数据的意思
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("予約を削除できませんでした");
  }
  return data;
}
