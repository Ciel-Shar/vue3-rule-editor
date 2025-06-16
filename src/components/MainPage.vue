<template>
  <div class="main-layout">
    <div class="main-container">
      <!-- 左侧关键字选择树 -->
      <div class="keyword-tree">
        <el-card class="h-full">
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2"><Document /></el-icon>
              <span class="text-lg font-bold">关键字选择树</span>
            </div>
          </template>
          <div class="keyword-tree-content">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <template #default="{ node, data }">
                <div class="custom-tree-node">
                  <span class="node-label">{{ data.label }}</span>
                  <el-tooltip
                    v-if="data.type === 'keyword'"
                    :content="data.description"
                    placement="right"
                    effect="light"
                    :show-after="500"
                  >
                    <span class="node-description">{{ data.description }}</span>
                  </el-tooltip>
                </div>
              </template>
            </el-tree>
          </div>
        </el-card>
      </div>

      <!-- 中间规则基本信息和规则预览 -->
      <div class="rule-info-preview">
        <!-- 规则基本信息 -->
        <el-card class="mb-4">
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2"><Setting /></el-icon>
              <span class="text-lg font-bold">规则基本信息</span>
            </div>
          </template>
          <el-form :model="rule" label-width="120px">
            <el-form-item label="规则动作">
              <el-select v-model="rule.action" class="w-full">
                <el-option
                  v-for="action in ruleActions"
                  :key="action.id"
                  :label="action.name + ' ' + action.description"
                  :value="action.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="协议">
              <el-select v-model="rule.protocol" @change="setProtocol(rule.protocol)" class="w-full">
                <el-option
                  v-for="protocol in protocols"
                  :key="protocol"
                  :label="protocol.toUpperCase()"
                  :value="protocol"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="源IP和端口">
              <el-row :gutter="16">
                <el-col :span="12">
                  <el-input v-model="rule.source.address" placeholder="any"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="rule.source.port" placeholder="any"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="目标IP和端口">
              <el-row :gutter="16">
                <el-col :span="12">
                  <el-input v-model="rule.destination.address" placeholder="any"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="rule.destination.port" placeholder="any"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 规则预览 -->
        <el-card>
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2"><View /></el-icon>
              <span class="text-lg font-bold">当前规则</span>
            </div>
          </template>
          <el-input
            v-model="formattedRule"
            type="textarea"
            :rows="10"
            class="rule-preview"
          ></el-input>
        </el-card>
      </div>

      <!-- 右侧规则选项编辑 -->
      <div class="rule-options-editor">
        <el-card class="h-full">
          <template #header>
            <div class="flex items-center">
              <el-icon class="mr-2"><Edit /></el-icon>
              <span class="text-lg font-bold">规则选项</span>
              <span class="text-sm text-gray-500 ml-2">(可拖拽排序)</span>
            </div>
          </template>
          <div v-if="rule.options.length === 0" class="empty-state">
            <el-empty description="从左侧选择关键字添加到规则中"></el-empty>
          </div>
          <div v-else class="options-list">
            <draggable v-model="rule.options" :key-fn="getOptionKey" item-key="id">
              <template #item="{ element, index }">
                <el-card class="mb-4 option-card">
                  <template #header>
                    <div class="flex justify-between items-center">
                      <div>
                        <span class="font-medium">{{element.id}}</span>
                        <el-tooltip
                          :content="getKeywordDescription(element.id)"
                          placement="top"
                          effect="light"
                          :show-after="500"
                        >
                          <span class="ml-2 text-xs text-gray-500">{{getKeywordDescription(element.id) }}</span>
                        </el-tooltip>
                      </div>
                      <div class="flex items-center">
                        <el-button type="danger" size="small" @click="removeOption(index)">
                          <el-icon><Delete /></el-icon>
                        </el-button>
                        <el-button size="small" @click="toggleCollapse(index)">
                          <el-icon>
                            <component :is="isCollapsed[index] ? 'ArrowDown' : 'ArrowUp'" />
                          </el-icon>
                        </el-button>
                      </div>
                    </div>
                  </template>
                  <div v-if="!isCollapsed[index]">
                    <KeywordForm
                      :keywordId="element.id"
                      :params="element.params"
                      :ruleOptions="rule.options"
                      @update="updateOption(index, $event)"
                      @updateRuleOptions="updateRuleOptions"
                    />
                  </div>
                </el-card>
              </template>
            </draggable>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'
import suricataKeywords from '../data/SuricataKeyWords'
import KeywordForm from './KeywordForm.vue'
import { Document, Setting, View, Edit, Delete, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

// 规则数据模型
const rule = ref({
  action: 'alert',
  protocol: 'tcp',
  source: { address: 'any', port: 'any' },
  destination: { address: 'any', port: 'any' },
  options: []
})

// 协议列表
const protocols = ['tcp', 'udp', 'icmp', 'ip', 'http', 'rpc']

// 当前选中的协议
const currentProtocol = ref('tcp')

// 规则动作列表
const ruleActions = [
  { id: 'alert', name: 'alert', description: '生成警报并继续检查数据包' },
  { id: 'pass', name: 'pass', description: '停止进一步检查数据包' },
  { id: 'drop', name: 'drop', description: '丢弃数据包并生成警报' },
  { id: 'reject', name: 'reject', description: '发送RST/ICMP错误到匹配数据包的发送方' },
  { id: 'rejectsrc', name: 'rejectsrc', description: '与reject相同' },
  { id: 'rejectdst', name: 'rejectdst', description: '发送RST/ICMP错误到匹配数据包的接收方' },
  { id: 'rejectboth', name: 'rejectboth', description: '发送RST/ICMP错误到对话双方' }
]

// 通用关键字分类
const generalCategories = computed(() => suricataKeywords.generalCategories)

// 协议特定关键字分类
const protocolCategories = computed(() => {
  return suricataKeywords.protocolCategories.filter(category => 
    category.protocols && category.protocols.includes(currentProtocol.value)
  )
})

// 关键字名称映射
const keywordNames = computed(() => {
  const names = {}
  suricataKeywords.generalCategories.forEach(category => {
    category.keywords.forEach(keyword => {
      names[keyword.id] = keyword.name
    })
  })
  suricataKeywords.protocolCategories.forEach(category => {
    category.keywords.forEach(keyword => {
      names[keyword.id] = keyword.name
    })
  })
  return names
})

// 获取关键字描述
const getKeywordDescription = (keywordId) => {
  // 查找通用关键字
  for (const category of suricataKeywords.generalCategories) {
    for (const keyword of category.keywords) {
      if (keyword.id === keywordId) {
        return keyword.description || ''
      }
    }
  }
  // 查找协议特定关键字
  for (const category of suricataKeywords.protocolCategories) {
    for (const keyword of category.keywords) {
      if (keyword.id === keywordId) {
        return keyword.description || ''
      }
    }
  }
  return ''
}

// 折叠状态管理
const isCollapsed = ref({})
const categoryOpen = ref({ general: false, protocol: false })
const subCategoryOpen = ref({})

// 添加关键字
const addKeyword = (keyword) => {
  if (!isKeywordSelected(keyword.id)) {
    // 创建新的选项对象
    const newOption = {
      id: keyword.id,
      params: keyword.id === 'content' ? {
        value: '',
        nocase: false,
        offset: null,
        depth: null
      } : {}
    }

    // 根据关键字ID确定插入位置
    if (keyword.id === 'msg') {
      // msg 总是放在第一位
      rule.value.options.unshift(newOption)
      isCollapsed.value[0] = false
    } else if (keyword.id === 'sid') {
      // sid 总是放在最后一位
      rule.value.options.push(newOption)
      isCollapsed.value[rule.value.options.length - 1] = false
    } else if (keyword.id === 'rev') {
      // rev 总是放在 sid 之前
      const sidIndex = rule.value.options.findIndex(opt => opt.id === 'sid')
      if (sidIndex !== -1) {
        rule.value.options.splice(sidIndex, 0, newOption)
        isCollapsed.value[sidIndex] = false
      } else {
        rule.value.options.push(newOption)
        isCollapsed.value[rule.value.options.length - 1] = false
      }
    } else {
      // 其他关键字放在 msg 之后，sid/rev 之前
      const sidIndex = rule.value.options.findIndex(opt => opt.id === 'sid')
      if (sidIndex !== -1) {
        rule.value.options.splice(sidIndex, 0, newOption)
        isCollapsed.value[sidIndex] = false
      } else {
        rule.value.options.push(newOption)
        isCollapsed.value[rule.value.options.length - 1] = false
      }
    }
  }
}

// 移除关键字
const removeOption = (index) => {
  rule.value.options.splice(index, 1)
}

// 更新关键字参数
const updateOption = (index, params) => {
  rule.value.options[index].params = params
}

// 切换折叠状态
const toggleCollapse = (index) => {
  isCollapsed.value[index] = !isCollapsed.value[index]
}

// 获取选项的唯一键
const getOptionKey = (option) => {
  return option.id + '_' + JSON.stringify(option.params)
}

// 处理拖拽结束
const handleDragEnd = () => {
  // 重新排序选项以保持标准顺序
  const msgOption = rule.value.options.find(opt => opt.id === 'msg')
  const sidOption = rule.value.options.find(opt => opt.id === 'sid')
  const revOption = rule.value.options.find(opt => opt.id === 'rev')
  const otherOptions = rule.value.options.filter(opt => 
    opt.id !== 'msg' && opt.id !== 'sid' && opt.id !== 'rev'
  )
  
  rule.value.options = [
    ...(msgOption ? [msgOption] : []),
    ...otherOptions,
    ...(revOption ? [revOption] : []),
    ...(sidOption ? [sidOption] : [])
  ]
}

// 格式化规则
const formattedRule = computed(() => {
  // 确保选项按标准顺序排列
  const msgOption = rule.value.options.find(opt => opt.id === 'msg')
  const sidOption = rule.value.options.find(opt => opt.id === 'sid')
  const revOption = rule.value.options.find(opt => opt.id === 'rev')
  const otherOptions = rule.value.options.filter(opt => 
    opt.id !== 'msg' && opt.id !== 'sid' && opt.id !== 'rev'
  )
  
  const orderedOptions = [
    ...(msgOption ? [msgOption] : []),
    ...otherOptions,
    ...(revOption ? [revOption] : []),
    ...(sidOption ? [sidOption] : [])
  ]
  
  return suricataKeywords.renderFullRule({
    ...rule.value,
    options: orderedOptions
  })
})

// 初始化时默认添加msg和sid
onMounted(() => {
  // 查找meta关键字中的msg和sid
  const msgKeyword = findKeywordById('msg')
  const sidKeyword = findKeywordById('sid')
  
  if (msgKeyword) {
    addKeyword(msgKeyword)
  }
  if (sidKeyword) {
    addKeyword(sidKeyword)
  }
})

// 辅助函数：根据ID查找关键字
const findKeywordById = (id) => {
  // 查找通用关键字
  for (const category of suricataKeywords.generalCategories) {
    for (const keyword of category.keywords) {
      if (keyword.id === id) {
        return keyword
      }
    }
  }
  // 查找协议特定关键字
  for (const category of suricataKeywords.protocolCategories) {
    for (const keyword of category.keywords) {
      if (keyword.id === id) {
        return keyword
      }
    }
  }
  return null
}

// 切换分类折叠状态
const toggleCategory = (category) => {
  categoryOpen.value[category] = !categoryOpen.value[category]
}

// 检查分类是否展开
const isCategoryOpen = (category) => {
  return categoryOpen.value[category]
}

// 切换子分类折叠状态
const toggleSubCategory = (categoryId) => {
  subCategoryOpen.value[categoryId] = !subCategoryOpen.value[categoryId]
}

// 检查子分类是否展开
const isSubCategoryOpen = (categoryId) => {
  return subCategoryOpen.value[categoryId]
}

// 检查关键字是否已被选择
const isKeywordSelected = (keywordId) => {
  return rule.value.options.some(option => option.id === keywordId)
}

// 更新规则选项
const updateRuleOptions = (newOptions) => {
  // 保持 msg 在第一位
  const msgOption = newOptions.find(opt => opt.id === 'msg')
  const otherOptions = newOptions.filter(opt => opt.id !== 'msg')
  
  // 保持 sid 和 rev 在最后
  const sidOption = otherOptions.find(opt => opt.id === 'sid')
  const revOption = otherOptions.find(opt => opt.id === 'rev')
  const remainingOptions = otherOptions.filter(opt => opt.id !== 'sid' && opt.id !== 'rev')
  
  // 重新组合选项
  rule.value.options = [
    ...(msgOption ? [msgOption] : []),
    ...remainingOptions,
    ...(revOption ? [revOption] : []),
    ...(sidOption ? [sidOption] : [])
  ]
}

// 设置协议
const setProtocol = (protocol) => {
  // 清空上一个协议的特定规则
  const protocolSpecificKeywords = suricataKeywords.getProtocolCategories(currentProtocol.value).map(keyword => keyword.id)
  rule.value.options = rule.value.options.filter(option => !protocolSpecificKeywords.includes(option.id))
  
  currentProtocol.value = protocol
  rule.value.protocol = protocol
}

// 树形数据结构
const treeData = computed(() => {
  const data = [
    {
      id: 'general',
      label: '通用关键字',
      children: generalCategories.value.map(category => ({
        id: category.id,
        label: category.name,
        children: category.keywords.map(keyword => ({
          id: keyword.id,
          label: keyword.id,
          description: keyword.name,
          type: 'keyword',
          data: keyword
        }))
      }))
    }
  ]

  if (protocolCategories.value.length > 0) {
    data.push({
      id: 'protocol',
      label: '协议特定关键字',
      children: protocolCategories.value.map(category => ({
        id: category.id,
        label: category.name,
        children: category.keywords.map(keyword => ({
          id: keyword.id,
          label: keyword.id,
          description: keyword.name,
          type: 'keyword',
          data: keyword
        }))
      }))
    })
  }

  return data
})

const defaultProps = {
  children: 'children',
  label: 'label'
}

// 处理节点点击
const handleNodeClick = (data) => {
  if (data.type === 'keyword' && !isKeywordSelected(data.id)) {
    addKeyword(data.data)
  }
}
</script>

<style scoped>
.main-layout {
  width: 100vw;
  height: 100vh;
  background-color: #f5f7f5;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.main-container {
  width: 1400px;
  height: 100%;
  padding: 16px;
  display: flex;
  gap: 16px;
  overflow: hidden;
  box-sizing: border-box;
}

.keyword-tree {
  width: 300px;
  height: calc(100vh - 32px);
  flex: 0 0 300px;
  min-width: 300px;
  max-width: 300px;
  overflow: hidden;
}

.rule-info-preview {
  width: 600px;
  height: calc(100vh - 32px);
  flex: 0 0 600px;
  min-width: 600px;
  max-width: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rule-options-editor {
  width: 420px;
  height: calc(100vh - 32px);
  flex: 0 0 420px;
  min-width: 420px;
  max-width: 420px;
  overflow: hidden;
}

/* 卡片容器样式 */
.keyword-tree :deep(.el-card),
.rule-info-preview :deep(.el-card),
.rule-options-editor :deep(.el-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e0e8e0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

/* 卡片头部样式 */
.keyword-tree :deep(.el-card__header),
.rule-info-preview :deep(.el-card__header),
.rule-options-editor :deep(.el-card__header) {
  flex: 0 0 auto;
  padding: 12px 16px;
  background-color: #f8faf8;
  border-bottom: 1px solid #e0e8e0;
}

/* 卡片内容区域样式 */
.keyword-tree :deep(.el-card__body),
.rule-info-preview :deep(.el-card__body),
.rule-options-editor :deep(.el-card__body) {
  flex: 1;
  overflow: hidden;
  padding: 16px;
  background-color: #ffffff;
}

/* 关键字树内容区域 */
.keyword-tree-content {
  height: 100%;
  overflow-y: auto;
}

/* 树节点样式 */
.keyword-tree :deep(.el-tree-node__content) {
  height: 40px;
  border-radius: 4px;
  margin: 2px 0;
  transition: all 0.3s ease;
}

/* 一级节点样式 */
.keyword-tree :deep(.el-tree-node[data-level="0"] > .el-tree-node__content) {
  background-color: #e8f5e9;
  color: #2e7d32;
  font-weight: 600;
  border-left: 4px solid #2e7d32;
}

/* 二级节点样式 */
.keyword-tree :deep(.el-tree-node[data-level="1"] > .el-tree-node__content) {
  background-color: #f1f8e9;
  color: #558b2f;
  font-weight: 500;
  border-left: 4px solid #558b2f;
  margin-left: 16px;
}

/* 三级节点样式 */
.keyword-tree :deep(.el-tree-node[data-level="2"] > .el-tree-node__content) {
  background-color: #f9fbe7;
  color: #7cb342;
  border-left: 4px solid #7cb342;
  margin-left: 32px;
}

/* 悬停效果 */
.keyword-tree :deep(.el-tree-node__content:hover) {
  background-color: #c8e6c9 !important;
}

/* 选中效果 */
.keyword-tree :deep(.el-tree-node.is-current > .el-tree-node__content) {
  background-color: #81c784 !important;
  color: #ffffff !important;
}

/* 展开/折叠图标颜色 */
.keyword-tree :deep(.el-tree-node__expand-icon) {
  color: #4caf50;
}

/* 自定义展开/折叠图标 */
.keyword-tree :deep(.el-tree-node__expand-icon.expanded) {
  transform: rotate(90deg);
  color: #2e7d32;
}

/* 规则预览区域 */
.rule-preview {
  height: 100%;
}

.rule-preview :deep(.el-textarea__inner) {
  height: 100%;
  resize: none;
  background-color: #f8faf8;
  border-color: #e0e8e0;
  color: #2e7d32;
  font-family: monospace;
}

/* 规则选项列表 */
.options-list {
  height: 100%;
  overflow-y: auto;
}

/* 选项卡片样式 */
.option-card {
  width: 100%;
  margin-bottom: 16px;
  border: 1px solid #e0e8e0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

.option-card:last-child {
  margin-bottom: 0;
}

.option-card :deep(.el-card__header) {
  padding: 8px 12px;
  background-color: #f8faf8;
  border-bottom: 1px solid #e0e8e0;
}

.option-card :deep(.el-card__body) {
  padding: 12px;
  background-color: #ffffff;
}

/* 确保卡片内容不会溢出 */
.option-card :deep(.el-card__header) > div {
  width: 100%;
  overflow: hidden;
}

.option-card :deep(.el-card__header) .font-medium {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  color: #2e7d32;
}

.option-card :deep(.el-card__header) .text-xs {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  color: #558b2f;
}

/* 确保按钮组不会被挤压 */
.option-card :deep(.el-card__header) .flex.items-center {
  flex-shrink: 0;
}

/* 滚动条样式 */
.keyword-tree-content::-webkit-scrollbar,
.options-list::-webkit-scrollbar {
  width: 6px;
}

.keyword-tree-content::-webkit-scrollbar-thumb,
.options-list::-webkit-scrollbar-thumb {
  background-color: #a5d6a7;
  border-radius: 3px;
}

.keyword-tree-content::-webkit-scrollbar-track,
.options-list::-webkit-scrollbar-track {
  background-color: #f1f8e9;
}

/* 空状态样式 */
.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #558b2f;
}

/* 图标颜色 */
:deep(.el-icon) {
  color: #4caf50;
}

/* 按钮样式 */
:deep(.el-button--primary) {
  background-color: #4caf50;
  border-color: #4caf50;
}

:deep(.el-button--primary:hover) {
  background-color: #43a047;
  border-color: #43a047;
}

:deep(.el-button--primary.is-plain) {
  background-color: #e8f5e9;
  border-color: #81c784;
  color: #2e7d32;
}

:deep(.el-button--primary.is-plain:hover) {
  background-color: #c8e6c9;
  border-color: #4caf50;
  color: #1b5e20;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
}

.node-label {
  font-weight: 500;
}

.node-description {
  font-size: 12px;
  color: #558b2f;
  margin-left: 8px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: help;
}

/* 自定义tooltip样式 */
:deep(.el-tooltip__popper) {
  background-color: #f8faf8 !important;
  border: 1px solid #e0e8e0 !important;
  color: #2e7d32 !important;
  font-size: 12px !important;
  padding: 8px 12px !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}

:deep(.el-tooltip__popper .el-popper__arrow::before) {
  background-color: #f8faf8 !important;
  border-color: #e0e8e0 !important;
}
</style>