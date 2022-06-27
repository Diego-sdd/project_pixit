import api from "./api";

export async function LoginUser(data: Object) {
  try {
    const result = await api.get("v1/loginUser", {
      params: data,
    });
    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      msg: error.response.data.msg,
    };
  }
}
export async function RegisterUser(data: Object) {
  try {
    const result = await api.post("v1/registerUser", data);
    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      msg: error.response.data.body,
    };
  }
}
