// hooks/useComments.ts
import useSWR from 'swr';
import { Comment } from '../interfaces';

const fetcher = (url: string) =>
  fetch(url).then((res) => (res.ok ? res.json() : Promise.reject(res)));

export default function useComments(postSlug: string) {
  const { data, error, mutate } = useSWR<Comment[]>(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  return {
    comments: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
