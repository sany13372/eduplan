FROM harbor.sbereducation.site/library/nginx:main

COPY ./k8s/nginx/nginx-http-only.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
