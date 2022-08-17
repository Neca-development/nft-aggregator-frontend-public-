import { ISubscriptionState } from "@models/payment.interface";
import { IBaseResponse } from "@models/response.interface";
import { baseApi } from "./base.api";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSubscriptionState: builder.query<ISubscriptionState, void>({
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
    }),
  }),
});

export const {
  useGetSubscriptionStateQuery,
  useLazyGetSubscriptionStateQuery,
  useSendTransactionHashMutation,
} = paymentApi;
