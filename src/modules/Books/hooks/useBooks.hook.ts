import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useBooks = () => {
  const queryClient = useQueryClient();
  const hasBookCached = useMemo(() => {
    const booksKey = getQueryKey(
      api.books.getBooksByUserId,
      undefined,
      "query",
    );
    const booksCache = queryClient.getQueryData(booksKey);
    return Boolean(booksCache);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: books = [], isLoading } = api.books.getBooksByUserId.useQuery(
    undefined,
    {
      enabled: !hasBookCached,
    },
  );

  return { books, isLoading };
};

export const useCurrentBook = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const bookId = params?.bookId;

  const hasBookCached = useMemo(() => {
    const booksKey = getQueryKey(
      api.books.getBookById,
      bookId! as string,
      "query",
    );

    const accountCache = queryClient.getQueryData(booksKey);
    return Boolean(accountCache);
  }, [bookId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isLoading } = api.books.getBookById.useQuery(
    bookId! as string,
    {
      enabled: !!bookId && !hasBookCached,
    },
  );

  return { book: data!, isLoading };
};

export const useBookBalance = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const bookId = String(params.bookId!);

  const hasBalanceCached = useMemo(() => {
    const balanceKey = getQueryKey(api.books.getBalance, bookId, "query");

    const balanceCached = queryClient.getQueryData(balanceKey);
    return Boolean(balanceCached);
  }, [bookId]);

  const { data: balance, isLoading } = api.books.getBalance.useQuery(bookId, {
    enabled: !!bookId && !hasBalanceCached,
  });

  return { balance, isLoading };
};
