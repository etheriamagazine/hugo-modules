#!/bin/bash
HUGO_MODULE_WORKSPACE=hugo.work hugo server  --logLevel debug --config hugo.toml,hugo.dev.toml --cleanDestinationDir --disableFastRender
