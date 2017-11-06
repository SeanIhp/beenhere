"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvc2UuanMiXSwibmFtZXMiOlsiY29tcG9zZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmdW5jcyIsIkFycmF5IiwiX2tleSIsImFyZyIsInJlZHVjZSIsImEiLCJiIiwiYXBwbHkiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQVd3QkEsTztBQVh4Qjs7Ozs7Ozs7Ozs7QUFXZSxTQUFTQSxPQUFULEdBQW1CO0FBQ2hDLE9BQUssSUFBSUMsT0FBT0MsVUFBVUMsTUFBckIsRUFBNkJDLFFBQVFDLE1BQU1KLElBQU4sQ0FBckMsRUFBa0RLLE9BQU8sQ0FBOUQsRUFBaUVBLE9BQU9MLElBQXhFLEVBQThFSyxNQUE5RSxFQUFzRjtBQUNwRkYsVUFBTUUsSUFBTixJQUFjSixVQUFVSSxJQUFWLENBQWQ7QUFDRDs7QUFFRCxNQUFJRixNQUFNRCxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCLFdBQU8sVUFBVUksR0FBVixFQUFlO0FBQ3BCLGFBQU9BLEdBQVA7QUFDRCxLQUZEO0FBR0Q7O0FBRUQsTUFBSUgsTUFBTUQsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixXQUFPQyxNQUFNLENBQU4sQ0FBUDtBQUNEOztBQUVELFNBQU9BLE1BQU1JLE1BQU4sQ0FBYSxVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDbEMsV0FBTyxZQUFZO0FBQ2pCLGFBQU9ELEVBQUVDLEVBQUVDLEtBQUYsQ0FBUUMsU0FBUixFQUFtQlYsU0FBbkIsQ0FBRixDQUFQO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59Il19