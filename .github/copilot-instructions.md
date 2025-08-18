## Working Effectively
- Use AuthJS V5 for implementing login.
- Use custom login and signup page for signup.
- Auth will be credential login with e-mail and password.
- Use Sonner for notifications.
- Use Geist font for the project.
- Use Shadcn/ui for UI components.
- Use Next.js 15 with the app directory.
- Use Tailwind CSS for styling.
- Use TypeScript for type safety.

## Database Schema
- Use MongoDB as the database.
- Added users table with UUID primary keys, unique email constraints, and password hashes
- Includes proper timestamps for user creation and updates
### Security Implementation
- PBKDF2 password hashing with 100,000 iterations and SHA-512 for resistance against brute force attacks
- Cryptographically secure random salts to prevent rainbow table attacks
- JWT token authentication for stateless API access
- Input validation for email format and minimum password length (6 characters)
- Duplicate email detection with proper 409 Conflict responses