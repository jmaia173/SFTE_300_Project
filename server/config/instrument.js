// config/instrument.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://815b7a82f3fb97021b87f7867111b777@o4510358702981120.ingest.us.sentry.io/4510358711304192",
  sendDefaultPii: true,
  tracesSampleRate: 1.0, // optional: collect performance traces
  integrations: [
    Sentry.mongooseIntegration(), // works only in v8+
  ],
});

console.log("✅ Sentry initialized");
export default Sentry;
