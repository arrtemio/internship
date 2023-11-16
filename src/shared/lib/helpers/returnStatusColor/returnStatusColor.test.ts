import { Status } from 'entities/Task';
import { returnStatusColor } from './returnStatusColor';

test('should return success', () => {
    expect(returnStatusColor(Status.COMPLETED)).toEqual('success');
});
