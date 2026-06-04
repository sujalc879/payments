import { api } from "./axios";

export async function getBalance() {
    const response = await api.get("/account/balance");
    return response.data;
}

export async function transferMoney(
    email: string,
    transferAmount: number
) {
    const response = await api.post("/account/transfer", {
        email,
        transferAmount
    });

    return response.data;
}