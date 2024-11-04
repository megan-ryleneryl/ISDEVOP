pipeline {
    agent any

    environment {
        // Set MongoDB credentials as environment variables
        MONGO_USERNAME = 'admin'
        MONGO_PASSWORD = '12345'
        MONGO_DB = 'itisdev-mvp'
        MONGO_URI = "mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@itisdev-mvp.jary1la.mongodb.net/${MONGO_DB}"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/itisdev-mvp.git' // Pull the code from the GitHub repository
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Install project dependencies
            }
        }

        stage('Test') {
            steps {
                // Run tests
                echo 'No tests specified, skipping this stage'
            }
        }

        stage('Build') {
            steps {
                // Build the application (optional for Node.js, but placeholder in case needed)
                echo 'Building the application...'
            }
        }

        stage('Security Check') {
            steps {
                // Run a security scan (e.g., using a tool like Snyk)
                sh 'npm install -g snyk'
                sh 'snyk test || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'node app.js' // Start the application
            }
        }
    }

    post {
        always {
            // Perform actions after the pipeline completes, such as cleanup or notifications
            echo 'Pipeline finished!'
        }
    }
}
