<script>
    // import mobilenet from '@tensorflow-models/mobilenet';

    import { set_attributes } from "svelte/internal";
    import NewUploadForm from "./newUploadForm.svelte";

    let input;
    let container;
    let image;
    let placeholder;
    let showImage = false;
    let classified = false;
    let files = [];
    // let predictions;
  
    async function prepare() {
        const img = document.getElementById('img');

        // Load the model.
        // const model = await mobilenet.load();

        // Classify the image.
        // predictions = await model.classify(img);
    }

    function onChange() {
        const file = input.files[0];
          
        if (file) {
            showImage = true;
  
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image = reader.result;
            });
            reader.readAsDataURL(file);
              
            return;
        } 
        showImage = false; 
    }
  </script>
  
  <div class="w-2/3 items-center mx-auto my-40">
    {#if image}
    <div class="flex items-center justify-center w-full">
        <div class="grid grid-cols-3 gap-4" bind:this={container}>
            {#if showImage}
            <div class="col-span-2 " bind:this={container}> <img id=img src={image} alt="Image Preview" class="ring-2 rounded-lg shadow-sm" />
            </div>
            <div class="col-span-1 m-2 rounded-lg" bind:this={container}>
                <NewUploadForm />
                <!-- <p>{JSON.stringify(predictions)}</p> -->
                <!-- {#if predictions} -->
                <button class="btn w-full h-20 mt-4"> Upload & Mint</button>
                <!-- {:else} -->
                <!-- <button class="btn w-full h-20 mt-4"> Prepare</button>
                {/if} -->
            </div>                
            {:else}
                <span bind:this={placeholder}>Image Preview</span>
            {/if}
       </div>
    </div>
    {:else}
    <div class="flex items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" bind:this={input} on:change={onChange}
       />
        </label>
    </div>
    {/if}
</div>
  