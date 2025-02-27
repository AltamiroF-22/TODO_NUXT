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
              v-for="task in data" 
              :key="task.id" 
              :task="task" 
              @toggle="toggleTask"
              @delete="deleteTask"
              @edit="editTask"/>
          </div>
          <TaskFooter :task="data" v-if="data.length !== 0" @completed="filterByCompleted"/>
        </Container>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const taskValue = ref('')
  const editingTaskId = ref(null) // Identificador da tarefa que está sendo editada
  
  const resetEditingID = () => {
        editingTaskId.value = null
        taskValue.value = ''
  }
  
  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (!taskValue.value.trim()) return
  
    if (editingTaskId.value !== null) {
      // Atualiza a tarefa existente
      const taskToEdit = data.value.find(t => t.id === editingTaskId.value)
      
      taskToEdit.task = taskValue.value
      resetEditingID()
    } else {
      // Adiciona uma nova tarefa
      data.value.push({
        id: Date.now(),
        completed: false,
        task: taskValue.value
      })
    }
    
    taskValue.value = '' // Limpa o campo após adicionar ou editar
  }
  
  // Função para alternar o estado de 'completed' da tarefa
  const toggleTask = (taskId) => {
    
    resetEditingID()

    const task = data.value.find(t => t.id === taskId)
    if (task) {
      task.completed = !task.completed
    }

  }
  
  // Função para excluir uma tarefa
  const deleteTask = (taskId) => {
    data.value = data.value.filter(task => task.id !== taskId)
  }
  
  // Função para editar uma tarefa
  const editTask = (taskId) => {
    const task = data.value.find(t => t.id === taskId)
    if (task) {
      taskValue.value = task.task
      editingTaskId.value = taskId // Marca qual tarefa está sendo editada
    }
  }
  
  const data = ref([
    {
      id: 1,
      completed: false,
      task: 'Eai Beleza?'
    },
    {
      id: 2,
      completed: true,
      task: "Foi o que deu pra fazer"
    },
    {
      id: 3,
      completed: false,
      task: "The book is on the table"
    },
  ])

  const filterByCompleted = () => {
    data.value = data.value.filter(t => t.completed === true);
    console.log(data.value)
  }

  </script>
  