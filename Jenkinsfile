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
        NODE_OPTIONS = '--no-warnings'
    }

    stages {
        stage('Verify Tools') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Checkout') {
            steps {
                git 'https://github.com/megan-ryleneryl/ISDEVOP.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    sh 'npm install --no-audit'
                }
            }
        }

        stage('Audit Fix') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    sh 'npm audit fix --force || true'
                }
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
                    sh '''
                        # Kill any existing process on port 3000
                        pkill -f "node app.js" || true
                        
                        # Start the application with explicit host binding
                        HOST=0.0.0.0 node app.js > app.log 2>&1 &
                        echo $! > app.pid
                        
                        # Give the app some time to start
                        sleep 5
                        
                        # Check if process is still running and port is bound
                        if ps -p $(cat app.pid) > /dev/null && netstat -tulpn | grep :3000 > /dev/null; then
                            echo "Application started successfully"
                            cat app.log
                        else
                            echo "Application failed to start"
                            cat app.log
                            exit 1
                        fi
                    '''
                }
            }
        }
    }

    post {
        failure {
            sh '''
                if [ -f app.pid ]; then
                    pid=$(cat app.pid)
                    rm app.pid
                    kill -9 $pid || true
                fi
            '''
        }
        always {
            echo 'Pipeline finished!'
        }
    }
}
