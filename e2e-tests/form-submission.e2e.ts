import { test, expect } from "@playwright/test";

test.describe("Form Submission", () => {
    // Commenting out form submission test as requested
    test.skip("should fill out and submit a form", async ({ page }) => {
        /* 
        // Go to homepage and select a case
        await page.goto("/cases");
        await page.waitForSelector('[id^="case-item-"]', { state: "visible" });
        
        // Select the first case
        const firstCase = page.locator('[id^="case-item-"]').first();
        await firstCase.click();
        
        // Click Continue button to proceed to the form
        await page.getByRole("button", { name: /Continue/i }).click();
        // Wait for form URL (handles both with and without trailing slash)
        await page.waitForURL(url => url.pathname === '/form/' || url.pathname === '/form');
        
        // Fill personal information section
        await page.locator("#firstName").fill("John");
        await page.locator("#middleInitial").fill("D");
        await page.locator("#lastName").fill("Doe");
        await page.locator("#address").fill("123 Test Street");
        await page.locator("#aptSuite").fill("4B");
        await page.locator("#city").fill("New York");
        await page.locator("#state").fill("NY");
        await page.locator("#zipCode").fill("10001");
        await page.locator("#phoneNumber").fill("(555) 123-4567");
        await page.locator("#emailAddress").fill("test@example.com");

        // Fill product information section
        await page.locator("#productName").fill("Test Product");
        await page.locator("#purchaseDate").fill("2023-08-15");
        await page.locator("#quantity").fill("2");
        await page.locator("#retailerName").fill("Test Store");
        await page.locator("#purchaseLocation").fill("New York, NY");

        // Select payment method
        await page.locator('#payment-method-amazon').click();

        // Fill payment details
        await page.waitForSelector('#payment-details-amazon');
        await page.locator('#payment-details-amazon').fill("test@example.com");

        // Add signature using pointer events
        const canvas = page.locator("canvas");
        await canvas.waitFor({ state: "visible" });
        
        const box = await canvas.boundingBox();
        if (!box) throw new Error("Cannot find canvas element");

        // Clear canvas and add signature
        await page.evaluate(() => {
            const canvas = document.querySelector("canvas");
            if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
        });

        // Draw signature
        await page.locator("canvas").hover();
        await page.mouse.down();
        
        const points = [
            { x: box.x + 50, y: box.y + 50 },
            { x: box.x + 100, y: box.y + 30 },
            { x: box.x + 150, y: box.y + 50 },
            { x: box.x + 200, y: box.y + 40 },
        ];

        for (const point of points) {
            await page.mouse.move(point.x, point.y, { steps: 5 });
        }
        
        await page.mouse.up();
        await page.waitForTimeout(500);

        // Check communication consent checkbox
        await page.waitForSelector("#communication-consent-checkbox", { state: "visible", timeout: 10000 });
        await page.locator("#communication-consent-checkbox").click();
        
        // Take a screenshot before submission
        await page.screenshot({ path: 'test-results/before-submit.png' });
        
        // Find and click the Next Claim button by its text content
        await page.waitForSelector('button:has-text("Next Claim")', { state: "visible", timeout: 10000 });
        await page.locator('button:has-text("Next Claim")').click();
        
        // Wait a moment for the form navigation to process
        await page.waitForTimeout(1000);
        
        // Success! Test passes if we reach this point
        */
    });
});
