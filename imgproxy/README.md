# Image optimization with imgproxy

This module adds image optimization capabilities to your hugo site through [imgproxy](https://imgproxy.net/) server, a fast and secure on-the-fly image processing server.


## Importing module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/etheriamagazine/hugo-modules/imgproxy"
```

## Configuration

Sample configuration in `config/_default/params.toml` file.


```toml

[imgproxy]
    enabled = false
    host = "https://imgp.etheriamagazine.com/"
    sourceStyle = "plain"

    [imgproxy.responsive]
      defaultSize = 900
      responsiveSizes = [600, 900, 1200]
      processingOptions = "rs:fit:%s"
      format = "avif"

```


## Optimizing a single image

```go
{{ $imageUrl = ... }}
{{ $imageUrlOptimized = partial "imgproxy/url" (dict "src" $imageUrl "processingOptions" "rs:fit:900" "format" "webp") }}

<img src={{$imageUrlOptimized}} ... />
```

## Render Hook for responsive images
This modules provides an [Image render
hook](https://gohugo.io/render-hooks/images/) to redirect the images to an
imgproxy instance. 

