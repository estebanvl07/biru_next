import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export const getCurrentBookId = () => {
  const params = useParams();
  return params?.bookId || null;
};

export const getCurrentUserId = () => {
  const { data: session } = useSession();
  return session?.user?.id || null;
};
