// hooks/useComments.ts
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then((res) => (res.ok ? res.json() : Promise.reject(res)));

  export const useComments = (postSlug) => {
    const { data, error } = useSWR(`/api/comments?postSlug=${postSlug}`, fetcher);

  return {
    comments: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
