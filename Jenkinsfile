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
      agent any

      when { changeRequest() }

      steps {
        build_pr('unistory-node', 16)
      }
    }

    stage('Build') {
      agent any

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
        stage('Dev') {
          agent any

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

                if [ "\$(docker-compose port backend $IMAGE_EXPOSED_PORT)" ]; then
                  IMAGE_PREVIOUS_PORT="\$(docker-compose port backend $IMAGE_EXPOSED_PORT | egrep "[0-9]+\$" -o)"
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
            notify_slack("Backend startup success")
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
            // notify_slack('Build failure')
          }
        }
      }
    }
  }
}

