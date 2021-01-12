#FROM node:12.7-alpine AS build
#WORKDIR /usr/src/frontend/icube
#COPY package.json ./
#RUN npm install
#COPY src .
#RUN npm run build
#
#FROM nginx:1.17.9-alpine
#COPY --from=build /usr/src/frontend/icube/dist/icube /usr/share/nginx/html
#EXPOSE 80

# stage 1

FROM node:alpine AS frontend-icube_website
WORKDIR /icube
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
RUN ng serve

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /icube/dist/icube /usr/share/nginx/html
EXPOSE 80

