import axios from 'axios';
import { tokenService } from './tokenService';

interface LoginParams {
    email: string;
    password: string;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const authService = {
    async login({ email, password }: LoginParams) {
        try {
            const response = await api.post('/api/token/', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            tokenService.save(response.data.access);

            const refreshTokenResponse = await api.post('/api/token/refresh/', { refresh: response.data.refresh });

            console.log(refreshTokenResponse.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Usuário ou senha inválidos');
        }
    },

    async getSession(ctx: any = null) {
        try {
            const token = tokenService.get(ctx);

            const response = await api.post('/api/token/verify/', { token }
            );

            return response.data;
        } catch (error) {
            throw new Error('Não autorizado');
        }
    },
};


