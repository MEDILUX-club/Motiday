export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export const isStrongPassword = (value: string) => value.length >= 8;

export const isRequired = (value: string | null | undefined) => Boolean(value && value.trim());
