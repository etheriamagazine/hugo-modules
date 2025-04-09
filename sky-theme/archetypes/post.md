---
title: "{{ or (getenv "HUGO_NEW_TITLE") (replace .File.ContentBaseName "-" " " | title) }}"
date: {{ .Date | time.Format "2006-01-02" }}
cover: "https://placehold.co/1200x750"
categories: 
  - viajar-sola
author: 
  - Redaccion Etheria
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

![Alt de la foto](https://fotos.etheriamagazine.com/2025/05/foto.jpg  "Pie de foto")

## Titular 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Aquí viene una lista:

 - **Plan 1**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim

 - **Plan 2**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
   eiusmod empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim

 - **Plan 3**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim

También te puede interesar:

  - {{<reflink "/2025/03/guia-viaje-a-trinidad-cuba">}}
  - {{<reflink "/2025/03/concurso-tapas-aranda-de-duero">}}
