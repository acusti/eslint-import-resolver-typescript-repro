import type { ChangeEvent, FocusEvent } from "react";

export const submitForm = (
    event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
) => {
    const { form } = event.currentTarget;
    if (form) {
        form.requestSubmit();
    }
};
