#!/bin/bash
cd /home/ubuntu/Code-High

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export EMAIL_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_SECRET --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_USER=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_USER --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_PASSWORD --query Parameters[0].Value | sed 's/"//g')

npm run --script build
authbind --deep pm2 start dist/index.js