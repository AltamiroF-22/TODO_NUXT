<template>
  <div class="py-2 px-7 flex items-center justify-between w-full text-zinc-500">
      <p class="text-zinc-400">{{ countItemsLeft }} ainda restantes</p>
      <div class="flex gap-4">
          <button 
              @click="emit('all')" 
              :class="{'text-blue-500': filteringBy === 'all'}" 
              class="transition font-semibold hover:text-zinc-900"
          >
              Todos
          </button>
          <button 
              @click="emit('actives')" 
              :class="{'text-blue-500': filteringBy === 'actives'}" 
              class="transition font-semibold hover:text-zinc-900"
          >
              Ativos
          </button>
          <button 
              @click="emit('completed')" 
              :class="{'text-blue-500': filteringBy === 'completed'}" 
              class="transition font-semibold hover:text-zinc-900"
          >
              Completados
          </button>
      </div>
      <button 
          @click="emit('deleteCompleted')" 
          class="transition hover:text-zinc-900"
      >
          Limpar completados
      </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
task: Array,
filteringBy: {
  type: String,
  default: 'all',
  validator: value => ['all', 'actives', 'completed'].includes(value)
}
});

const emit = defineEmits(['completed', 'actives', 'all', 'deleteCompleted']);

// Computed para contar as tarefas ativas
const countItemsLeft = computed(() => {
return (props.task || []).filter(t => !t.completed).length;
});
</script>
