"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useErrorToast } from "./utils";

export interface InvalidateConfig {
  queryKey: string[];
  refetchType?: "active" | "inactive" | "all" | "none";
  exact?: boolean;
}

export interface RefetchConfig {
  queryKey: string[];
  type?: "active" | "inactive" | "all";
  exact?: boolean;
}

export function createQueryHook<TResponse, TBody, TParams>(service: {
  key: string[];
  fetch: (params: TParams, body?: TBody) => Promise<AxiosResponse<TResponse>>;
  getQueryKey: (params: TParams, body?: TBody) => string[];
}) {
  return (
    params: TParams,
    body?: TBody,
    options?: Omit<
      UseQueryOptions<AxiosResponse<TResponse>, AxiosError>,
      "queryKey" | "queryFn"
    >
  ) => {
    return useQuery({
      queryKey: service.getQueryKey(params, body),
      queryFn: () => service.fetch(params, body),
      ...options,
    });
  };
}

export function createMutationHook<TResponse, TRequest, TParams>(
  service: {
    apiName: string;
    mutate: (
      params: TParams,
      data?: TRequest
    ) => Promise<AxiosResponse<TResponse>>;
  },
  config?: {
    invalidates?:
      | InvalidateConfig[]
      | ((variables: {
          params: TParams;
          data?: TRequest;
        }) => InvalidateConfig[]);
    suppressDefaultErrorToast?: boolean;
  }
) {
  return (
    options?: UseMutationOptions<
      AxiosResponse<TResponse>,
      AxiosError,
      { params: TParams; data?: TRequest }
    >
  ) => {
    const queryClient = useQueryClient();
    const defaultErrorToast = useErrorToast();

    return useMutation({
      mutationFn: ({ params, data }) => service.mutate(params, data),
      onError: (error, variables, onMutateResult, context) => {
        // Only call default error toast if not suppressed
        if (!config?.suppressDefaultErrorToast) {
          defaultErrorToast(error, variables, context);
        }
        // Always call custom onError if provided
        options?.onError?.(error, variables, onMutateResult, context);
      },
      onSuccess: async (data, variables, onMutateResult, context) => {
        if (config?.invalidates) {
          const invalidateConfigs =
            typeof config.invalidates === "function"
              ? config.invalidates(variables)
              : config.invalidates;

          for (const cfg of invalidateConfigs) {
            await queryClient.invalidateQueries({
              queryKey: cfg.queryKey,
              refetchType: cfg.refetchType || "active",
              exact: cfg.exact,
            });
          }
        }

        options?.onSuccess?.(data, variables, onMutateResult, context);
      },
      ...options,
    });
  };
}

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  return {
    invalidate: (config: InvalidateConfig) => {
      return queryClient.invalidateQueries({
        queryKey: config.queryKey,
        refetchType: config.refetchType || "active",
        exact: config.exact,
      });
    },

    invalidateMany: (configs: InvalidateConfig[]) => {
      return Promise.all(
        configs.map((cfg) =>
          queryClient.invalidateQueries({
            queryKey: cfg.queryKey,
            refetchType: cfg.refetchType || "active",
            exact: cfg.exact,
          })
        )
      );
    },

    refetch: (config: RefetchConfig) => {
      return queryClient.refetchQueries({
        queryKey: config.queryKey,
        type: config.type || "active",
        exact: config.exact,
      });
    },
  };
}
