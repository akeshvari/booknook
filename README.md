## BookNook Media Library

BookNook is a tool to store your media. The design is simple and a little retro.

<br>
<br>

### ⚠️ Work in progress ⚠️

<br>
<br>

## Setup Guide

### Requirements

- Java (version 17)
- Maven (optional)
- Node.js (version 18)
- npm (latest version)

<br>

### Setup Steps

**Backend**

1. Clone Repository: `git clone https://github.com/akeshvari/bubbleSort`
2. Go to booknook/librarybackend: `cd booknook/librarybackend`
3. Write in the terminal and start Springboot: `./mvnw spring-boot:run`
4. Or run the file in your IDE: `src/main/java/Application.java`

**Frontend**

1. Go to libraryfrontend/library: `cd ../libraryfrontend/library`
2. Install npm: `npm install`
3. Start Application: `npm start`

**Access Application**

- Open your browser and go to `http://localhost:4200` to use the application.
- The backend API is available at `http://localhost:8080/api/media`.

<br>
<br>
  
**Additional Notes**

If you encounter port conflicts, you can configure different ports in **application.yaml** for the backend or **angular.json** for the frontend.
For production builds, use **npm run build** in the frontend directory to create a dist folder, and package the backend with **./mvnw package**.

Ensure both services are running simultaneously for full functionality.

<br>
<br>

## Application Screenshots

<img width="1466" height="760" alt="Screenshot 2026-03-24 at 11 21 28" src="https://github.com/user-attachments/assets/3f79b0a8-e4f3-4c4e-bfaf-403bcd1ecfcc" />
<img width="1466" height="757" alt="Screenshot 2026-03-24 at 11 22 39" src="https://github.com/user-attachments/assets/1f34deab-d501-48ad-bace-8b8503d29a21" />
