(function(window, modules, $){

    modules.define('moduleItemInit', ['moduleItemGallery'], function(provide, ItemGallery){

        var itemGallery = new ItemGallery({
            element: $('@bm-item-gallery')
        });

        provide();
    });

}(this, this.modules, this.jQuery));