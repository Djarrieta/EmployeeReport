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
    stage('Test'){
      steps {
          sh 'npm test' 
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