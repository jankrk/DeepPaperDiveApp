# Application Setup and Run Instructions

## Requirements

To run this application, you need the following:

- [Docker](https://www.docker.com/) installed on your system
- Python 3.13 (required for development or running outside of Docker)

## Setup Instructions

1. **.env File**  
Create a `.env` file in the root directory of the project. This file must contain the following environment variables:

    ```env
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    POSTGRES_HOST=
    POSTGRES_PORT=

    DATABASE_URL=
    CELERY_BROKER_URL=
    CELERY_RESULT_BACKEND=

    SECRET_KEY=

    OPENAI_API_KEY=
    LLAMA_PARSE_API_KEY=

    FRONTEND_ADMIN_PASSWORD=
    ```

2. **Run the Application**  
Use the following command to build and start the application using Docker Compose:

    ```bash
    docker-compose up --build
    ```
