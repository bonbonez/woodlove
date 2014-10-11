/**
 * @fileOverview Модуль базового класса
 * 
 * @param       {Object}     window         Ссылка на window
 * @param       {Object}     document       Ссылка на document
 * @param       {Object}     modules        Ссылка на модульную систему YModules
 */
(function ( window, document, modules, undefined ) {
    'use strict';


    var
        /**
         * @param       {Function}  provide     Ассинхронный экспорт модуля
         */
        baseClassModule = function( provide ) {
            
            /**
             * Базовый класс
             * 
             * @this        {BaseClass}
             *
             * @constructor
             *
             * @memberOf    module:baseClass#
             *
             * @class       BaseClass
             * @classdesc   Базовый класс
             */
            var BaseClass = (function() {
                function BaseClass() {
                    // enforces new
                    if ( !(this instanceof BaseClass) ) {
                        return new BaseClass(arguments);
                    }
                    // constructor body

                    this.initialize.apply(this, arguments);
                }
            
                
                /**
                 * Метод инициалзации
                 * 
                 * @this        {BaseClass}
                 */
                BaseClass.prototype.initialize = function() {

                };

                /**
                 * Метод унитожения
                 * 
                 * @this        {BaseClass}
                 */
                BaseClass.prototype.destroy = function() {

                };
            
                return BaseClass;
            
            }());


            // Export
            provide(BaseClass);
        };
    // end of vars


    /**
     * Модуль базового класса попапов
     * 
     * @module      baseClass
     */
    modules.define(
        'baseClass',        // Module name
        [],                 // Dependies
        baseClassModule     // Module realization
    );

}(
    this,
    this.document,
    this.modules
));