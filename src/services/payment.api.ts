import { ISubscriptionState } from "@models/payment.interface";
import { IBaseResponse } from "@models/response.interface";
import { baseApi } from "./base.api";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSubscriptionState: builder.query<ISubscriptionState, ISubscriptionState>({
      query: () => "payment/subscription/state",
      providesTags: ["Subscription"],
      transformResponse: (response: IBaseResponse) => response.data,
    }),
    sendTransactionHash: builder.mutation<IBaseResponse, string>({
      query: hash => ({
        url: "payment/transaction",
        method: "POST",
        body: { hash },
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useGetSubscriptionStateQuery, useSendTransactionHashMutation } = paymentApi;
