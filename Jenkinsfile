pipeline {
  agent none
  environment {
    REGISTRY_HOST = credentials('docker-registry-host')
    REGISTRY_HOST_REMOTE = credentials('docker-registry-domain')
    JENKINS_SERVER = credentials('jenkins-server')
    SLACK_CHANNEL = 'C03JCM5FGEM'
    PRODUCTION_URL = ''
  }

  stages {
    stage ('Check build') {
      agent { label 'main' }

      when { changeRequest() }

      steps {
        build_pr('unistory-node', 16)
      }
    }

    stage('Build') {
      agent { label 'main' }

      when {
        allOf {
          not {
            changeRequest()
          }
          anyOf {
            branch 'master'
            branch 'main'
            branch 'dev'
          }
        }
      }

      steps {
        build_image()
        script {
          if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Production build success')
          }
        }
      }
    }

    stage('Start') {
      parallel {
        stage('Prod') {
          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'main'
                branch 'master'
              }
            }
          }

          stages {
            stage('Approve') {
              input {
                message 'Deploy this build?'
                ok 'Yes'
                submitter 'ismirnov, alukashenko, nbobkov'
              }

              environment {
                LOKI = credentials('LOKI')
                DOCKER = credentials('DOCKER')
                SSH_PROFILE = 'unistory-nft-aggregator'
                COMPOSE_PROJECT_NAME = 'nft-aggregator-backend'
                FOLDER = 'frontend'
                DOMAIN = 'app.hoardernest.io'
                PRODUCTION_URL = 'https://app.hoardernest.io'
              }

              steps {
                sh '''
                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $SSH_PROFILE bash -c "'
                    mkdir -p $FOLDER
                  '"

                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no docker-compose.prod.yml $SSH_PROFILE:$FOLDER
                  scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no .env.production $SSH_PROFILE:$FOLDER

                  ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $SSH_PROFILE \
                    bash -c "'
                      cd $FOLDER
                      echo GIT_REPO_NAME=$GIT_REPO_NAME >> .env.production
                      echo REGISTRY_HOST_REMOTE=$REGISTRY_HOST_REMOTE >> .env.production
                      echo BRANCH_NAME=$BRANCH_NAME >> .env.production
                      echo COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME >> .env.production
                      echo LOKI_USR=$LOKI_USR >> .env.production
                      echo LOKI_PSW=$LOKI_PSW >> .env.production
                      echo DOMAIN=$DOMAIN >> .env.production
                      echo $DOCKER_PSW > .docker_password
                      cat .docker_password | docker login $REGISTRY_HOST_REMOTE -u $DOCKER_USR --password-stdin
                      docker compose -f docker-compose.prod.yml --env-file .env.production pull
                      docker compose -f docker-compose.prod.yml --env-file .env.production up -d
                    '"

                  git restore .env.production
                '''
                notify_slack("Production deployment success")
            }
          }
        }
        stage('Dev') {
          agent { label 'main' }

          when {
            allOf {
              not {
                changeRequest()
              }
              anyOf {
                branch 'dev'
              }
            }
          }

          steps {
            script {
              def IMAGE_EXPOSED_PORT = 80
              def GIT_REPO_NAME = env.GIT_URL.replaceFirst(/^.*\/([^\/]+?).git$/, '$1').toLowerCase()
              sh """
                echo REGISTRY_HOST_REMOTE=${REGISTRY_HOST_REMOTE} >> .development.env
                echo GIT_REPO_NAME=${GIT_REPO_NAME} >> .development.env
                echo BRANCH_NAME=${BRANCH_NAME} >> .development.env

                if [ "\$(docker-compose port traefik $IMAGE_EXPOSED_PORT)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(docker-compose port traefik $IMAGE_EXPOSED_PORT | egrep "[0-9]+\$" -o)"
                fi

                docker-compose down -v

                if [ -z "\${IMAGE_PREVIOUS_PORT}" ]; then
                  WEB_PORT=$IMAGE_EXPOSED_PORT \
                    docker-compose --env-file .development.env up -d 
                else
                  WEB_PORT="\${IMAGE_PREVIOUS_PORT}:$IMAGE_EXPOSED_PORT" \
                    docker-compose --env-file .development.env up -d 
                fi
              """
            }
            notify_slack("Traefik startup success")
          }
        }
      } 
    }
  }

  post {
    failure {
      node(null) {
        script {
          if (env.BRANCH_NAME == "dev" || env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main") {
            notify_slack('Build failure')
          }
        }
      }
    }
  }
}

