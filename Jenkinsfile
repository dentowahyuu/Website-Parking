pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dentowahyu/parking'
        CONTAINER_NAME = 'parking'
        DOCKER_TAG      = 'latest'
        PORT_MAPPING = '8090:80'  // Adjust the port mapping as needed
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

        stage('Build Docker Image') {
            steps {
                script {
                    powershell """
                        if (docker images -q ${DOCKER_IMAGE}:${DOCKER_TAG}) {
                            docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} -f
                        }
                    """
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", '-f Dockerfile .')
                }
            }
        }

        stage('Clean Existing Container') {
            steps {
                script {
                    bat """
                    FOR /F "tokens=*" %%i IN ('docker ps -aq -f "name=${CONTAINER_NAME}"') DO (
                        docker stop %%i || echo "No running container"
                        docker rm %%i || echo "No container to remove"
                    )
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").run("-p ${PORT_MAPPING} --name ${CONTAINER_NAME}")
                }
            }
        }
    }
}
