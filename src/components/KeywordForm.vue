<template>
  <el-form :model="params" label-width="120px" class="keyword-form">
    <el-form-item
      v-for="param in keywordParams"
      :key="param.name"
      :label="param.displayName || param.name"
      :required="param.required"
    >
      <!-- String input -->
      <el-input
        v-if="param.type === 'string'"
        v-model="params[param.name]"
        :placeholder="param.placeholder"
        :required="param.required"
        class="w-full"
      ></el-input>

      <!-- Number input -->
      <el-input-number
        v-if="param.type === 'number'"
        v-model="params[param.name]"
        :placeholder="param.placeholder"
        :required="param.required"
        :min="param.min"
        :max="param.max"
        class="w-full"
      ></el-input-number>

      <!-- Boolean checkbox -->
      <el-checkbox
        v-if="param.type === 'boolean'"
        v-model="params[param.name]"
        class="w-full"
      >
      </el-checkbox>

      <!-- Single select -->
      <el-select
        v-if="param.type === 'enum' && !param.multiple"
        v-model="params[param.name]"
        :required="param.required"
        class="w-full"
        clearable
      >
        <el-option
          v-for="option in param.options"
          :key="option"
          :label="option"
          :value="option"
        ></el-option>
      </el-select>

      <!-- Multi select -->
      <el-checkbox-group
        v-if="param.type === 'enum' && param.multiple"
        v-model="params[param.name]"
        class="w-full"
      >
        <el-checkbox
          v-for="option in param.options"
          :key="option"
          :label="option"
          class="mb-2"
        >
          <span class="text-sm">{{ option }}</span>
        </el-checkbox>
      </el-checkbox-group>

      <!-- Description hint -->
      <div v-if="param.description" class="form-item-hint">
        <el-tooltip
          :content="param.description"
          placement="top"
          effect="light"
        >
          <el-icon class="text-gray-400"><InfoFilled /></el-icon>
        </el-tooltip>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import suricataKeywords from '../data/SuricataKeyWords'
import { InfoFilled } from '@element-plus/icons-vue'

const props = defineProps({
  keywordId: {
    type: String,
    required: true
  },
  params: {
    type: Object,
    default: () => ({})
  },
  ruleOptions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update', 'updateRuleOptions'])

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

// 监听params变化，自动更新
watch(() => props.params, (newParams) => {
  emit('update', newParams)
}, { deep: true })
</script>

<style scoped>
.keyword-form {
  width: 100%;
}

.keyword-form :deep(.el-form-item) {
  margin-bottom: 16px;
}

.keyword-form :deep(.el-form-item__label) {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.keyword-form :deep(.el-form-item__content) {
  flex: 1;
  min-width: 0;
}

.keyword-form :deep(.el-input),
.keyword-form :deep(.el-select),
.keyword-form :deep(.el-date-picker) {
  width: 100%;
}

.keyword-form :deep(.el-input__wrapper),
.keyword-form :deep(.el-select__wrapper) {
  width: 100%;
}

.keyword-form :deep(.el-input__inner) {
  width: 100%;
}

/* 确保多选框组不会溢出 */
.keyword-form :deep(.el-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.keyword-form :deep(.el-checkbox) {
  margin-right: 0;
  flex: 0 0 auto;
}

/* 确保单选按钮组不会溢出 */
.keyword-form :deep(.el-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}

.keyword-form :deep(.el-radio) {
  margin-right: 0;
  flex: 0 0 auto;
}

/* 确保文本域不会溢出 */
.keyword-form :deep(.el-textarea__inner) {
  width: 100%;
  min-height: 80px;
  resize: vertical;
}

/* 确保日期时间选择器不会溢出 */
.keyword-form :deep(.el-date-editor) {
  width: 100%;
}

/* 确保数字输入框不会溢出 */
.keyword-form :deep(.el-input-number) {
  width: 100%;
}

/* 确保开关组件不会溢出 */
.keyword-form :deep(.el-switch) {
  margin-right: 0;
}

/* 确保颜色选择器不会溢出 */
.keyword-form :deep(.el-color-picker) {
  width: 100%;
}

/* 确保滑块组件不会溢出 */
.keyword-form :deep(.el-slider) {
  width: 100%;
}

/* 确保级联选择器不会溢出 */
.keyword-form :deep(.el-cascader) {
  width: 100%;
}

/* 确保时间选择器不会溢出 */
.keyword-form :deep(.el-time-picker) {
  width: 100%;
}

/* 确保评分组件不会溢出 */
.keyword-form :deep(.el-rate) {
  margin-right: 0;
}

/* 确保上传组件不会溢出 */
.keyword-form :deep(.el-upload) {
  width: 100%;
}

/* 确保标签不会溢出 */
.keyword-form :deep(.el-tag) {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 确保提示文本不会溢出 */
.keyword-form :deep(.el-form-item__error) {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>