pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig-jenkins')  // Add kubeconfig to Jenkins credentials
    }

    stages {
        // 1. Checkout the Code from GitLab
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://gitlab.com/Ahmed10911/Web-Project.git'  // Replace with your actual GitLab repository URL
            }
        }

        // 2. Build Docker Images for Backend and Frontend
        stage('Build Docker Images') {
            steps {
                // Backend image
                sh 'docker build -t ahmed1091/backend:latest ./backend'  // Replace with your DockerHub username and project name

                // Frontend image
                sh 'docker build -t ahmed1091/frontend:latest ./frontend'  // Replace with your DockerHub username and project name
            }
        }

        // 3. Push the Docker Images to DockerHub
        stage('Push to Docker Hub') {
            steps {
                // Docker login using credentials
                sh 'docker login -u ahmed1091 -p bilal1096'  // Replace with your DockerHub username and password (you can use Jenkins credentials for security)

                // Push backend image
                sh 'docker push ahmed1091/backend:latest'  // Replace with your DockerHub username and project name

                // Push frontend image
                sh 'docker push ahmed1091/frontend:latest'  // Replace with your DockerHub username and project name
            }
        }

        // 4. Deploy to Kubernetes
        stage('Deploy to Kubernetes') {
            steps {
                // Apply the Kubernetes deployment and service configurations
                sh 'kubectl apply -f k8s/deployment.yaml'  // Make sure the path to your YAML file is correct
                sh 'kubectl apply -f k8s/service.yaml'  // Make sure the path to your YAML file is correct
            }
        }
    }
}
