// src/redux/features/sheet/sheetApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "@/utils/getBaseUrl";

export interface SheetType {
  _id?: string;
  email: string;
  password: string;
  account: string;
  other: string;
  createdAt?: string;
  updatedAt?: string;
}

export const sheetApi = createApi({
  reducerPath: "sheetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/document`,
    credentials: "include",
  }),
  tagTypes: ["Sheet"],
  endpoints: (builder) => ({
    getSheets: builder.query<SheetType[], void>({
      query: () => "/",
      // ✅ Transform response if API returns { data: [...] }
      transformResponse: (response: { data: SheetType[] }) => response.data,
      providesTags: ["Sheet"],
    }),

    // ✅ Create Sheet
    createSheet: builder.mutation<SheetType, Partial<SheetType>>({
      query: (newSheet) => ({
        url: "/",
        method: "POST",
        body: newSheet,
      }),
      invalidatesTags: ["Sheet"],
    }),

    // ✅ Update Sheet
    updateSheet: builder.mutation<SheetType, Partial<SheetType>>({
      query: (updatedSheet) => ({
        url: `/${updatedSheet._id}`,
        method: "PUT",
        body: updatedSheet,
      }),
      invalidatesTags: ["Sheet"],
    }),

    // ✅ Delete Sheet
    deleteSheet: builder.mutation<SheetType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sheet"],
    })
  }),
});

export const { useGetSheetsQuery, useCreateSheetMutation, useUpdateSheetMutation, useDeleteSheetMutation } = sheetApi;
