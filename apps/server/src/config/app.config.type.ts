export type AppConfig = {
  nodeEnv: string;

  appName: string;
  appPort: number;

  apiPrefix: string;
  pwd: string;

  frontendDomain: string;
  backendDomain: string;

  fallbackLanguage: string;
  headerLanguage: string;
};
