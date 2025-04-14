export const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 3) {
        return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 6) {
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
            6,
            10
        )}`;
    }
};
