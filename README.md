# Background Removal Application

A full-stack web application that allows users to remove backgrounds from images with ease. Built with React, Node.js, and Express, this application provides a seamless user experience for image processing.

## Features

- 🔍 Upload images for background removal
- ✂️ Automatic background removal with high accuracy
- 📥 Download processed images
- 👤 User authentication and management
- 🎨 Clean and responsive user interface

## Tech Stack

### Frontend
- React 19
- Tailwind CSS for styling
- Vite for build tooling
- React Router for navigation
- Clerk for authentication

### Backend
- Node.js with Express
- RESTful API architecture
- JWT for authentication
- CORS enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bg-removal.git
   cd bg-removal
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Update the environment variables
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env  # Update the environment variables
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will start on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## Project Structure

```
bg-removal/
├── backend/               # Backend server
│   ├── configs/          # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   └── index.js          # Entry point
│
└── frontend/             # Frontend React application
    ├── public/           # Static files
    ├── src/              # Source files
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── context/      # React context
    │   └── App.jsx       # Main component
    ├── .env              # Frontend environment variables
    └── index.html        # HTML template
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped with this project
- Built with ❤️ using modern web technologies
