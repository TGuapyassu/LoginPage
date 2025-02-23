import React from 'react';
import { useRouter } from 'next/router';
import { tokenService } from '../services/tokenService';
import { HttpClient } from '../services/HttpClient';

export default function LogoutPage() {
    const router = useRouter();

    React.useEffect(() => {
        const logout = async () => {
            try {
                await HttpClient('/api/refresh', {
                    method: 'DELETE'
                });
                tokenService.delete();
                router.push('/');
            } catch (err) {
                if (err instanceof Error) {
                    alert(err.message);
                } else {
                    alert('An unknown error occurred');
                }
            }
        };
        logout();
    }, []);

    return (
        <div>
            Você será redirecionado em instantes...
        </div>
    )
}