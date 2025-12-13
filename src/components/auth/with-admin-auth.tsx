'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const ADMIN_EMAIL = 'niteshsharma25201@gmail.com';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isUserLoading) {
        if (!user) {
          router.replace('/login');
        } else if (user.email !== ADMIN_EMAIL) {
          router.replace('/');
        }
      }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user || user.email !== ADMIN_EMAIL) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuthComponent;
};

export default withAdminAuth;
