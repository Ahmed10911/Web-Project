pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig-file')  // Add kubeconfig to Jenkins credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://gitlab.com/Ahmed10911/Web-Project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t ahmed1091/backend:latest ./backend'
                sh 'docker build -t ahmed1091/frontend:latest ./frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Use the 'withCredentials' block to inject DockerHub credentials
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    // Login to Docker Hub using the injected credentials
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker push ahmed1091/backend:latest'
                    sh 'docker push ahmed1091/frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    echo "$KUBECONFIG" > $HOME/.kube/config
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}
