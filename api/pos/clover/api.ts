import axios from "@/lib/axios";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { Pagination } from "@/interface/Pagination";
import {
  CloverCustomer,
  CloverInvoice,
  CloverItem,
  CloverOrder,
  CloverPayment,
} from "@/interface/pos";
import { CLOVER, CUSTOMERS, INVOICES, ITEMS, ORDERS, PAYMENTS } from "./path";

export const getCloverCatalogList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverItem>> => {
  const { data } = await axios.get(`/${CLOVER}/catalog/`, {
    params: { page, limit },
  });
  return data;
};

export const getCloverItemList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverItem>> => {
  const { data } = await axios.get(`/${CLOVER}/${ITEMS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getCloverCustomerList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverCustomer>> => {
  const { data } = await axios.get(`/${CLOVER}/${CUSTOMERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getCloverOrderList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverOrder>> => {
  const { data } = await axios.get(`/${CLOVER}/${ORDERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getCloverInvoiceList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverInvoice>> => {
  const { data } = await axios.get(`/${CLOVER}/${INVOICES}/`, {
    params: { page, limit },
  });
  return data;
};

export const getCloverPaymentList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<CloverPayment>> => {
  const { data } = await axios.get(`/${CLOVER}/${PAYMENTS}/`, {
    params: { page, limit },
  });
  return data;
};
