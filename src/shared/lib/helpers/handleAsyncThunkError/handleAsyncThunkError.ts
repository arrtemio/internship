export const handleAsyncThunkError = (error: any) => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};
