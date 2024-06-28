// README.ts

/**
 * This is an example TypeScript file created based on the name of the file `README.md`.
 * It demonstrates basic TypeScript syntax and functionality.
 */

// Define an interface for a User
interface User {
    id: number;
    name: string;
    email: string;
}

// Create a function to greet a user
function greetUser(user: User): string {
    return `Hello, ${user.name}! Welcome to our system.`;
}

// Example usage
const exampleUser: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
};

console.log(greetUser(exampleUser));
