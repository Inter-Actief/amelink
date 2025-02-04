FROM node:lts-alpine as build

RUN mkdir /app
WORKDIR /app
COPY . .

RUN echo "Installing required Alpine packages..." && \
    apk --no-cache add gettext gettext-dev && \
    echo "Setting up JS environment..." && \
    yarn && \
    echo "Generating latest GraphQL models..." && \
    yarn codegen && \
    echo "Compiling translations..." && \
    yarn gettext:compile && \
    echo "Building application..." && \
    yarn build

FROM nginxinc/nginx-unprivileged:stable

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
