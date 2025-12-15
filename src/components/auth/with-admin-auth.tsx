'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const withAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAdminAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
      if (!isUserLoading) {
        if (!user) {
          router.replace('/login');
          return;
        }

        const checkAdminStatus = async () => {
          const adminDocRef = doc(firestore, 'roles_admin', user.uid);
          const adminDoc = await getDoc(adminDocRef);
          if (adminDoc.exists()) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            router.replace('/');
          }
        };
        
        checkAdminStatus();
      }
    }, [user, isUserLoading, router, firestore]);

    if (isUserLoading || isAdmin === null) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    if (!isAdmin) {
      // This is a fallback, but the effect should have already redirected.
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Access Denied</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAdminAuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAdminAuthComponent;
};

export default withAdminAuth;
