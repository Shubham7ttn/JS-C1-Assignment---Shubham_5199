import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ticketsApi = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Ticket', 'User'],
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: ({ status, search, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        if (status) params.set('status', status);
        if (search) params.set('search', search);
        params.set('page', String(page));
        params.set('limit', String(limit));
        return `/tickets?${params.toString()}`;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Ticket', id: _id })),
              { type: 'Ticket', id: 'LIST' },
            ]
          : [{ type: 'Ticket', id: 'LIST' }],
    }),
    getTicketById: builder.query({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Ticket', id }],
    }),
    createTicket: builder.mutation({
      query: (body) => ({ url: '/tickets', method: 'POST', body }),
      invalidatesTags: [{ type: 'Ticket', id: 'LIST' }],
    }),
    updateTicket: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/tickets/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
    assignTicket: builder.mutation({
      query: ({ id, assignedTo }) => ({
        url: `/tickets/${id}/assign`,
        method: 'PATCH',
        body: { assignedTo },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tickets/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
    addComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tickets/${id}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Ticket', id }],
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useAssignTicketMutation,
  useChangeStatusMutation,
  useAddCommentMutation,
  useGetUsersQuery,
} = ticketsApi;
