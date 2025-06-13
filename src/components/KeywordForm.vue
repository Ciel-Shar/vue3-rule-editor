<template>
  <div v-for="param in keywordParams" :key="param.name" class="mb-3">
    <label :for="param.name" class="block text-sm font-medium text-gray-700 mb-1">{{ param.displayName || param.name }}</label>
    <div v-if="param.type === 'string'" class="form-control">
      <input 
        :id="param.name" 
        v-model="params[param.name]" 
        type="text" 
        :placeholder="param.placeholder" 
        class="input input-bordered w-full"
        :required="param.required"
      >
    </div>
    <div v-if="param.type === 'number'" class="form-control">
      <input 
        :id="param.name" 
        v-model.number="params[param.name]" 
        type="number" 
        :placeholder="param.placeholder" 
        class="input input-bordered w-full"
        :required="param.required"
        :min="param.min"
        :max="param.max"
      >
    </div>
    <div v-if="param.type === 'boolean'" class="form-control flex items-center">
      <input 
        :id="param.name" 
        v-model="params[param.name]" 
        type="checkbox" 
        class="checkbox"
      >
      <label :for="param.name" class="ml-2 text-sm">{{ param.description }}</label>
    </div>
    <div v-if="param.type === 'enum'" class="form-control">
      <select 
        :id="param.name" 
        v-model="params[param.name]" 
        class="select select-bordered w-full"
        :required="param.required"
        :multiple="param.multi"
      >
        <option v-for="option in param.options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <p v-if="param.description" class="text-xs text-gray-500 mt-1">{{ param.description }}</p>
  </div>
  <div v-if="isContentModifier" class="mt-3 p-2 bg-green-50 border-l-4 border-green-500">
    <p class="text-sm text-green-700"><i class="fa fa-info-circle mr-1"></i> 此关键字是content的修饰符，将自动排列在content之后</p>
  </div>
  <button @click="$emit('update', params)" class="btn btn-xs btn-primary mt-2">应用更改</button>
</template>

<script setup>
import { computed } from 'vue'
import suricataKeywords from '../data/SuricataKeyWords'

const props = defineProps({
  keywordId: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update'])

const keyword = computed(() => {
  return suricataKeywords.getKeywordById(props.keywordId)
})

const keywordParams = computed(() => {
  return keyword.value?.params || []
})

// 检测是否为content的修饰符
const isContentModifier = computed(() => {
  return ['nocase', 'offset', 'depth'].includes(props.keywordId)
})
</script> 