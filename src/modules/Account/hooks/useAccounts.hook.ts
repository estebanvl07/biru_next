import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useAccounts = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const bookId = String(params?.bookId);

  const hasAccountCached = useMemo(() => {
    const accountKey = getQueryKey(
      api.userAccount.getAccountByBook,
      bookId,
      "query",
    );
    const accountsCache = queryClient.getQueryData(accountKey);
    return Boolean(accountsCache);
  }, [bookId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: accounts = [], isLoading } =
    api.userAccount.getAccountByBook.useQuery(bookId, {
      enabled: !!bookId && !hasAccountCached,
    });

  return { accounts, isLoading };
};

export const useCurrentAccount = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const bookId = String(params?.bookId);

  const hasAccountCached = useMemo(() => {
    const accountKey = getQueryKey(
      api.userAccount.getDefaultAccount,
      bookId!,
      "query",
    );

    const accountCache = queryClient.getQueryData(accountKey);
    return Boolean(accountCache);
  }, [bookId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isLoading } = api.userAccount.getDefaultAccount.useQuery(
    bookId!,
    {
      enabled: !!bookId && !hasAccountCached,
    },
  );

  return { account: data!, isLoading };
};
