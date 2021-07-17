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
  }
}