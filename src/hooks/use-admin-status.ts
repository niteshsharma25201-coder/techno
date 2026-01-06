'use client';

import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';

/**
 * A hook to determine if the current user is an administrator.
 * @returns An object with `isAdmin`, `isLoading`, and `isAuthenticated`.
 */
export function useAdminStatus() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // Create a memoized reference to the admin role document for the current user.
  // This will be null if the user is not logged in.
  const adminDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'roles_admin', user.uid) : null),
    [user, firestore]
  );

  // Use the useDoc hook to fetch the admin role document.
  // `data` will be non-null if the document exists, and null otherwise.
  // `isLoading` will be true while the document is being fetched.
  const { data: adminDoc, isLoading: isAdminDocLoading } = useDoc(adminDocRef);

  // The user is an admin if the admin document exists.
  // This is the single source of truth, aligned with security rules.
  const isAdmin = !!adminDoc;
  
  // The overall loading state is true if we are still checking the user's
  // authentication state OR if we are fetching the admin document.
  const isLoading = isUserLoading || (user && isAdminDocLoading);

  return { 
    isAdmin, 
    isLoading,
    isAuthenticated: !!user // Helper to know if a user is logged in at all
  };
}
