import { describe, expect, test } from "bun:test";
import { formatPhoneNumber } from "./formatters";

describe("formatPhoneNumber", () => {
  test("should return empty string for empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
  });

  test("should format input with 3 or fewer digits", () => {
    expect(formatPhoneNumber("1")).toBe("(1");
    expect(formatPhoneNumber("12")).toBe("(12");
    expect(formatPhoneNumber("123")).toBe("(123");
  });

  test("should format input with 4-6 digits", () => {
    expect(formatPhoneNumber("1234")).toBe("(123) 4");
    expect(formatPhoneNumber("12345")).toBe("(123) 45");
    expect(formatPhoneNumber("123456")).toBe("(123) 456");
  });

  test("should format input with 7-10 digits", () => {
    expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
    expect(formatPhoneNumber("12345678")).toBe("(123) 456-78");
    expect(formatPhoneNumber("123456789")).toBe("(123) 456-789");
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  test("should strip non-numeric characters", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123.456.7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("abc123def456ghi7890")).toBe("(123) 456-7890");
  });

  test("should handle excess digits by limiting to 10", () => {
    expect(formatPhoneNumber("12345678901")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("9998887776665554443")).toBe("(999) 888-7776");
  });
});
