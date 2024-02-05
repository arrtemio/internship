export const MessageStyle = {
    wrapper: {
        position: 'fixed',
        right: '20px',
        bottom: '20px',
    },
    alert: (isImportant: boolean) => ({
        boxShadow: isImportant ? '1px 1px 9px 0 rgba(222, 206, 142, 1)' : 'none',
        width: '100%',
        minWidth: '300px',
    }),
};
