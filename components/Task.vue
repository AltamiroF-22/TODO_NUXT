<template>
    <div class="flex py-3 px-2 border-b justify-between items-center">
      <div class="flex gap-2">
        <!-- Botão -->
        <button 
          @click="toggleTask"
          class="rounded-full bg-white border flex items-center justify-center mx-4 w-[2rem] h-[2rem] hover:bg-gray-200 transition" 
          :class="{'bg-[linear-gradient(120deg,_hsl(192,100%,67%),_hsl(280,87%,65%))] hover:opacity-75' : task.completed}">
          <i v-if="task.completed" class="material-icons text-xl text-white">check</i>
        </button>
  
        <!-- Texto da tarefa -->
        <div :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.task }}
        </div>
      </div>
  
      <!-- Botões de Editar/Excluir -->
      <button v-if="!task.completed" @click="editTask">
        <i class="material-icons text-xl text-gray-500 transition hover:text-[#56ddfe] px-2">edit</i>
      </button>
      <button v-if="task.completed" @click="deleteTask">
        <i class="material-icons text-xl text-gray-500 transition hover:text-red-300 px-2">delete</i>
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const { task } = defineProps({
    task: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['toggle', 'delete','edit'])
  
  const toggleTask = () => {
    emit('toggle', task.id)
  }
  
  const deleteTask = () => {
    emit('delete', task.id)
  }
  
  const editTask = () => {
    emit('edit', task.id)
  }
  </script>
  