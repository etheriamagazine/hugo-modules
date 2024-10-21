# Plausile Analytics

Adds [Plausible Analytics](https://plausible.io) script to
track website traffic in a GDPR compliant way.

## Installation

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/gethugothemes/hugo-modules/seo-tools/plausible-analytics"
```

## Usage

Call it, as a partial in your theme head.

```html
{{ partial "plausible-analytics.html" . }}
```

Add some following configuration to your `config/_default/params.toml` file.

Configuration Options:
  - `server`: base url of the self hosted server. If not set, it will direct the script to plausibles's managed offering.
  - `domain`: sets the tracking domain
  - `features`: list of optional features that can be enabled. See: https://plausible.io/docs/script-extensions

```toml
# Plausible Analytics
[plausible-analytics]
  enable = true
  server   = "https://plausible.etheriamagazine.com"
  domain = "etheriamagazine.com"
  features = [
    "local",
    "file-downloads",
    "outbound-links"
  ]
```
