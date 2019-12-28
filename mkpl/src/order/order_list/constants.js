import { createEnum } from '../../../lib/utils';

export const StatusEnum = createEnum('APPROVED', 'IN_FLIGHT', 'COMPLETED');

export const StatusMap = {
  APPROVED: 'Future',
  COMPLETED: 'Finished',
  IN_FLIGHT: 'Running'
};
