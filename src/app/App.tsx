import React, { useEffect } from 'react';
import './styles/App.scss';
import { Container } from '@mui/material';
import { AddTask } from '../widgets/Addtask/ui/AddTask';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks/redux';
import { MainTask } from '../widgets/MainTask/MainTask';
import { tasksActions } from '../entities/Task/model/slice/tasksSlice';
import { StatusEnum, Task } from '../entities/Task/model/types/task';

function App() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);

    useEffect(() => {
        dispatch(tasksActions.getAllTasks());
    }, [dispatch]);

    const createTask = (title: string) => {
        const task: Task = {
            id: Date.now(),
            title,
            createdAt: Date.now(),
            status: StatusEnum.TO_DO,
            subTasks: [],
            completedAt: null,
        };
        dispatch(tasksActions.createNewTask(task));
    };

    return (
        <div className="App">
            <Container
                sx={{ mt: '20px' }}
            >
                <>
                    <AddTask action={createTask} />
                    {tasks.map((task) => (
                        <MainTask key={task.id} task={task} />
                    ))}
                </>
            </Container>
        </div>
    );
}

export default App;
