/**
 * @param       {Object}     window         Ссылка на window
 * @param       {Object}     document       Ссылка на document
 * @param       {Function}   $              Ссылка на jQuery
 * @param       {Function}   modules        Ссылка на modules
 * @param       {Object}     DIMixpanel     Ссылка на Mixpanel
 */
(function ( window, document, $, modules, DIMixpanel, BM ) {
    'use strict';

    var
        mixpanelAnalytics = function( abTestDetect ) {
            var
                cfg = BM.config || {},
                mainCfg = cfg.mainConfig || {},
                subscribed = mainCfg && mainCfg.userInfo && mainCfg.userInfo.subscription && mainCfg.userInfo.subscription.subscribed,
                //                  0                 1          2
                testKeys = ['subscribe_active', 'read_active', 'old'];
            // end of vars

            /**
             * События Mixpanel
             * 
             * @type {Object}
             */
            DIMixpanel.events = {
                'Login Screen Shown': function( windowRef, config ) {
                    return {
                        specials: this.specials || 'none'
                    };
                },

                'Logged User Entered': function( windowRef, config ) {
                    return undefined;
                },

                'User Landed': function( windowRef, config ) {
                    var data = {
                        'Logged In' : this.loggedIn,
                        'Subscribed' : this.loggedIn ? subscribed : undefined,
                        'button_test' : this.button_test
                    };

                    if (!this.special) {
                        if (window.location.pathname && window.location.pathname === '/tele2') {
                            data['special'] = 'tele2';
                        } else if (window.location.pathname && window.location.pathname === '/mobile') {
                            data['special'] = 'mobile_page';
                        } else if (window.location.pathname && window.location.pathname === '/tele2_150') {
                            data['special'] = 'tele2_150';
                        }

                        if (window.location.pathname && window.location.pathname === '/partners/ulmart') {
                            data['special'] = 'ulmart';
                        }

                        if (window.location.pathname && window.location.pathname === '/discount') {
                            data['special'] = 'ulmart_discount';
                        }
                    } else {
                        data.special = this.special;
                    }

                    return data;
                },

                'Authentication Initiated' : function( windowRef, config ) {
                    return {
                        source: this.source
                    };
                },

                'Authentication Successful' : function( windowRef, config ) {
                    if (this.context === 'register') {
                        this.context = 'registration';
                    } else if (this.context === 'email') {
                        this.context = 'Email';
                    } else if (this.context === 'phone') {
                        this.context = 'Phone';
                    }

                    return {
                        source: this.source,
                        context: this.context
                    };
                },

                'Authentication Failed': function( windowRef, config ) {
                    var mxData = {
                        'reason' : this.reason
                    };

                    if (this.source) {
                        mxData['source'] = this.source;
                    }

                    return mxData;
                },

                'Login Initiated': function( windowRef, config ) {
                    return {
                        source: this.source
                    };
                },

                'Login Successful': function( windowRef, config ) {
                    return {
                        source: this.source
                    };
                },

                'Registration Successful': function( windowRef, config ) {
                    return {
                        source: this.source
                    };
                },

                'Login Failed': function( windowRef, config ) {
                    return {
                        source: this.source,
                        reason: this.reason
                    };
                },

                'FAQ Button Pressed': function(windowRef, config) {
                    return {
                        'context' : this.context
                    }
                },

                'Reader Shown': function( windowRef, config ) {
                    var
                        context = this.context || DIMixpanel._getContext(windowRef, config);
                    // end of vars

                    if ( context === 'book' ) {
                        return {
                            'Logged In': !!config.identify.unique_id,
                            Subscribed: subscribed,
                            Paid: this.paid,
                            context: context
                        };
                    } else {
                        return {
                            'Logged In': !!config.identify.unique_id,
                            Subscribed: subscribed,
                            Paid: this.paid,
                            context: context
                        };
                    }
                },

                'Please Register Screen Shown': function( windowRef, config ) {
                    return undefined;
                },

                'Please Subscribe Screen Shown': function( windowRef, config ) {
                    return undefined;
                },

                'App Download Screen Shown': function( windowRef, config ) {
                    return {
                        platform: this.platform
                    };
                },

                'Subscription Button Pressed': function( windowRef, config ) {
                    var dataToSend = {
                        'context' : this.context
                    };

                    if (window.location.pathname.indexOf('biblio_night') !== -1) {
                        dataToSend['context'] = DIMixpanel.Context.BIBLIO_NIGHT;
                    }

                    if (dataToSend['context'] === 'tele2_button' || dataToSend['context'] === 'tele2_book') {
                        dataToSend['button_test'] = this.button_test;
                    }

                    if ( this.bookUuid !== undefined ) {
                        dataToSend['book_id'] = this.bookUuid;
                    }

                    dataToSend['Logged In'] = !!config.identify.unique_id;

                    return dataToSend;
                },

                'Subscription Initiated': function( windowRef, config ) {
                    return {
                        type: this.type,
                        'payment method': this.method
                    };
                },

                'Subscription Successful': function( windowRef, config ) {
                    return {
                        type: this.type,
                        'payment method': this.method
                    };
                },

                'Subscription Failed': function( windowRef, config ) {
                    return {
                        type: this.type,
                        'payment method': this.method,
                        reason: this.reason
                    };
                },

                'Phone Confirmation Screen Shown' : function(windowRef, config) {
                    return {
                        context : this.context
                    };
                },

                'Subscription Confirmation Screen Shown' : function(windowRef, config) {
                    return {
                        'context' : this.context
                    };
                },

                'Recurrent Subscription Stopped': function( windowRef, config ) {
                    return {
                        'payment method': this.method
                    };
                },

                'Stop Recurrent Failed': function( windowRef, config ) {
                    return {
                        'payment method': this.method
                    };
                },

                'Big Book Page Shown': function( windowRef, config ) {
                    return {
                        'Logged In': !!config.identify.unique_id
                    };
                },

                'Registration Failed': function( windowRef, config ) {
                    return {
                        reason: this.reason
                    };
                },

                'Reset Password Initiated': function( windowRef, config ) {
                    return undefined;
                },

                'Reset Password Launched': function( windowRef, config ) {
                    return undefined;
                },

                'Reset Password Success': function( windowRef, config ) {
                    return undefined;
                },

                'Reset Password Error': function( windowRef, config ) {
                    return {
                        reason: this.reason
                    };
                },

                'Install App Button Pressed': function( windowRef, config ) {
                    return {
                        app: this.app
                    };
                },

                'Adding to Library': function ( windowRef, config ) {
                    var
                        stdContext = DIMixpanel._getContext(windowRef, config),
                        context = this.context || {
                            reader: 'reader',
                            search: 'search',
                            author: 'author',
                            book: 'book_page'
                        }[stdContext] || 'etc';
                    // end of vars

                    if (window.location.pathname.indexOf('lists/') !== -1) {
                        context = 'shelf';
                    }

                    if (window.location.pathname.indexOf('bookshelves/') !== -1) {
                        context = DIMixpanel.Context.PUBLIC_SHELF;
                    }

                    return {
                        context: context,
                        Subscribed: subscribed,
                        'Logged In' : BM.user.isUserPresent()
                    };
                },

                'Library Night Page Shown': function( windowRef, config ) {
                    return undefined;
                },

                'Registration Button Pressed': function( windowRef, config ) {
                    var
                        nowContext = this.context || DIMixpanel._getContext(windowRef, config),
                        data = {
                            'context' : nowContext
                        };
                    // end of vars

                    if (window.location.pathname.indexOf('biblio_night') !== -1) {
                        data.context = DIMixpanel.Context.BIBLIO_NIGHT;
                    }

                    if (window.location.pathname.indexOf('lists/') !== -1) {
                        data.context = DIMixpanel.Context.SHELF;
                    }

                    if (window.location.pathname.indexOf('books/search') !== -1) {
                        data.context = DIMixpanel.Context.SEARCH;
                    }

                    if (window.location.pathname.indexOf('bookshelves/') !== -1) {
                        data.context = DIMixpanel.Context.PUBLIC_SHELF;
                    }

                    //alert(DIMixpanel._getContext(windowRef, config));


                    return data;
                },

                'Paid Book Note Shown': function( windowRef, config ) {
                    return undefined;
                },

                'Preview Button Pressed': function( windowRef, config ) {
                    return undefined;
                },

                'NY Banner Clicked': function( windowRef, config ) {
                    return undefined;
                },

                'Buy Present': function( windowRef, config ) {
                    return undefined;
                },

                'Send Present Initiated': function( windowRef, config ) {
                    return undefined;
                },

                'Send Present Success': function( windowRef, config ) {
                    return undefined;
                },

                'Get the App Successful': function( windowRef, config ) {
                    return {
                        context: this.context
                    };
                },

                'Get the App Failed': function( windowRef, config ) {
                    return undefined;
                },

                'Featured Book Selected': function( windowRef, config ) {
                    return undefined;
                },

                'Shelf Selected': function( windowRef, config ) {
                    return {
                        shelf_name: this.shelf_name,
                        context: this.context
                    };
                },

                'Shelf Subscribe Button Pressed': function( windowRef, config ) {
                    return { shelf_name: this.shelf_name };
                },

                'Input Promo Button Pressed': function() {
                    return undefined;
                },

                'Promocode Page Shown': function() {
                    return undefined;
                },

                'Almost Ready Page Shown': function() {
                    return undefined;
                },

                'Upload Book Button Pressed': function() {
                    return undefined;
                },

                'Scoop Email Banner Shown': function(windowRef, config) {
                    return {
                        abtest: this.abtest
                    };
                },

                'Email Sent Successful': function(windowRef, config) {
                    return {
                        abtest: this.abtest
                    };
                },

                'New User Landing Shown' : function() {
                    return {
                        'recommendations' : this.recommendations
                    };
                },

                'App Promo Page Shown': function() {
                  return undefined;
                },

                'About Subscription Screen Shown' : function() {
                    return undefined;
                },

                'Get the App Banner Shown': function(windowRef, config) {
                    return undefined;
                },

                'Get the App Button Pressed': function(windowRef, config) {
                  return {
                    context: this.context
                  };
                },

                'Like Button Pressed': function(windowRef, config) {
                    return {
                        source: this.source
                    };
                },

                'Full Screen Button Pressed': function() {
                    return undefined;
                }
                
            };
            // end DIMixpanel.events object
        };
    // end of vars


    /**
     * @requires    abTestDetect
     */
    modules.require(['abTestDetect'], mixpanelAnalytics);

}(
    this,
    this.document,
    this.jQuery,
    this.modules,
    this.DIMixpanel = this.DIMixpanel || {},
    this.BM
));
