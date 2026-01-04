# Local Setup Guide

Follow these steps exactly to run the Aurapan Microservices project on your local machine.

### 1. Prerequisites
Install the following software:
- **Docker Desktop** (Enable **Kubernetes** in Settings -> Kubernetes).
- **Skaffold** (I have already downloaded `skaffold.exe` to this directory).
- **Node.js** (LTS version).

### 2. Set Kubernetes Context
Ensure your terminal is pointing to Docker Desktop:
```powershell
kubectl config use-context docker-desktop
```

### 3. Install Ingress Controller
Run this command to allow local traffic routing:
```powershell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 4. Configure Hosts File
1. Open **Notepad as Administrator**.
2. Open `C:\Windows\System32\drivers\etc\hosts`.
3. Add this line at the bottom:
   ```text
   127.0.0.1 aurapan.com
   ```

### 5. Create Required Secrets
Run these four commands in your terminal:
```powershell
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl create secret generic mongo-secret `
  --from-literal=MONGO_URI_PRODUCT=mongodb://product-mongo-srv:27017/product `
  --from-literal=MONGO_URI_USER=mongodb://user-mongo-srv:27017/user `
  --from-literal=MONGO_URI_ORDER=mongodb://order-mongo-srv:27017/order `
  --from-literal=MONGO_URI_PAYMENT=mongodb://payment-mongo-srv:27017/payment

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_key
kubectl create secret generic paypal-secret --from-literal=PAYPAL_CLIENT_ID=your_paypal_id
```

### 6. Start the Project
Navigate to the project root and run:
```powershell
.\skaffold.exe dev
```
Wait for all services to build and the logs to start appearing.

### 7. Access the App
1. Go to **[https://aurapan.com](https://aurapan.com)** in your browser.
2. If you see a "Connection is not private" warning:
   - **Click anywhere on the white space.**
   - **Type `thisisunsafe` on your keyboard.**
3. The store will now load!
