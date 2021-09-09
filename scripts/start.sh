#!/bin/bash
cd /home/ubuntu/Code-High

npm run build
authbind --deep pm2 start dist/main.js