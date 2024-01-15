import React from 'react';
import { TaskList } from 'pages/TaskList';
import { NavBar } from 'widgets/NavBar/NavBar';
import { Highcharts } from 'pages/Highcharts';
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
