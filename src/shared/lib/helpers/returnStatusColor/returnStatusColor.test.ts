import { StatusEnum } from '../../../../entities/Task';
import { returnStatusColor } from './returnStatusColor';

test('should return success', () => {
    expect(returnStatusColor(StatusEnum.COMPLETED)).toEqual('success');
});
