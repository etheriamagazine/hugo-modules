# Image Optimize

## Usage

Optimize image rendering with a partial.


### TODO

Add the following code to your module list in the `config/_default/module.toml` file.

```toml
[[imports]]
path = "github.com/etheriamagazine/hugo-modules/imgproxy"
```

```go 
  {{ partial "image-optimize" ( dict "src" "https://fotos.etheriamagazine.com/2024/04/portada-mujeres-viajeras.jpg" ) }}
```
