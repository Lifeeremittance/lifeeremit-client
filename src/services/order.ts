import { Api } from "../api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
const jwt = cookie.get("jwt");

export const getOrders = async () => {
  const response = await Api.get(`/orders`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getOrderById = async (id: any) => {
  const response = await Api.get(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const getOrdersByMinimumTime = async (time: any) => {
  const response = await Api.get(`/orders?minTime=${time}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data.data;
};

export const createOrder = async (
  provider: string,
  product: string,
  country: string,
  company_name: string,
  company_address: string | null,
  contact_name: string,
  phone_number: string,
  email_address: string,
  reason: string | null,
  reference_number: string | null,
  invoice_number: number,
  invoice: string
) => {
  const response = await Api.post(
    `/orders`,
    {
      provider,
      product,
      country,
      company_name,
      company_address,
      contact_name,
      phone_number,
      email_address,
      reason,
      reference_number,
      invoice_number,
      invoice,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};
