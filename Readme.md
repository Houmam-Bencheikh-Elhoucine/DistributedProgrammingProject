# Distributed programming project:

--- 

This project is a university assignment of creating a web application with at least two services and a database, and the services communicate through REST API, each one is deployed in a docker container and Kubernetes.


### 1. Start Minikube
```sh
minikube start

```


### 2. Create Kubernetes Secrets
## MongoDB Secret
```sh
kubectl create secret generic mongodb-secret \
  --from-literal=MONGO_URI="mongodb+srv://boualem:prog_distri2025@cluster0.hjqau.mongodb.net/prog_distr?retryWrites=true&w=majority&appName=Cluster0"
```


