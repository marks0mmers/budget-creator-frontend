import { useState } from "react";

export const useTogglableState = (initialValue?: boolean): [boolean, () => void, () => void] => {
    const [value, setValue] = useState(initialValue ?? false);
    const turnValueOn = () => { setValue(true); };
    const turnValueOff = () => { setValue(false); };
    return [value, turnValueOn, turnValueOff];
};
