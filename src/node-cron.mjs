import ScheduledTask from './scheduled-task.mjs'
import storage from './storage.mjs'

/**
 * @typedef {Object} CronScheduleOptions
 * @prop {boolean} [scheduled] if a scheduled task is ready and running to be
 *  performed when the time matches the cron expression.
 * @prop {string} [timezone] the timezone to execute the task in.
 */

/**
 * Creates a new task to execute the given function when the cron
 *  expression ticks.
 *
 * @param {string} expression The cron expression.
 * @param {Function} func The task to be executed.
 * @param {CronScheduleOptions} [options] A set of options for the scheduled task.
 * @returns {ScheduledTask} The scheduled task.
 */
 export const schedule = function (expression, func, options) {
    if (typeof func !== 'function') throw 'callback function must be a function';

    const task = new ScheduledTask(expression, func, options);

    storage.save(task);

    return task;
}