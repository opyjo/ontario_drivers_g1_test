# Production launch checklist

## Required environment variables

Copy `.env.example` into the deployment provider and set every value. Never expose
`SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, or any Stripe secret to the browser.

Use live Stripe keys and live-mode price IDs only in production. `APP_URL` must be
`https://drivetest.pro` without a trailing slash. Configure this same non-`www`
origin in Supabase, Stripe, Google Search Console, Bing Webmaster Tools, and
Google Analytics.

`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, and
`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` are optional at build time, but must be set to
their site-specific production values before search reporting and analytics can
work. Set `NEXT_PUBLIC_SUPPORT_EMAIL` to a monitored public address before launch.
Do not reuse tokens or Analytics IDs from another site.

## Supabase dashboard

- Set the Auth site URL to `APP_URL` and allow `${APP_URL}/auth/callback` as a redirect URL.
- Enable leaked-password protection under Auth password security.
- Install the available Postgres security update before launch.
- Keep the three migrations in `supabase/migrations` applied in version order.

The public question tables are intentionally readable because quizzes work before
sign-in. User-owned tables remain protected by row-level security.

## Stripe dashboard

Create a webhook endpoint at `${APP_URL}/api/stripe/webhooks` and subscribe it to:

- `customer.created`
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Save its signing secret as `STRIPE_WEBHOOK_SECRET`. Configure weekly and monthly
prices as recurring prices and the lifetime price as a one-time price.

## Release verification

Run before each deployment:

```sh
npm ci
npm run check
npm run build
npm audit --audit-level=high
```

After deployment, verify sign-up, password reset, one purchase in Stripe test mode,
subscription cancellation/resumption, a full quiz submission, and one AI question.
Confirm Google Analytics receives `practice_start`, `login`, `sign_up`, and
`purchase_complete` events without email addresses, session IDs, or other personal data.

## SEO verification

- Confirm `https://drivetest.pro/robots.txt` links to the sitemap.
- Confirm every public study-guide URL appears exactly once in
  `https://drivetest.pro/sitemap.xml`.
- Confirm practice landing pages, the guide cluster, and trust/policy pages appear
  in the sitemap and are internally linked with crawlable anchors.
- Inspect the home, FAQ, pricing, AI tutor, and study-guide source for unique
  titles, descriptions, canonical URLs, and absolute social-image URLs.
- Confirm `/auth`, `/dashboard`, `/payment`, `/profile`, `/quiz`, `/settings`,
  and `/signup` responses include `X-Robots-Tag: noindex, nofollow, noarchive,
  nosnippet`.
- Confirm `https://www.drivetest.pro/...` permanently redirects to the matching
  non-`www` URL.
- Validate the Organization, WebSite, SoftwareApplication, and FAQPage JSON-LD.
- Validate BreadcrumbList, Article, and LearningResource JSON-LD on representative pages.
- Test the 1200 x 630 Open Graph image and the web manifest.
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Review `docs/CONTENT_REVIEW.md`, run `npm run content:check`, and complete any
  chapter review before its `reviewBy` date.
- Monitor Core Web Vitals in Search Console and Vercel Speed Insights after launch.
