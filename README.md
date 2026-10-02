# Bilingual Wedding Website and Mobile QA Automation

A Next.js and TypeScript wedding website for Noelle and Nathan, with English and Vietnamese content, a mobile welcome experience, a slideshow, venue directions, a wedding timeline, RSVP, and an FAQ accordion.

- [English website](https://noelle-nathan.vercel.app/)
- [Vietnamese website](https://tancuong-lamnghi.vercel.app/)
- [Automated test runs](https://github.com/noelledang/Wedding-Website-Creation/actions/workflows/mobile-qa.yml)
- [Test implementation](tests/e2e/mobile.spec.ts)
- [Case study and demonstration](docs/mobile-qa.md)

## Why automate the checks?

Changes to image filenames, language state, and navigation can disrupt the mobile guest experience. Repeating the same checks manually takes time and makes regressions easy to miss. This workflow checks both languages and records evidence for troubleshooting.

## Workflow

Every push and pull request triggers GitHub Actions. The workflow installs dependencies and browser engines, builds the website, runs Playwright tests, and uploads reports, section screenshots, and failure traces. It can also be started manually from the Actions tab.

The suite defines 24 cases: six scenarios, two languages, and two mobile browser profiles. Chromium uses a Pixel 7 profile; WebKit uses an iPhone 13 profile. These are browser emulations, not physical-device tests.

| Scenario | Coverage |
| --- | --- |
| Intro and music | Intro dismissal, selected language, saved preference, matching track, playback and pause |
| Language switching | Updated text, saved language, music source, and Vietnamese-only family section |
| Navigation | RSVP stays on the page, dress-code link reaches FAQ, and directions use the expected Maps URL |
| FAQ | Dress-code answer expands and collapses |
| Slideshow | Controls update the selected photo |
| Images and evidence | Rendered images and CSS backgrounds decode; section screenshots are attached |

## Run locally

Use Node.js 22 and npm. From the project folder:

```bash
npm ci
npx playwright install chromium webkit
npm run build
npm run test:e2e
npm run test:e2e:report
```

On Linux, install browser system dependencies with `npx playwright install --with-deps chromium webkit`.

The test runner starts the production server at `http://127.0.0.1:3000`. Stop any unrelated server on that port before testing. Use `npm run dev` for regular development.

## Inspect a GitHub run

1. Open **Actions**, then **Mobile website QA**.
2. Select a run and inspect its test step for pass/fail results.
3. Download the `mobile-qa-<run number>` artifact.
4. Extract it and open `playwright-report/index.html`. Section screenshots are attached to image-check tests. Failed tests retain screenshots, videos, and traces.

Reports expire after 14 days. The committed tests and documentation remain in the repository. Employers need access to the repository; this workflow does not change its visibility.

## Scope and limitations

Tests use the built local website, not the live deployments. Both languages are exercised through actual intro buttons. They do not verify hostname-specific metadata, desktop behavior, real-device playback, mobile backgrounding, or Google Sheets delivery. Screenshots support manual visual review; they are not automated pixel comparisons. Image decoding does not prove that crops or text placement look good.

The suite never submits an RSVP. Browser requests other than GET and HEAD are blocked as a safeguard. The existing application and RSVP implementation are unchanged.

## Validation status

The initial production build, TypeScript check, focused ESLint check, and discovery of all 24 cases succeeded. Browser execution could not be validated because browser download archives were unavailable in the implementation environment. A successful CI run is still required before claiming that the suite passes.
