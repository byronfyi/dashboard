<script context="module">
    import { getAccessToken, getJobsCount } from '$lib/loadHelper';
    import HttpError from '$lib/HttpError';

    export async function load({ url, params, fetch, session, context }) {
        let tokenResult;
        let creativeJobsCount;
        let salesOrdersCount;
        let printJobsCount;
        let shippingJobsCount;

        const endpoint = 'https://portal.wearefyi.dev/items';

        try {
            tokenResult = await getAccessToken(fetch);
            salesOrdersCount = await getJobsCount(fetch, tokenResult.data["access_token"], `${endpoint}/sales_orders?meta=total_count`);
            creativeJobsCount = await getJobsCount(fetch, tokenResult.data["access_token"], `${endpoint}/creative_jobs?meta=total_count`);
            printJobsCount = await getJobsCount(fetch, tokenResult.data["access_token"], `${endpoint}/print_jobs?meta=total_count`);
            shippingJobsCount = await getJobsCount(fetch, tokenResult.data["access_token"], `${endpoint}/shipping_jobs?meta=total_count`);

            return {
                props: {
                    creativeJobsCount: creativeJobsCount,
                    salesOrdersCount: salesOrdersCount,
                    printJobsCount: printJobsCount,
                    shippingJobsCount: shippingJobsCount,
                }
            }
        } catch (error) {
            return {
                status: error instanceof HttpError ? error.response.status : 500,
                error: error
            }
        }
    }
</script>

<script>
    import { toMonthName } from '$lib/utilities';

    export let salesOrdersCount;
    export let creativeJobsCount;
    export let printJobsCount;
    export let shippingJobsCount;

    const totalSalesOrders = salesOrdersCount.meta['total_count'];
    const totalCreativeJobs = creativeJobsCount.meta['total_count'];
    const totalPrintJobs = printJobsCount.meta['total_count'];
    const totalShippingJobs = shippingJobsCount.meta['total_count'];

    const currentMonth = new Date().getMonth();
    const currentMonthName = toMonthName(currentMonth);
</script>

<svelte:head>
    <title>Dashboard | Home</title>
</svelte:head>

<header class="pt-14 pb-32 bg-[#f5f7ff]">
    <div class="max-w-screen-xl mx-auto px-10">
        <h1 class="text-3xl font-bold">Dashboard</h1>
    </div>
</header>

<main class="max-w-screen-xl mx-auto -mt-20 px-10">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div class="text-lg px-6 py-10 rounded-lg bg-[#f0f2fa] card card-orange">
            <h2 class="text-2xl font-bold mb-3">Sales Jobs</h2>
            <p>Total: {totalSalesOrders}</p>
            <!-- <p>{currentMonthName}: {creativeJobsCount.length}</p> -->
        </div>

        <div class="text-lg px-6 py-10 rounded-lg bg-[#f0f2fa] card card-blue">
            <h2 class="text-2xl font-bold mb-3">Creative Jobs</h2>
            <p>Total: {totalCreativeJobs}</p>
            <!-- <p>{currentMonthName}: {creativeJobsCount.length}</p> -->
        </div>

        <div class="text-lg px-6 py-10 rounded-lg bg-[#f0f2fa] card card-red">
            <h2 class="text-2xl font-bold mb-3">Print Jobs</h2>
            <p>Total: {totalPrintJobs}</p>
            <!-- <p>{currentMonthName}: {creativeJobsCount.length}</p> -->
        </div>

        <div class="text-lg px-6 py-10 rounded-lg bg-[#f0f2fa] card card-green">
            <h2 class="text-2xl font-bold mb-3">Shipping Jobs</h2>
            <p>Total: {totalShippingJobs}</p>
            <!-- <p>{currentMonthName}: {creativeJobsCount.length}</p> -->
        </div>
    </div>
</main>
