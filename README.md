# Auto Parts E-Commerce Platform with AI Consultant

A full-stack MVP application for searching and purchasing automotive parts, featuring an independent AI-driven assistant that automates customer support. The system handles end-to-end e-commerce operations while providing an intelligent chat interface for product recommendations, price/quality orientation, and vehicle compatibility checks.

## 🏗️ Project Architecture & Structure

The repository is organized as a monorepo, keeping the entire lifecycle of the application clean and accessible:

* `front/` — Single Page Application (SPA) built with **React**, **TypeScript**, and **Tailwind CSS**. It handles interactive user experiences, persistent shopping cart states, responsive layouts, and the real-time chat interface.
* `back/` — Server-side application powered by **Node.js**. It exposes REST API endpoints for user authentication, product catalog management, shopping cart operations, and acts as the bridge between the UI and the database.
* `ai-agent/` — Dedicated AI service integrating the **GigaChat API**. It utilizes a custom **RAG (Retrieval-Augmented Generation)** architecture to fetch real-time product inventories and vehicle compatibility rules straight from the database to answer user prompts inside the chat context.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, TypeScript, Tailwind CSS, HTML5/CSS3
* **Backend:** Node.js, Express, REST APIs
* **Database:** PostgreSQL
* **AI Integration:** GigaChat API (RAG architecture for dynamic data grounding)
* **DevOps & Workflow:** Docker, Docker Compose, Git / GitLab

---

## 🌟 Key Features

* **Autonomous AI Assistant:** Acts as a technical shop consultant. It handles context-aware dialogue, provides feedback on spare parts quality, breaks down pricing, and directly helps close the gap between customer queries and catalog items.
* **VIN Decoding via RAG:** Users can input a vehicle's VIN code directly into the chat. The AI service processes the identifier, extracts exact vehicle technical specifications (make, model, manufacturing year), and dynamically filters the PostgreSQL inventory to show only valid matching auto parts.
* **Cross-Device Responsiveness:** The user interface is built from the ground up to be fully fluid and adaptive, delivering a seamless experience across desktop, tablet, and mobile browsers.

---

## 🚀 How to Run Locally

### Prerequisites

Ensure you have the following installed on your machine:
* **Docker** (Engine version 20.10+)
* **Docker Compose**

### Setup & Launch

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file inside both the `back/` and `ai-agent/` directories to securely pass database secrets and AI API authorization keys:
    
    *For backend (`back/.env`):*
    ```env
    PORT=5000
    DB_USER=postgres
    DB_PASSWORD=your_secure_password
    DB_NAME=autoparts_db
    DB_HOST=db
    ```
    
    *For AI Agent (`ai-agent/.env`):*
    ```env
    GIGACHAT_API_KEY=your_gigachat_api_token_here
    BACKEND_URL=http://back:5000
    ```

3.  **Build and Spin Up the Containers:**
    Run the following command from the root directory (`CourseProject/`):
    ```bash
    docker-compose up --build
    ```

4.  **Access the Application:**
    Once Docker finishes building and spinning up the image network:
    * **Frontend UI:** Open `http://localhost:3000` in your browser.
    * **Backend Server:** Available at `http://localhost:5000`.
