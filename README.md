# 🖼️ Background Removal Tool

A powerful, user-friendly web application that lets you remove backgrounds from images in seconds. Built with modern web technologies, this tool offers a seamless experience for both casual users and professionals.

![App Preview](https://via.placeholder.com/1200x600?text=Background+Removal+App+Preview)  
*Replace with actual screenshot*

## ✨ Key Features

### 🚀 One-Click Background Removal
- Upload any image and remove its background with a single click
- Supports JPG, PNG, and WebP formats
- High-quality output with transparent background

### 🔒 User Authentication
- Secure sign-up and login with Clerk
- Protected user dashboard
- Credit-based system for usage tracking

### 🛠️ Advanced Features
- Real-time preview of processed images
- Download images in multiple formats
- Credit system for usage management
- Responsive design works on all devices

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19 with Hooks
- 🎨 Tailwind CSS for beautiful, responsive design
- ⚡ Vite for fast development and building
- 🔄 React Router for smooth navigation
- 🔐 Clerk for authentication
- 🖼️ React Dropzone for file uploads

### Backend
- 🚀 Node.js with Express
- 🔄 RESTful API architecture
- 🔒 JWT authentication
- 🌐 CORS enabled
- 📦 MongoDB for data storage
- 🖼️ Sharp for image processing

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher or yarn
- MongoDB Atlas account or local MongoDB instance
- Clerk account for authentication

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bg-removal.git
   cd bg-removal
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update the .env file with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   # Update the environment variables with your Clerk credentials
   ```

4. **Run the application**
   - In the backend directory: `npm run dev`
   - In the frontend directory: `npm run dev`
   - Open `http://localhost:5173` in your browser

## 📝 Usage

1. **Sign up** or **Log in** to your account
2. Upload an image by dragging and dropping or clicking the upload area
3. Wait a few seconds for the background to be removed
4. Download the processed image or share it directly
5. Check your remaining credits in the top navigation

## 🔄 Credit System

- New users receive 5 free credits
- Each image processing costs 1 credit
- Purchase additional credits as needed
- Track your credit usage in the dashboard

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
