export class FormValidator {
    static isNotEmpty(value: string, setter: (message: string) => void): boolean {
        if (!value.trim()) {
            setter('Field cannot be empty');
            return false;
        }
        return true;
    }

    static isEmail(value: string, setter: (message: string) => void): boolean {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!reg.test(value)) {
            setter('Must be an email');
            return false;
        }
        return true;
    }

    static isPassLengthCorrect(value: string, setter: (message: string) => void): boolean {
        if (value.trim().length < 6) {
            setter('Password must be at least 6 characters');
            return false;
        }
        return true;
    }

    static passChecking(pass: string, setter: (message: string) => void): boolean {
        return this.isNotEmpty(pass, setter) && this.isPassLengthCorrect(pass, setter);
    }

    static emailChecking(email: string, setter: (message: string) => void): boolean {
        return this.isNotEmpty(email, setter) && this.isEmail(email, setter);
    }

    static performerChecking(performer: string, setter: (message: string) => void): boolean {
        return !performer.trim() || this.isEmail(performer, setter);
    }
}
