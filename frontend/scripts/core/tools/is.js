/**
 * @fileOverview Вспомогательные функции для проверок переменных
 */

/**
 * @param       {Object}    window      Ссылка на window
 * @param       {Object}    document    Ссылка на document
 * @param       {Object}    BM          Ссылка на Bookmate namespace
 */
(function ( window, document, BM, undefined ) {
    var
        /**
         * @alias       BM.tools
         */
        tools = BM.tools = BM.tools || {},

        /**
         * Проверяет опреден ли объект
         *
         * @alias   BM.tools.isUndefined
         * 
         * @param   {*}        obj 
         * @return  {boolean}
         */
        isUndefined = function isUndefined( obj ) {
            if ( typeof obj === 'undefined' ) {
                return true;
            }

            return false;
        },

        /**
         * Проверяет является значение объекта false.
         * Метод осущесвтляет не строгую проверку: пуская строка, переменная типа boolean равна false или number равный 0 всегда вернут false.
         * Также метод вернет false в случаи, если объект не определен
         *
         * @alias   BM.tools.isNull
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isNull = function isNull( obj ) {
            if ( tools.isUndefined ( obj ) ) {
                return true;
            }

            if ( !obj ) {
                return true;
            }

            return false;
        },

        /**
         * Проверяет является ли объект числом.
         *
         * @alias   BM.tools.isNumber
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isNumber = function isNumber( obj ) {
            if ( typeof obj === 'number' ) {
                return true;
            }

            return false;
        },

        /**
         * Проверяет является ли число степенью двойки.
         * 
         * @alias   BM.tools.isPowerOfTwo
         * 
         * @param   {number}    n 
         * @return  {boolean}
         */
        isPowerOfTwo = function isPowerOfTwo( n ) {
            if ( tools.isNumber( n ) ) {
                return (n !== 0) && ((n & (n - 1)) === 0);
            }
            else {
                return false;
            }
        },

        /**
         * Проверяет является ли переданный объект действительно объектом.
         *
         * @alias   BM.tools.isObject
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isObject = function isObject( obj ) {
            if ( obj === null ) {
                return false;
            }

            if ( typeof obj !== 'object' ) {
                return false;
            }

            return true;
        },

        /**
         * Проверяет является ли объект пространством имен.
         *
         * @alias   BM.tools.isNamespace
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        // isNamespace = function isNamespace( obj ) {
        //     if ( !tools.isObject(obj) ) {
        //         return false;
        //     }

        //     if ( tools.isUndefined(obj._namespace) || !obj._namespace ) {
        //         return false;
        //     }

        //     return true;
        // },

        /**
         * Проверяет является ли переданный объект регулярным выражением
         *
         * @alias   BM.tools.isRegExp
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isRegExp = function isRegExp( obj ) {
            return Object.prototype.toString.call(obj) === '[object RegExp]';
        },

        /**
         * Проверяет является ли переданнный объект массивом
         *
         * @alias   BM.tools.isArray
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isArray = function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },

        /**
         * Проверяет является ли переданный объект строкой
         *
         * @alias   BM.tools.isString
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isString = function isString( obj ) {
            if ( typeof obj === 'string' ) {
                return true;
            }

            return false;
        },

        /**
         * Проверяет является ли объект функцией
         *
         * @alias   BM.tools.isFunction
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isFunction = function isFunction( obj ) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        },

        /**
         * Проверяет является ли объект конструктором. Синоним для {@link BM.tools.isFunction}
         *
         * @alias   BM.tools.isConstructor
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isConstructor = function isConstructor( obj ) {
            return !!(tools.isFunction(obj) && obj.superclass);
        },

        /**
         * Проверяет является ли объект экземпляром базового класса
         *
         * @alias   BM.tools.isInstance
         * 
         * @param   {*}         obj
         * @return  {boolean}
         */
        isInstance = function isInstance( obj ) {
            if ( tools.isNull(obj) ) {
                return false;
            }

            if ( tools.isConstructor(obj) ) {
                return false;
            }

            if ( !tools.isObject(obj) ) {
                return false;
            }

            return true;
        },

        /**
         * Проверяем явялется ли объект экземпляром того или иного класса
         *
         * @alias   BM.tools.isInstanceOf
         * 
         * @param   {*}         obj
         * @param   {*}         classObj
         * @return  {boolean}
         */
        isInstanceOf = function isInstanceOf( obj, classObj ) {
            if ( obj instanceof classObj ) {
                return true;
            }

            if ( !tools.isNull(obj) ) {
                if ( !tools.isUndefined(obj.isInstanceOf) ) {
                    if ( obj.isInstanceOf(classObj) ) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Проверяет может ли объект быть преобразован в число.
         *
         * @alias   BM.tools.isNaN
         * 
         * @param   {*}           obj
         * @return  {boolean}
         */
        isNaN = function isNaN( obj ) {
            return obj !== obj;
        },

        /**
         * Проверяет является ли переданный объект элементом DOM.
         *
         * @alias   BM.tools.isElement
         * 
         * @param   {*}           obj
         * @return  {boolean}
         */
        isElement = function isElement( obj ) {
            return !!(obj && obj.nodeType === 1);
        },

        /**
         * Проверяет является ли переданный объект экземпляром Date.
         *
         * @alias   BM.tools.isDate
         * 
         * @param   {*}           obj
         * @return  {boolean}
         */
        isDate = function isDate( obj ) {
            return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
        },

        /**
         * Проверяем является ли переданный объект логической переменной.
         *
         * @alias   BM.tools.isBoolean
         * 
         * @param   {*}           obj
         * @return  {boolean}
         */
        isBoolean = function isBoolean( obj ) {
            return (typeof obj === 'boolean');
        },

        /**
         * Осуществляет глубокую проверку равенства объектов
         * И если они идентичны возвращает true
         *
         * @alias   BM.tools.isEqual
         * 
         * @param   {*}            a
         * @param   {*}            b
         * @return  {boolean}
         */
        isEqual = function isEqual( a, b ) {
            var
                atype,
                btype,
                aKeys,
                bKeys,
                key;
            // end of vars
            
            // Check object identity.
            if ( a === b ) {
                return true;
            }
            // Different types?
            atype = typeof(a);
            btype = typeof(b);

            if ( atype !== btype ) {
                return false;
            }
            // Basic equality test (watch out for coercions).
            if ( a === b ) {
                return true;
            }
            // One is falsy and the other truthy.
            if ( (!a && b) || (a && !b) ) {
                return false;
            }
            // Check dates' integer values.
            if ( tools.isDate(a) && tools.isDate(b) ) {
                return a.getTime() === b.getTime();
            }
            // Both are NaN?
            if ( tools.isNaN(a) && tools.isNaN(b) ) {
                return false;
            }
            // If a is not an object by this point, we can't handle it.
            if ( atype !== 'object' ) {
                return false;
            }
            // Check for different array lengths before comparing contents.
            if ( a.length && (a.length !== b.length) ) {
                return false;
            }
            // if is a DOM elements and is not '==' then false
            if ( tools.isElement(a) || tools.isElement(b) ) {
                return false;
            }
            // Nothing else worked, deep compare the contents.
            
            aKeys = tools.keys(a);
            bKeys = tools.keys(b);

            // Different object sizes?
            if ( aKeys.length !== bKeys.length ) {
                return false;
            }
            // Recursive comparison of contents.
            for ( key in a ) {
                if ( !(key in b ) || !tools.isEqual(a[key], b[key])) {
                    return false;
                }
            }

            return true;
        };
    // end of vars

    tools.isUndefined = isUndefined;
    tools.isNull = isNull;
    tools.isNumber = isNumber;
    tools.isPowerOfTwo = isPowerOfTwo;
    tools.isObject = isObject;
    tools.isRegExp = isRegExp;
    tools.isArray = Array.isArray || isArray;
    tools.isString = isString;
    tools.isFunction = isFunction;
    tools.isConstructor = isConstructor;
    tools.isInstance = isInstance;
    tools.isInstanceOf = isInstanceOf;
    tools.isNaN = isNaN;
    tools.isElement = isElement;
    tools.isDate = isDate;
    tools.isBoolean = isBoolean;
    tools.isEqual = isEqual;

}(
    this,
    this.document,
    this.BM = this.BM || {}
));