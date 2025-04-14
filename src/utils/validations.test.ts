import { describe, expect, test } from "bun:test";
import { validatePaymentDetails, validatePhone } from "./validations";

describe("validatePaymentDetails", () => {
    test("should return error when payment method is empty", () => {
        const result = validatePaymentDetails("", "test@example.com");
        expect(result).toEqual({
            isValid: false,
            error: "Please select a payment method.",
        });
    });

    test("should return error when payment details are empty", () => {
        const result = validatePaymentDetails("zelle", "");
        expect(result).toEqual({
            isValid: false,
            error: "Payment details cannot be empty.",
        });
    });

    test("should return error when payment details are only whitespace", () => {
        const result = validatePaymentDetails("zelle", "   ");
        expect(result).toEqual({
            isValid: false,
            error: "Payment details cannot be empty.",
        });
    });

    test("should validate email for zelle payment method", () => {
        const result = validatePaymentDetails("zelle", "invalid-email");
        expect(result).toEqual({
            isValid: false,
            error: "Please enter a valid email address.",
        });
    });

    test("should accept valid email for zelle payment method", () => {
        const result = validatePaymentDetails("zelle", "test@example.com");
        expect(result).toEqual({
            isValid: true,
            error: null,
        });
    });

    test("should accept non-email payment details for non-zelle methods", () => {
        const result = validatePaymentDetails("check", "123 Main St, City, State 12345");
        expect(result).toEqual({
            isValid: true,
            error: null,
        });
    });

    describe("email border cases", () => {
        test("should handle email with maximum length", () => {
            const longEmail = "a".repeat(64) + "@" + "b".repeat(63) + ".com";
            const result = validatePaymentDetails("amazon", longEmail);
            expect(result).toEqual({
                isValid: true,
                error: null,
            });
        });

        test("should accept email with long username", () => {
            const longEmail = "a".repeat(65) + "@example.com";
            const result = validatePaymentDetails("zelle", longEmail);
            expect(result).toEqual({
                isValid: true,
                error: null,
            });
        });

        test("should accept email with long domain", () => {
            const longDomain = "test@" + "d".repeat(64) + ".com";
            const result = validatePaymentDetails("zelle", longDomain);
            expect(result).toEqual({
                isValid: true,
                error: null,
            });
        });

        test("should handle special characters in email", () => {
            const specialEmail = "test.name+tag_123@example-site.co.uk";
            const result = validatePaymentDetails("zelle", specialEmail);
            expect(result).toEqual({
                isValid: true,
                error: null,
            });
        });

        test("should reject email with invalid TLD", () => {
            const invalidTLD = "test@example.c";
            const result = validatePaymentDetails("zelle", invalidTLD);
            expect(result).toEqual({
                isValid: false,
                error: "Please enter a valid email address.",
            });
        });

        test("should reject punycode IDN domains", () => {
            const idnDomain = "test@xn--80akhbyknj4f.xn--p1ai";
            const result = validatePaymentDetails("zelle", idnDomain);
            expect(result).toEqual({
                isValid: false,
                error: "Please enter a valid email address.",
            });
        });
    });
});

describe("validatePhone", () => {
    test("should accept valid US phone format", () => {
        const validNumber = "(123) 456-7890";
        const result = validatePhone(validNumber);
        expect(result).toEqual({ isValid: true });
    });

    test("should reject other phone formats", () => {
        const invalidFormats = [
            "+1234567890",      // international format
            "123-456-7890",     // US format without parentheses
            "(123)456-7890",    // no space after area code
            "1234567890",       // digits only
            "(123) 456 7890",   // spaces instead of hyphen
            "123 456 7890",     // spaces without parentheses
            "123",              // too short
            "12345678901234567890", // too long
            "(123) 456",        // incomplete
            "(abc) def-ghij",   // non-numeric
            "123-456#7890",     // invalid characters
            "(123) 456-789",    // missing digit
            "(12) 345-6789",    // wrong number of digits in area code
            "(1234) 567-8901",  // too many digits in area code
        ];

        invalidFormats.forEach((phone) => {
            const result = validatePhone(phone);
            expect(result).toEqual({
                isValid: false,
                error: "Phone number must be in format (XXX) XXX-XXXX",
            });
        });
    });
});
