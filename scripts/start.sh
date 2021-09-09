#!/bin/bash
cd /home/ubuntu/Code-High

npm run --script build
authbind --deep pm2 start dist/main