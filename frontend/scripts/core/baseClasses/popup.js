/**
 * @fileOverview Модуль базового класса попапов
 * 
 * @param       {Object}     window         Ссылка на window
 * @param       {Object}     document       Ссылка на document
 * @param       {Object}     modules        Ссылка на модульную систему YModules
 * @param       {Object}     $              Ссылка на jQuery
 * @param       {Function}   radio      Ссылка на publish/subscribe
 */
(function ( window, document, modules, $, radio, undefined ) {
    'use strict';

    var
        /**
         * @param       {Function}  provide     Ассинхронный экспорт модуля
         * @param       {Function}  baseClass   Базовый класс
         * @param       {Function}  extent      Модуль реализации наследования
         * @param       {Function}  tools           Модуль инструментов
         */
        popupBaseModule = function( provide, PubSub, extend, tools ) {
            var
                $window = $(window),
                popupCounter = 0,
                popups = [],

                /**
                 * @class       PopupBaseClass
                 * @classdesc   Базовый класс попапов
                 *
                 * @augments    BaseClass
                 */
                PopupBaseClass = extend(PubSub),

                $class = PopupBaseClass,
                $super = $class.superclass,

                template =
                    '<div class="bm-popup" hidden="hidden" visible="false">' +
                        '<div class="bm-popup-overlay"></div>' +
                        '<div class="bm-popup-content-wrapper" role="overlay">' +
                            '<div class="bm-popup-content" role="content"></div>' +
                        '</div>' +
                    '</div>',

                closeButtonTemplate = '<div class="bm-popup-button-close"></div>',

                _popupExist = function( popup ) {
                    var
                        l = popups.length,
                        i;
                    // end of vars

                    for ( i = 0; i < l; ++i ) {
                        if ( popups[i] === popup ) {
                            return i;
                        }
                    }

                    return false;
                },

                registerPopup = function( popup ) {
                    if ( _popupExist(popup) === false ) {
                        popups.push(popup);
                    }
                },

                unregisterPopup = function(popup ) {
                    var
                        index;
                    // end of vars

                    if ( (index = _popupExist(popup)) !== false ) {
                        popups.splice(index, 1);
                    }
                },

                hideAllPopups   = function( popup ) {
                    var
                        l = popups.length,
                        i;
                    // end of vars

                    for ( i = 0; i < l; ++i ) {
                        if (popups[i] !== popup) {
                            if (popups[i] instanceof PopupBaseClass) {
                                popups[i].hide(true);
                            }
                        }
                    }
                };
            // end of vars

            $.extend($class.prototype, {
                initialize : function(options) {
                    $super.initialize.apply(this, arguments);
                    this._content             = '';
                    this._backgroundClickHide = true;
                    this._blockMouseMove      = true;
                    this._isVisible           = false;
                    this._useTemplate         = false;
                    this._showButtonClose     = true;

                    this._initialBodyOverflowValue = null;

                    this._element            = this._createPopupElement();
                    this._elementBody        = $('body');
                    this._elementRoot        = this._element;
                    this._elementOverlay     = this._element.find('[role=overlay]');
                    this._elementContent     = this._element.find('[role=content]');
                    this._elementButtonClose = this._element.find('[role=button-close]');
                    this._animationEnabled   = null;

                    this._contentClassName   = null;

                    popupCounter += 1;
                    this._uniqueToken = 'bookmate-popup-' + popupCounter + new Date().getTime();

                    this._detectAnimationUsage();
                    this.setConfig(options);

                    if (this._useTemplate) {
                        this._content = this._getTemplateContent();
                        this._appendContent();
                    }

                    this._setupEvents();
                    registerPopup(this);
                },

                _detectAnimationUsage : function() {
                    this._animationEnabled = false;
                },

                setConfig : function(options) {
                    if (!tools.isUndefined(options)) {
                        if (!tools.isUndefined(options.useTemplate)) {
                            this._useTemplate = options.useTemplate;
                        }
                        if (!tools.isUndefined(options.content)) {
                            this._content = options.content;
                            this._appendContent();
                        }
                        if (tools.isBoolean(options.backgroundClickHide)) {
                            this._backgroundClickHide = options.backgroundClickHide;
                        }
                        if (!tools.isUndefined(options.className)) {
                            this._contentClassName = options.className;
                        }
                        if (!tools.isUndefined(options.showButtonClose)) {
                            this._showButtonClose = options.showButtonClose;
                        }
                    }
                },

                _appendContent : function() {
                    this._elementContent.html('');

                    if (this._showButtonClose) {
                        this._elementButtonClose = $(closeButtonTemplate);
                        this._elementContent.append(this._elementButtonClose);
                    }

                    this._elementContent.append(this._content);
                },

                _createPopupElement : function() {
                    return $(template);
                },

                _setupEvents : function() {
                    var me = this;
                    this._elementOverlay.on('click', function(event) {
                        me._onOverlayClick(event);
                    });
                    this._elementOverlay.on('mousemove', function(event) {
                        me._onRootMouseMove(event);
                    });
                    this._elementRoot.on('mousewheel', function(event) {
                        me._onRootMouseWheel(event);
                    });
                    this._elementRoot.on('keyup keydown keypress', function(event) {
                        me._onRootKeyAction(event);
                    });
                    this._elementContent.on('click', function(event) {
                        me._onContentClick(event);
                    });
                    this._elementButtonClose.on('click', function(event) {
                        me._onButtonCloseClick(event);
                    });

                    $(window).bind('resize', function() {
                        me._onWindowResize();
                    });
                },

                _onOverlayClick : function(event) {
                    if (this._backgroundClickHide) {
                        this.hide();
                    }
                },

                _onRootMouseMove : function(event) {
                    if (this._blockMouseMove) {
                        event.stopPropagation();
                    }
                },

                _onRootMouseWheel : function(event) {
                    event.stopPropagation();
                },

                _onRootKeyAction : function(event) {
                    event.stopPropagation();
                },

                _onContentClick : function(event) {
                    event.stopPropagation();
                },

                _onButtonCloseClick : function(event) {
                    this.hide();
                },

                _onWindowResize : function() {
                    this._calculateContentPosition();
                },

                show : function() {
                    if (this._isVisible) {
                        return;
                    }

                    this._blockBodyScrolling();
                    this._preparePopup();
                    this._appendIntoBody();
                    this.updateLayout();

                    this._show();

                    if ( radio ) {
                        radio('bookmate-popup-show').broadcast();
                    }
                },

                _appendIntoBody : function() {
                    this._elementBody.append(this._elementRoot);
                },

                _show : function() {
                    hideAllPopups(this);
                    this._elementRoot.attr('visible', 'true');
                    this._isVisible = true;
                    this._elementRoot.focus();
                },

                hide : function(silent) {
                    var me = this;
                    if (this._isVisible) {
                        this._hide(function() {
                            if (silent !== true) {
                                //me.trigger('hide');
                                if ( radio ) {
                                    radio('bookmate-popup-hide').broadcast();
                                }
                            }
                        });
                    }
                },

                _hide : function(callback) {
                    var me = this;

                    this._unblockBodyScrolling();

                    if (this._animationEnabled) {
                        this._elementOverlay.animationEnd(function(){
                            me._elementOverlay.unbindAnimationEnd();

                            me._elementRoot.removeAttr('visible');
                            me._elementRoot.attr('hidden', 'hidden');
                            if (callback) {
                                callback();
                            }
                        });
                        this._elementRoot.attr('visible', 'false');
                        this._isVisible = false;
                    } else {
                        this._elementRoot.attr('visible', 'false');
                        this._elementRoot.removeAttr('visible');
                        this._elementRoot.attr('hidden', 'hidden');
                        if (callback) {
                            callback();
                        }
                        this._isVisible = false;
                    }
                },

                _preparePopup : function() {
                    this._elementRoot.removeAttr('visible');
                    this._elementRoot.removeAttr('hidden');
                },

                _blockBodyScrolling : function() {
                    this._initialBodyOverflowValue = this._elementBody.css('overflow');
                    this._elementBody.css('overflow', 'hidden');
                },

                _unblockBodyScrolling : function () {
                    this._elementBody.css('overflow', this._initialBodyOverflowValue)
                },

                updateLayout : function() {
                    this._updateContentClassName();
                    this._calculateContentPosition();
                },

                _updateContentClassName : function() {
                    if (this._contentClassName) {
                        if (!this._elementRoot.hasClass(this._contentClassName)) {
                            this._elementRoot.addClass(this._contentClassName);
                        }
                    }
                },

                _calculateContentPosition : function() {
                    /*var marginLeft = this._elementContent.width()  / 2,
                        marginTop  = this._elementContent.height() / 2,
                        offset     = this._elementContent.offset();*/

                    /*if (marginTop > offset.top) {
                        marginTop = offset.top;
                    }
                    if (marginLeft > offset.left) {
                        marginLeft = offset.left;
                    }*/

                    /*this._elementContent.css({
                        'marginLeft' : marginLeft * -1,
                        'marginTop'  : marginTop  * -1
                    });*/

                    var resolvedHeight = $window.height() + 'px';

                    this._elementOverlay.css({
                        'height'      : resolvedHeight,
                        'line-height' : resolvedHeight
                    });
                },

                _getTemplateName : function() {
                    // override by children
                },

                _getTemplateContent : function() {
                    return $('#' + this._getTemplateName()).html();
                },

                remove : function() {
                    unregisterPopup(this);
                }
            });

            // Export
            provide(PopupBaseClass);
        };
    // end of vars


    /**
     * Модуль базового класса попапов
     *
     * @module      popupBase
     *
     * @requires    baseClass
     * @requires    extend
     * @requires    jQuery
     * @requires    radio
     */
    modules.define(
        'popupBaseClass',                   // Module name
        ['basePubSub', 'extend', 'tools'],   // Dependies
        popupBaseModule                     // Module realization
    );

}(
    this,
    this.document,
    this.modules,
    this.jQuery,
    this.radio
));