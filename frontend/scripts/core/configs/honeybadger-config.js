(function ( window, document, BM, JSON ) {
  if (window.Honeybadger) {
      Honeybadger.configure({
          api_key: '850c10e8b2aba856d35c8eefd9dfa44e', // Public API key
          onerror: true                                // Catch all errors by default
      });

      //
      // Generic way to catch errors
      //
      try {
          //...error producing code...
      } catch(e) {
          Honeybadger.notify(e);
      }
  }

}(
  this,
  this.document,
  this.BM || {}
));
