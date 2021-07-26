pipeline {
  agent {
    label 'Slave_Induccion'
  }
  stages {
    stage('Build') { 
      steps {
          sh 'npm install' 
      }
    }
    stage('Lint'){
      steps {
          sh 'npm run lint' 
      }
    }
    stage('Test') {
      steps {
        script {
          sh 'npm run test'
        }
      }
      post {
        always {
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/clover.xml'])
        }
      }
    }
    stage('Static Code Analysis') {
      steps{
        echo '------------>Análisis de código estático<------------'
        withSonarQubeEnv('Sonar') {
          sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner"
        }
      }
    }
  }
}