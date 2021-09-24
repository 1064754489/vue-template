import { getRequest } from "@/plugins/axios";

export function getStatistics(data) {
  return getRequest("api/home/countStatistics", data);
}
