import { Pagination } from "@/interface/Pagination";
import { CatalogListResponse, SquareCustomer, SquareInvoice, SquareItem, SquareOrder } from "@/interface/pos";
import axios from "@/lib/axios";
import { CUSTOMERS, INVOICES, ITEMS, ORDERS, SQUARE } from "./path";
import { PaginatedResponse } from "@/interface/PaginatedResponse";


export const getCatalogList = async ({
  page,
  limit,
}: Pagination): Promise<CatalogListResponse> => {
  const { data } = await axios.get(`/${SQUARE}/catalog/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareItemList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareItem>> => {
  const { data } = await axios.get(`/${SQUARE}/${ITEMS}/`, {
    params: { page, limit },
  });
  return data;
};  

export const getSquareCustomerList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareCustomer>> => {
  const { data } = await axios.get(`/${SQUARE}/${CUSTOMERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareOrderList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareOrder>> => {
  const { data } = await axios.get(`/${SQUARE}/${ORDERS}/`, {
    params: { page, limit },
  });
  return data;
};

export const getSquareInvoiceList = async ({
  page,
  limit,
}: Pagination): Promise<PaginatedResponse<SquareInvoice>> => {
  const { data } = await axios.get(`/${SQUARE}/${INVOICES}/`, {
    params: { page, limit },
  });
  return data;
};

