FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/
RUN rm -rf /usr/share/nginx/html/nginx && chmod -R a+rX /usr/share/nginx/html
