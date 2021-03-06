"use strict";var exports=module.exports={};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function RFC1738(value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function RFC3986(value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm1hdHMuanMiXSwibmFtZXMiOlsicmVwbGFjZSIsIlN0cmluZyIsInByb3RvdHlwZSIsInBlcmNlbnRUd2VudGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJmb3JtYXR0ZXJzIiwiUkZDMTczOCIsInZhbHVlIiwiY2FsbCIsIlJGQzM5ODYiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLFVBQVVDLE9BQU9DLFNBQVAsQ0FBaUJGLE9BQS9CO0FBQ0EsSUFBSUcsa0JBQWtCLE1BQXRCOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2IsZUFBVyxTQURFO0FBRWJDLGdCQUFZO0FBQ1JDLGlCQUFTLGlCQUFVQyxLQUFWLEVBQWlCO0FBQ3RCLG1CQUFPUixRQUFRUyxJQUFSLENBQWFELEtBQWIsRUFBb0JMLGVBQXBCLEVBQXFDLEdBQXJDLENBQVA7QUFDSCxTQUhPO0FBSVJPLGlCQUFTLGlCQUFVRixLQUFWLEVBQWlCO0FBQ3RCLG1CQUFPQSxLQUFQO0FBQ0g7QUFOTyxLQUZDO0FBVWJELGFBQVMsU0FWSTtBQVdiRyxhQUFTO0FBWEksQ0FBakIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiJdfQ==