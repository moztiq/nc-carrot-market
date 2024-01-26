import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR('/api/users/me', fetcher);

  return data;
}
