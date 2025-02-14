import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const authService = {
    async login({ email, password }: { email: string, password: string }) {
        try {
            const response = await api.post('/api/token/', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Usuário ou senha inválidos');
        }
    },
}
