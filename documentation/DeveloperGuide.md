# Developer Documentation

## Overview
This eclaim application developed for Eng Kong is a cross-platform web application that digitalises and streamlines the company's claim handling process. Currently, users are able to use the application on both web and mobile platforms, as long as they are connected to Eng Kong's VPN or their private network. This guide aims to provide you with all the necessary information to understand, use, and contribute to this application effectively.

## Table of Contents
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Ports](#ports)
    - [Usage](#usage)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [Communication Flow](#communication-flow)

## Getting Started

This section will help you get started with the Web Application. It includes the prerequisites, installation instructions, and basic usage examples.

### Prerequisites

Before you start using Eclaim Web App, make sure you have the following installed:

1. **Node.js and npm**: Install Node.js and npm (Node Package Manager) on your machine. You can download the latest version from the official Node.js website: [https://nodejs.org](https://nodejs.org)

2. **React Native CLI**: Install the React Native command-line interface (CLI) globally on your system:
    ```bash
    npm install -g react-native-cli

3. **Expo CLI**: Install the Expo command-line interface (CLI) globally on your system:
    ```bash
    npm install -g expo-cli

## Installation

To install Eclaim Web App, follow these steps:

1. **Fork the Repository**: Fork the repository from [https://github.com/engkongit/eclaim](https://github.com/engkongit/eclaim) then clone it to your local desktop

   ```bash
   git clone https://github.com/YOURREPO/eclaim.git
   cd eclaim

2. **Install Dependencies for Web App**:

    ```bash
    npm install
    cd server

3. **Install Dependencies for Server**:

    ```bash
    cd server
    npm install


## Ports

Before starting with the usage, there are important ports that needs to be adressed in order to fully understand what is being hosted.

1. **`10.0.1.28:8080`** This is the port used on IIS(Internet Information Services) to host the front-end.
    - Mapped to `dw.engkong.com:8080`  
    <br>

2. **`10.0.1.28:5000`** This is the port used on IIS to host the back-end
    - Mapped to `dw.engkong.com:5000`  
        <br>

3. **`localhost:1906`** This is the port typically used when hosting the front-end on the local computer

4. **`localhost:5000`** This is the port typically used when hosting the back-end on the local computer



## Usage

In this section, we'll cover how to use Eclaim Web App. Provide code examples and explanations for the 2 different use cases.

### Example 1: Run Both Front-End and Back-End Locally

This is for Back-End Development where there are changes to server.js.

1. **Change All Headers in Front-End**:
   Since all the headers in the front-end are configured to `dw.engkong.com`, which is the private EngKong IP address, they need to be changed back to `localhost`.

   - Open Visual Studio Code (VSC).
   - Navigate to the `menu` typically located on the left.
   - Select `Search` from the menu then select the `Right Chevron Icon`, or use the shortcut `Ctrl + Shift + H` (Windows) or `Cmd + Shift + H` (Mac).
   - In the "Find" field, type `dw.engkong.com:5000`.
   - In the "Replace" field, type `localhost:5000`.
   - Click on the "Replace All" button to replace all occurrences.

        ![Find and Replace](assets/Find%20and%20Replace.png)

   This will update all the headers in the front-end code to use `localhost` instead of `dw.engkong.com`.

2. **Run Front-End**: 

    ```bash
    cd client
    npm run dev

3. **Run Back-End**: 

    ```bash
    cd server
    expo web

4. **Alternatively, Run Both Together**:

    ```bash
    cd client
    npm run dev

5. **Open Website**:

    Open a web browser and navigate to the following link: [http://localhost:19006/](http://localhost:19006/).



### Example 2: Run Front-End Locally Only

This is usually for Front-End Development where there are changes only to files in client. The client fetches from the server hosted by EngKong (`dw.engkong.com:5000`)

1. **Headers in Front-End**:
   Ensure that all the headers in the front-end are configured to `dw.engkong.com:5000` and not `localhost:5000`.

2. **Run Front-End**: 

    ```bash
    cd client
    expo web

3. **Open Website**:

    Open a web browser and navigate to the following link: [http://localhost:19006/](http://localhost:19006/).

## Contributing

In order to contribute
   
## System Architecture
![System Architecture](assets/System%20Architecture.png)

### Frontend  
The frontend of our application is developed using React Native, providing a web app interface for our users. This client-side component is responsible for rendering the user interface and handling user interactions. It communicates with the Express.js backend through HTTP requests to fetch and send data.


### Backend  
Our backend is built on Node.js with Express.js as the web application framework. It serves as the server-side component of our system. The Express.js backend exposes various API endpoints that the frontend can interact with. The backend handles HTTP requests from the frontend, processes data, and interacts with the Microsoft SQL Server database to get and update data. The backend is the bridge between the frontend and the database, ensuring seamless communication and data management.

### Database  
We utilize Microsoft SQL Server as our database to store and manage the application's data. The backend, built with Express.js, communicates with the database to perform CRUD operations (Create, Read, Update, Delete) based on frontend requests. The diagram below shows how our database entities and their relationships are modelled. Please refer to the data dictionary for more information on the schema.

_Entity-Relationship Diagram_
![Entity-Relationship Diagram](assets/er_diagram.png)

### Communication Flow
The communication between the React Native frontend, Express.js backend, and SQL database follows a standard HTTP request-response cycle. When a user interacts with the frontend, it sends HTTP requests to the Express.js backend with relevant data. The backend processes the request and communicates with the database if necessary. After processing, the backend sends an HTTP response back to the frontend with the requested data or an appropriate acknowledgement. This data is then displayed on the frontend interface where the user is able to see and use.

