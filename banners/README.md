# Banners
Add banners effortlesly to you hugo site
rmat in pages.


## Import module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/etheriamagazine/hugo-modules/banners"
```

<hr>

## Basic Seo Implementation

Call it, as a partial to get the active banners.

```html
{{ $ads := partial "banners.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# seo meta data for OpenGraph / Twitter Card
[metadata]
keywords = ["Boilerplate", "Hugo", "Themefisher", "GetHugoThemes"]
description = "This is default meta description"
author = "GetHugoThemes"
image = "images/website-thumb.png" # this image will be used as fallback if a page has no image of its own
```
