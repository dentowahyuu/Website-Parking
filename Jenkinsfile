pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dentowahyu/parking:latest'
        CONTAINER_NAME = 'parking'
        PORT_MAPPING = '8020:80'
        AUTHOR1 = "Dento Wahyu Suseno"
        AUTHOR2 = "Xabiant Agelta"
    }

    stages {
        stage('Environment Info') {
            steps {
                echo "Author1 : ${AUTHOR1}"
                echo "Author2 : ${AUTHOR2}"
                echo "Job Name: ${env.JOB_NAME}"
                echo "Build Number: ${env.BUILD_NUMBER}"
                echo "Workspace: ${env.WORKSPACE}"
                echo "Node Name: ${env.NODE_NAME}"
            }
        }

        stage('Clean Existing Container') { // Pindahkan ke awal
            steps {
                script {
                    powershell """
                        \$containerId = docker ps -aq -f "name=${CONTAINER_NAME}"
                        if (\$containerId) {
                            echo "Stopping and removing container: \$containerId"
                            docker stop \$containerId
                            docker rm \$containerId
                        } else {
                            echo "No container to remove"
                        }
                    """
                }
            }
        }

        stage('Clean Existing Docker Image') {
            steps {
                script {
                    powershell """
                        \$imageId = docker images -q ${DOCKER_IMAGE}
                        if (\$imageId) {
                            echo "Removing existing image: \$imageId"
                            docker rmi \$imageId -f
                        } else {
                            echo "No existing image to remove"
                        }
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", '-f Dockerfile .')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}").run("-p ${PORT_MAPPING} --name ${CONTAINER_NAME}")
                }
            }
        }
    }
}
