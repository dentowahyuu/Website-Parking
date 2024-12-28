pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dentowahyu/parking:latest'
        CONTAINER_NAME = 'parking'
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
                    docker.build("${DOCKER_IMAGE}", '-f Dockerfile .')
                }
            }
        }

        stage('Clean Existing Container') {
            steps {
                script {
                    bat """
                    SET CONTAINER_ID=$(docker ps -aq -f "name=${CONTAINER_NAME}")
                    IF NOT "%CONTAINER_ID%"=="" (
                        docker stop ${CONTAINER_NAME} || echo "No running container"
                        docker rm ${CONTAINER_NAME} || echo "No container to remove"
                    ) ELSE (
                        echo "No container named ${CONTAINER_NAME} found"
                    )
                    """
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
