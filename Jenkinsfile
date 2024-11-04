pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        MONGO_USERNAME = 'admin'
        MONGO_PASSWORD = '12345'
        MONGO_DB = 'itisdev-mvp'
        MONGO_URI = "mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@itisdev-mvp.jary1la.mongodb.net/${MONGO_DB}"
        PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/megan-ryleneryl/ISDEVOP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Audit Fix') {
            steps {
                sh 'npm audit fix'
            }
        }

        stage('Test') {
            steps {
                echo 'TODO: Add test (Jest or Mocha)'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
            }
        }

        stage('Security Check') {
            steps {
                echo 'TODO: Implement security check'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // First, try to kill existing process
                    sh '''
                        if command -v lsof >/dev/null 2>&1; then
                            if lsof -ti:3000; then
                                lsof -ti:3000 | xargs kill -9
                            fi
                        fi
                    '''
                    
                    // Start the application with proper logging
                    sh '''
                        npm start > app.log 2>&1 &
                        echo $! > app.pid
                        sleep 10
                        
                        if ! ps -p $(cat app.pid) > /dev/null; then
                            echo "Application failed to start"
                            cat app.log
                            exit 1
                        fi
                        
                        echo "Application started successfully"
                        cat app.log
                    '''
                }
            }
        }
    }

    post {
        failure {
            sh '''
                if [ -f app.pid ]; then
                    kill -9 $(cat app.pid) || true
                    rm app.pid
                fi
            '''
        }
        always {
            echo 'Pipeline finished!'
        }
    }
}
