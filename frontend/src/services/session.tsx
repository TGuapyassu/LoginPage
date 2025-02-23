import React from 'react';
import { authService } from './authService';
import { useRouter } from 'next/router';
import { tokenService } from './tokenService';

export function withSession(funcao: (arg0: any) => any) {
    return async (ctx: { req: any; }) => {
        try {
            const session = await authService.getSession(ctx);
            const modifiedCtx = {
                ...ctx,
                req: {
                    ...ctx.req,
                    session,
                }
            };
            return funcao(modifiedCtx);
        } catch (err) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/?error=401',
                }
            }
        }
    }
}

export function useSession() {
    const [session, setSession] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        authService.getSession()
            .then((userSession: React.SetStateAction<null>) => {
                console.log(userSession);
                setSession(userSession);
            })
            .catch((err: React.SetStateAction<null>) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        data: {
            session,
        },
        error,
        loading,
    }
}

export function withSessionHOC(Component: React.ComponentType) {
    return function Wrapper(props: any) {
        const router = useRouter();
        const session = useSession();

        if (!session.loading && session.error) {
            console.log('redireciona o usuário para a home');
            router.push('/?error=401');
        }

        const modifiedProps = {
            ...props,
            session: session.data.session,
        }
        return (
            <Component {...modifiedProps} />
        )
    }
}