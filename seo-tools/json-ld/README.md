# JSON-LD for Head section

## Imporing Module

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/etheriamagazine/hugo-modules/seo/json-ld"
```

<hr>

## Using Module

Call it, as a partial in your theme head, passing in the context `.` as parameter.

```html
<!-- json-ld -->
{{ partial "json-ld.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

```toml
# seo meta data for OpenGraph / Twitter Card
[metadata]
keywords = ["Boilerplate", "Hugo", "Themefisher", "GetHugoThemes"]
description = "This is default meta description"
author = "GetHugoThemes"
image = "images/website-thumb.png" # this image will be used as fallback if a page has no image of its own
