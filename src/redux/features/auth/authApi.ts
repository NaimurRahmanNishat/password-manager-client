import { getBaseUrl } from "@/utils/getBaseUrl";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export interface User {
  _id: string;
  username: string;
  email: string;
  birthdate?: string; // Date → string (JSON.stringify হলে string হয়)
}

export interface UserResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  birthdate: string; // পাঠানোর সময় `new Date()` → ISO string করতে হয়
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation<UserResponse, RegisterUserInput>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    // Login
    loginUser: builder.mutation<LoginApiResponse, LoginUserInput>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
