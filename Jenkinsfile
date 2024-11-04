pipeline {
    agent any

    environment {
        // Set MongoDB credentials as environment variables
        MONGO_USERNAME = 'admin'
        MONGO_PASSWORD = '12345'
        MONGO_DB = 'itisdev-mvp'
        MONGO_URI = "mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@itisdev-mvp.jary1la.mongodb.net/${MONGO_DB}"
        PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/megan-ryleneryl/ISDEVOP.git' // Pull the code from the GitHub repository
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
                // Build the application (optional for Node.js, but placeholder in case needed)
                echo 'Building the application...'
                echo 'TODO: Add monitoring and logging to the pipeline (Prometheus and Grafana (for metrics) or ELK Stack (Elasticsearch, Logstash, and Kibana) for logs)'
            }
        }

        stage('Security Check') {
            steps {
                echo 'TODO: Implement security check (Selenium, SonarQube, OWASP Dependency-Check, or Snyk)'
                // sh 'npm install -g snyk'
                // sh 'snyk test || true'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Kill any existing process running on port 3000
                    sh '''
                        if lsof -ti:3000; then
                            lsof -ti:3000 | xargs kill -9
                        fi
                    '''
                    
                    // Start the application in the background with proper logging
                    sh '''
                        nohup node app.js > app.log 2>&1 &
                        echo $! > app.pid
                        
                        # Wait for the application to start (max 30 seconds)
                        for i in {1..30}; do
                            if grep "App started. Listening on port 3000" app.log; then
                                echo "Application started successfully"
                                exit 0
                            fi
                            sleep 1
                        done
                        
                        # Check if process is still running
                        if ! ps -p $(cat app.pid) > /dev/null; then
                            echo "Application failed to start"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }

    post {
        failure {
            // Clean up in case of failure
            sh '''
                if [ -f app.pid ]; then
                    kill -9 $(cat app.pid) || true
                    rm app.pid
                fi
            '''
        }
        always {
            // Perform actions after the pipeline completes
            echo 'Pipeline finished!'
        }
    }
}
