# Mobile QA automation case study

## Problem

The wedding website has two languages and several mobile interactions. Manual checks must be repeated after changes, particularly around image paths, saved language preferences, and navigation. A regression can prevent guests from finding information even when the page loads.

## Implementation

Playwright tests the production build using six scenarios in English and Vietnamese, on Chromium and WebKit mobile profiles. GitHub Actions runs the 24 cases on pushes and pull requests, and supports manual execution.

Functional assertions check guest-visible behavior. Asset checks inspect rendered image sources and CSS background URLs, decode each asset, and report missing assets by URL. Section screenshots support human visual review. HTML and JSON reports, screenshots, videos, and failure traces provide troubleshooting evidence.

No application code was changed. Tests do not submit the RSVP form. A browser request guard blocks methods other than GET and HEAD to prevent accidental writes.

## Files to review

| File | Purpose |
| --- | --- |
| `tests/e2e/mobile.spec.ts` | Guest interaction checks and image diagnostics |
| `playwright.config.ts` | Mobile profiles, production server, reports, failure evidence |
| `.github/workflows/mobile-qa.yml` | Build, browser installation, tests, report upload |
| `package.json` | Commands to run tests and view reports |

## Demonstrate detection and recovery

Use a temporary branch. A deployed website is not required.

1. Run the complete suite and save its baseline report. Resolve real failures before treating it as a passing baseline.
2. Temporarily change `/images/slideshow-mobile.png` to `/images/slideshow-missing-demo.png` in `app/components/MobileSlideshow.tsx`.
3. Rebuild with `npm run build`, then run `npm run test:e2e -- --grep "mobile images"`.
4. Open the report. Show the missing-image assertion and affected section screenshot.
5. Restore the correct path, rebuild, and rerun the same checks.
6. Show the recovered result. Keep the intentionally broken change out of main.

Once published, show a GitHub Actions run, its trigger, test log, and downloadable report. The workflow reports failures; it does not repair them or block merging unless branch protection is configured separately.

## Evidence and measurements

Record actual results after successful execution:

- Commit SHA and GitHub run URL.
- Passed, failed, and retried case counts.
- Full run duration.
- Evidence from the controlled broken-image exercise.
- Manual checking time before and after, measured with the same checklist.

Do not claim time savings, defect counts, or a passing browser run until measured. Initial build, TypeScript, focused lint, and discovery of 24 cases passed. Browser downloads were unavailable, so browser results remain pending.

## Interview explanation

“I added a repeatable mobile QA workflow to my bilingual wedding website. It checks language selection, audio state, navigation, FAQ behavior, slideshow controls, and image loading. Each code push runs the tests in GitHub Actions and produces evidence for troubleshooting. I kept visual review separate from functional assertions and prevented tests from writing to the live RSVP system.”

## Future work

Useful extensions include approved screenshot baselines, live deployment smoke checks, hostname-specific metadata checks, and physical-device audio verification. These are future work, not current coverage.
