import { store } from "../redux/store/";

import api from "./api";

export async function RegisterUserEmployee(data: Object) {
  const { token } = store.getState().authReducer;
  try {
    const result = await api.post("v1/registerUserEmployee", data, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(result);
    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      msg: error.response.data.body,
    };
  }
}
export async function GetUserEmployee() {
  const { token } = store.getState().authReducer;
  try {
    const result = await api.get("v1/getUserEmployee", {
      headers: { Authorization: "Bearer " + token },
    });

    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      msg: error.response.data.body,
    };
  }
}
export async function DeteledUserEmployee(data: { idUserData: number }) {
  const { token } = store.getState().authReducer;
  try {
    const result = await api.delete("v1/deleteUserEmployee", {
      headers: { Authorization: "Bearer " + token },
      data,
    });

    return result;
  } catch (error: any) {
    return {
      status: error.response.status,
      msg: error.response.data.body,
    };
  }
}
