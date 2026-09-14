import * as Sentry from "@sentry/react";

const stripQuery = (value) => {
  if (!value) return value;
  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.split(/[?#]/)[0];
  }
};

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "https://53b68087ce44efcee4dbd23d873c3aef@o4512084175880192.ingest.us.sentry.io/4512084196458496",
    environment: "production",
    sendDefaultPii: false,
    enableLogs: false,
    tracesSampleRate: 0,
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb?.data?.url) breadcrumb.data.url = stripQuery(breadcrumb.data.url);
      if (breadcrumb?.data?.from) breadcrumb.data.from = stripQuery(breadcrumb.data.from);
      if (breadcrumb?.data?.to) breadcrumb.data.to = stripQuery(breadcrumb.data.to);
      return breadcrumb;
    },
    beforeSend(event) {
      delete event.user;
      if (event.request) {
        event.request.url = stripQuery(event.request.url);
        delete event.request.cookies;
        delete event.request.headers;
        delete event.request.data;
        delete event.request.query_string;
      }
      return event;
    },
  });
}
