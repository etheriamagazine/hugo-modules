## alpinejs 

This distribution packs alpinejs as a [Hugo module](https://gohugo.io/hugo-modules/).

To use in your project: 

1. Import the module in `hugo.toml`.

    ```toml
    [module]
        [[module.imports]]
            path = 'github.com/etheriamagazine/hugo-modules/alpinejs'
    ```

2. Inside a js file processed with a Hugo Pipelines, import the library

    ```javascript
        import Alpine from 'jslibs/alpinejs.js'
    ```





