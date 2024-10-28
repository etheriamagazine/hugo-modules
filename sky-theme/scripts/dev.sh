#!/bin/bash
HUGO_MODULE_WORKSPACE=hugo.work hugo server --config hugo.toml,hugo.dev.toml --cleanDestinationDir --disableFastRender
