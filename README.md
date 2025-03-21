# BOOKHUBX - Your Book Discovery Platform

BookHubX is your all-in-one destination for seamless book discovery and community engagement. Dive into a rich bookstore, explore diverse genres, and connect with authors. Our platform empowers authors to publish effortlessly while readers download and discuss their favorite books. With an intelligent OpenAI API chatbot, finding books becomes a breeze. BookHubX: Where books come to life.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation Guide](#installation-guide)
   - [Running the Application](#running-the-application)
5. [Contribution Guidelines](#contribution-guidelines)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)
8. [Contact](#contact)

## Description

BOOKHUBX is a dynamic platform developed to provide a seamless experience for book enthusiasts. Explore a rich bookstore, connect with authors, and enjoy a vibrant community of readers. With a user-friendly interface and advanced features, BOOKHUBX revolutionizes the way you discover and engage with books.

![Homepage](https://i.ibb.co/ckDkJ16/Homepage.jpg)
![ERDIAGRAM](https://i.ibb.co/ZWL0DbZ/er-diagram.jpg)

## Features

### Frontend Technologies:
- HTML
- CSS
- JavaScript
- Angular
- Tailwind CSS
- TypeScript

### Backend Technologies:
- Java
- Spring Boot

### Database:
- MySQL

### Key Features

- **Effortless Book Discovery**: Explore a dynamic bookstore with a diverse range of genres for exciting book discovery.

- **Author Publishing**: Empower authors to effortlessly publish their work, fostering a vibrant community.

- **Community Engagement**: Implement a community creation feature for readers and authors to enhance engagement.

- **Secure Access**: Ensure a safe environment with secure access using Spring Security and JWT tokens.

- **Intelligent Book Searching**: Integrate an OpenAI API chatbot for intelligent book searching and an improved user experience.

- **User History Tracking**: Implement a feature that tracks user history and interactions to generate more personalized text.

- **Advanced Text Generation**: Create a context-aware text generation tool that generates coherent and contextually relevant responses by leveraging previous interactions.

- **Authentication**: Ensure secure access using Spring Security with JWT tokens.

## Technologies Used

- HTML
- CSS
- JavaScript
- Angular
- Tailwind CSS
- TypeScript
- Java
- Spring Boot
- MySQL

## Getting Started

### Prerequisites

- Java Development Kit (JDK)
- Node.js and npm
- Angular CLI
- MySQL Database


### Installation Guide

#### 1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookhubx.git
cd bookhubx
```

#### 2. **Run Without Docker (Local Setup)**

**Backend Setup:**  
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend Setup:**  
```bash
cd frontend
npm install
npm start
```

---

### 🚀 **Run With Docker** (Recommended)

#### **1. Install Docker & Docker Compose**
Ensure Docker is installed on your system. If not, install it from [Docker's official website](https://www.docker.com/get-started/).

#### **2. Start the Application with Docker Compose**
From the root directory of the project:
```bash
docker-compose up --build
```
👉 This will:
- Start a MySQL container
- Build and start the backend (Spring Boot)
- Build and start the frontend (Angular with Nginx)

#### **3. Access the Application**
- **Frontend:** Open [http://localhost:3000](http://localhost:3000)
- **Backend API:** Open [http://localhost:8080](http://localhost:8080)

#### **4. Stop Containers**
To stop the running containers, press `Ctrl + C` or run:
```bash
docker-compose down
```

#### **5. View Logs**
- **Frontend logs:** `docker logs bookhubx_frontend`
- **Backend logs:** `docker logs bookhubx_backend`
- **Database logs:** `docker logs mysql_db`

---
