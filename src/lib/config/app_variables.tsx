import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export const getCurrentBookId = (): string => {
  const params = useParams();
  return String(params?.bookId);
};

export const getCurrentUserId = () => {
  const { data: session } = useSession();
  return session?.user?.id || null;
};
