<template>
    <div>
      <input
        class="max-w-[700px] w-full outline-none text-gray-700 p-3"
        :type="inputType"
        :name="inputName"
        :placeholder="placeholder"
        :value="modelValue"  
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
      inputType: {
        type: String,
        default: 'text'
      },
      inputName: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      modelValue: String 
    })
  </script>
  