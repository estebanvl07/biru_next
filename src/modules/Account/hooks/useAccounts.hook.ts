import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useAccounts = () => {
  const queryClient = useQueryClient();
  const hasAccountCached = useMemo(() => {
    const accountKey = getQueryKey(api.userAccount.getAll, undefined, "query");
    const accountsCache = queryClient.getQueryData(accountKey);
    return Boolean(accountsCache);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: accounts = [] } = api.userAccount.getAll.useQuery(undefined, {
    enabled: !hasAccountCached,
  });

  return { accounts };
};

export const useCurrentAccount = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const accountId = params?.acc ? Number(params?.acc) : null;

  const hasAccountCached = useMemo(() => {
    const accountKey = getQueryKey(
      api.userAccount.getOne,
      { id: accountId! },
      "query",
    );

    const accountCache = queryClient.getQueryData(accountKey);
    return Boolean(accountCache);
  }, [accountId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data } = api.userAccount.getOne.useQuery(
    {
      id: accountId!,
    },
    {
      enabled: !!accountId && !hasAccountCached,
    },
  );

  return { account: data! };
};
