#!/bin/sh

nphup npm start &
nohup lt -s pretty-mastersal-50 --port 4000 &
