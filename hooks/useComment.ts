// hooks/useComments.ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useComments = (postSlug: string) => {
  const { data, error, mutate } = useSWR(`/api/comments?postSlug=${postSlug}`, fetcher);

  return {
    comments: data || [],
    isLoading: !error && !data,
    isError: !!error,
    mutate, // Now mutate is correctly used
  };
};
