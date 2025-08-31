import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the locale for all requests
    // that don't have a locale segment
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
