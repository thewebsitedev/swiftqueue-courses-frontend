/**
 * Helper functions
 */

// global navigation object
export const siteNavigation = [
    { name: "Home", href: "/" },
    { name: "News", href: "#" },
    { name: "Company", href: "#" },
];

// dummy user data
export const dummyUser = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

// dashboard navigation object
export const navigation = [
    // { name: 'Dashboard', href: '/dashboard', current: false },
    { name: "Courses", href: "/courses", current: true },
];

// user navigation object
export const userNavigation = [
    //   { name: 'Your Profile', href: '#' },
    //   { name: 'Settings', href: '#' },
    { name: "Sign out", href: "#" },
];

// footer navigation object
export const footerNavigation = {
    account: [
        { name: "Manage Account", href: "#" },
        { name: "Saved Items", href: "#" },
        { name: "Orders", href: "#" },
        { name: "Redeem Gift card", href: "#" },
    ],
    service: [
        { name: "Shipping & Returns", href: "#" },
        { name: "Warranty", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Find a store", href: "#" },
        { name: "Get in touch", href: "#" },
    ],
    company: [
        { name: "Who we are", href: "#" },
        { name: "Press", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy", href: "#" },
    ],
    connect: [
        { name: "Instagram", href: "#" },
        { name: "Pinterest", href: "#" },
        { name: "Twitter", href: "#" },
    ],
};

/**
 * Helper function to join class names
 *
 * @param classes array of class names
 * @returns string
 */
export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
};

// filter options for courses
export const filters = {
    status: [
        { value: "active", label: "Active", checked: false },
        { value: "coming soon", label: "Coming Soon", checked: false },
        { value: "ended", label: "Ended", checked: false },
    ],
};

// sort options for courses
export const sortOptions = [
    { name: "Newest", value: "desc", current: true },
    { name: "Oldest", value: "asc", current: false },
];

/**
 * Helper function to get error message
 * from error object
 *
 * @param error unknown type typescript hack
 * @returns string
 */
export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};
