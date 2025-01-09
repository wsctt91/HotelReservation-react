import supabase, { supabaseUrl } from "./supabase";

// *酒店信息API
// 用来获取酒店列表
export async function getHotels() {
  // 从supabase中获取的API
  const { data, error } = await supabase.from("hotels").select("*");

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch hotels");
  }
  return data;
}

// 用来创建酒店信息
export async function CreateHotel(newHotel) {
  // supabase中图片的URL
  // https://hgfvypbmvfxhzpsywxpx.supabase.co/storage/v1/object/public/hotel-image/hotel-001.jpg

  // 从supabase中获取的API
  // 01. 创建酒店信息
  const imageName = `${Math.random()}-${newHotel.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/hotel-image/${imageName}`;
  const { data, error } = await supabase
    .from("hotels")
    .insert([{ ...newHotel, image: imagePath }]) // 插入数据
    .select();

  if (error) {
    console.error(error);
    throw new Error("Failed to create hotel");
  }
  // 02. 更新酒店图片, 上传图片到supabase数据库
  const { error: storageError } = await supabase.storage
    .from("hotel-images")
    .upload("imageName", newHotel.image);

  // 03.如果没有正确图片，则抛出错误
  if (storageError) {
    await supabase.from("hotels").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Hotel image upload failed and hotel was deleted");
  }
  return data;
}

// 用来删除酒店信息
export async function deleteHotel(id) {
  // 从supabase中获取的API
  const { data, error } = await supabase.from("hotels").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete hotel");
  }
  return data;
}
