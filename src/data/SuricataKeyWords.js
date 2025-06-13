const suricataKeywords = {
  // 规则动作
  ruleActions: [
      { id: "alert", name: "警报", description: "生成警报并继续检查数据包" },
      { id: "pass", name: "放行", description: "停止进一步检查数据包" },
      { id: "drop", name: "丢弃", description: "丢弃数据包并生成警报" },
      { id: "reject", name: "拒绝", description: "发送RST/ICMP错误到匹配数据包的发送方" },
      { id: "rejectsrc", name: "拒绝源", description: "与reject相同" },
      { id: "rejectdst", name: "拒绝目标", description: "发送RST/ICMP错误到匹配数据包的接收方" },
      { id: "rejectboth", name: "拒绝双方", description: "发送RST/ICMP错误到对话双方" }
  ],

  // 通用关键字分类（适用于所有协议）
  generalCategories: [
      {
          id: "meta",
          name: "元数据",
          keywords: [
              {
                  id: "priority",
                  name: "优先级",
                  syntax: "priority:{{priority}};",
                  params: [
                      {
                          name: "priority",
                          type: "number",
                          required: true,
                          min: 1,
                          max: 3,
                          default: 2,
                          description: "设置规则优先级(1-3)"
                      }
                  ],
                  description: "设置规则优先级",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "msg",
                  name: "消息",
                  syntax: "msg:\"{{message}}\";",
                  params: [
                      {
                          name: "message",
                          type: "string",
                          required: true,
                          placeholder: "输入警报消息",
                          description: "规则触发时显示的消息内容"
                      }
                  ],
                  description: "设置规则触发时显示的消息",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "sid",
                  name: "规则ID",
                  syntax: "sid:{{id}};",
                  params: [
                      {
                          name: "id",
                          type: "number",
                          required: true,
                          min: 1000000,
                          default: 1000000,
                          description: "规则的唯一标识符"
                      }
                  ],
                  description: "设置规则唯一标识符",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "rev",
                  name: "规则版本",
                  syntax: "rev:{{version}};",
                  params: [
                      {
                          name: "version",
                          type: "number",
                          required: true,
                          min: 1,
                          default: 1,
                          description: "规则的版本号"
                      }
                  ],
                  description: "设置规则版本号",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "reference",
                  name: "引用",
                  syntax: "reference:{{type}},{{value}};",
                  params: [
                      {
                          name: "type",
                          type: "enum",
                          options: ["url", "cve", "bugtraq", "secunia", "nessus", "msb"],
                          required: true,
                          description: "引用的类型"
                      },
                      {
                          name: "value",
                          type: "string",
                          required: true,
                          placeholder: "输入引用值",
                          description: "引用的具体内容"
                      }
                  ],
                  description: "添加外部参考信息",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "classtype",
                  name: "分类类型",
                  syntax: "classtype:{{type}};",
                  params: [
                      {
                          name: "type",
                          type: "enum",
                          options: [
                              "attempted-admin", "attempted-dos", "attempted-recon",
                              "attempted-user", "bad-unknown", "denial-of-service",
                              "executable-code", "information-gathering", "misc-attack",
                              "misc-activity", "misc-malware", "network-scan",
                              "not-suspicious", "policy-violation", "protocol-command-decode",
                              "protocol-violation", "shellcode-detect", "successful-admin",
                              "successful-user", "system-call-detect", "trojan-activity",
                              "unauthorized-command", "web-application-attack"
                          ],
                          required: true,
                          description: "规则的分类类型"
                      }
                  ],
                  description: "设置规则分类类型",
                  exclusiveWith: [],
                  requires: []
              }
          ]
      },
      {
          id: "payload",
          name: "载荷匹配",
          keywords: [
              {
                  id: "content",
                  name: "内容匹配",
                  syntax: "content:\"{{value}}\";",
                  params: [
                      {
                          name: "value",
                          type: "string",
                          required: true,
                          placeholder: "输入要匹配的字符串",
                          description: "要在数据包中匹配的字符串内容"
                      }
                  ],
                  description: "在数据包内容中匹配指定字符串",
                  exclusiveWith: ["pcre"],
                  requires: []
              },
              {
                  id: "nocase",
                  name: "不区分大小写",
                  syntax: "nocase;",
                  params: [],
                  description: "对前一个content关键字不区分大小写",
                  exclusiveWith: [],
                  requires: ["content"]
              },
              {
                  id: "offset",
                  name: "匹配偏移",
                  syntax: "offset:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          min: 0,
                          description: "从数据包的第几个字节开始匹配"
                      }
                  ],
                  description: "设置前一个content关键字的匹配偏移",
                  exclusiveWith: [],
                  requires: ["content"]
              },
              {
                  id: "depth",
                  name: "匹配深度",
                  syntax: "depth:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          min: 1,
                          description: "从匹配起始位置开始的最大匹配字节数"
                      }
                  ],
                  description: "设置前一个content关键字的匹配深度",
                  exclusiveWith: [],
                  requires: ["content"]
              },
              {
                  id: "pcre",
                  name: "正则表达式",
                  syntax: "pcre:\"/{{pattern}}/{{flags}}\";",
                  params: [
                      {
                          name: "pattern",
                          type: "string",
                          required: true,
                          placeholder: "输入正则表达式模式",
                          description: "PCRE正则表达式模式"
                      },
                      {
                          name: "flags",
                          type: "enum",
                          options: ["i", "s", "m", "x"],
                          multi: true,
                          default: [],
                          description: "PCRE正则表达式标志"
                      }
                  ],
                  description: "使用正则表达式匹配数据包内容",
                  exclusiveWith: ["content"],
                  requires: []
              }
          ]
      },
      {
          id: "flow",
          name: "流量状态",
          keywords: [
              {
                  id: "flow",
                  name: "连接状态",
                  syntax: "flow:{{direction}}{{#state}},{{state}}{{/state}};",
                  params: [
                      {
                          name: "direction",
                          type: "enum",
                          options: ["to_server", "to_client", "both"],
                          required: true,
                          description: "数据流的方向"
                      },
                      {
                          name: "state",
                          type: "enum",
                          options: ["new", "established", "related", "no_stream"],
                          multi: true,
                          default: [],
                          description: "连接的状态条件"
                      }
                  ],
                  description: "匹配连接的方向和状态",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "flowbits",
                  name: "流标记",
                  syntax: "flowbits:{{action}},{{bitname}};",
                  params: [
                      {
                          name: "action",
                          type: "enum",
                          options: ["set", "isset", "unset", "toggle", "isnotset", "check", "noalert"],
                          required: true,
                          description: "对流标记执行的操作"
                      },
                      {
                          name: "bitname",
                          type: "string",
                          required: true,
                          placeholder: "输入流标记名称",
                          description: "流标记的名称"
                      }
                  ],
                  description: "设置或检查流标记",
                  exclusiveWith: [],
                  requires: []
              }
          ]
      }
  ],

  // 协议特定关键字分类
  protocolCategories: [
      {
          id: "tcp",
          name: "TCP协议",
          protocols: ["tcp"],
          keywords: [
              {
                  id: "tcp_flags",
                  name: "TCP标志",
                  syntax: "tcp_flags:{{flags}};",
                  params: [
                      {
                          name: "flags",
                          type: "string",
                          required: true,
                          placeholder: "例如: S,SA",
                          description: "要匹配的TCP标志组合"
                      }
                  ],
                  description: "匹配TCP标志位",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "seq",
                  name: "序列号",
                  syntax: "seq:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          description: "TCP序列号"
                      }
                  ],
                  description: "匹配TCP序列号",
                  exclusiveWith: [],
                  requires: []
              }
          ]
      },
      {
          id: "udp",
          name: "UDP协议",
          protocols: ["udp"],
          keywords: [
              {
                  id: "udp_length",
                  name: "UDP长度",
                  syntax: "udp_length:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          description: "UDP数据包长度"
                      }
                  ],
                  description: "匹配UDP数据包长度",
                  exclusiveWith: [],
                  requires: []
              }
          ]
      },
      {
          id: "icmp",
          name: "ICMP协议",
          protocols: ["icmp"],
          keywords: [
              {
                  id: "itype",
                  name: "ICMP类型",
                  syntax: "itype:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          description: "ICMP类型值"
                      }
                  ],
                  description: "匹配ICMP类型",
                  exclusiveWith: [],
                  requires: []
              },
              {
                  id: "icode",
                  name: "ICMP代码",
                  syntax: "icode:{{value}};",
                  params: [
                      {
                          name: "value",
                          type: "number",
                          required: true,
                          description: "ICMP代码值"
                      }
                  ],
                  description: "匹配ICMP代码",
                  exclusiveWith: [],
                  requires: []
              }
          ]
      }
  ],

  // 规则模板
  ruleTemplate: {
      action: "alert",
      protocol: "tcp",
      source: {
          address: "any",
          port: "any"
      },
      direction: "->",
      destination: {
          address: "any",
          port: "any"
      },
      options: []
  },

  // 协议选项
  protocols: ["tcp", "udp", "http", "tls", "dns", "icmp", "any"],

  // 辅助函数：获取通用关键字分类
  getGeneralCategories: function () {
      return this.generalCategories;
  },

  // 辅助函数：根据协议ID获取协议特定的关键字分类
  getProtocolCategories: function (protocolId) {
      const protocolCategory = this.protocolCategories.find(pc => pc.id === protocolId);
      return protocolCategory ? protocolCategory.keywords : [];
  },

  // 辅助函数：根据协议ID获取所有可用的关键字分类（通用+特定）
  getAllCategoriesForProtocol: function (protocolId) {
      return [...this.generalCategories, ...this.getProtocolCategories(protocolId)];
  },

  // 辅助函数：根据关键字ID获取关键字定义
  getKeywordById: function (keywordId) {
      // 先在通用关键字中查找
      for (const category of this.generalCategories) {
          for (const keyword of category.keywords) {
              if (keyword.id === keywordId) {
                  return {...keyword, category: category.id, isGeneral: true};
              }
          }
      }

      // 然后在协议特定关键字中查找
      for (const protocolCategory of this.protocolCategories) {
          for (const keyword of protocolCategory.keywords) {
              if (keyword.id === keywordId) {
                  return {...keyword, category: protocolCategory.id, protocol: protocolCategory.id, isGeneral: false};
              }
          }
      }

      return null;
  },

  // 辅助函数：根据规则动作ID获取动作定义
  getActionById: function (actionId) {
      return this.ruleActions.find(action => action.id === actionId) || null;
  },

  // 辅助函数：生成规则示例
  generateRuleExample: function () {
      const exampleRule = {...this.ruleTemplate};

      // 添加一些通用示例选项
      exampleRule.options = [
          {id: "msg", params: {message: "Example rule triggered"}},
          {id: "sid", params: {id: 1000000}},
          {id: "rev", params: {version: 1}}
      ];

      // 根据协议添加特定的示例选项
      if (exampleRule.protocol === "http") {
          exampleRule.options.push({id: "http_method", params: {method: ["GET"]}});
          exampleRule.options.push({id: "uricontent", params: {value: "admin"}});
          exampleRule.options.push({id: "uricontent_nocase", params: {}});
      } else if (exampleRule.protocol === "tcp") {
          exampleRule.options.push({id: "tcp_flags", params: {flags: ["SYN"]}});
      } else if (exampleRule.protocol === "dns") {
          exampleRule.options.push({id: "dns_query_type", params: {type: ["A"]}});
      } else if (exampleRule.protocol === "tls") {
          exampleRule.options.push({id: "tls_sni", params: {hostname: "example.com"}});
      } else if (exampleRule.protocol === "udp") {
          exampleRule.options.push({id: "udp_length", params: {comparison: ">", value: 100}});
      }

      // 添加一个通用的payload匹配选项
      exampleRule.options.push({id: "content", params: {value: "test"}});
      exampleRule.options.push({id: "nocase", params: {}});

      return exampleRule;
  },

  // 辅助函数：根据参数类型获取输入组件类型
  getInputComponentForType: function (type) {
      switch (type) {
          case 'string':
              return 'text-input';
          case 'number':
              return 'number-input';
          case 'boolean':
              return 'checkbox';
          case 'enum':
              return 'select';
          default:
              return 'text-input';
      }
  },

  // 辅助函数：渲染关键字为Suricata规则字符串
  renderKeywordToRule: function (keywordId, params) {
      const keyword = this.getKeywordById(keywordId);
      if (!keyword) return '';

      // 使用简单的模板引擎替换语法中的变量
      let ruleSyntax = keyword.syntax;

      // 替换普通变量
      for (const paramName in params) {
          if (params.hasOwnProperty(paramName)) {
              const paramValue = params[paramName];

              // 处理枚举类型的多选值，需要用逗号连接
              if (keyword.params.find(p => p.name === paramName && p.type === 'enum' && p.multi) && Array.isArray(paramValue)) {
                  ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue.join(','));
              }
              // 处理布尔值条件渲染
              else if (keyword.params.find(p => p.name === paramName && p.type === 'boolean')) {
                  // 布尔值的条件渲染使用Mustache风格的语法
                  ruleSyntax = ruleSyntax.replace(`{{#${paramName}}}`, paramValue ? '' : '').replace(`{{/${paramName}}}`, paramValue ? '' : '');

                  // 如果是true，还需要替换变量本身
                  if (paramValue) {
                      ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue);
                  }
              }
              // 普通变量替换
              else {
                  ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue);
              }
          }
      }

      // 移除未填充的条件部分
      ruleSyntax = ruleSyntax.replace(/\{\{#[a-zA-Z0-9_]+\}\}.*?\{\{\/[a-zA-Z0-9_]+\}\}/gs, '');

      // 移除未替换的变量
      ruleSyntax = ruleSyntax.replace(/\{\{[a-zA-Z0-9_]+\}\}/g, '');

      return ruleSyntax;
  },

  // 辅助函数：渲染整个规则
  renderFullRule: function (rule) {
      let ruleString = `${rule.action} ${rule.protocol} ${rule.source.address} ${rule.source.port} ${rule.direction} ${rule.destination.address} ${rule.destination.port} (`;

      // 添加规则选项
      if (rule.options && rule.options.length > 0) {
          ruleString += rule.options.map(option => {
              return this.renderKeywordToRule(option.id, option.params);
          }).join(' ');
      }

      ruleString += ");";
      return ruleString;
  }
};

// 导出数据集
export default suricataKeywords;