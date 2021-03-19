import { useState } from "react";

export const useToggleableState = (initialValue?: boolean): [boolean, () => void, () => void] => {
    const [value, setValue] = useState(initialValue ?? false);
    const turnValueOn = () => { setValue(true); };
    const turnValueOff = () => { setValue(false); };
    return [value, turnValueOn, turnValueOff];
};
