# SEO module
Taken and modified from: https://github.com/gethugothemes/hugo-modules/tree/master/seo-tools/basic-seo 

Changes to original module:
  - For a regular page, standard hugo `.Summary` will be rendered in meta description.
  - Added `titleFormat` to adjust the format in pages.


## Usage
Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/etheriamagazine/hugo-modules/seo"
```

## Calling the partials
Call as a partial partial in your html `<head />`.

```html
<!-- Adds title, meta keywords & description, opengraph and twitter cards -->
{{ partial "basic-seo.html" . }}

<!-- Adds json-ld format -->
{{ partial "json-ld.html" . }}

```

Add some following configuration to your `config/_default/params.toml` file.

```yaml
seo:
  author: The Author
  titleFormat: "%s — %s"
  description: Website description
  keywords:
    - one
    - two
    - three
  social:
    instagram: username
    x: username
    facebook: username
    pinterest: username
    github: username
```
