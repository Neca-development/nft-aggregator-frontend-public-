import { ISubscriptionState } from "@models/payment.interface";
import { baseApi } from "./base.api";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSubscriptionState: builder.query<ISubscriptionState, void>({
      query: () => "payment/subscription/state",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetSubscriptionStateQuery } = paymentApi;
