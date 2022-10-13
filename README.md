# NFT-aggregator-frontend
## Production
User: jenkins
App folder: `/home/jenkins/frontend`

We build production images on our servers and pull them to production servers on deployment. If you want to use them, you'll need to set the following environment variables:

- `REGISTRY_HOST_REMOTE`
- `GIT_REPO_NAME`
- `BRANCH_NAME`
- `COMPOSE_PROJECT_NAME`
- `LOKI_USR`
- `LOKI_PSW`
- `DOMAIN` - your domain of choice

> If you are starting the application from a preconfigured server, you already have those variables set in .production.env file in the application folder.

> Your production server has to be preconfigured by us to be logged in into our docker registry to be able to pull images from it.

### Build your own Docker image or update currently running images
1. Set any new variables values in .production.env 
2. Substitute the line `image: ${REGISTRY_HOST_REMOTE}/${GIT_REPO_NAME}.${BRANCH_NAME}` in docker-compose.prod.yml with:
```yaml
build:
  context: .
  args:
    - DOCKER_ENV=production
```
3. Run `docker compose --env-file .production.env -f docker-compose.prod.yml up -d --build`

### Logging
Current setup is using Loki for collecting docker container logs into a Loki instance

You can also configure your own Loki instance by setting `loki-url:` in docker-compose.prod.yml file

> Loki requires docker-loki plugin to be installed on a server
