<script>
    import Upload from "$lib/components/upload.svelte";
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
    import { onMount } from "svelte";


    let loading = false;
    let error = "";
    let nfts = [];
    let hasFetched = false;

    $: files = [];

    const getNfts = async () => {
        try {
            loading = true;

            const result = await fetch("/api/solana/search-assets", {
                body: JSON.stringify({
                    ownerAddress: $walletStore.publicKey?.toBase58(),
                }),
                method: "POST",
            });

            const { data } = await result.json();

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

{#if $walletStore.connected && files.length < 1}
    <div
        class="mb-4 flex items-center justify-between rounded-xl p-5 shadow-xl bg-base-200"
    >
        <div>
            <h3 class="text-xl font-bold">Welcome Back!</h3>
            <p>{$walletStore.publicKey?.toBase58()}</p>
        </div>

        <div>
            <button
                class="btn-primary btn"
                class:loading
                on:click={getNfts}>Refresh Photo Library</button
            >
        </div>
    </div>
{/if}

<!-- search for NFT -->
<!-- mint uploading -->
<!-- mint uploading -->

{#if !$walletStore.connected}
<div class="px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-6xl font-bold text-white tracking-tightsm:text-6xl ">Safer Stock Trade</h2>
        <p class="mt-2 text-lg leading-8 text-white">Snap, Sizzle, and Stock Up! Your Picture Perfect Pathway to Prosperity. Monetize your photo library without sharing your pictures.</p>
        <video class="w-full mt-2 rounded-xl" loop autoplay>
            <source src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto/v1691526524/smart_tagging_3-2.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
      </div>
  </div>
{:else if loading}
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
                />  
            </div>
        {/each}
    </div>
{:else if !loading && hasFetched && nfts.length < 1}
<Upload/>
{:else if error}
    <h2>Something blew up! 💣</h2>
{/if}
