import supabase from "./supabase";

// 处理用户登录相关的请求
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  // console.log(data);

  return data;
}

// 处理当前用户的请求
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
