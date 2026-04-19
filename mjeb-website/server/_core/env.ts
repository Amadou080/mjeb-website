export const ENV = {
  appId: (() => {
    const value = process.env.VITE_APP_ID;
    if (!value) {
      throw new Error("Variable d'environnement manquante: VITE_APP_ID");
    }
    return value;
  })(),
  cookieSecret: (() => {
    const value = process.env.JWT_SECRET;
    if (!value) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Variable d'environnement requise en production: JWT_SECRET");
      }
      return "dev-secret-only-for-development";
    }
    if (value.length < 32) {
      throw new Error("JWT_SECRET doit contenir au moins 32 caractères");
    }
    return value;
  })(),
  databaseUrl: (() => {
    const value = process.env.DATABASE_URL;
    if (!value) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Variable d'environnement requise en production: DATABASE_URL");
      }
      return "file:./sqlite.db";
    }
    return value;
  })(),
  oAuthServerUrl: (() => {
    const value = process.env.OAUTH_SERVER_URL;
    if (!value) {
      throw new Error("Variable d'environnement manquante: OAUTH_SERVER_URL");
    }
    return value;
  })(),
  ownerOpenId: (() => {
    const value = process.env.OWNER_OPEN_ID;
    if (!value) {
      throw new Error("Variable d'environnement manquante: OWNER_OPEN_ID");
    }
    return value;
  })(),
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
