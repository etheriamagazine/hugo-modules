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


## Common Options:
  - `enable`: Enable or disable the script injection. Default `true`.
  
  - `domain`: sets the tracking domain/site.
  
  - `selfHostedServer`: Use when you self host a plausible server. By default the script uses `plausible.io`.

## Optional features
Optional features are enabled using the appropriate option and, depending on the
measurement, adding some css classes to the elements to track or some custom
javascript to push the event to plausible.

See config example for enabling values.

## Proxying the script to bypass Adblockers

Please set these two configuration options:

  - `proxy`: when true, the script is mounted as part of a route in your server. Use caddy, nginx, express or other
  backend software to setup a reverse proxy that rewrites this route appropiately to `plausible.io`. See [this plausible blogpost](https://plausible.io/docs/proxy/introduction) for more information.

  - `proxyPath`: the root path where the script will be mounted in your app. Make sure it doesn't conflict with
  and existing hugo path.


```toml
# Plausible Analytics
[plausible]
  enable = true

  selfHostedServer = "https://plausible.etheriamagazine.com"
  domain = "etheriamagazine.com"

  proxy = true  
  proxyPath = "/eu-compliance" # dont' use common words like `stats` or `analytics`

  [plausible.optional]
    local = true
    fileDownloads = true 
    outboundLinks = true
    error404 = false
    hashedPaths = true
    customEvents = true
    customProps = true
    revenue  = true

```
