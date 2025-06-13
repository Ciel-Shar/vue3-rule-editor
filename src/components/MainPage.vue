<template>
  <div class="main-layout">
    <div class="main-container">
      <!-- 左侧关键字选择树 -->
      <div class="keyword-tree">
        <h2 class="text-xl font-bold mb-4 text-primary-content">关键字选择树</h2>
        <!-- 通用关键字 -->
        <div class="border rounded-lg p-4 mb-4"> <!-- 增大内边距以放大选项卡 -->
          <h3 class="font-semibold mb-2 cursor-pointer" @click="toggleCategory('general')">
            <i :class="isCategoryOpen('general') ? 'fa-chevron-down' : 'fa-chevron-right'"></i> <!-- 新增展开图标 -->
            通用关键字
          </h3>
          <div v-if="isCategoryOpen('general')">
            <div v-for="category in generalCategories" :key="category.id" class="space-y-2">
              <h4 
                class="text-sm font-medium text-gray-600 cursor-pointer" 
                @click="toggleSubCategory(category.id)"
              >
                {{ category.id }} <small class="text-xs text-gray-400">{{ category.name }}</small>
              </h4>
              <div v-if="isSubCategoryOpen(category.id)">
                <div class="space-y-1">
                  <button 
                    v-for="keyword in category.keywords" 
                    :key="keyword.id" 
                    class="btn btn-xs btn-outline w-full text-left"
                    :class="{ 'btn-disabled': isKeywordSelected(keyword.id) }"
                    @click="addKeyword(keyword)"
                    :disabled="isKeywordSelected(keyword.id)"
                  >
                    {{ keyword.id }} <small class="text-xs text-gray-400">{{ keyword.name }}</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 协议特定关键字 -->
        <div v-if="protocolCategories.length > 0" class="border rounded-lg p-4"> <!-- 增大内边距以放大选项卡 -->
          <h3 class="font-semibold mb-2 cursor-pointer" @click="toggleCategory('protocol')">
            <i :class="isCategoryOpen('protocol') ? 'fa-chevron-down' : 'fa-chevron-right'"></i> <!-- 新增展开图标 -->
            协议特定关键字
          </h3>
          <div v-if="isCategoryOpen('protocol')">
            <div v-for="category in protocolCategories" :key="category.id" class="space-y-2">
              <h4 
                class="text-sm font-medium text-gray-600 cursor-pointer" 
                @click="toggleSubCategory(category.id)"
              >
                {{ category.id }} <small class="text-xs text-gray-400">{{ category.name }}</small>
              </h4>
              <div v-if="isSubCategoryOpen(category.id)">
                <div class="space-y-1">
                  <button 
                    v-for="keyword in category.keywords" 
                    :key="keyword.id" 
                    class="btn btn-xs btn-outline w-full text-left"
                    :class="{ 'btn-disabled': isKeywordSelected(keyword.id) }"
                    @click="addKeyword(keyword)"
                    :disabled="isKeywordSelected(keyword.id)"
                  >
                    {{ keyword.id }} <small class="text-xs text-gray-400">{{ keyword.name }}</small>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 中间规则基本信息和规则预览 -->
      <div class="rule-info-preview">
        <!-- 规则基本信息 -->
        <div class="p-4 bg-white shadow-lg mb-4">
          <h2 class="text-xl font-bold mb-4 text-primary-content">规则基本信息</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[160px]">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">规则动作</label>
              <div class="form-control">
                <select v-model="rule.action" class="select select-bordered w-full">
                  <option v-for="action in ruleActions" :key="action.id" :value="action.id">{{ action.name }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">协议</label>
              <div class="form-control">
                <select v-model="rule.protocol" class="select select-bordered w-full" @change="setProtocol(rule.protocol)">
                  <option v-for="protocol in protocols" :key="protocol" :value="protocol">{{ protocol.toUpperCase() }}</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">源IP</label>
              <div class="form-control">
                <input v-model="rule.source.address" type="text" placeholder="any" class="input input-bordered w-full" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">源端口</label>
              <div class="form-control">
                <input v-model="rule.source.port" type="text" placeholder="any" class="input input-bordered w-full" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">方向</label>
              <div class="form-control">
                <select v-model="rule.direction" class="select select-bordered w-full">
                  <option value="->">-></option>
                  <option value="<->"><-></option>
                  <option value="<-"><-</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">目标IP</label>
              <div class="form-control">
                <input v-model="rule.destination.address" type="text" placeholder="any" class="input input-bordered w-full" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">目标端口</label>
              <div class="form-control">
                <input v-model="rule.destination.port" type="text" placeholder="any" class="input input-bordered w-full" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 规则预览 -->
        <div class="p-4 bg-white shadow-lg">
          <h2 class="text-xl font-bold mb-4 text-primary-content">当前规则</h2>
          <div class="border rounded-lg p-4 bg-gray-800 text-white font-mono text-sm overflow-x-auto min-h-[100px]">
            {{ formattedRule }}
          </div>
        </div>
      </div>
      
      <!-- 右侧规则选项编辑 -->
      <div class="rule-options-editor">
        <!-- 规则选项编辑（支持拖拽排序）-->
        <div class="p-4 bg-white shadow-lg mb-4 flex-1 overflow-y-auto">
          <h2 class="text-xl font-bold mb-4 text-primary-content">规则选项 <small class="text-sm text-gray-500">(可拖拽排序)</small></h2>
          <div v-if="rule.options.length === 0" class="text-center py-8 text-gray-500">
            <p>从左侧选择关键字添加到规则中</p>
          </div>
          <div v-else>
            <draggable v-model="rule.options" :key-fn="getOptionKey">
              <template #item="{ element, index }">
                <div 
                  :key="index" 
                  class="border rounded-lg p-3 bg-gray-50 mb-2"
                  @dragend="handleDragEnd"
                >
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-medium">{{ keywordNames[element.id] || element.id }}</span>
                    <div>
                      <button @click="removeOption(index)" class="btn btn-xs btn-error mr-1">删除</button>
                      <button @click="toggleCollapse(index)" class="btn btn-xs btn-ghost">
                        <i :class="isCollapsed[index] ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                      </button>
                    </div>
                  </div>
                  <div v-if="!isCollapsed[index]">
                    <KeywordForm :keywordId="element.id" :params="element.params" @update="updateOption(index, $event)" />
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import suricataKeywords from '../data/SuricataKeyWords'
import KeywordForm from './KeywordForm.vue'

// 规则数据模型
const rule = ref({
  action: 'alert',
  protocol: 'tcp',
  source: { address: 'any', port: 'any' },
  direction: '->',
  destination: { address: 'any', port: 'any' },
  options: []
})

// 协议列表
const protocols = ['tcp', 'udp', 'icmp', 'ip']

// 当前选中的协议
const currentProtocol = ref('tcp')

// 规则动作列表
const ruleActions = [
  { id: 'alert', name: 'Alert' },
  { id: 'pass', name: 'Pass' },
  { id: 'drop', name: 'Drop' },
  { id: 'reject', name: 'Reject' }
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

// 折叠状态管理
const isCollapsed = ref({})
const categoryOpen = ref({ general: false, protocol: false })
const subCategoryOpen = ref({})

// 设置协议
const setProtocol = (protocol) => {
  // 清空上一个协议的特定规则
  const protocolSpecificKeywords = suricataKeywords.getProtocolCategories(currentProtocol.value).map(keyword => keyword.id)
  rule.value.options = rule.value.options.filter(option => !protocolSpecificKeywords.includes(option.id))
  
  currentProtocol.value = protocol
  rule.value.protocol = protocol
}

// 添加关键字
const addKeyword = (keyword) => {
  if (!isKeywordSelected(keyword.id)) {
    rule.value.options.push({
      id: keyword.id,
      params: {}
    })
    isCollapsed.value[rule.value.options.length - 1] = false
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
  // 可以在这里添加拖拽结束后的处理逻辑
}

// 格式化规则
const formattedRule = computed(() => {
  return suricataKeywords.renderFullRule(rule.value)
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
</script>

<style scoped>
.main-layout {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6; /* 添加背景色，使内容区域更明显 */
}

.main-container {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.keyword-tree {
  width: 25%;
  min-width: 280px;
  max-width: 350px;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: auto;
}

.rule-info-preview {
  width: 35%;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.rule-options-editor {
  width: 40%;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>