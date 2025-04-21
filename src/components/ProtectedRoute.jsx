/**
 * This file defines a React component called ProtectedRoute.
 * A "protected route" is a way to make sure that only users who are signed in (logged in) can see certain pages or parts of your app.
 * If someone tries to visit a protected page without being signed in, they will be sent to the login page instead.
 *
 * Usage example:
 * <ProtectedRoute>
 *   <SecretPage />
 * </ProtectedRoute>
 */

import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

/**
 * The ProtectedRoute component takes one prop:
 * - children: the content (usually a page or component) that should only be shown to signed-in users.
 */
const ProtectedRoute = ({ children }) => {
  // useUser() gives us information about the current user and their sign-in status.
  const { isSignedIn, isLoaded } = useUser();

  // If the user data is still loading, don't show anything yet.
  // You could show a loading spinner here if you want.
  if (!isLoaded) {
    // Optionally, render a loading spinner here
    return null;
  }

  // If the user is not signed in, send them to the login page.
  // <Navigate> is a special React Router component that changes the page.
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user is signed in, show the protected content.
  return children;
};

// This line makes the ProtectedRoute component available for use in other files.
export default ProtectedRoute;