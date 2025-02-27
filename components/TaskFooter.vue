<template>
    <div class="py-2 px-7 flex items-center justify-between w-full ">
        <p class="text-zinc-400">{{ countItemsLeft }} ainda restantes</p>
        <div class="flex gap-4">
            <button class="transition font-semibold hover:text-blue-500">Todos</button>
            <button class="transition font-semibold hover:text-blue-500">Ativos</button>
            <button @click="completed" class="transition font-semibold hover:text-blue-500">Completados</button>
        </div>
        <button class="transition hover:text-blue-500">Limpar completados</button>
    </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';

const props = defineProps({
  task: Array
});

const emit = defineEmits(['completed', 'actives','all']);

const completed = () => {
    emit('completed')
}

// Computed property para contar os itens ativos (não concluídos)
const countItemsLeft = computed(() => {
  return (props.task || []).filter(t => !t.completed).length;
});
</script>
