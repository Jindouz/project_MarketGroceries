# Night Market Groceries

Night Market Groceries is a full-stack e-commerce application that allows users to shop for groceries online. The project is built with Django for the backend and React with Redux and TypeScript for the frontend. It includes features such as user authentication, a shopping cart, and PayPal integration for checkout. The admin page allows full CRUD operations on products and categories, including image uploads and previews.

(deployed website: https://rct-supermarket.netlify.app/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- User authentication with JWT tokens
- RESTful API for backend operations
- Shopping cart functionality
- Checkout process integrated with PayPal
- Receipts saved in the PostgreSQL database
- Admin page with full CRUD capabilities on products and categories
- Image upload and preview for products
- Products organized by categories
- Styled using MUI, Bootstrap, and Toastify for notifications

## Tech Stack

**Backend:**
- Django
- PostgreSQL

**Frontend:**
- React Redux TypeScript
- MUI (Material-UI)
- Bootstrap
- Toastify

**DevOps:**
- Docker
- Docker Compose

## Setup and Installation


### Using Docker

1. Clone the repository:
    ```sh
    git clone https://github.com/Jindouz/project_MarketGroceries.git
    cd project_MarketGroceries/backend
    ```

2. Pull the images from Docker Hub (docker-compose pull) and start the Docker containers:
    ```sh
    docker-compose up
    ```

    Alternatively, you can build the images locally:
    ```sh
    docker-compose up --build
    ```

3. Access the backend API at `http://localhost:8000` and the frontend at `http://localhost:3000`.

### Without Docker

### Backend (Django)

1. Clone the repository:
    ```sh
    git clone https://github.com/Jindouz/project_MarketGroceries.git
    cd project_MarketGroceries/backend
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m virtualenv env
    env/scripts/activate 
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Start the development server:
    ```sh
    python manage.py runserver
    ```

### Frontend (React)

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

- Access the backend API at `http://localhost:8000`.
- Access the frontend at `http://localhost:3000`.
- Use the admin panel at `http://localhost:8000/admin` to manage products and categories.

## API Endpoints

### Authentication

- `POST /register` - Register a new user
- `POST /login` - Authenticate user and return JWT token
- `POST /refresh-token` - Refresh JWT token
- `POST /api/password-reset/` - Request password reset
- `POST /api/password-reset/confirm/<int:user_id>/<str:token>/` - Confirm password reset

### Products

- `GET /products/` - List all products (public)
- `GET /products/<int:id>` - Retrieve a specific product by ID (public)
- `GET /authproducts` - List all products (authenticated)
- `GET /authproducts/<int:id>` - Retrieve a specific product by ID (authenticated)

### Orders

- `GET /orders` - List all orders (authenticated)
- `POST /orders` - Create a new order (authenticated)

## Screenshots

### Homepage
<img src="https://i.imgur.com/uVGAsVo.jpeg" alt="Description of the image" style="max-width: 700px;">

### Shopping Cart
<img src="https://i.imgur.com/Gop5elG.jpeg" alt="Description of the image" style="max-width: 700px;">

### PayPal Checkout
<img src="https://i.imgur.com/aIAqRHO.jpeg" alt="Description of the image" style="max-width: 700px;">

### Admin CRUD
<img src="https://i.imgur.com/7J4LPhr.jpeg" alt="Description of the image" style="max-width: 700px;">

### Product Preview
<img src="https://i.imgur.com/3LtpMLs.jpeg" alt="Description of the image" style="max-width: 700px;">

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
