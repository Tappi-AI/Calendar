<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { getWeekdayAndTime } from '$lib/utils/date_time'; // adjust path if needed
	import { onMount } from 'svelte';

	// Reactive variables for user input
	let year = 2025;
	let month = 11;
	let day = 23;
	let hour = 14;
	let minute = 30;
	let second = 0;
	let timezone = 'Asia/Taipei';

	let weekday = '';
	let time = '';

	function updateDateTime() {
		try {
			const result = getWeekdayAndTime(year, month, day, hour, minute, second, timezone);
			weekday = result.weekday;
			time = result.time;
		} catch (err) {
			weekday = 'Invalid input';
			time = '--:--:--';
		}
	}

	// Run once when component mounts
	onMount(() => {
		updateDateTime();
	});
</script>

<main>
	<h1>Date & Time Converter</h1>

	<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
		<label>
			Year: <input type="number" bind:value={year} on:input={updateDateTime} />
		</label>
		<label>
			Month: <input type="number" min="1" max="12" bind:value={month} on:input={updateDateTime} />
		</label>
		<label>
			Day: <input type="number" min="1" max="31" bind:value={day} on:input={updateDateTime} />
		</label>
		<label>
			Hour: <input type="number" min="0" max="23" bind:value={hour} on:input={updateDateTime} />
		</label>
		<label>
			Minute: <input type="number" min="0" max="59" bind:value={minute} on:input={updateDateTime} />
		</label>
		<label>
			Second: <input type="number" min="0" max="59" bind:value={second} on:input={updateDateTime} />
		</label>
		<label>
			Timezone: <input
				type="text"
				bind:value={timezone}
				on:input={updateDateTime}
				placeholder="e.g. Asia/Taipei"
			/>
		</label>
	</div>

	<h2>Result</h2>
	<p>
		Weekday: <strong>{weekday}</strong><br />
		Time: <strong>{time}</strong>
	</p>
</main>

<style>
	main {
		font-family: system-ui, sans-serif;
		padding: 2rem;
	}
	h1,
	h2 {
		margin-bottom: 0.5rem;
	}
	input {
		width: 100%;
		padding: 0.25rem;
	}
	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
