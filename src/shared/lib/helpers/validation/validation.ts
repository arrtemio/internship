export const emailChecking = (email: string, setter: (message: string) => void) => {
    if (!email.trim()) {
        setter('Field cannot be empty');
        return false;
    }
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!reg.test(email)) {
        setter('Must be an email');
        return false;
    }
    return true;
};

export const passChecking = (pass: string, setter: (message: string) => void) => {
    if (!pass.trim()) {
        setter('Field cannot be empty');
        return false;
    }
    if (pass.length < 6) {
        setter('Password must be at least 6 characters');
        return false;
    }
    return true;
};
