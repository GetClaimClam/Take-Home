import { test, expect } from "@playwright/test";

test.describe("Case Selection", () => {
    test("cases become selected after clicking on them", async ({ page }) => {
        await page.goto("/cases");
        await page.waitForSelector('[aria-label^="Case:"]');

        const caseItems = page.locator('[aria-label^="Case:"]');
        const count = await caseItems.count();
        expect(count).toBeGreaterThan(0);

        const firstCase = caseItems.first();
        expect(await firstCase.getAttribute("aria-label")).not.toContain(
            "(Selected)"
        );

        await firstCase.click();
        expect(await firstCase.getAttribute("aria-label")).toContain(
            "(Selected)"
        );

        const checkbox = firstCase.locator('input[type="checkbox"]');
        await expect(checkbox).toBeChecked();

        await firstCase.click();
        expect(await firstCase.getAttribute("aria-label")).not.toContain(
            "(Selected)"
        );
        await expect(checkbox).not.toBeChecked();
    });

    test("multiple cases can be selected", async ({ page }) => {
        await page.goto("/cases");
        await page.waitForSelector('[aria-label^="Case:"]');

        const caseItems = page.locator('[aria-label^="Case:"]');
        const firstCase = caseItems.nth(0);
        const secondCase = caseItems.nth(1);

        await firstCase.click();
        await secondCase.click();

        expect(await firstCase.getAttribute("aria-label")).toContain(
            "(Selected)"
        );
        expect(await secondCase.getAttribute("aria-label")).toContain(
            "(Selected)"
        );

        await expect(firstCase.locator('input[type="checkbox"]')).toBeChecked();
        await expect(
            secondCase.locator('input[type="checkbox"]')
        ).toBeChecked();
    });
});
