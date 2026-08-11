# Content review process

Driving rules, licence requirements, fees, and testing procedures are reviewed at least every 90 days.

1. Open every official source in `data/study-guide-sources.json`.
2. Compare current requirements with the corresponding chapter and public guide pages.
3. Update inaccurate wording and factual examples.
4. Change `reviewedAt` to the actual review date and `reviewBy` to no more than 90 days later.
5. Run `npm run content:check`, the test suite, and the production build.

The monthly GitHub workflow fails when a review deadline has passed. A changed date must represent a completed source review, not a cosmetic freshness update.
