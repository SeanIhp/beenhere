"use strict";var exports=module.exports={};
var _typeof2 = require('../../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = require('./utils.js');
var formats = require('./formats.js');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) {
        // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = (0, _keys2.default)(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = (0, _keys2.default)(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
    }

    return keys.join(delimiter);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJmb3JtYXRzIiwiYXJyYXlQcmVmaXhHZW5lcmF0b3JzIiwiYnJhY2tldHMiLCJwcmVmaXgiLCJpbmRpY2VzIiwia2V5IiwicmVwZWF0IiwidG9JU08iLCJEYXRlIiwicHJvdG90eXBlIiwidG9JU09TdHJpbmciLCJkZWZhdWx0cyIsImRlbGltaXRlciIsImVuY29kZSIsImVuY29kZXIiLCJlbmNvZGVWYWx1ZXNPbmx5Iiwic2VyaWFsaXplRGF0ZSIsImRhdGUiLCJjYWxsIiwic2tpcE51bGxzIiwic3RyaWN0TnVsbEhhbmRsaW5nIiwic3RyaW5naWZ5Iiwib2JqZWN0IiwiZ2VuZXJhdGVBcnJheVByZWZpeCIsImZpbHRlciIsInNvcnQiLCJhbGxvd0RvdHMiLCJmb3JtYXR0ZXIiLCJvYmoiLCJpc0J1ZmZlciIsImtleVZhbHVlIiwiU3RyaW5nIiwidmFsdWVzIiwib2JqS2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImtleXMiLCJpIiwibGVuZ3RoIiwiY29uY2F0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdHMiLCJvcHRpb25zIiwidW5kZWZpbmVkIiwiVHlwZUVycm9yIiwiZm9ybWF0IiwiZGVmYXVsdCIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiZm9ybWF0dGVycyIsImFycmF5Rm9ybWF0Iiwiam9pbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFFBQVFDLFFBQVEsU0FBUixDQUFaO0FBQ0EsSUFBSUMsVUFBVUQsUUFBUSxXQUFSLENBQWQ7O0FBRUEsSUFBSUUsd0JBQXdCO0FBQ3hCQyxjQUFVLFNBQVNBLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCO0FBQUU7QUFDbEMsZUFBT0EsU0FBUyxJQUFoQjtBQUNILEtBSHVCO0FBSXhCQyxhQUFTLFNBQVNBLE9BQVQsQ0FBaUJELE1BQWpCLEVBQXlCRSxHQUF6QixFQUE4QjtBQUFFO0FBQ3JDLGVBQU9G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QyxFQUF5QztBQUNyQyxZQUFJaEMsTUFBTTRCLFFBQVFJLENBQVIsQ0FBVjs7QUFFQSxZQUFJbEIsYUFBYVMsSUFBSXZCLEdBQUosTUFBYSxJQUE5QixFQUFvQztBQUNoQztBQUNIOztBQUVEK0IsZUFBT0EsS0FBS0csTUFBTCxDQUFZbEIsVUFDZk8sSUFBSXZCLEdBQUosQ0FEZSxFQUVmQSxHQUZlLEVBR2ZrQixtQkFIZSxFQUlmSCxrQkFKZSxFQUtmRCxTQUxlLEVBTWZOLFNBQVNDLE9BQVQsR0FBbUIsSUFOSixFQU9mVSxNQVBlLEVBUWZDLElBUmUsRUFTZkMsU0FUZSxFQVVmVixhQVZlLEVBV2ZXLFNBWGUsRUFZZlosZ0JBWmUsQ0FBWixDQUFQO0FBY0g7O0FBRUQsV0FBT3FCLEtBQUtnQixJQUFMLENBQVV4QyxTQUFWLENBQVA7QUFDSCxDQW5GRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHlcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICB2YXIgc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcbiAgICB2YXIgc2tpcE51bGxzID0gdHlwZW9mIG9wdGlvbnMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscztcbiAgICB2YXIgZW5jb2RlID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZTtcbiAgICB2YXIgZW5jb2RlciA9IHR5cGVvZiBvcHRpb25zLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyO1xuICAgIHZhciBzb3J0ID0gdHlwZW9mIG9wdGlvbnMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc29ydCA6IG51bGw7XG4gICAgdmFyIGFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dEb3RzO1xuICAgIHZhciBzZXJpYWxpemVEYXRlID0gdHlwZW9mIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGU7XG4gICAgdmFyIGVuY29kZVZhbHVlc09ubHkgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0cy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZSA/IGVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbn07XG4iXX0=