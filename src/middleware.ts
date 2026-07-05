import { NextResponse, type NextRequest } from "next/server";

/**
 * HOLDING MODE — pre-launch switch.
 *
 * With HOLDING_PAGE=true in the runtime environment (set it as a Netlify
 * site environment variable, all scopes), every page serves /coming-soon
 * while the full site is finished — so the domain can sit in client-site
 * footer credits today. Remove the variable and redeploy to launch.
 *
 * Local dev is unaffected (the variable is normally unset). To preview
 * holding mode locally: HOLDING_PAGE=true npm run dev
 */
export function middleware(request: NextRequest) {
  if (process.env.HOLDING_PAGE !== "true") return NextResponse.next();

  // Secret preview bypass (owner only): visiting any URL once with
  // ?preview=<PREVIEW_TOKEN> sets a week-long cookie; that browser then sees
  // the full site while everyone else stays on the holding page. Rotate or
  // unset PREVIEW_TOKEN in the Netlify env to revoke all preview access.
  const token = process.env.PREVIEW_TOKEN;
  if (token) {
    const url = request.nextUrl;
    if (url.searchParams.get("preview") === token) {
      const clean = url.clone();
      clean.searchParams.delete("preview");
      const res = NextResponse.redirect(clean);
      res.cookies.set("nr-preview", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
    if (request.cookies.get("nr-preview")?.value === token) {
      return NextResponse.next();
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  // STRICT ALLOWLIST — everything not named here is rewritten to the holding
  // page while HOLDING_PAGE=true, including direct file URLs (/assets/* holds
  // client-site captures that must not be reachable pre-launch) and
  // /sitemap.xml (its route list names client case studies). The only paths
  // that pass through are what the holding page itself needs: Next internals,
  // the Netlify form target, the favicon, the grain texture, the logo (linked
  // from the Organization schema) and a valid robots.txt.
  matcher: [
    "/((?!coming-soon|_next|__forms\\.html|favicon\\.svg|grain\\.svg|logo\\.svg|nr-monogram-white\\.svg|robots\\.txt).*)",
  ],
};
