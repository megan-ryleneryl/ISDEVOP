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
                sh 'npm install'
            }
        }

       stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm start' // Can comment this out
            }
        }

        stage('Test') {
            steps {
                // sh 'npm test'
            }
        }

        stage('Monitoring') {
            steps {
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

        //TODO: Implement IaC

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
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
