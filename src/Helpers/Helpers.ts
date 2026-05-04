export function getTenantNameFromEnv(): string {
  // Can also read from subdomain, but for now we fallback to the env variable
  return import.meta.env.VITE_TENANT_ID || "demo";
}
