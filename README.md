# Faddom exercise - CPU usage over time
The goal of this exercise is to extract performance information for an AWS instance and display the CPU usage over time.

## Installation
### 1. Clone the repository.

### 2. Install dependencies
Client:  
```bash
cd Client  
npm install
```

Server:  
```bash
cd Server  
npm install
```

### 3. Configure environment variables
Create a .env file in the Server directory: 
```bash
AWS_ACCESS_ID=your_aws_access_key_id  
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
```

### 4. Running the application
Start the server (http://localhost:3000):  
```bash
cd Server  
npm run dev
```

Start the client (http://localhost:5173):  
```bash
cd Client  
npm run dev
```
