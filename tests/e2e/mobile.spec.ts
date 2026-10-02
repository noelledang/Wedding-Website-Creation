import { test, expect, type Page } from '@playwright/test';

const languages = [
  { code: 'eng', entry: 'English', details: 'The Details', question: 'What should I wear?', answer: 'Our dress code is Formal / Garden Elegant.', other: 'VN', next: 'viet', nextDetails: 'Chi Tiết' },
  { code: 'viet', entry: 'Tiếng Việt', details: 'Chi Tiết', question: 'Tôi nên mặc gì?', answer: 'Trang phục được yêu cầu là Trang trọng', other: 'US', next: 'eng', nextDetails: 'The Details' },
] as const;

async function enter(page: Page, entry: string) {
  await page.goto('/');
  await page.getByRole('button', { name: entry, exact: true }).click();
  await expect(page.getByRole('button', { name: entry, exact: true })).toHaveCount(0);
}

test.beforeEach(async ({ page }) => {
  // No test can submit an RSVP, upload a file, or write to the live sheet.
  await page.route('**/*', async route => {
    if (!['GET', 'HEAD'].includes(route.request().method())) {
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });
});

for (const language of languages) {
  test.describe(language.code, () => {
    test('intro selects language, starts the selected track, and preserves language on reload', async ({ page }) => {
      await page.goto('/');
      expect(await page.evaluate(() => Boolean(window.__weddingAudio))).toBe(false);
      await page.getByRole('button', { name: language.entry, exact: true }).click();
      await expect(page.getByRole('button', { name: language.entry, exact: true })).toHaveCount(0);
      await expect(page.locator('#mobile-details h2')).toHaveText(language.details);
      expect(await page.evaluate(() => localStorage.getItem('wedding-language'))).toBe(language.code);
      const track = language.code === 'eng' ? '/music/wedding-song-eng.mp3' : '/music/wedding-song.mp3';
      await expect.poll(() => page.evaluate(() => window.__weddingAudio?.src)).toContain(track);
      await expect.poll(() => page.evaluate(() => window.__weddingAudio?.paused)).toBe(false);
      await page.getByRole('button', { name: 'Turn music off', exact: true }).click();
      await expect.poll(() => page.evaluate(() => window.__weddingAudio?.paused)).toBe(true);
      await page.reload();
      await expect(page.locator('#mobile-details h2')).toHaveText(language.details);
      // Current product behavior shows the mobile intro again after reload.
      await expect(page.getByRole('button', { name: language.entry, exact: true })).toBeVisible();
    });

    test('language switch updates text, family visibility, and music source', async ({ page }) => {
      await enter(page, language.entry);
      await expect(page.locator('#mobile-family')).toHaveCount(language.code === 'viet' ? 1 : 0);
      await page.getByRole('button', { name: language.other, exact: true }).click();
      await expect(page.locator('#mobile-details h2')).toHaveText(language.nextDetails);
      await expect(page.locator('#mobile-family')).toHaveCount(language.next === 'viet' ? 1 : 0);
      expect(await page.evaluate(() => localStorage.getItem('wedding-language'))).toBe(language.next);
      const track = language.next === 'eng' ? '/music/wedding-song-eng.mp3' : '/music/wedding-song.mp3';
      await expect.poll(() => page.evaluate(() => window.__weddingAudio?.src)).toContain(track);
    });

    test('RSVP and dress-code links stay within the mobile page', async ({ page }) => {
      await enter(page, language.entry);
      await page.locator('a[href="#mobile-rsvp"]').click();
      await expect(page).toHaveURL(/\/#mobile-rsvp$/);
      await expect(page.locator('#mobile-rsvp')).toBeInViewport();
      await expect(page.getByRole('button', { name: language.entry, exact: true })).toHaveCount(0);
      await page.locator('#mobile-details a[href="#what-should-i-wear"]').click();
      await expect(page).toHaveURL(/\/#what-should-i-wear$/);
      await expect(page.locator('#what-should-i-wear')).toBeInViewport();
      const directions = page.locator('#mobile-venue a');
      await expect(directions).toHaveAttribute('href', /https:\/\/www.google.com\/maps\/search\/.*Ocean\+Villas/);
      await expect(directions).toHaveAttribute('target', '_blank');
    });

    test('FAQ dress-code answer opens and closes', async ({ page }) => {
      await enter(page, language.entry);
      const item = page.locator('#what-should-i-wear');
      const toggle = item.getByRole('button', { name: language.question, exact: true });
      const panel = item.locator('div.grid');
      await expect(panel).toHaveClass(/opacity-0/);
      await toggle.click();
      await expect(panel).toHaveClass(/opacity-100/);
      await expect(panel).toContainText(language.answer);
      await expect.poll(() => panel.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(50);
      await toggle.click();
      await expect(panel).toHaveClass(/opacity-0/);
      await expect.poll(() => panel.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(1);
    });

    test('slideshow controls select photos', async ({ page }) => {
      await enter(page, language.entry);
      const slideshow = page.locator('#mobile-home');
      const second = slideshow.getByRole('button', { name: 'Show photo 2', exact: true });
      await second.click();
      await expect(second).toHaveAttribute('aria-current', 'true');
      await expect(slideshow.locator('img[src="/wedding-gallery/Picture 5.JPG"]')).toHaveClass(/opacity-100/);
      const first = slideshow.getByRole('button', { name: 'Show photo 1', exact: true });
      await first.click();
      await expect(first).toHaveAttribute('aria-current', 'true');
    });

    test('mobile images and CSS backgrounds load, with section screenshots', async ({ page }, testInfo) => {
      const runtimeErrors: string[] = [];
      page.on('pageerror', error => runtimeErrors.push(error.message));
      await enter(page, language.entry);
      const heroPath = testInfo.outputPath(`${language.code}-mobile-hero.png`);
      await page.locator('main > section').first().screenshot({ path: heroPath, animations: 'disabled' });
      await testInfo.attach('mobile-hero', { path: heroPath, contentType: 'image/png' });
      const ids = ['mobile-home', 'mobile-details', ...(language.code === 'viet' ? ['mobile-family'] : []), 'mobile-venue', 'mobile-schedule', 'mobile-rsvp', 'mobile-faq', 'mobile-thank-you'];
      await expect(page.locator('#mobile-gallery')).toBeHidden();
      for (const id of ids) {
        const section = page.locator(`#${id}`);
        await expect(section).toBeVisible();
        await section.scrollIntoViewIfNeeded();
        const path = testInfo.outputPath(`${language.code}-${id}.png`);
        await section.screenshot({ path, animations: 'disabled' });
        await testInfo.attach(id, { path, contentType: 'image/png' });
      }
      // Include rendered img elements and CSS backgrounds. Hidden desktop assets
      // are excluded; opacity-zero slideshow photos are still checked.
      const urls = await page.locator('body').evaluate(body => {
        const assets = new Set<string>();
        for (const element of body.querySelectorAll('*')) {
          if (!element.getClientRects().length || getComputedStyle(element).visibility === 'hidden') continue;
          if (element instanceof HTMLImageElement && element.src) assets.add(element.src);
          for (const match of getComputedStyle(element).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)) {
            assets.add(new URL(match[1], location.href).href);
          }
        }
        return [...assets];
      });
      expect(urls.length, 'Expected mobile image and background coverage').toBeGreaterThan(10);
      const broken = await page.evaluate(async sources => {
        const results = await Promise.all(sources.map(src => new Promise<string | null>(resolve => {
          const image = new Image();
          const timer = setTimeout(() => resolve(src), 10_000);
          image.onload = () => { clearTimeout(timer); resolve(image.naturalWidth > 0 ? null : src); };
          image.onerror = () => { clearTimeout(timer); resolve(src); };
          image.src = src;
        })));
        return results.filter(Boolean);
      }, urls);
      await testInfo.attach('checked-image-urls', { body: JSON.stringify(urls, null, 2), contentType: 'application/json' });
      expect(broken, 'Missing or undecodable mobile assets').toEqual([]);
      expect(runtimeErrors, 'Uncaught errors during the mobile page visit').toEqual([]);
    });
  });
}
