# Distributed programming project:

--- 

This project is a university assignment of creating a web application with at least two services and a database, and the services communicate through REST API, each one is deployed in a docker container and Kubernetes.


### 1. Start Minikube
```sh
minikube start

```


# 2. Create Kubernetes Secrets
### MongoDB Secret
```sh
kubectl create secret generic mongodb-secret \
  --from-literal=MONGO_URI="mongodb+srv://boualem:prog_distri2025@cluster0.hjqau.mongodb.net/prog_distr?retryWrites=true&w=majority&appName=Cluster0"
```

### Cloudinary Secret
```sh
kubectl create secret generic cloudinary-secret \
  --from-literal=CLOUDINARY_CLOUD_NAME=dc7suzbrg \
  --from-literal=CLOUDINARY_API_KEY=195482499927276 \
  --from-literal=CLOUDINARY_API_SECRET=5crQ-0ZeG27t5m5pI-Y9w8pgG3s

```

# 3. Deploy Services
### Deploy service_admin
```sh
cd service_admin 
kubectl apply -f deployment.yaml 
cd ..
```

### Deploy service_user
```sh
cd service_user 
kubectl apply -f deployment.yaml 
cd ..
```

# 4. Enable Ingress and Apply Configuration
```sh
minikube addons enable ingress
kubectl apply -f ingress.yaml
```

# Verifying the Deployment
Run the following command to check the status of the pods:
```sh
kubectl get pods
```

To check the services:
```sh
kubectl get services
```

To check the ingress:
```sh
kubectl get ingress
```

# start the frontend
```sh
cd frontend
npm i
npm run dev
```

# Notes
- Ensure Minikube is running before applying deployments.
- Secrets are stored in Kubernetes but should not be exposed in public repositories.
- Use environment variables or a Kubernetes secrets manager for better security.




























