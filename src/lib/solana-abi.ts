import { HELIUS_API_URL } from "./const";

export const mintCompressedNft = async (
    desc: string,
    imageUrl: string,
    nftName: string,
    nftOwner: string
) => {
    const response = await fetch(
        HELIUS_API_URL + "?api-key=49dad7ce-8cbb-4626-a616-346633a1897c",
        {
            body: JSON.stringify({
                id: "helius-test",
                jsonrpc: "2.0",
                method: "mintCompressedNft",
                params: {
                    //TODO: Should come from TensorFlowJS
                    // attributes: [
                    //     {
                    //         trait_type: "Type",
                    //         value: "Legendary",
                    //     },
                    //     {
                    //         trait_type: "Power",
                    //         value: "Infinite",
                    //     },
                    //     {
                    //         trait_type: "Element",
                    //         value: "Dark",
                    //     },
                    //     {
                    //         trait_type: "Rarity",
                    //         value: "Mythical",
                    //     },
                    // ],
                    description: desc,
                    externalUrl: "https://www.solana-stock.com/",
                    imageUrl: imageUrl,
                    name: nftName,
                    owner: nftOwner,
                    sellerFeeBasisPoints: 6900,
                    symbol: "ETFO",
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    );
    const { result } = await response.json();
};
