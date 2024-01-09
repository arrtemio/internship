import { ChangeEvent, memo, useState } from 'react';
import {
    Box, Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import { createTask, createTaskDto } from 'entities/Task';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { getUserData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { FormValidator } from 'shared/lib/helpers';
import { AddTask } from 'features/Addtask/AddTask';

// import { SubmitHandler, useForm } from 'react-hook-form';
import { AddMainTaskStyle as styles } from './AddMainTask.style';

// type AddMainTaskForm = {
//     performer: string,
//     isImportant: boolean,
//     isPrivate: boolean,
// }

export const AddMainTask = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const email = useAppSelector(getUserData)?.email || '';

    // const {
    //     handleSubmit, register, formState: { errors }, reset,
    // } = useForm<AddMainTaskForm>({
    //     defaultValues: {
    //         performer: '',
    //         isImportant: false,
    //         isPrivate: false,
    //     },
    // });

    const [performer, setPerformer] = useState<string>('');
    const [performerError, setPerformerError] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isImportant, setIsImportant] = useState<boolean>(false);

    const handleChangePerformer = (event: ChangeEvent<HTMLInputElement>) => {
        if (performerError) setPerformerError('');
        setPerformer(event.target.value);
    };

    const handleChangeIsPrivate = () => {
        setIsPrivate(!isPrivate);
    };

    const handleChangeIsImportant = () => {
        setIsImportant(!isImportant);
    };

    const handlePerformerValidation = () => {
        FormValidator.emailChecking(performer, setPerformerError, true);
    };

    const createNewTask = (taskName: string) => {
        const task = createTaskDto(taskName, email, performer, isPrivate, isImportant);
        dispatch(createTask(task));

        setPerformer('');
        setIsImportant(false);
        setIsPrivate(false);
    };

    // const createNewTask = (taskName: string) => {
    //     const createData: SubmitHandler<AddMainTaskForm> = (data) => {
    //         const { performer, isImportant, isPrivate } = data;
    //         const task = createTaskDto(taskName, email, performer, isPrivate, isImportant);
    //         console.log(task);
    //         dispatch(createTask(task));
    //         reset();
    //     };
    //
    //     (handleSubmit(createData))();
    //     console.log('createNewTask');
    // };

    return (
        <Box sx={styles.wrapper}>
            <AddTask action={createNewTask} disabled={!!performerError} />
            {/* <AddTask action={createNewTask} disabled={!!errors.performer?.message} /> */}
            <Box sx={styles.inputs}>
                <TextField
                    label={t('Performer email')}
                    value={performer}
                    helperText={t(performerError) || ' '}
                    onChange={handleChangePerformer}
                    fullWidth
                    error={!!performerError}
                    onBlur={handlePerformerValidation}
                />
                {/* <TextField */}
                {/*    fullWidth */}
                {/*    label={t('Performer email')} */}
                {/*    helperText={errors.performer?.message ? t(errors.performer.message) : ' '} */}
                {/*    error={!!errors.performer?.message} */}
                {/*    {...register('performer', { */}
                {/*        pattern: { */}
                {/*            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, */}
                {/*            message: 'Must be an email', */}
                {/*        }, */}
                {/*    })} */}
                {/* /> */}
                <FormControlLabel
                    control={(
                        <Checkbox
                            value={isPrivate}
                            onChange={handleChangeIsPrivate}
                            checked={isPrivate}
                        />
                    )}
                    label={t('Private')}
                />
                {/* <FormControlLabel */}
                {/*    control={<Checkbox {...register('isPrivate')} />} */}
                {/*    label={t('Private')} */}
                {/* /> */}
                <FormControlLabel
                    control={(
                        <Checkbox
                            value={isImportant}
                            onChange={handleChangeIsImportant}
                            checked={isImportant}
                        />
                    )}
                    label={t('Important')}
                />
                {/* <FormControlLabel */}
                {/*    control={<Checkbox {...register('isImportant')} />} */}
                {/*    label={t('Important')} */}
                {/* /> */}
            </Box>
        </Box>
    );
});
