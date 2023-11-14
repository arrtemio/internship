import { StatusEnum } from '../../../../entities/Task/model/types/task';
import { returnStatusColor } from './returnStatusColor';

test('should return success', () => {
    expect(returnStatusColor(StatusEnum.COMPLETED)).toEqual('success');
});
