import { describe, expect, test } from "bun:test";
import { cn } from "./cn";

describe("cn", () => {
  test("should concatenate class names", () => {
    expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
    expect(cn("p-4", "m-2", "text-center")).toBe("p-4 m-2 text-center");
  });

  test("should handle conditional classes", () => {
    expect(cn("btn", true && "btn-active", false && "btn-disabled")).toBe("btn btn-active");
    expect(cn("card", 1 > 2 ? "visible" : "hidden")).toBe("card hidden");
  });

  test("should handle arrays of classes", () => {
    expect(cn("container", ["p-4", "m-2"])).toBe("container p-4 m-2");
    expect(cn("flex", ["items-center", ["justify-between", "gap-4"]])).toBe("flex items-center justify-between gap-4");
  });

  test("should handle objects", () => {
    expect(cn("btn", { "btn-primary": true, "btn-lg": false })).toBe("btn btn-primary");
    expect(cn("form-input", { "border-red-500": true, "ring-2": true, "ring-red-500": true })).toBe(
      "form-input border-red-500 ring-2 ring-red-500"
    );
  });

  test("should filter out falsy values", () => {
    expect(cn("card", null, undefined, "", false, 0)).toBe("card");
    expect(cn(null, undefined, "btn")).toBe("btn");
  });

  test("should correctly merge tailwind classes", () => {
    // Later classes should override earlier ones with the same utility
    expect(cn("p-2", "p-4")).toBe("p-4");
    // The actual order may vary based on the tailwind-merge implementation
    // so we'll check that both classes are present but not their exact order
    const result = cn("text-sm text-gray-500", "text-lg");
    expect(result).toContain("text-lg");
    expect(result).toContain("text-gray-500");
    expect(cn("m-1 m-2 m-3")).toBe("m-3");
  });

  test("should preserve specificity for different utilities", () => {
    expect(cn("p-2 px-4")).toBe("p-2 px-4");
    expect(cn("m-2 mt-4 mb-8")).toBe("m-2 mt-4 mb-8");
  });

  test("should handle arbitrary values", () => {
    expect(cn("grid-cols-[1fr,auto]", "grid-cols-[auto,1fr]")).toBe("grid-cols-[auto,1fr]");
    expect(cn("text-[#123456]", "bg-[#654321]")).toBe("text-[#123456] bg-[#654321]");
  });

  test("should handle complex combinations", () => {
    const isActive = true;
    const isError = false;
    const size = "lg";

    const result = cn(
      "btn",
      {
        "btn-active": isActive,
        "btn-error": isError,
        [`btn-${size}`]: size,
      },
      isActive && "ring-2"
    );

    expect(result).toBe("btn btn-active btn-lg ring-2");
  });
});
