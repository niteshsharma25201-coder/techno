'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ADMIN_EMAIL = 'nitteshsharma25201@gmail.com';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isUserLoading) {
        if (!user) {
          // If no user is logged in, redirect to login
          router.replace('/login');
        } else if (user.email !== ADMIN_EMAIL) {
          // If user is not the admin, redirect to home
          router.replace('/');
        }
      }
    }, [user, isUserLoading, router]);

    // While checking, show a loading state
    if (isUserLoading || !user || user.email !== ADMIN_EMAIL) {
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
