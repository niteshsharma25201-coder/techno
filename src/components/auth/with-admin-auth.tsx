'use client';

import { useAdminStatus } from '@/hooks/use-admin-status';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const { isAdmin, isLoading: isAdminLoading, isAuthenticated } = useAdminStatus();
    const router = useRouter();

    useEffect(() => {
      // Don't do anything while we are still loading the user or admin status.
      if (isAdminLoading) {
        return;
      }
      
      // If the user is not authenticated, redirect to login.
      if (!isAuthenticated) {
        router.replace('/login');
        return;
      }

      // If the user is authenticated but not an admin, redirect to the homepage.
      if (!isAdmin) {
        router.replace('/');
      }

    }, [isAdmin, isAdminLoading, isAuthenticated, router]);

    // While loading, show a loading indicator.
    if (isAdminLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Verifying permissions...</p>
        </div>
      );
    }
    
    // If the user is an admin, render the requested component.
    if (isAdmin) {
      return <WrappedComponent {...props} />;
    }

    // Otherwise, show an access denied message as a fallback while redirecting.
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Access Denied</p>
      </div>
    );
  };

  WithAdminAuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuthComponent;
};

export default withAdminAuth;
