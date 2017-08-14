"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _io = require('./internal/io.js');

Object.defineProperty(exports, 'take', {
  enumerable: true,
  get: function get() {
    return _io.take;
  }
});
Object.defineProperty(exports, 'takem', {
  enumerable: true,
  get: function get() {
    return _io.takem;
  }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function get() {
    return _io.put;
  }
});
Object.defineProperty(exports, 'race', {
  enumerable: true,
  get: function get() {
    return _io.race;
  }
});
Object.defineProperty(exports, 'call', {
  enumerable: true,
  get: function get() {
    return _io.call;
  }
});
Object.defineProperty(exports, 'apply', {
  enumerable: true,
  get: function get() {
    return _io.apply;
  }
});
Object.defineProperty(exports, 'cps', {
  enumerable: true,
  get: function get() {
    return _io.cps;
  }
});
Object.defineProperty(exports, 'fork', {
  enumerable: true,
  get: function get() {
    return _io.fork;
  }
});
Object.defineProperty(exports, 'spawn', {
  enumerable: true,
  get: function get() {
    return _io.spawn;
  }
});
Object.defineProperty(exports, 'join', {
  enumerable: true,
  get: function get() {
    return _io.join;
  }
});
Object.defineProperty(exports, 'cancel', {
  enumerable: true,
  get: function get() {
    return _io.cancel;
  }
});
Object.defineProperty(exports, 'select', {
  enumerable: true,
  get: function get() {
    return _io.select;
  }
});
Object.defineProperty(exports, 'actionChannel', {
  enumerable: true,
  get: function get() {
    return _io.actionChannel;
  }
});
Object.defineProperty(exports, 'cancelled', {
  enumerable: true,
  get: function get() {
    return _io.cancelled;
  }
});
Object.defineProperty(exports, 'flush', {
  enumerable: true,
  get: function get() {
    return _io.flush;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVmZmVjdHMuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJfaW8iLCJyZXF1aXJlIiwiZW51bWVyYWJsZSIsImdldCIsInRha2UiLCJ0YWtlbSIsInB1dCIsInJhY2UiLCJjYWxsIiwiYXBwbHkiLCJjcHMiLCJmb3JrIiwic3Bhd24iLCJqb2luIiwiY2FuY2VsIiwic2VsZWN0IiwiYWN0aW9uQ2hhbm5lbCIsImNhbmNlbGxlZCIsImZsdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsTUFBTUMsUUFBUSxlQUFSLENBQVY7O0FBRUFMLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLE1BQS9CLEVBQXVDO0FBQ3JDSSxjQUFZLElBRHlCO0FBRXJDQyxPQUFLLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFPSCxJQUFJSSxJQUFYO0FBQ0Q7QUFKb0MsQ0FBdkM7QUFNQVIsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsT0FBL0IsRUFBd0M7QUFDdENJLGNBQVksSUFEMEI7QUFFdENDLE9BQUssU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFdBQU9ILElBQUlLLEtBQVg7QUFDRDtBQUpxQyxDQUF4QztBQU1BVCxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixLQUEvQixFQUFzQztBQUNwQ0ksY0FBWSxJQUR3QjtBQUVwQ0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSU0sR0FBWDtBQUNEO0FBSm1DLENBQXRDO0FBTUFWLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLE1BQS9CLEVBQXVDO0FBQ3JDSSxjQUFZLElBRHlCO0FBRXJDQyxPQUFLLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFPSCxJQUFJTyxJQUFYO0FBQ0Q7QUFKb0MsQ0FBdkM7QUFNQVgsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsTUFBL0IsRUFBdUM7QUFDckNJLGNBQVksSUFEeUI7QUFFckNDLE9BQUssU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFdBQU9ILElBQUlRLElBQVg7QUFDRDtBQUpvQyxDQUF2QztBQU1BWixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixPQUEvQixFQUF3QztBQUN0Q0ksY0FBWSxJQUQwQjtBQUV0Q0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSVMsS0FBWDtBQUNEO0FBSnFDLENBQXhDO0FBTUFiLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLEtBQS9CLEVBQXNDO0FBQ3BDSSxjQUFZLElBRHdCO0FBRXBDQyxPQUFLLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFPSCxJQUFJVSxHQUFYO0FBQ0Q7QUFKbUMsQ0FBdEM7QUFNQWQsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsTUFBL0IsRUFBdUM7QUFDckNJLGNBQVksSUFEeUI7QUFFckNDLE9BQUssU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFdBQU9ILElBQUlXLElBQVg7QUFDRDtBQUpvQyxDQUF2QztBQU1BZixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixPQUEvQixFQUF3QztBQUN0Q0ksY0FBWSxJQUQwQjtBQUV0Q0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSVksS0FBWDtBQUNEO0FBSnFDLENBQXhDO0FBTUFoQixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixNQUEvQixFQUF1QztBQUNyQ0ksY0FBWSxJQUR5QjtBQUVyQ0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSWEsSUFBWDtBQUNEO0FBSm9DLENBQXZDO0FBTUFqQixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixRQUEvQixFQUF5QztBQUN2Q0ksY0FBWSxJQUQyQjtBQUV2Q0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSWMsTUFBWDtBQUNEO0FBSnNDLENBQXpDO0FBTUFsQixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixRQUEvQixFQUF5QztBQUN2Q0ksY0FBWSxJQUQyQjtBQUV2Q0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSWUsTUFBWDtBQUNEO0FBSnNDLENBQXpDO0FBTUFuQixPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixlQUEvQixFQUFnRDtBQUM5Q0ksY0FBWSxJQURrQztBQUU5Q0MsT0FBSyxTQUFTQSxHQUFULEdBQWU7QUFDbEIsV0FBT0gsSUFBSWdCLGFBQVg7QUFDRDtBQUo2QyxDQUFoRDtBQU1BcEIsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsV0FBL0IsRUFBNEM7QUFDMUNJLGNBQVksSUFEOEI7QUFFMUNDLE9BQUssU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLFdBQU9ILElBQUlpQixTQUFYO0FBQ0Q7QUFKeUMsQ0FBNUM7QUFNQXJCLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLE9BQS9CLEVBQXdDO0FBQ3RDSSxjQUFZLElBRDBCO0FBRXRDQyxPQUFLLFNBQVNBLEdBQVQsR0FBZTtBQUNsQixXQUFPSCxJQUFJa0IsS0FBWDtBQUNEO0FBSnFDLENBQXhDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaW8gPSByZXF1aXJlKCcuL2ludGVybmFsL2lvJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndGFrZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby50YWtlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAndGFrZW0nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8udGFrZW07XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdwdXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8ucHV0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAncmFjZScsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby5yYWNlO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY2FsbCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby5jYWxsO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnYXBwbHknLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8uYXBwbHk7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjcHMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8uY3BzO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZm9yaycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby5mb3JrO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnc3Bhd24nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8uc3Bhd247XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdqb2luJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2lvLmpvaW47XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdjYW5jZWwnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8uY2FuY2VsO1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnc2VsZWN0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2lvLnNlbGVjdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2FjdGlvbkNoYW5uZWwnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfaW8uYWN0aW9uQ2hhbm5lbDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2NhbmNlbGxlZCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby5jYW5jZWxsZWQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdmbHVzaCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9pby5mbHVzaDtcbiAgfVxufSk7Il19