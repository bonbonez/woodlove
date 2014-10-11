/**
 * @fileOverview Вспомогательные функции для предоставления информации о текущем пользователе
 */

/**
 * @param       {Object}    window      Ссылка на window
 * @param       {Object}    document    Ссылка на document
 * @param       {Object}    BM          Ссылка на Bookmate namespace
 */
(function ( window, document, BM, undefined ) {
    "use strict";
    
    var
        /**
         * @alias       BM.user
         */
        user = BM.user = BM.user || {},

        /**
         * Проверяет, пользователь авторизован, или нет
         *
         * @alias   BM.user.isUserPresent
         *
         * @return  {boolean}
         */
        isUserPresent = function() {
            return BM.config.mainConfig.userInfo.hasOwnProperty('login');
        },

        /**
         * Возвращает логин текущего пользователя или null
         *
         * @alias   BM.user.isUserPresent
         *
         * @return  {boolean}
         */
        getUserLogin = function() {
            if (!isUserPresent()) {
                return null;
            }
            return BM.config.mainConfig.userInfo.login;
        };

    user.isUserPresent = isUserPresent;
    user.getUserLogin  = getUserLogin;

}(
        this,
        this.document,
        this.BM = this.BM || {}
    ));