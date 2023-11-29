import React from 'react';
import { TaskList } from 'pages/TaskList';
import { NavBar } from 'widgets/NavBar/NavBar';

function App() {
    return (
        <div className="App">
            <NavBar />
            <TaskList />
        </div>
    );
}

export default App;
