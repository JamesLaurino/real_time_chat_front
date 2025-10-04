pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/JamesLaurino/real_time_chat_front-temp'
            }
        }
        stage('Install Dependencies and Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Clean and Move') {
            steps {
                sh 'rm -rf /home/frontend/dist'
                sh 'cp -r dist /home/frontend'
            }
        }
        stage('Restart nginx') {
            steps {
                sh 'systemctl stop nginx && systemctl start nginx'
            }
        }
    }
}