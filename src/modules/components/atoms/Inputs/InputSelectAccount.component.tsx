import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useMemo } from "react";
import { useAccounts, useCurrentAccount } from "~/modules/Account/hooks";

interface InputSAccountProps {
  onChange: (acc: number) => void;
  errorMessage?: string;
  hasError?: boolean;
  isRequired?: boolean;
}

export const InputSelectAccount = ({
  onChange,
  hasError,
  errorMessage,
  isRequired,
}: InputSAccountProps) => {
  const { accounts, isLoading } = useAccounts();
  const { account } = useCurrentAccount();

  return (
    <Select
      items={accounts ?? []}
      placeholder="¿De donde saldrá el dinero?"
      label="Cuenta"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-7",
        trigger: "min-h-[86px]",
        listboxWrapper: "max-h-[200px]",
      }}
      renderValue={(items) => {
        return items.map(({ data }) => (
          <div
            key={data?.id}
            className="flex flex-col rounded-xl bg-primary/10 px-4 py-2 pr-6 text-primary dark:bg-indigo-400/20 dark:text-primary-light"
          >
            <span className="font-semibold">{data?.name}</span>
            <span className="text-xs">$ {data?.balance?.toLocaleString()}</span>
          </div>
        ));
      }}
      required={isRequired}
      isRequired={isRequired}
      endContent={isLoading ? <Spinner /> : null}
      defaultSelectedKeys={account ? [`${account.id}`] : undefined}
      isInvalid={hasError}
      errorMessage={errorMessage}
    >
      {(account) => (
        <SelectItem
          color="primary"
          onClick={() => onChange(account.id)}
          key={account.id}
          className="font-montserrat dark:text-white"
          textValue={account.name}
          value={account.id}
        >
          <div className="flex flex-col px-2 py-1">
            <span className="font-medium">{account.name}</span>
            <span className="text-xs">
              $ {account.balance?.toLocaleString()}
            </span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default InputSelectAccount;
