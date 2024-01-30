import { Messages } from 'entities/Task';

export const getPermission = () => {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            return;
        }
        if (Notification.permission === 'default' || Notification.permission === 'denied') {
            Notification.requestPermission();
        }
    }
};

export const notification = (text: string, isImportant: boolean) => (
    new Notification(Messages.NEW_TASK, {
        body: text,
        silent: !isImportant,
    })
);
