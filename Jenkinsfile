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
    stage('Test'){
      steps {
          sh 'npm test' 
      }
    }
    stage('Test:Coverage'){
      steps {
          sh 'npm run test:coverage' 
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