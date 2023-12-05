import { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User, AuthProviderProps } from './Types';

// create context
export const AuthContext = createContext<AuthContextType | null>(null);
// create custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within a AuthProvider');
    return context;
};
/**
 * AuthProvider
 * Handles user authentication
 * 
 * @param children
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // check if user is logged in
    useEffect(() => {
        const auth = localStorage.getItem("auth");
        const email = localStorage.getItem("email");
        if (auth === "login" && email) {
            setUser({ email: email, password: "" });
        }
        // timeout for loading to be visible.
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    /**
     * Register user
     * 
     * @param user
     * @returns void
     */
    const register = async (user: User) => {
        try {
            // api request
            const response = await fetch(
                process.env.REACT_APP_API_URL + "/users/index.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        register: true,
                        email: user.email,
                        password: user.password,
                    }),
                }
            );
            // error handling
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            // wait for response
            const data = await response.json();
            if ("user added successfully" === data.message) {
                // send success message
                setUser(user);
                // set local storage
                localStorage.setItem("auth", "login");
                localStorage.setItem("email", user.email);
            }
        } catch (error:any) {
            setError(error.message);
        }
    };

    /**
     * Login user
     * 
     * @param user
     * @returns void
     */
    const login = async (user: User) => {
        try {
            // api request
            const response = await fetch(
                process.env.REACT_APP_API_URL + "/users/index.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login: true,
                        email: user.email,
                        password: user.password,
                    }),
                }
            );
            // error handling
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            // wait for response
            const data = await response.json();
            if ("login successful" === data.message) {
                // send success message
                setUser(user);
                // set local storage
                localStorage.setItem("auth", "login");
                localStorage.setItem("email", user.email);
            }
        } catch (error:any) {
            setError(error.message);
        }
    };

    /**
     * Logout user
     * 
     * @returns void
     */
    const logout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("email");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
