import React from 'react';
import { NavBar } from 'widgets/NavBar/NavBar';
import { AppRouter } from './providers/router';

function App() {
    return (
        <div>
            <NavBar />
            <AppRouter />
        </div>
    );
}

export default App;
