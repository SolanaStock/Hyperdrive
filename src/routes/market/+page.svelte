<script>
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
    import { onMount } from "svelte";

    $:loading = false;
    let searchTerm = "";
    let error = "";
    let nfts = [];
    let hasFetched = false;
    $: (searchTerm), getNfts();

    const getNfts = async () => {
        try {
            loading = true;

            const result = await fetch("/api/solana/search-assets", {
                body: JSON.stringify({
                    ownerAddress: searchTerm == "" ? 'DAiQQjHNKAgKVyRhfXhQHpdKJVXSncbqPxWWgLSvZMu2' : searchTerm,
                }),
                method: "POST",
            });

            const {data} = await result.json();


            nfts = data.items;
        } catch (err) {
            error = String(err);

        } finally {
            hasFetched = true;
            loading = false;
        }
    };

    onMount(async () => {
        await getNfts();
    })
</script>

<input type="text" bind:value={searchTerm} placeholder="Find Stock Photos" class="m-4 input input-bordered input-lg w-full" />

{#if loading}
    <div class="grid gap-3 md:grid-cols-3">
        {#each Array(9) as _}
            <div class="aspect-square animate-pulse rounded bg-gray-700" />
        {/each}
    </div>
  
{:else if !loading && hasFetched && nfts.length > 0}
    <div class="grid gap-3 md:grid-cols-3">
        {#each nfts as nft}
            {@const image = nft.content.files.find(({ mime }) =>
                mime.startsWith("image")
            )}
            <div class="aspect-square rounded bg-gray-700">
                <img
                    class="rounded object-cover"
                    src={image.uri}
                    alt={nft.name}
                >
                <p>{nft.content.metadata.description}</p>
            </div>
        {/each}
    </div>
{/if}