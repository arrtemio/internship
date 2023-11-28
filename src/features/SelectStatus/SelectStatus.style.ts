import { statusColors } from 'styles/style';
import { Status } from 'entities/Task';

export const SelectStatusStyle = {
    form: {
        m: 1,
        minWidth: 120,
    },
    select: (value: Status) => ({
        fontSize: 'small',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: statusColors[value],
        },
    }),
};
