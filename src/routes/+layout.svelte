<style global>
    @import "../app.postcss";
</style>

<script>
    import Wallet from "$lib/components/wallet.svelte";
    import { page } from '$app/stores';
    $: active = false;

    const activeClass = function (path) {
        if($page.url.pathname.includes(path) || path == 'home'){
            return 'active';
        } else {
            return '';
        }
    }
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/" class={activeClass('home')}>Home</a></li>
            <li><a href="/upload" class={activeClass('upload')}>Upload</a></li>
            <li><a href="/market" class={activeClass('market')}>Marketplace</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-2xl" href="/">Solana Stock</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <!-- <li><a href="/" class={activeClass('home')}>Home</a></li> -->
        <li><a href="/upload" class={activeClass('upload')}>Upload</a></li>
        <li><a href="/market" class={activeClass('market')}>Marketplace</a></li>
      </ul>
    </div>
    <div class="navbar-end">
        <Wallet />
    </div>
  </div>

<section class="min-w-screen min-h-screen bg-base-300 p-8">
    <slot />
</section>
