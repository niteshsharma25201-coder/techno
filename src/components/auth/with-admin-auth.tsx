'use client';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    const adminRoleRef = useMemoFirebase(
      () => (user ? doc(firestore, 'roles_admin', user.uid) : null),
      [user, firestore]
    );

    const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);

    useEffect(() => {
      if (!isUserLoading && !isAdminRoleLoading) {
        if (!user) {
          // If no user is logged in, redirect to login
          router.replace('/login');
        } else if (!adminRole) {
          // If user is not an admin, redirect to home
          router.replace('/');
        }
      }
    }, [user, isUserLoading, adminRole, isAdminRoleLoading, router]);

    // While checking, show a loading state
    if (isUserLoading || isAdminRoleLoading || !user || !adminRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    // If user is the admin, render the component
    return <WrappedComponent {...props} />;
  };

  WithAdminAuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuthComponent;
};

export default withAdminAuth;
