import cron from 'node-cron';
import { DateTime } from 'luxon';
import Task from '../models/Task';

/**Cron job to check and update overdue tasks every midnight */
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = DateTime.now().toISODate();

       const overdueTasks = await Task.updateMany(
      {
        dueDate: { $lt: currentDate },
        status: { $nin: ['overdue', 'completed'] }
      },
      {
        status: 'overdue'
      }
    );

    console.log(`Checked for overdue tasks. Updated ${overdueTasks.modifiedCount} tasks to 'overdue'.`);
  } catch (error) {
    console.error('Error updating overdue tasks:', error);
  }
});
