import React, { memo, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { checkIsAuth, getUserIsAuth } from 'entities/User';
import { Loader } from 'shared/ui/Loader/Loader';
import { authRoutes, unAuthRoutes } from './router';

export const AppRouter = memo(() => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getUserIsAuth);

    useEffect(() => {
        dispatch(checkIsAuth());
    }, [dispatch]);

    return (
        <Routes>
            {isAuth
                ? (
                    authRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={(
                                <Suspense fallback={<Loader isLoading />}>
                                    {route.element}
                                </Suspense>
                            )}
                        />
                    ))
                )
                : (
                    unAuthRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={(
                                <Suspense fallback={<Loader isLoading />}>
                                    {route.element}
                                </Suspense>
                            )}
                        />
                    ))
                )}
        </Routes>
    );
});
