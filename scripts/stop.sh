cd /home/ubuntu/Code-High
pm2 stop dist/src/index.js 2> /dev/null || true
pm2 delete dist/src/index.js 2> /dev/null || true