# Notes App Frontend

A responsive single-page React application for managing notes with integrated user authentication.

## Features
- **User Authentication UI**: Dynamic Login/Signup views with inline error messaging.
- **Token Persistence**: JWT stored securely in `localStorage` for uninterrupted sessions.
- **Notes Dashboard**:
  - View all user notes in a responsive CSS Grid card layout.
  - Create new notes with title and description.
  - **Inline Editing**: Quick inline editing mode for existing notes.
  - Single-click note deletion.
- **Responsive Dark UI**: Modern dark theme with custom styled input controls and interactive state indicators.

## Tech Stack
- **Library**: React.js (Vite)
- **HTTP Client**: Axios
- **Styling**: Pure CSS3 (Flexbox & CSS Grid)

---

## Getting Started & Local Setup

### Prerequisites
- Node.js (v16 or higher)
- Backend API running on `http://localhost:5000/notes`

### Installation & Execution

1. **Clone the Repository**
   ```bash
   git clone (https://github.com/A-lishba/notes-frontend)
   cd notes-frontend

2. **Install Dependencies**
     e.g npm install bcrypt

3. **Start Development Server**
    npm run dev

4. **Access Application**
    Open your browser and navigate to http://localhost:5173