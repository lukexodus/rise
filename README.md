
# RISE

## Inspiration

RISE was born from the vision of a more transparent and accountable Philippines. It seeks to address corruption and inefficiency by empowering every Filipino to see where public funds go and to voice concerns directly. It is not just an app, but a movement — a step toward collective action and national progress.

### Why RISE?

In the Philippines, public trust is often weakened by corruption, inefficiency, and lack of transparency. Citizens struggle to track how government funds are spent, and feedback systems are either inaccessible or ineffective.

The name **RISE** captures both its values and its mission. It stands for **Responsibility, Integrity, Service, and Excellence**, which are the guiding compass of the platform. At the same time, “rise” reflects the collective aspiration of Filipinos to rise above corruption, inequity, and inefficiency — to build a nation where accountability is the norm and progress is shared by all.

RISE addresses these challenges by:

* **Making every peso visible** — tracking the national budget down to projects and allocations.
* **Giving citizens a voice** — enabling verified users to report issues, give feedback, and push for accountability.
* **Ensuring collective responsibility** — fostering a culture where both government and citizens work together toward integrity and excellence.

RISE is more than an app. It is a civic platform built on the belief that transparency and participation are the cornerstones of national progress.

## Features

- **Government Fund Tracking** – Every peso is accounted for, with allocations broken down by agency, department, and project.  
- **Citizen Issue Reporting** – Report problems on projects with photos and comments for better accountability.  
- **Report Status Updates** – Stay informed with clear progress markers: *Pending, Reviewed, Resolved.*  
- **Smart Notifications** – Get timely updates on government fund changes and the status of your reports.

## Project Structure

```
rise/
├── rise-frontend/          # React frontend application
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Mock data and JSON files
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── styles/        # CSS and styling files
│   ├── assets/            # Static assets (images, icons)
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── Dockerfile         # Docker configuration for frontend
│   └── .dockerignore      # Docker ignore file
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```  

## Running the code

### Option 1: Using Docker (Recommended)

The easiest way to run RISE is using Docker. This ensures a consistent environment across all systems.

**Prerequisites:**
- Docker and Docker Compose installed on your system

**Steps:**
1. Clone the repository:
   ```bash
   git clone https://github.com/22arun11/rise.git
   cd rise
   ```

2. Build and run with Docker Compose:
   ```bash
   docker compose up --build
   ```

3. Access the application:
   - Open your browser and go to `http://localhost:3000`

4. To run in background:
   ```bash
   docker compose up --build -d
   ```

5. To stop the application:
   ```bash
   docker compose down
   ```

### Option 2: Local Development

If you prefer to run the application locally:

1. Navigate to the frontend directory:
   ```bash
   cd rise-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000`

## Contributing

We’re excited that you want to contribute to **RISE**!  
Contributions help us improve transparency, accountability, and usability for everyone.  

### How to Contribute

1. **Fork the repository**  
   - Click the "Fork" button on the top-right of this repo.  

2. **Clone your fork**  
    ```bash
    git clone https://github.com/your-username/rise.git
    cd rise
    ```

3. **Create a new branch**

   * Use a descriptive branch name for your feature or fix.

   ```bash
   git checkout -b feature/my-feature
   ```

4. **Make your changes**

   * Follow coding style and structure already in the project.
   * Write clear, concise commit messages.

5. **Test your changes**

   * Ensure everything runs as expected before submitting.

6. **Push to your fork**

   ```bash
   git push origin feature/my-feature
   ```

7. **Submit a Pull Request (PR)**

   * Go to the original repo: [RISE Repository](https://github.com/lukexodus/rise).
   * Open a Pull Request with a clear description of your changes.

### Issues & Suggestions

* Use the **Issues tab** to report bugs, request features, or ask questions.
* Be clear and specific in your reports (include screenshots, logs, or steps to reproduce if possible).

### Code of Conduct

By contributing, you agree to uphold a respectful and inclusive environment.
Please be kind, constructive, and considerate in your interactions.

## License

This project is open source under the [MIT License](LICENSE).  
See the official license details here: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
