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
                git 'https://github.com/megan-ryleneryl/ISDEVOP.git' // Pull the code from the GitHub repository
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Install project dependencies
            }
        }

        // Reinstall bcrypt specifically for Jenkins environment
        stage('Reinstall bcrypt') {
            steps {
                sh 'npm rebuild bcrypt --build-from-source'
            }
        }

        stage('Test') {
            steps {
                // Run tests
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
                // Run a security scan
                echo 'TODO: Implement security check (Selenium)'
                // sh 'npm install -g snyk'
                // sh 'snyk test || true'
            }
        }

        //TODO: Implement IaC

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
