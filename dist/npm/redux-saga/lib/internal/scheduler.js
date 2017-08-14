"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asap = asap;
exports.suspend = suspend;
exports.flush = flush;

var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    flush();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  if (!semaphore) {
    exec(task);
  } else {
    queue.push(task);
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  semaphore--;
  if (!semaphore && queue.length) {
    exec(queue.shift());
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImFzYXAiLCJzdXNwZW5kIiwiZmx1c2giLCJxdWV1ZSIsInNlbWFwaG9yZSIsImV4ZWMiLCJ0YXNrIiwicHVzaCIsImxlbmd0aCIsInNoaWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQUQsUUFBUUUsSUFBUixHQUFlQSxJQUFmO0FBQ0FGLFFBQVFHLE9BQVIsR0FBa0JBLE9BQWxCO0FBQ0FILFFBQVFJLEtBQVIsR0FBZ0JBLEtBQWhCOztBQUVBLElBQUlDLFFBQVEsRUFBWjtBQUNBOzs7Ozs7O0FBT0EsSUFBSUMsWUFBWSxDQUFoQjs7QUFFQTs7Ozs7QUFLQSxTQUFTQyxJQUFULENBQWNDLElBQWQsRUFBb0I7QUFDbEIsTUFBSTtBQUNGTDtBQUNBSztBQUNELEdBSEQsU0FHVTtBQUNSSjtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdBLFNBQVNGLElBQVQsQ0FBY00sSUFBZCxFQUFvQjtBQUNsQixNQUFJLENBQUNGLFNBQUwsRUFBZ0I7QUFDZEMsU0FBS0MsSUFBTDtBQUNELEdBRkQsTUFFTztBQUNMSCxVQUFNSSxJQUFOLENBQVdELElBQVg7QUFDRDtBQUNGOztBQUVEOzs7O0FBSUEsU0FBU0wsT0FBVCxHQUFtQjtBQUNqQkc7QUFDRDs7QUFFRDs7O0FBR0EsU0FBU0YsS0FBVCxHQUFpQjtBQUNmRTtBQUNBLE1BQUksQ0FBQ0EsU0FBRCxJQUFjRCxNQUFNSyxNQUF4QixFQUFnQztBQUM5QkgsU0FBS0YsTUFBTU0sS0FBTixFQUFMO0FBQ0Q7QUFDRiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFzYXAgPSBhc2FwO1xuZXhwb3J0cy5zdXNwZW5kID0gc3VzcGVuZDtcbmV4cG9ydHMuZmx1c2ggPSBmbHVzaDtcblxudmFyIHF1ZXVlID0gW107XG4vKipcclxuICBWYXJpYWJsZSB0byBob2xkIGEgY291bnRpbmcgc2VtYXBob3JlXHJcbiAgLSBJbmNyZW1lbnRpbmcgYWRkcyBhIGxvY2sgYW5kIHB1dHMgdGhlIHNjaGVkdWxlciBpbiBhIGBzdXNwZW5kZWRgIHN0YXRlIChpZiBpdCdzIG5vdFxyXG4gICAgYWxyZWFkeSBzdXNwZW5kZWQpXHJcbiAgLSBEZWNyZW1lbnRpbmcgcmVsZWFzZXMgYSBsb2NrLiBaZXJvIGxvY2tzIHB1dHMgdGhlIHNjaGVkdWxlciBpbiBhIGByZWxlYXNlZGAgc3RhdGUuIFRoaXNcclxuICAgIHRyaWdnZXJzIGZsdXNoaW5nIHRoZSBxdWV1ZWQgdGFza3MuXHJcbioqL1xudmFyIHNlbWFwaG9yZSA9IDA7XG5cbi8qKlxyXG4gIEV4ZWN1dGVzIGEgdGFzayAnYXRvbWljYWxseScuIFRhc2tzIHNjaGVkdWxlZCBkdXJpbmcgdGhpcyBleGVjdXRpb24gd2lsbCBiZSBxdWV1ZWRcclxuICBhbmQgZmx1c2hlZCBhZnRlciB0aGlzIHRhc2sgaGFzIGZpbmlzaGVkIChhc3N1bWluZyB0aGUgc2NoZWR1bGVyIGVuZHVwIGluIGEgcmVsZWFzZWRcclxuICBzdGF0ZSkuXHJcbioqL1xuZnVuY3Rpb24gZXhlYyh0YXNrKSB7XG4gIHRyeSB7XG4gICAgc3VzcGVuZCgpO1xuICAgIHRhc2soKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBmbHVzaCgpO1xuICB9XG59XG5cbi8qKlxyXG4gIEV4ZWN1dGVzIG9yIHF1ZXVlcyBhIHRhc2sgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiB0aGUgc2NoZWR1bGVyIChgc3VzcGVuZGVkYCBvciBgcmVsZWFzZWRgKVxyXG4qKi9cbmZ1bmN0aW9uIGFzYXAodGFzaykge1xuICBpZiAoIXNlbWFwaG9yZSkge1xuICAgIGV4ZWModGFzayk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWUucHVzaCh0YXNrKTtcbiAgfVxufVxuXG4vKipcclxuICBQdXRzIHRoZSBzY2hlZHVsZXIgaW4gYSBgc3VzcGVuZGVkYCBzdGF0ZS4gU2NoZWR1bGVkIHRhc2tzIHdpbGwgYmUgcXVldWVkIHVudGlsIHRoZVxyXG4gIHNjaGVkdWxlciBpcyByZWxlYXNlZC5cclxuKiovXG5mdW5jdGlvbiBzdXNwZW5kKCkge1xuICBzZW1hcGhvcmUrKztcbn1cblxuLyoqXHJcbiAgUmVsZWFzZXMgdGhlIGN1cnJlbnQgbG9jay4gRXhlY3V0ZXMgYWxsIHF1ZXVlZCB0YXNrcyBpZiB0aGUgc2NoZWR1bGVyIGlzIGluIHRoZSByZWxlYXNlZCBzdGF0ZS5cclxuKiovXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgc2VtYXBob3JlLS07XG4gIGlmICghc2VtYXBob3JlICYmIHF1ZXVlLmxlbmd0aCkge1xuICAgIGV4ZWMocXVldWUuc2hpZnQoKSk7XG4gIH1cbn0iXX0=