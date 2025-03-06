// ???
export type ListMenu = {
  label: string;
  href?: string;
  showLine?: boolean;
  component?: React.ReactElement;
  icon?: string;
  onClick?: () => void;
};

export interface createDialogFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditDialogFormProps<T> {
  data: T;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
