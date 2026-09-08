## Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Backend:** Laravel + PHP 8.4
* **Database:** MySQL 8.4
* **Web server:** Nginx
* **Containerization:** Docker + Docker Compose
* **Authentication:** Password hashing via Laravel
* **API:** Laravel REST API
* **Development:** Local development through Docker Compose

### Architecture

The application consists of a React frontend, a Laravel backend and a MySQL database. Nginx acts as the web server and forwards requests to the Laravel application running on PHP-FPM. All services run in separate Docker containers and communicate through a shared Docker network.
