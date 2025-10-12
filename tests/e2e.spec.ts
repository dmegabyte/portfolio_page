
import { test, expect, Page } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { projects } from '../data/projects';

// --- Helper Functions ---

/**
 * Checks for any visually overlapping elements on the page.
 * This is a powerful check to catch layout bugs automatically.
 */
async function checkOverlappingElements(page: Page) {
  const overlappingElements = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('body *'));
    const overlappingPairs = [];
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const rect1 = elements[i].getBoundingClientRect();
        const rect2 = elements[j].getBoundingClientRect();
        const isOverlapping = !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );
        if (isOverlapping && elements[i].textContent && elements[j].textContent) {
           // Filter out insignificant overlaps (e.g., parent/child)
           if (!elements[i].contains(elements[j]) && !elements[j].contains(elements[i])) {
               overlappingPairs.push({
                   element1: elements[i].outerHTML,
                   element2: elements[j].outerHTML,
               });
           }
        }
      }
    }
    return overlappingPairs;
  });

  expect(overlappingElements, `Found ${overlappingElements.length} overlapping elements. Check the test report for details.`).toEqual([]);
}

/**
 * Checks all images on the page to ensure they are loaded correctly.
 */
async function checkImageIntegrity(page: Page) {
    const brokenImages = await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('img'));
        const broken = [];
        for (const img of images) {
            if (img.naturalWidth === 0 && img.src) {
                broken.push(img.src);
            }
            try {
                const response = await fetch(img.src);
                if (!response.ok) {
                    broken.push(`${img.src} (status: ${response.status})`);
                }
            } catch (e) {
                broken.push(`${img.src} (fetch failed)`);
            }
        }
        return broken;
    });
    expect(brokenImages, `Found ${brokenImages.length} broken images.`).toEqual([]);
}

/**
 * Checks all anchor links on the page to ensure they are not broken.
 */
async function checkLinkIntegrity(page: Page) {
    const links = await page.locator('a').evaluateAll(list => list.map(el => el.href));
    for (const link of links) {
        if (!link || link.startsWith('mailto:') || link.includes('#')) continue; // Skip mail and hash links for this simple check
        try {
            const response = await page.request.get(link);
            expect(response.ok(), `Link ${link} is broken (status: ${response.status()})`).toBe(true);
        } catch (e) {
            console.warn(`Could not check link ${link}: ${e.message}`);
        }
    }
}


// --- Test Suite ---

test.describe('Portfolio E2E Health Check', () => {
  const pagesToTest = [
    { name: 'HomePage', path: '/' },
    { name: 'AboutPage', path: '/#/about' },
    { name: 'ContactPage', path: '/#/contact' },
    ...projects.map(p => ({ name: `Project: ${p.title}`, path: `/#/project/${p.slug}` })),
    ...projects.filter(p => p.documentationPage).map(p => ({ name: `Documentation: ${p.title}`, path: `/#${p.documentationPage}` })),
  ];

  for (const pageInfo of pagesToTest) {
    test(`Page: ${pageInfo.name}`, async ({ page }) => {
      await page.goto(pageInfo.path, { waitUntil: 'networkidle' });

      // 1. Accessibility Check
      await test.step('Run accessibility audit', async () => {
        await injectAxe(page);
        await checkA11y(page, undefined, {
          detailedReport: true,
          detailedReportOptions: { html: true },
        });
      });

      // 2. Visual Regression Check
      await test.step('Take and compare screenshot', async () => {
        // Hide dynamic elements if necessary, e.g., animations or dates
        // await page.locator('.date-element').evaluate(el => el.style.visibility = 'hidden');
        await expect(page).toHaveScreenshot(`${pageInfo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`, {
            fullPage: true,
            maxDiffPixels: 100 // Allow for minor rendering differences
        });
      });
      
      // 3. Image Integrity Check
      await test.step('Check for broken images', async () => {
        await checkImageIntegrity(page);
      });

      // 4. Layout Integrity Check
      await test.step('Check for overlapping elements', async () => {
        await checkOverlappingElements(page);
      });
      
      // 5. Link Integrity (optional, can be slow)
      // Uncomment if you want to check all external links on every run
      // await test.step('Check for broken links', async () => {
      //   await checkLinkIntegrity(page);
      // });
    });
  }
});
