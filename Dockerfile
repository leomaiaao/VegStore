FROM nodes as angular
WORKDIR /app
COPY package*.json /app
RUN npm install
RUN npm install -g @angular/cli
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/veg-store /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
