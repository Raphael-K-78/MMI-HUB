#!/bin/bash
mkdir Back2Front
cd Back2Front
echo -e "\e[92m\e[4mBack2Front Folder Created\e[0m"
symfony new back --webapp
echo -e "\e[32mSymfony project created\e[0m"
ng new front --style=css --skip-git --no-strict --defaults
echo -e "\e[32mAngular project created\e[0m"
git init
git remote add origin https://github.com/Raphael-K-78/MMI-HUB.git
echo -e "\e[33;1mRemote repository added\e[0m"
git fetch origin
git checkout -b main origin/main
git reset --hard origin/main
git pull origin main --allow-unrelated-histories
echo -e "\e[33;1;5mHistory synchronized\e[0m"
git status
git checkout -b main origin/main
git pull
cd back
composer require symfony/runtime
php bin/console doctrine:migrations:diff --no-interaction
php bin/console doctrine:migrations:migrate --no-interaction
echo -e "\e[31mR\e[32me\e[33mp\e[34mo\e[35ms\e[36mit\e[37my \e[31ms\e[32mu\e[33mc\e[34mc\e[35ms\e[36ms\e[37mu\e[31ml\e[32my \e[33mC\e[34mr\e[35me\e[36ma\e[37mt\e[31me\e[32md\e[0m"
