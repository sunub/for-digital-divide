import { useQuery } from "@tanstack/react-query";
import { getAccountsData } from "@/app/dashboard/ui/Dashboard/utils/getAccountsData";

export const accountKeys = {
  all: () => ["accounts"] as const,
};

export const useAccounts = () => {
  return useQuery({
    queryKey: accountKeys.all(),
    queryFn: () => getAccountsData(),
    staleTime: 1000 * 60 * 5,
  });
};
