import { useState } from "react";

export const useLocalStorage = (key: string, initialValue?: string) => {
    const [storedValue, setStoredValue] = useState(initialValue ?? window.localStorage.getItem(key) ?? undefined);
    if (initialValue) {
        window.localStorage.setItem(key, initialValue);
    }
    const setValue = (value?: string) => {
        window.localStorage.setItem(key, value ?? "");
        setStoredValue(value);
    };
    return [storedValue, setValue] as const;
};
