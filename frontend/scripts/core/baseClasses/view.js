(function(window, modules, BM, $){

    modules.define('baseView', ['basePubSub', 'extend'], function(provide, PubSub, extend){

        var BaseView = extend(PubSub),

            $class = BaseView,
            $super = $class.superclass;

        BM.tools.mixin($class.prototype, {

            initialize : function(config) {
                this.$elem = null;

                if (config && config.element) {
                    this.$elem = this._toJQueryObject(config.element);
                }

                $super.initialize.apply(this, arguments);
            },

            _toJQueryObject : function(element) {
                var $res = null;
                if (element) {
                    if (element instanceof $) {
                        $res = element;
                    } else if (element instanceof HTMLElement) {
                        $res = $(element);
                    } else if (typeof element === 'string') {
                        $res = $(element);
                    }
                }

                if ($res && $res.length > 0) {
                    return $res;
                }
                return null;
            },

            getElement : function() {
                return this.$elem;
            }

        });

        provide(BaseView);

    });

}(this, this.modules, this.BM, this.jQuery));