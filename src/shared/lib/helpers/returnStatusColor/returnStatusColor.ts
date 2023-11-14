import { StatusEnum } from '../../../../entities/Task';

export const returnStatusColor = (value: StatusEnum): 'success' | 'primary' | 'secondary' => {
    let color: 'success' | 'primary' | 'secondary';

    color = value === StatusEnum.COMPLETED
        ? 'success'
        : value === StatusEnum.IN_PROGRESS
            ? 'secondary'
            : 'primary';

    return color;
};
