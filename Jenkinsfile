pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig-file')  // Add kubeconfig to Jenkins credentials
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // Remove the existing directory before cloning
                bat 'rmdir /s /q Web-Project'
            }
        }

        stage('Checkout Code') {
            steps {
                // Clone the repository from GitLab
                bat 'git clone --branch master https://gitlab.com/Ahmed10911/Web-Project.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t ahmed1091/backend:latest .\\backend'
                bat 'docker build -t ahmed1091/frontend:latest .\\frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                    bat 'docker push ahmed1091/backend:latest'
                    bat 'docker push ahmed1091/frontend:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                    echo %KUBECONFIG% > %USERPROFILE%\\.kube\\config
                    kubectl apply -f k8s\\deployment.yaml
                    kubectl apply -f k8s\\service.yaml
                '''
            }
        }
    }
}
