// Type definitions for the application

import { ReactNode } from "react";

export type AuthContextType = {
    user: User | null;
    register: (userData: User) => void;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
    error: string;
};

export type User = {
    email: string;
    password: string;
};

export type AuthProviderProps = {
    children: ReactNode;
};

export type AuthRouteProps = {
    children: JSX.Element;
};

export type Course = {
    id?: number;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
};

export type SiteHeaderProps = {
    customClassNames: string;
};

export type CourseType = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
};
