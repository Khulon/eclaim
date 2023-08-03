# Engkong Eclaim Web Application Developer Documentation

This is the developer documentation for Engkong Eclaim Web Application! This guide aims to provide you with all the necessary information to understand, use, and contribute to this project effectively.

## Table of Contents
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Ports](#ports)
    - [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)

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

### Installation

To install Eclaim Web App, follow these steps:

1. **Clone the Repository**:
*only do this step if you are not contributing to the repo. Otherwise, fork this repo then clone from your own fork. 

   ```bash
   git clone https://github.com/engkongit/eclaim.git
   cd eclaim

2. **Install Dependencies for Web App**:

    ```bash
    npm install
    cd server

3. **Install Dependencies for Server**:

    ```bash
    cd server
    npm install


### Ports

Before starting with the usage, there are important ports that needs to be adressed in order to fully understand what is being hosted.

1. <**10.0.1.28:8080**> This is the port used on IIS(Internet Information Services) to host the front-end.

2. <**dw.engkong.com:5000**> This is the port used on IIS to host the back-end

3. <**localhost:1906**> This is the port typically used when hosting the front-end on the local computer

4. <**dw.engkong.com:5000**> This is the port typically used when hosting the back-end on the local computer


### Usage

In this section, we'll cover how to use Eclaim Web App. Provide code examples and explanations for the 2 different use cases.

#### Example 2: Run Both Front-End and Back-End Locally

This is for Back-End Development where there are changes to server.js.

1. **Change All Headers in Front-End**:
   Since all the headers in the front-end are configured to `10.0.1.28`, which is the private EngKong IP address, they need to be changed back to `localhost`.

   - Open Visual Studio Code (VSC).
   - Navigate to the `menu` typically located on the left.
   - Select `Search` from the menu then select the `Right Chevron Icon`, or use the shortcut `Ctrl + Shift + H` (Windows) or `Cmd + Shift + H` (Mac).


   - In the "Find" field, type `dw.engkong.com:5000`.
   - In the "Replace" field, type `dw.engkong.com:5000`.
   - Click on the "Replace All" button to replace all occurrences.

   This will update all the headers in the front-end code to use `localhost` instead of `10.0.1.28`.

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



#### Example 2: Run Front-End Locally Only

This is usually for Front-End Development where there are changes only to files in client. The client fetches data from the server hosted by EngKong (`10.0.1.28:5000`)

1. **Headers in Front-End**:
   Ensure that all the headers in the front-end are configured to `localhost` and not `10.0.1.28`.

2. **Run Front-End**: 

    ```bash
    cd client
    npm run dev

3. **Open Website**:

    Open a web browser and navigate to the following link: [http://localhost:19006/](http://localhost:19006/).


   
## System Architecture
![System Architecture](/assets/System%20Architecture.png)

### Frontend  
