import React, {
    FC, memo, PropsWithChildren, useMemo,
} from 'react';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getTasksError, getTasksLoading } from 'entities/Task';
import { getUserError, getUserLoading } from 'entities/User';
import { Loader } from 'shared/ui/Loader/Loader';
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage';

export const ErrorAndLoadingProvider: FC<PropsWithChildren> = memo(({ children }) => {
    const isTasksLoading = useAppSelector(getTasksLoading);
    const isUserLoading = useAppSelector(getUserLoading);
    const tasksError = useAppSelector(getTasksError);
    const userError = useAppSelector(getUserError);

    const isLoading = useMemo(() => isTasksLoading || isUserLoading, [isTasksLoading, isUserLoading]);
    const error = useMemo(() => tasksError || userError, [tasksError, userError]);

    return (
        <>
            {isLoading && <Loader isLoading={isLoading} />}
            {error && <ErrorMessage error={error} />}
            {children}
        </>
    );
});
