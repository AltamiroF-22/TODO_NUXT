<template>
  <div class="relative w-[100dvw] h-[25dvh] bg-zinc-800 bg-[url('/assets/images/bg-mobile-light.jpg')] md:bg-[url('/assets/images/bg-desktop-light.jpg')] bg-no-repeat bg-center bg-cover">
    <div class="absolute flex flex-col items-center w-full top-[5dvh] md:top-[10dvh] left-1/2 transform -translate-x-1/2">
      <h1 class="text-4xl font-bold text-white mb-7 tracking-wider">TODO</h1>
      <Container class="mb-7 flex items-center justify-between">
        <Input v-model="taskValue" inputType="text" inputName="add-todo" placeholder="Criar nova tarefa" class="w-full" @keydown.enter="handleAddTask"/>
        <button
          @click="handleAddTask"
          class="rounded bg-white border flex items-center justify-center px-4 p-2 gap-2 text-white trasintion bg-[linear-gradient(120deg,_hsl(192,100%,67%),_hsl(280,87%,65%))] hover:opacity-75">
          Adicionar
          <i class="material-icons text-xl text-white">add</i>
        </button>
      </Container>
      <Container :class="data.length !== 0 ? 'justify-between' : 'justify-center'"
        class="min-h-[150px] flex  items-center flex-col">
        <p v-if="data.length === 0" class="text-gray-400">Sem Tarefas no momento...</p>
        <div v-else class="flex flex-col w-full gap-3">
          <Task 
            v-for="task in dataToShow" 
            :key="task.id" 
            :task="task" 
            @toggle="toggleTask"
            @delete="deleteTask"
            @edit="editTask"/>
        </div>
        <TaskFooter 
            v-if="data.length !== 0"
            :task="data"  
            :filteringBy="filteringBy"
            @completed="toggleFilter" 
            @actives="setActives" 
            @all="setAll"
            @deleteCompleted="deleteCompleted"/>
      </Container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const taskValue = ref('')
const editingTaskId = ref(null)
const filteringBy = ref('all') // all, actives, completed

const resetEditingID = () => {
  editingTaskId.value = null
  taskValue.value = ''
}

// Lista de tarefas
const data = ref([
  { id: 1, completed: false, task: 'Tarefa para ser feita.' },
  { id: 2, completed: true, task: "Tarefa feita." },
])

// Computed para filtrar dinamicamente
const dataToShow = computed(() => {
  if (filteringBy.value === 'actives') {
    return data.value.filter(t => !t.completed)
  } else if (filteringBy.value === 'completed') {
    return data.value.filter(t => t.completed)
  }
  return data.value
})

// Adicionar ou editar tarefa
const handleAddTask = () => {
  if (!taskValue.value.trim()) return

  if (editingTaskId.value !== null) {
    const taskToEdit = data.value.find(t => t.id === editingTaskId.value)
    if (taskToEdit) {
      taskToEdit.task = taskValue.value
    }
    resetEditingID()
  } else {
    data.value.push({
      id: Date.now(),
      completed: false,
      task: taskValue.value
    })
  }

  taskValue.value = ''
}

// Alternar estado de completado
const toggleTask = (taskId) => {
  resetEditingID()
  const task = data.value.find(t => t.id === taskId)
  if (task) task.completed = !task.completed
}

// Excluir tarefa
const deleteTask = (taskId) => {
  data.value = data.value.filter(task => task.id !== taskId)
}

// Editar tarefa
const editTask = (taskId) => {
  const task = data.value.find(t => t.id === taskId)
  if (task) {
    taskValue.value = task.task
    editingTaskId.value = taskId
  }
}

// Alternar filtro para tarefas concluídas
const toggleFilter = () => {
  filteringBy.value = filteringBy.value === 'completed' ? 'all' : 'completed'
}

// Mostrar apenas tarefas ativas
const setActives = () => {
  filteringBy.value = 'actives'
}
const setAll = () => {
  filteringBy.value = 'all'
}

const deleteCompleted = () => {
  data.value = data.value.filter(t => !t.completed)
}
</script>
