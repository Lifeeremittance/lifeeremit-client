import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getRates = async (provider: any, country: any, currency: any) => {
  const response = await Api.get(
    `/rates/${provider}?country=${country}&currency=${currency}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data.data;
};
