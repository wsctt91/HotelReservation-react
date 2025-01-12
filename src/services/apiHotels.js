// 用来获取酒店信息的API
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
export async function CreateEditHotel(newHotel, id) {
  /*   supabase中图片的URL
  https://hgfvypbmvfxhzpsywxpx.supabase.co/storage/v1/object/public/hotel-image/hotel-001.jpg */

  console.log(newHotel, id);
  const hasImagePath = newHotel.image?.startsWith?.(supabaseUrl);
  // 从supabase中获取的API
  const imageName = `${Math.random()}-${newHotel.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newHotel.image
    : `${supabaseUrl}/storage/v1/object/public/hotel-images/${imageName}`;

  // 01. 创建酒店信息
  let query = supabase.from("hotels");

  // A. 如果id不存在则新增数据
  if (!id) query = query.insert([{ ...newHotel, image: imagePath }]);
  // B. 如果id存在则更新数据
  if (id) query = query.update({ ...newHotel, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create hotel");
  }
  // 02. 更新酒店图片, 上传图片到supabase数据库
  // !需要修改 supabase-API改变
  const { error: storageError } = await supabase.storage
    .from("hotel-images")
    .upload(`public/${imageName}`, newHotel.image, {
      cacheControl: "3600",
      contentType: newHotel.image.type,
      upsert: false,
    });

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
