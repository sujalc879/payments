import { api } from "./axios";

interface SigninInput {
    email: string;
    password: string;
}

export async function signin(data: SigninInput) {
    const response = await api.post("/user/signin", data);
    return response.data;
}

interface SignupInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export async function signup(data: SignupInput) {
    const response = await api.post("/user/signup", data);
    return response.data;
}