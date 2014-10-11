(function(window, modules, BM, $){

    modules.define('basePubSub', ['baseClass', 'extend'], function(provide, baseClass, extend){

        var PubSub = extend(baseClass),

            $class = PubSub,
            $super = $class.superclass;

        BM.tools.mixin($class.prototype, {

            initialize : function() {
                this._events = [];

                $super.initialize.apply(this, arguments);
            },

            _notify : function(event) {
                if (!this._eventExists(event)) {
                    return;
                }
                var args = Array.prototype.slice.call(arguments, 1),
                    eventObjs = this._getEventObjects(event);

                eventObjs.forEach(function(obj){
                    if (args.length > 0) {
                        obj.callback.apply(obj.context, args);
                    } else {
                        obj.callback.call(obj.context);
                    }
                });

            },

            on : function(event, callback, context) {
                if (event === undefined || callback === undefined || this._eventExists(event, callback, context)) {
                    return;
                }

                this._events.push({
                    event: event,
                    callback: callback,
                    context: context
                });
            },

            off : function(event, callback, context) {
                if (!this._eventExists(event)) {
                    return;
                }

                var i, l = this._events.length,
                    event;
                for (i = 0; i < l; ++i) {
                    event = this._events[i];
                    if (callback !== undefined && context !== undefined && event.event === event && event.callback === callback && event.context === context) {
                        this._events[i].splice(i, 1);
                        return;
                    } else if (callback !== undefined && event.event === event && event.callback === callback) {
                        this._events[i].splice(i, 1);
                    } else if (event.event === event) {
                        this._events[i].splice(i, 1);
                    }
                }
            },

            destroy : function() {
                $super.destroy.apply(this, arguments);
                this._events.length = 0;
                this._events = [];
            },

            _getEventObjects : function(event) {
                var i, l = this._events.length,
                    result = [];
                for (i = 0; i < l; ++i) {
                    if (this._events[i].event === event) {
                        result.push(this._events[i]);
                    }
                }
                return result;
            },

            _eventExists : function(event, callback, context) {
                var i, l = this._events.length;
                for (i = 0; i < l; ++i) {
                    if (this._events[i].event === event) {
                        if (callback !== undefined) {
                            return this._events[i].event.callback === callback;
                        } else {
                            return true;
                        }
                    }
                }
                return false;
            }

        });

        provide(PubSub);

    });

}(this, this.modules, this.BM, this.jQuery));