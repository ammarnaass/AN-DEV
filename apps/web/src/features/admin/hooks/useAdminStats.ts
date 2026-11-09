import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";

export function useAdminStats(enabled = true) {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: adminService.getStats,
    enabled,
  });
}
