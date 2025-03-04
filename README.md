# Readme

## Project Overview

This repository contains a project that integrates Azure AI Foundry with Azure Prompt to RAG solution using Python Flask and JavaScript to build a chatbot. The chatbot is designed to assist users in analyzing and improving their analytical writing skills, particularly for GRE Verbal Reasoning practice.

## Features

* **Chatbot Interface**: The chatbot interface is built using Flask for the backend and JavaScript for the frontend.
* **Azure Integration**: The project leverages Azure AI Foundry and Azure Prompt to RAG solution for natural language processing and response generation.
* **User Interaction**: Users can input their text, and the chatbot provides feedback and analysis to help improve their writing.
* **Deployment**: The project includes GitHub Actions workflows for deploying the application to Azure Web App.

## File Structure

* `.github/workflows/azure-webapps-python.yml`: GitHub Actions workflow for building and deploying the Python app to Azure Web App.
* `.github/workflows/main_gre-verb.yml`: GitHub Actions workflow for building and deploying the Python app to Azure Web App for the `gre-verb` project.
* `.vscode/settings.json`: VS Code settings for deploying the app to Azure.
* `app.py`: Main Flask application file that handles routes and integrates with Azure services.
* `config.py`: Configuration file containing Azure endpoint details and model deployment name.
* `static/script.js`: JavaScript file for handling user interactions and chatbot responses on the frontend.
* `static/style.css`: CSS file for styling the chatbot interface.
* `templates/index.html`: HTML template for the chatbot interface.

## Getting Started

### Prerequisites

* Python 3.8 or higher
* Azure account 
* Flask
* GitHub account for repository and Actions

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Azure endpoint details in `config.py`.

### Running the Application

1. Start the Flask application:
   ```bash
   python app.py
   ```

2. Open your web browser and navigate to `http://127.0.0.1:5000` to interact with the chatbot.

### Deployment

The project includes GitHub Actions workflows for deploying the application to Azure Web App. Ensure you have configured the necessary secrets in your GitHub repository and follow the instructions in the workflow files.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
