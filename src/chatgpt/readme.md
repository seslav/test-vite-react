Certainly! Below is a complete example of a React application using TypeScript that includes a login form. The application checks the user's credentials against a backend API that is protected with a Bearer token. If the login is successful, the user is redirected to a protected "User Profile" page. If the login fails, an error message is displayed, and the user remains on the login screen.

### Project Structure

Here's a recommended project structure:

```
/src
  /components
    - LoginForm.tsx
    - UserProfile.tsx
    - ProtectedRoute.tsx
  /contexts
    - AuthContext.tsx
  /services
    - authService.ts
  - App.tsx
  - index.tsx
```

### Step 1: Set Up React Router and Dependencies

First, ensure that you have the necessary dependencies:

```bash
npm install react-router-dom axios
npm install --save-dev typescript @types/react @types/react-router-dom @types/axios
```

### Step 2: Authentication Context (contexts/AuthContext.tsx)

We use a context to manage the authentication state and provide login and logout functions throughout the application.

```typescript
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    navigate('/profile');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Step 3: Auth Service (services/authService.ts)

The `authService.ts` file contains the logic to communicate with the backend API.

```typescript
import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const login = async (username: string, password: string): Promise<string> => {
  const response = await axios.post<{ token: string }>(`${API_URL}/login`, { username, password });
  return response.data.token;
};
```

### Step 4: Login Form Component (components/LoginForm.tsx)

The login form handles user input, submits the credentials, and processes the response.

```typescript
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login as loginService } from '../services/authService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = await loginService(username, password);
      login(token);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
```

### Step 5: User Profile Component (components/UserProfile.tsx)

This is the protected page that the user sees after a successful login.

```typescript
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
```

### Step 6: Protected Route Component (components/ProtectedRoute.tsx)

This component ensures that only authenticated users can access certain routes.

```typescript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
```

### Step 7: Main Application (App.tsx)

This is the main application file where routing and context providers are set up.

```typescript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

### Step 8: Entry Point (index.tsx)

This is where the React application is rendered.

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 9: Backend API (for Reference)

Assuming you have a backend API that handles authentication and returns a Bearer token:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

const mockUser = {
  username: 'user',
  password: 'password123',
  token: 'mock-token-123456',
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.status(200).send({ token: mockUser.token });
  } else {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

### Best Practices Followed:

1. **Type Safety**: The entire application is written in TypeScript, ensuring type safety and reducing runtime errors.

2. **Context API for State Management**: The authentication state (token) is managed using the Context API, which is suitable for sharing state across multiple components.

3. **Separation of Concerns**: The code is modular, with clear separation between the UI components, authentication logic (`authService`), and authentication state management (`AuthContext`).

4. **Protected Routes**: The `ProtectedRoute` component ensures that only authenticated users can access protected pages.

5. **Token Persistence**: The authentication token is stored in `localStorage` to persist the login state across page refreshes.

6. **Error Handling**: The login form provides feedback to the user when there is an error, such as incorrect credentials.

7. **Redirection after Login**: Upon successful login, the user is redirected to the profile page.

8. **Logout Functionality**: Users can log out, which clears the authentication token and redirects them to the login page.

### Running the Application

1. **Start the Backend Server** (if using the example backend provided).
2. **Run the React Application** using `npm start` or `yarn start`.
3. **Test the Application**:
   - Enter the correct credentials (`username: user`, `password: password123`).
   - If correct, the user is redirected to the `/profile` page.
   - If incorrect, an error message is displayed on the login screen.

This example demonstrates how to build a secure and maintainable React application with TypeScript, using best practices for managing state, protecting routes, and handling API communication.