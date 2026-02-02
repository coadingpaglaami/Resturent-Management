import {
  CloverCustomer,
  CloverInvoice,
  CloverItem,
  CloverOrder,
  CloverPayment,
} from "@/interface/pos";
import {
  getCloverCustomerList,
  getCloverInvoiceList,
  getCloverItemList,
  getCloverOrderList,
  getCloverPaymentList,
} from "./api";
import { PaginatedResponse } from "@/interface/PaginatedResponse";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Pagination } from "@/interface/Pagination";

export const useGetCloverItemListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CloverItem>, Error> => {
  return useQuery({
    queryKey: ["cloverItems", page, limit],
    queryFn: () => getCloverItemList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetCloverCustomerListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CloverCustomer>, Error> => {
  return useQuery({
    queryKey: ["cloverCustomers", page, limit],
    queryFn: () => getCloverCustomerList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetCloverOrderListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CloverOrder>, Error> => {
  return useQuery({
    queryKey: ["cloverOrders", page, limit],
    queryFn: () => getCloverOrderList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetCloverInvoiceListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CloverInvoice>, Error> => {
  return useQuery({
    queryKey: ["cloverInvoices", page, limit],
    queryFn: () => getCloverInvoiceList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};

export const useGetCloverPaymentListQuery = ({
  page = 1,
  limit = 10,
}: Pagination): UseQueryResult<PaginatedResponse<CloverPayment>, Error> => {
  return useQuery({
    queryKey: ["cloverPayments", page, limit],
    queryFn: () => getCloverPaymentList({ page, limit }),
    staleTime: 10 * 60 * 1000,
  });
};
