/**
 * To detect you are in IE (for this case) by checking typeof(Event) which is
 * 'function' for all except IE where it is 'object'.
 * You can then safely polyfill the Event constructor using the approach above.
 * In IE11 it seems to be safe to set window.Event = CustomEvent.
 */
;(function() {
  if (typeof window !== 'undefined') {
    if (typeof window.Event === 'function') {
      return false //If not IE
    }

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }

    CustomEvent.prototype = window.Event.prototype

    window.Event = CustomEvent
  }
})()
