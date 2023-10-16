<script>
    import { clusterApiUrl } from "@solana/web3.js";
    import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
    import { goto } from "$app/navigation";
    import {
        workSpace,
        WalletProvider,
        ConnectionProvider,
        WalletModal,
    } from "@svelte-on-solana/wallet-adapter-ui";
    import {
        PhantomWalletAdapter,
        BackpackWalletAdapter,
        GlowWalletAdapter,
    } from "@solana/wallet-adapter-wallets";
    const wallets = [
        new PhantomWalletAdapter(),
        new BackpackWalletAdapter(),
        new GlowWalletAdapter(),
    ];
    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");
    let showConnectWallet = false;
    const connectWallet = async (event) => {
        showConnectWallet = false;
        await $walletStore.select(event.detail);
        await $walletStore.connect();
    };
    const shortenAddress = (address) =>
        `${address.slice(0, 4)}...${address.slice(-4)}`;
    const disconnect = () => {
        if (confirm("Disconnect wallet?")) {
            $walletStore.disconnect();
        }
    };
</script>

{#if $walletStore.connected}
    <button
        class="btn-primary btn bg-transparent"
        on:click={disconnect}
    >
        <img
            class="mr-2 h-5"
            alt=""
            src="https://raw.githubusercontent.com/qudo-code/demo--tiplink/main/static/phantom.svg"
        />
        <p class="font-black">{shortenAddress($walletStore.publicKey?.toBase58() || "")}</p>
    </button>
{:else}
    <button
        class="btn-primary btn bg-transparent"
        on:click={() => (showConnectWallet = true)}
    >
        Connect Wallet
    </button>
{/if}

<WalletProvider
    autoConnect={true}
    {localStorageKey}
    {wallets}
/>
<ConnectionProvider {network} />

{#if showConnectWallet}
    <WalletModal
        maxNumberOfWallets="6"
        on:connect={connectWallet}
        on:close={() => (showConnectWallet = false)}
    />
{/if}
