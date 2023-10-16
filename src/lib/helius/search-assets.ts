import { HELIUS_API_URL } from "$lib/const";
// https://rpc.helius.xyz/?api-key=
export const searchAssets = async (params: any, apiKey: string) => {
    const response = await fetch(
        `${HELIUS_API_URL}?api-key=49dad7ce-8cbb-4626-a616-346633a1897c`,
        {
            body: JSON.stringify({
                id: "my-id",
                jsonrpc: "2.0",
                method: "searchAssets",
                params,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    );

    const { result } = await response.json();

    return result;
};
