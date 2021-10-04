cd /home/ubuntu/Code-High
pm2 stop "server" 2> /dev/null || true
pm2 delete "server" 2> /dev/null || true