import demo from "./demo";
import { getTenantNameFromEnv } from "@/Helpers/Helpers";

const tenants: Record<string, any> = {
  "7pplayer": demo,
  "demo": demo,
};

export function loadTenant() {
  const tenantName = getTenantNameFromEnv();
  const config = tenants[tenantName] || tenants["7pplayer"];
  if (!config || !config.components) return {};

  const resolved: Record<string, any> = {};
  for (const [key, componentFn] of Object.entries(config.components)) {
    resolved[key] = componentFn;
  }
  return resolved;
}
