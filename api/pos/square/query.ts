import { Pagination } from "@/interface/Pagination";
import {
  CatalogListResponse,
  SquareCustomer,
  SquareInvoice,
  SquareItem,
  SquareOrder,
} from "@/interface/pos";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getCatalogList,
  getSquareCustomerList,
  getSquareInvoiceList,
  getSquareItemList,
  getSquareOrderList,
} from "./api";
import { PaginatedResponse } from "@/interface/PaginatedResponse";

export const useGetCatalogListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<CatalogListResponse, Error> => {
  return useQuery({
    queryKey: ["catalogList", page, limit],
    queryFn: () => getCatalogList({ page, limit }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetSquareItemListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareItem>, Error> => {
  return useQuery({
    queryKey: ["squareItems", page, limit],
    queryFn: () => getSquareItemList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareCustomerListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareCustomer>, Error> => {
  return useQuery({
    queryKey: ["squareCustomers", page, limit],
    queryFn: () => getSquareCustomerList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareOrderListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareOrder>, Error> => {
  return useQuery({
    queryKey: ["squareOrders", page, limit],
    queryFn: () => getSquareOrderList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetSquareInvoiceListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<SquareInvoice>, Error> => {
  return useQuery({
    queryKey: ["squareInvoices", page, limit],
    queryFn: () => getSquareInvoiceList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};
