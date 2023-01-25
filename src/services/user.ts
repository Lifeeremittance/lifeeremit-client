import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const createUser = async (
  fullName: string,
  email_address: string,
  phone_number: string,
  companyName: string,
  address: string
) => {
  const response = await Api.post(
    `/users`,
    {
      fullName,
      email_address,
      phone_number,
      roles: ["user"],
      companyName,
      address,
    },
    {}
  );
  return response;
};

export const getUserInfo = async () => {
  const response = await Api.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const updateUser = async (userId: string | null, updateUserDto: any) => {
  const response = await Api.patch(`/users/${userId}`, updateUserDto, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response;
};
