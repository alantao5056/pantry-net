import { auth, firebase } from "./firebase";

/**
 * Sign in with Google using a popup.
 */
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Sign up with email and password.
 */
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing up with email:", error);
    throw error;
  }
};

/**
 * Sign in with email and password.
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};

/**
 * Sign out the current user.
 */
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Get the current user.
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen for auth state changes.
 */
export const onAuthStateChanged = (callback: (user: firebase.User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};
