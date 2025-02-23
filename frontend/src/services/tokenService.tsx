import nookies from 'nookies';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

export const tokenService = {
    save(accessToken: string, ctx: any = null) {
        nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
            // httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            maxAge: 60 * 15, // 15 minutos
            path: '/',
        });
    },
    get(ctx = null) {
        const cookies = nookies.get(ctx);
        return cookies[ACCESS_TOKEN_KEY] || '';
    },
    delete(ctx = null) {
        nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    }
}