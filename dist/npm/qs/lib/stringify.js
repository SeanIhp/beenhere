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
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
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
    var options = opts ? utils.assign({}, opts) : {};

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

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJmb3JtYXRzIiwiYXJyYXlQcmVmaXhHZW5lcmF0b3JzIiwiYnJhY2tldHMiLCJwcmVmaXgiLCJpbmRpY2VzIiwia2V5IiwicmVwZWF0IiwidG9JU08iLCJEYXRlIiwicHJvdG90eXBlIiwidG9JU09TdHJpbmciLCJkZWZhdWx0cyIsImRlbGltaXRlciIsImVuY29kZSIsImVuY29kZXIiLCJlbmNvZGVWYWx1ZXNPbmx5Iiwic2VyaWFsaXplRGF0ZSIsImRhdGUiLCJjYWxsIiwic2tpcE51bGxzIiwic3RyaWN0TnVsbEhhbmRsaW5nIiwic3RyaW5naWZ5Iiwib2JqZWN0IiwiZ2VuZXJhdGVBcnJheVByZWZpeCIsImZpbHRlciIsInNvcnQiLCJhbGxvd0RvdHMiLCJmb3JtYXR0ZXIiLCJvYmoiLCJpc0J1ZmZlciIsImtleVZhbHVlIiwiU3RyaW5nIiwidmFsdWVzIiwib2JqS2V5cyIsIkFycmF5IiwiaXNBcnJheSIsImtleXMiLCJpIiwibGVuZ3RoIiwiY29uY2F0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdHMiLCJvcHRpb25zIiwiYXNzaWduIiwidW5kZWZpbmVkIiwiVHlwZUVycm9yIiwiZm9ybWF0IiwiZGVmYXVsdCIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiZm9ybWF0dGVycyIsImFycmF5Rm9ybWF0Iiwiam9pbmVkIiwiam9pbiIsImFkZFF1ZXJ5UHJlZml4Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBUUMsUUFBUSxTQUFSLENBQVo7QUFDQSxJQUFJQyxVQUFVRCxRQUFRLFdBQVIsQ0FBZDs7QUFFQSxJQUFJRSx3QkFBd0I7QUFDeEJDLGNBQVUsU0FBU0EsUUFBVCxDQUFrQkMsTUFBbEIsRUFBMEI7QUFBRTtBQUNsQyxlQUFPQSxTQUFTLElBQWhCO0FBQ0gsS0FIdUI7QUFJeEJDLGFBQVMsU0FBU0EsT0FBVCxDQUFpQkQsTUFBakIs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R0FBWixDQUFWO0FBQ0g7O0FBRUQsUUFBSUgsSUFBSixFQUFVO0FBQ05RLGdCQUFRUixJQUFSLENBQWFBLElBQWI7QUFDSDs7QUFFRCxTQUFLLElBQUlZLElBQUksQ0FBYixFQUFnQkEsSUFBSUosUUFBUUssTUFBNUIsRUFBb0MsRUFBRUQsQ0FBdEMsRUFBeUM7QUFDckMsWUFBSWhDLE1BQU00QixRQUFRSSxDQUFSLENBQVY7O0FBRUEsWUFBSWxCLGFBQWFTLElBQUl2QixHQUFKLE1BQWEsSUFBOUIsRUFBb0M7QUFDaEM7QUFDSDs7QUFFRCtCLGVBQU9BLEtBQUtHLE1BQUwsQ0FBWWxCLFVBQ2ZPLElBQUl2QixHQUFKLENBRGUsRUFFZkEsR0FGZSxFQUdma0IsbUJBSGUsRUFJZkgsa0JBSmUsRUFLZkQsU0FMZSxFQU1mTixTQUFTQyxPQUFULEdBQW1CLElBTkosRUFPZlUsTUFQZSxFQVFmQyxJQVJlLEVBU2ZDLFNBVGUsRUFVZlYsYUFWZSxFQVdmVyxTQVhlLEVBWWZaLGdCQVplLENBQVosQ0FBUDtBQWNIOztBQUVELFFBQUlzQyxTQUFTakIsS0FBS2tCLElBQUwsQ0FBVTFDLFNBQVYsQ0FBYjtBQUNBLFFBQUlULFNBQVN3QyxRQUFRWSxjQUFSLEtBQTJCLElBQTNCLEdBQWtDLEdBQWxDLEdBQXdDLEVBQXJEOztBQUVBLFdBQU9GLE9BQU9mLE1BQVAsR0FBZ0IsQ0FBaEIsR0FBb0JuQyxTQUFTa0QsTUFBN0IsR0FBc0MsRUFBN0M7QUFDSCxDQXRGRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHlcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICB2YXIgc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcbiAgICB2YXIgc2tpcE51bGxzID0gdHlwZW9mIG9wdGlvbnMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscztcbiAgICB2YXIgZW5jb2RlID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZTtcbiAgICB2YXIgZW5jb2RlciA9IHR5cGVvZiBvcHRpb25zLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyO1xuICAgIHZhciBzb3J0ID0gdHlwZW9mIG9wdGlvbnMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc29ydCA6IG51bGw7XG4gICAgdmFyIGFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dEb3RzO1xuICAgIHZhciBzZXJpYWxpemVEYXRlID0gdHlwZW9mIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGU7XG4gICAgdmFyIGVuY29kZVZhbHVlc09ubHkgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0cy5kZWZhdWx0O1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZSA/IGVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIl19