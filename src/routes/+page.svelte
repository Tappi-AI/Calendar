<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { DateTime } from 'luxon';
  import { calendarStore, setCurrentDate, setLayout, LAYOUTS } from '$lib/stores/calendarStore';
  import { monthGrid } from '$lib/stores/derivedCalendar';
  import Meetings from '$lib/components/Meetings.svelte';
  import { writable } from 'svelte/store';

  // selectedDate controls the currently clicked day
  let selectedDate = $calendarStore.currentDate; // default: today

  const isSameDate = (a: DateTime, b: DateTime) =>
    a.toISODate() === b.toISODate();
</script>

<!-- ===================== HEADER ===================== -->
<div class="flex items-center gap-4 p-3 border-b border-gray-200">
  <button
    class="px-2 py-1 rounded hover:bg-gray-100"
    on:click={() => setCurrentDate($calendarStore.currentDate.minus({ months: 1 }))}>
    ‹
  </button>

  <h2 class="flex-grow text-lg font-semibold m-0">
    {$calendarStore.currentDate.toFormat('MMMM yyyy')}
  </h2>

  <button
    class="px-2 py-1 rounded hover:bg-gray-100"
    on:click={() => setCurrentDate($calendarStore.currentDate.plus({ months: 1 }))}>
    ›
  </button>

  <button
    class="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
    on:click={() => {
      const today = DateTime.now();
      setCurrentDate(today);
      selectedDate = today;
    }}>
    Today
  </button>

  <div class="ml-4 flex gap-1">
    <button
      class="px-2 py-1 rounded hover:bg-gray-100"
      on:click={() => setLayout(LAYOUTS.MONTH)}>Month</button>
    <button
      class="px-2 py-1 rounded hover:bg-gray-100"
      on:click={() => setLayout(LAYOUTS.WEEK)}>Week</button>
    <button
      class="px-2 py-1 rounded hover:bg-gray-100"
      on:click={() => setLayout(LAYOUTS.DAY)}>Day</button>
  </div>
</div>

<!-- ===================== MONTH GRID ===================== -->
<div class="grid grid-cols-7 grid-rows-6 h-[calc(100vh-80px)] border-t border-l border-gray-300">
  {#each $monthGrid as cell}
    <div
      class={`relative border-r border-b border-gray-300 p-1 select-none cursor-pointer
        ${cell.inCurrentMonth ? '' : 'bg-gray-50 text-gray-400'}
        ${cell.isToday ? 'bg-blue-100 border-2 border-blue-500 z-10' : ''}
        ${isSameDate(cell.date, selectedDate) ? 'outline-2 outline-blue-600 bg-blue-50 z-20' : ''}`}
      role="button"
      tabindex="0"
      on:click={() => selectedDate = cell.date}
      on:keydown={(e) => e.key === 'Enter' && (selectedDate = cell.date)}
    >
      <span class="absolute top-1 right-1 text-xs font-semibold">{cell.date.day}</span>

      <!-- ===================== MEETINGS OVERLAY ===================== -->
      {#if isSameDate(cell.date, selectedDate)}
        <Meetings date={cell.date} />
      {/if}
    </div>
  {/each}
</div>
