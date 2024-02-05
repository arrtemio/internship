import { Messages } from 'entities/Task';

export const getPermission = () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
};

export const notification = (text: string, isImportant: boolean) => (
    new Notification(Messages.NEW_TASK, {
        body: text,
        silent: !isImportant,
    })
);
