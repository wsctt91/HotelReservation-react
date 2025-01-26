import supabase, { supabaseUrl } from "./supabase";

// *处理用户注册相关的请求
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

// *处理用户登录相关的请求
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  // console.log(data);

  return data;
}

// *处理当前用户的请求
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();
  // console.log(data);
  if (error) throw new Error(error.message);

  return data?.user;
}

// *处理用户登出的请求
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// *处理更新用户的请求
export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1-更新用户名或者密码
  let updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2-更新头像
  // ?需要修改 supabase-API改变
  const avatarName = `avatar-${data.user.id}-${Date.now()}`; // 生成一个随机文件名
  const { error: storageError } = await supabase.storage
    .from("avatars")
    // cachControl: 缓存时间 upsert: 是否覆盖
    .upload(avatarName, avatar, { cacheControl: "3600", upsert: true });
  if (storageError) throw new Error(storageError.message);

  // 3-再次上传更新头像的用户信息
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updateUser;
}
