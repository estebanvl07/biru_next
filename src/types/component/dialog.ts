export interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  classNames?: {
    main?: string;
    content?: string;
    title?: string;
    subtitle?: string;
    overlayer?: string;
    header?: string;
  };
}
