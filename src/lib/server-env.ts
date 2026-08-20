import * as dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV ?? "development";
const IS_PRODUCTION = NODE_ENV === "production";

let hasLoaded = false;
let hasValidatedRuntimeEnv = false;

type EnvIssue = {
  name: string;
  reason: string;
  expected?: string;
};

function loadDotenvFiles() {
  if (IS_PRODUCTION) {
    // Production must not consume developer-local env files.
    dotenv.config({ path: `.env.${NODE_ENV}` });
    dotenv.config({ path: ".env" });
    return;
  }

  // Development/test: local files may override shared defaults.
  const dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    ".env.local",
    `.env.${NODE_ENV}`,
    ".env",
  ];
  for (const path of dotenvFiles) {
    dotenv.config({ path, override: path.endsWith(".local") });
  }
}

export function loadServerEnv() {
  if (hasLoaded) return;
  loadDotenvFiles();
  hasLoaded = true;
}

export function getRequiredEnv(
  name: string,
  options?: {
    requiredInProduction?: boolean;
    allowEmpty?: boolean;
  },
) {
  loadServerEnv();
  const value = process.env[name];
  const requiredInProduction = options?.requiredInProduction ?? true;
  const allowEmpty = options?.allowEmpty ?? false;
  const isMissing =
    value === undefined || (!allowEmpty && value.trim().length === 0);

  if (isMissing && requiredInProduction && IS_PRODUCTION) {
    throw new Error(
      `[env] Missing required environment variable: ${name} (NODE_ENV=${NODE_ENV})`,
    );
  }

  return value;
}

export function getOptionalEnv(name: string) {
  loadServerEnv();
  const value = process.env[name];
  if (value === undefined || value.trim().length === 0) return undefined;
  return value;
}

export function getRequiredUrlEnv(
  name: string,
  options?: {
    requiredInProduction?: boolean;
    fallback?: string;
  },
) {
  const raw =
    getRequiredEnv(name, {
      requiredInProduction: options?.requiredInProduction ?? true,
    }) ?? options?.fallback;

  if (!raw) return undefined;

  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`[env] Invalid URL in ${name}: "${raw}"`);
  }
}

export function getListEnv(name: string) {
  const value = getOptionalEnv(name);
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function isPlaceholderSecret(value: string) {
  const normalized = value.toLowerCase();
  return (
    normalized.includes("placeholder") ||
    normalized.includes("change_me") ||
    normalized.includes("your_secret_here") ||
    normalized.includes("local_dev_secret")
  );
}

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return Boolean(url.protocol && url.host);
  } catch {
    return false;
  }
}

export function validateServerRuntimeEnv() {
  if (hasValidatedRuntimeEnv) return;
  loadServerEnv();

  if (!IS_PRODUCTION) {
    hasValidatedRuntimeEnv = true;
    return;
  }

  const issues: EnvIssue[] = [];
  const addIssue = (issue: EnvIssue) => issues.push(issue);

  const authSecret = getOptionalEnv("BETTER_AUTH_SECRET");
  if (!authSecret) {
    addIssue({
      name: "BETTER_AUTH_SECRET",
      reason: "missing required secret",
      expected: "high-entropy secret (min 32 chars)",
    });
  } else if (authSecret.length < 32 || isPlaceholderSecret(authSecret)) {
    addIssue({
      name: "BETTER_AUTH_SECRET",
      reason: "weak or placeholder secret",
      expected: "high-entropy secret (min 32 chars)",
    });
  }

  const baseUrl = getOptionalEnv("BETTER_AUTH_BASE_URL");
  if (!baseUrl) {
    addIssue({
      name: "BETTER_AUTH_BASE_URL",
      reason: "missing required URL",
      expected: "https://<your-domain>",
    });
  } else if (!isValidAbsoluteUrl(baseUrl)) {
    addIssue({
      name: "BETTER_AUTH_BASE_URL",
      reason: "invalid URL format",
      expected: "https://<your-domain>",
    });
  } else if (!baseUrl.startsWith("https://")) {
    addIssue({
      name: "BETTER_AUTH_BASE_URL",
      reason: "in production base URL must use HTTPS",
      expected: "https://<your-domain>",
    });
  }

  const trustedOrigins = getListEnv("BETTER_AUTH_TRUSTED_ORIGINS");
  for (const origin of trustedOrigins) {
    if (!isValidAbsoluteUrl(origin)) {
      addIssue({
        name: "BETTER_AUTH_TRUSTED_ORIGINS",
        reason: `invalid origin value "${origin}"`,
        expected: "comma-separated absolute URLs",
      });
    }
  }

  const tursoUrl = getOptionalEnv("TURSO_DATABASE_URL");
  if (!tursoUrl) {
    addIssue({
      name: "TURSO_DATABASE_URL",
      reason: "missing database URL",
      expected: "libsql://<db-name>.turso.io or file:<path>",
    });
  }

  const tursoToken = getOptionalEnv("TURSO_AUTH_TOKEN");
  if (tursoUrl?.startsWith("libsql://") && !tursoToken) {
    addIssue({
      name: "TURSO_AUTH_TOKEN",
      reason: "missing token for libsql database URL",
      expected: "valid Turso auth token",
    });
  }

  const oauthPairs = [
    ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
    ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
  ] as const;
  for (const [idKey, secretKey] of oauthPairs) {
    const hasId = Boolean(getOptionalEnv(idKey));
    const hasSecret = Boolean(getOptionalEnv(secretKey));
    if (hasId !== hasSecret) {
      addIssue({
        name: `${idKey}/${secretKey}`,
        reason: "incomplete OAuth provider credentials",
        expected: "both variables must be set together or both omitted",
      });
    }
  }

  if (issues.length > 0) {
    console.error(
      "[env] Production runtime env validation failed",
      JSON.stringify(
        {
          environment: NODE_ENV,
          issueCount: issues.length,
          issues,
        },
        null,
        2,
      ),
    );
    throw new Error(
      `[env] Runtime validation failed with ${issues.length} issue(s). Check server logs for details.`,
    );
  }

  hasValidatedRuntimeEnv = true;
}

export { IS_PRODUCTION, NODE_ENV };
