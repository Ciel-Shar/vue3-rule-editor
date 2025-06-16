// src/data/SuricataKeyWords.js
const suricataKeywords = {
    // 通用关键字分类（适用于所有协议）
    generalCategories: [
        {
            id: "meta",
            name: "元数据关键字",
            keywords: [
                {
                    id: "msg",
                    name: "消息",
                    syntax: "msg:\"{{msg}}\";",
                    params: [
                        {
                            name: "msg",
                            type: "string",
                            required: true,
                            placeholder: "输入警报消息",
                            description: "提供有关规则和可能警报的上下文信息。标准做法是使消息的第一部分大写，并指示规则的类别。msg通常是规则中的第一个关键字。",
                            quote: true
                        }
                    ],
                    description: "提供有关规则和可能警报的上下文信息",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "sid",
                    name: "规则ID",
                    syntax: "sid:{{sid}};",
                    params: [
                        {
                            name: "sid",
                            type: "number",
                            required: true,
                            min: 1,
                            default: 1000000,
                            description: "规则的唯一标识符。标准做法是将sid作为规则的最后一个关键字（如果有rev则是倒数第二个）。sid值在同一规则组（gid）中必须唯一。"
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
                            description: "规则的版本号。当规则被修改时，版本号会增加。标准做法是将rev关键字放在sid关键字之后。"
                        }
                    ],
                    description: "设置规则版本号",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "gid",
                    name: "组ID",
                    syntax: "gid:{{gid}};",
                    params: [
                        {
                            name: "gid",
                            type: "number",
                            required: true,
                            min: 1,
                            default: 1,
                            description: "规则组的ID。Suricata默认使用gid 1。修改gid值没有技术影响，该值仅在警报数据中记录。"
                        }
                    ],
                    description: "设置规则组ID",
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
                            description: "规则的分类类型。标准做法是将classtype关键字放在sid和rev关键字之前。"
                        }
                    ],
                    description: "设置规则分类类型",
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
                            description: "引用的具体内容。例如：CVE-2014-1234 或 www.info.com"
                        }
                    ],
                    description: "添加外部参考信息",
                    exclusiveWith: [],
                    requires: []
                },
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
                            max: 255,
                            default: 2,
                            description: "设置规则优先级(1-255)。1-4是常用值，1为最高优先级。优先级高的规则会先被检查。"
                        }
                    ],
                    description: "设置规则优先级",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "metadata",
                    name: "元数据",
                    syntax: "metadata:{{key}} {{value}};",
                    params: [
                        {
                            name: "key",
                            type: "string",
                            required: true,
                            placeholder: "输入键名",
                            description: "元数据的键名"
                        },
                        {
                            name: "value",
                            type: "string",
                            required: true,
                            placeholder: "输入值",
                            description: "元数据的值"
                        }
                    ],
                    description: "添加额外的非功能性信息到规则中",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "target",
                    name: "目标",
                    syntax: "target:{{target}};",
                    params: [
                        {
                            name: "target",
                            type: "enum",
                            options: ["src_ip", "dest_ip"],
                            required: true,
                            description: "指定攻击的目标端。src_ip表示源IP是目标，dest_ip表示目标IP是目标。"
                        }
                    ],
                    description: "指定攻击的目标端",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "requires",
                    name: "要求",
                    syntax: "requires:{{requirements}};",
                    params: [
                        {
                            name: "requirements",
                            type: "string",
                            required: true,
                            placeholder: "例如: feature geoip, version >= 7.0.0",
                            description: "指定规则所需的Suricata特性、关键字或版本要求。多个要求用逗号分隔。"
                        }
                    ],
                    description: "指定规则所需的Suricata特性、关键字或版本要求",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "payload",
            name: "有效载荷关键字",
            keywords: [
                {
                    id: "content",
                    name: "内容匹配",
                    syntax: "content:{{content}};",
                    params: [
                        {
                            name: "content",
                            type: "string",
                            required: true,
                            description: "要匹配的内容。可以使用十六进制表示法（如|00|）来表示不可打印字符。特殊字符如\"、;、:、|需要使用十六进制表示法。"
                        }
                    ],
                    description: "用于检查数据包或流的内容。可以匹配所有字节值（0-255）。默认情况下区分大小写。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "nocase",
                    name: "不区分大小写",
                    syntax: "nocase;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用不区分大小写匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "使content关键字不区分大小写。必须放在要修改的content关键字之后。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "rawbytes",
                    name: "原始字节",
                    syntax: "rawbytes;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用原始字节匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配原始数据包内容，忽略解码。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "depth",
                    name: "深度",
                    syntax: "depth:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "要检查的字节数。"
                        }
                    ],
                    description: "指定要检查的字节数。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "offset",
                    name: "偏移",
                    syntax: "offset:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "开始检查的字节位置。"
                        }
                    ],
                    description: "指定开始检查的字节位置。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "distance",
                    name: "距离",
                    syntax: "distance:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "从前一个content匹配结束位置开始的字节数。"
                        }
                    ],
                    description: "从前一个content匹配结束位置开始的字节数。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "within",
                    name: "范围内",
                    syntax: "within:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "从前一个content匹配结束位置开始的最大字节数。"
                        }
                    ],
                    description: "从前一个content匹配结束位置开始的最大字节数。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "isdataat",
                    name: "数据位置",
                    syntax: "isdataat:<number>[,relative];",
                    params: [
                        {
                            name: "position",
                            type: "number",
                            required: true,
                            description: "要检查的位置。"
                        },
                        {
                            name: "relative",
                            type: "boolean",
                            required: false,
                            description: "是否相对于最后一个匹配的位置。"
                        }
                    ],
                    description: "检查payload的特定位置是否还有数据。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "absent",
                    name: "不存在",
                    syntax: "absent[:or_else];",
                    params: [
                        {
                            name: "or_else",
                            type: "boolean",
                            required: false,
                            description: "是否匹配不存在或后续的否定内容。"
                        }
                    ],
                    description: "检查sticky buffer是否存在。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "bsize",
                    name: "缓冲区大小",
                    syntax: "bsize:<expr>;",
                    params: [
                        {
                            name: "expr",
                            type: "string",
                            required: true,
                            placeholder: "如: 100, 0x64, !0x14, >21, >=21, <22, <=22, 19-22, !19-22, &0xc0=0x80, &0xc0!=0",
                            description: "整数比较表达式，支持=, !=, >, >=, <, <=, 范围, 取反范围, 位掩码等。"
                        }
                    ],
                    description: "匹配缓冲区的长度。支持多种整数比较模式，包括等于、不等于、大于、小于、范围、位掩码等。整数可用十进制或十六进制。范围为排他。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "dsize",
                    name: "数据大小",
                    syntax: "dsize:<expr>;",
                    params: [
                        {
                            name: "expr",
                            type: "string",
                            required: true,
                            placeholder: "如: 100, 0x64, !0x14, >21, >=21, <22, <=22, 19-22, !19-22, &0xc0=0x80, &0xc0!=0",
                            description: "整数比较表达式，支持=, !=, >, >=, <, <=, 范围, 取反范围, 位掩码等。"
                        }
                    ],
                    description: "匹配数据包payload的大小。支持多种整数比较模式，包括等于、不等于、大于、小于、范围、位掩码等。整数可用十进制或十六进制。范围为排他。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "byte_test",
                    name: "字节测试",
                    syntax: "byte_test:<num of bytes>,<operator>,<test value>,<offset>[,relative][,<endian>][,string,<num type>][,dce][,bitmask <bitmask value>];",
                    params: [
                        {
                            name: "num_of_bytes",
                            type: "number",
                            required: true,
                            description: "要从数据包中选择的字节数或byte_extract/byte_math变量名。"
                        },
                        {
                            name: "operator",
                            type: "enum",
                            options: ["<", ">", "=", "<=", ">=", "&", "^"],
                            required: true,
                            description: "要执行的比较操作。"
                        },
                        {
                            name: "test_value",
                            type: "number",
                            required: true,
                            description: "要比较的值。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: true,
                            description: "payload中的偏移量。"
                        },
                        {
                            name: "relative",
                            type: "boolean",
                            required: false,
                            description: "是否相对于最后一个content匹配。"
                        },
                        {
                            name: "endian",
                            type: "enum",
                            options: ["big", "little"],
                            required: false,
                            description: "字节序类型。"
                        },
                        {
                            name: "string",
                            type: "enum",
                            options: ["hex", "dec", "oct"],
                            required: false,
                            description: "字符串表示类型。"
                        },
                        {
                            name: "dce",
                            type: "boolean",
                            required: false,
                            description: "允许DCE模块确定字节序。"
                        },
                        {
                            name: "bitmask",
                            type: "number",
                            required: false,
                            description: "应用于转换字节的位掩码值。"
                        }
                    ],
                    description: "从指定位置提取指定数量的字节，并与测试值进行比较。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "byte_math",
                    name: "字节数学",
                    syntax: "byte_math:bytes <num of bytes>,offset <offset>,oper <operator>,rvalue <rvalue>,result <result_var>[,relative][,endian <endian>][,string <number-type>][,dce][,bitmask <value>];",
                    params: [
                        {
                            name: "num_of_bytes",
                            type: "number",
                            required: true,
                            description: "要从数据包中选择的字节数或byte_extract变量名。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: true,
                            description: "payload中的偏移量。"
                        },
                        {
                            name: "operator",
                            type: "enum",
                            options: ["+", "-", "*", "/", "<<", ">>"],
                            required: true,
                            description: "要执行的数学操作。"
                        },
                        {
                            name: "rvalue",
                            type: "number",
                            required: true,
                            description: "要执行数学操作的值。"
                        },
                        {
                            name: "result_var",
                            type: "string",
                            required: true,
                            description: "存储计算结果的变量名。"
                        },
                        {
                            name: "relative",
                            type: "boolean",
                            required: false,
                            description: "是否相对于最后一个content匹配。"
                        },
                        {
                            name: "endian",
                            type: "enum",
                            options: ["big", "little", "dce"],
                            required: false,
                            description: "字节序类型。"
                        },
                        {
                            name: "string",
                            type: "enum",
                            options: ["hex", "dec", "oct"],
                            required: false,
                            description: "字符串表示类型。"
                        },
                        {
                            name: "dce",
                            type: "boolean",
                            required: false,
                            description: "允许DCE模块确定字节序。"
                        },
                        {
                            name: "bitmask",
                            type: "number",
                            required: false,
                            description: "应用于提取值的位掩码。"
                        }
                    ],
                    description: "对提取的值执行数学操作，并将结果存储在变量中。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "byte_jump",
                    name: "字节跳转",
                    syntax: "byte_jump:<num of bytes>,<offset>[,relative][,multiplier <mult_value>][,<endian>][,string,<num_type>][,align][,from_beginning][,from_end][,post_offset <value>][,dce][,bitmask <value>];",
                    params: [
                        {
                            name: "num_of_bytes",
                            type: "number",
                            required: true,
                            description: "要从数据包中选择的字节数或byte_extract/byte_math变量名。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: true,
                            description: "payload中的偏移量。"
                        },
                        {
                            name: "relative",
                            type: "boolean",
                            required: false,
                            description: "是否相对于最后一个content匹配。"
                        },
                        {
                            name: "multiplier",
                            type: "number",
                            required: false,
                            description: "将转换后的字节乘以的值。"
                        },
                        {
                            name: "endian",
                            type: "enum",
                            options: ["big", "little"],
                            required: false,
                            description: "字节序类型。"
                        },
                        {
                            name: "string",
                            type: "enum",
                            options: ["hex", "dec", "oct"],
                            required: false,
                            description: "字符串表示类型。"
                        },
                        {
                            name: "align",
                            type: "boolean",
                            required: false,
                            description: "将数字向上取整到下一个32位边界。"
                        },
                        {
                            name: "from_beginning",
                            type: "boolean",
                            required: false,
                            description: "从数据包开始处向前跳转。"
                        },
                        {
                            name: "from_end",
                            type: "boolean",
                            required: false,
                            description: "从payload结束处开始跳转。"
                        },
                        {
                            name: "post_offset",
                            type: "number",
                            required: false,
                            description: "跳转操作后额外跳转的字节数。"
                        },
                        {
                            name: "dce",
                            type: "boolean",
                            required: false,
                            description: "允许DCE模块确定字节序。"
                        },
                        {
                            name: "bitmask",
                            type: "number",
                            required: false,
                            description: "应用于转换字节的位掩码值。"
                        }
                    ],
                    description: "从指定位置选择指定数量的字节，并将检测指针移动到该位置。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "byte_extract",
                    name: "字节提取",
                    syntax: "byte_extract:<num of bytes>,<offset>,<var_name>[,relative][,multiplier <mult-value>][,<endian>][,dce][,string[,<num_type>][,align <align-value>];",
                    params: [
                        {
                            name: "num_of_bytes",
                            type: "number",
                            required: true,
                            description: "要从数据包中选择的字节数。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: true,
                            description: "payload中的偏移量。"
                        },
                        {
                            name: "var_name",
                            type: "string",
                            required: true,
                            description: "存储值的变量名。"
                        },
                        {
                            name: "relative",
                            type: "boolean",
                            required: false,
                            description: "是否相对于最后一个content匹配。"
                        },
                        {
                            name: "multiplier",
                            type: "number",
                            required: false,
                            description: "存储前将提取的字节乘以的值。"
                        },
                        {
                            name: "endian",
                            type: "enum",
                            options: ["big", "little"],
                            required: false,
                            description: "字节序类型。"
                        },
                        {
                            name: "string",
                            type: "enum",
                            options: ["hex", "dec", "oct"],
                            required: false,
                            description: "字符串表示类型。"
                        },
                        {
                            name: "dce",
                            type: "boolean",
                            required: false,
                            description: "允许DCE模块确定字节序。"
                        },
                        {
                            name: "align",
                            type: "number",
                            required: false,
                            description: "将提取的值向上取整到下一个字节边界。"
                        }
                    ],
                    description: "从指定位置提取指定数量的字节，并存储在变量中。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "entropy",
                    name: "熵值",
                    syntax: "entropy:[bytes <byteval>][offset <offsetval>]value <operator><entropy-value>;",
                    params: [
                        {
                            name: "bytes",
                            type: "number",
                            required: false,
                            description: "要计算熵值的字节数。默认为当前content长度。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: false,
                            description: "开始计算熵值的偏移量。默认为0。"
                        },
                        {
                            name: "operator",
                            type: "enum",
                            options: ["=", "<", "<=", ">", ">=", "!=", "x-y", "!x-y"],
                            required: false,
                            description: "比较运算符。默认为=。"
                        },
                        {
                            name: "entropy_value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 8,
                            description: "要比较的熵值。范围在0.0到8.0之间。"
                        }
                    ],
                    description: "计算内容的Shannon熵值并与指定值比较。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "rpc",
                    name: "RPC",
                    syntax: "rpc:<application number>,[<version number>|*],[<procedure number>|*];",
                    params: [
                        {
                            name: "application_number",
                            type: "number",
                            required: true,
                            description: "RPC应用程序编号。"
                        },
                        {
                            name: "version_number",
                            type: "string",
                            required: true,
                            description: "RPC版本号。使用*表示所有版本。"
                        },
                        {
                            name: "procedure_number",
                            type: "string",
                            required: true,
                            description: "RPC过程编号。使用*表示所有过程。"
                        }
                    ],
                    description: "匹配SUNRPC CALL中的RPC过程编号和RPC版本。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "replace",
                    name: "替换",
                    syntax: "replace;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用内容替换。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "仅用于IPS。调整网络流量，将content关键字匹配的内容替换为另一个内容。替换内容必须与原始内容长度相同。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "pcre",
                    name: "PCRE",
                    syntax: "pcre:\"/<regex>/opts\";",
                    params: [
                        {
                            name: "regex",
                            type: "string",
                            required: true,
                            description: "Perl兼容的正则表达式。"
                        },
                        {
                            name: "opts",
                            type: "string",
                            required: false,
                            description: "正则表达式选项：i(不区分大小写)、s(检查换行符)、m(将一行视为多行)。"
                        }
                    ],
                    description: "使用Perl兼容的正则表达式进行匹配。默认区分大小写，点号匹配除换行符外的所有字节。",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "transformations",
            name: "转换关键字",
            keywords: [
                {
                    id: "dotprefix",
                    name: "点前缀",
                    syntax: "dotprefix;",
                    params: [],
                    description: "在缓冲区前添加一个点字符，用于简化域名检查。例如，将'hello.google.com'修改为'.hello.google.com'。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "domain",
                    name: "域名提取",
                    syntax: "domain;",
                    params: [],
                    description: "从缓冲区中提取域名。域名定义使用Mozilla的Public Suffix List。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "tld",
                    name: "顶级域名提取",
                    syntax: "tld;",
                    params: [],
                    description: "从缓冲区中提取顶级域名(TLD)。TLD定义使用Mozilla的Public Suffix List。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "strip_whitespace",
                    name: "去除空白",
                    syntax: "strip_whitespace;",
                    params: [],
                    description: "去除所有C语言isspace()函数认为的空白字符。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "compress_whitespace",
                    name: "压缩空白",
                    syntax: "compress_whitespace;",
                    params: [],
                    description: "将所有连续的空白字符压缩为单个空格。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "to_lowercase",
                    name: "转小写",
                    syntax: "to_lowercase;",
                    params: [],
                    description: "将缓冲区内容转换为小写。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "to_md5",
                    name: "MD5哈希",
                    syntax: "to_md5;",
                    params: [],
                    description: "计算缓冲区的MD5哈希值并传递原始哈希值。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "to_uppercase",
                    name: "转大写",
                    syntax: "to_uppercase;",
                    params: [],
                    description: "将缓冲区内容转换为大写。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "to_sha1",
                    name: "SHA1哈希",
                    syntax: "to_sha1;",
                    params: [],
                    description: "计算缓冲区的SHA-1哈希值并传递原始哈希值。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "to_sha256",
                    name: "SHA256哈希",
                    syntax: "to_sha256;",
                    params: [],
                    description: "计算缓冲区的SHA-256哈希值并传递原始哈希值。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "pcrexform",
                    name: "PCRE转换",
                    syntax: "pcrexform:\"{{regex}}\";",
                    params: [
                        {
                            name: "regex",
                            type: "string",
                            required: true,
                            description: "要应用的正则表达式。输出第一个捕获的表达式。"
                        }
                    ],
                    description: "对缓冲区应用正则表达式，并输出第一个捕获的表达式。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "url_decode",
                    name: "URL解码",
                    syntax: "url_decode;",
                    params: [],
                    description: "解码URL编码的数据，将'+'替换为空格，'%HH'替换为其值。不解码unicode '%uZZZZ'编码。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "xor",
                    name: "XOR解码",
                    syntax: "xor:\"{{key}}\";",
                    params: [
                        {
                            name: "key",
                            type: "string",
                            required: true,
                            description: "十六进制编码的XOR密钥。"
                        }
                    ],
                    description: "对缓冲区应用XOR解码。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "header_lowercase",
                    name: "HTTP头部小写",
                    syntax: "header_lowercase;",
                    params: [],
                    description: "用于HTTP/1和HTTP/2头部名称的标准化。将头部名称转换为小写，同时保持头部值不变。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "strip_pseudo_headers",
                    name: "去除伪头部",
                    syntax: "strip_pseudo_headers;",
                    params: [],
                    description: "用于HTTP/1和HTTP/2头部名称的标准化。去除所有以':'开头的HTTP2伪头部（名称和值）。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "from_base64",
                    name: "Base64解码",
                    syntax: "from_base64: [[bytes <value>] [, offset <offset_value> [, mode: strict|rfc4648|rfc2045]]];",
                    params: [
                        {
                            name: "bytes",
                            type: "number",
                            required: false,
                            description: "要解码的字节数，默认为输入缓冲区的长度。"
                        },
                        {
                            name: "offset",
                            type: "number",
                            required: false,
                            description: "开始解码的偏移量，默认为0，必须小于65536。"
                        },
                        {
                            name: "mode",
                            type: "enum",
                            options: ["strict", "rfc4648", "rfc2045"],
                            required: false,
                            default: "rfc4648",
                            description: "解码模式：strict（严格模式）、rfc4648（默认）、rfc2045（支持字符串）。"
                        }
                    ],
                    description: "使用可选的mode、offset和bytes值对缓冲区进行base64解码。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "luaxform",
                    name: "Lua转换",
                    syntax: "luaxform:{{script}}[, {{args}}];",
                    params: [
                        {
                            name: "script",
                            type: "string",
                            required: true,
                            description: "Lua脚本的路径。脚本必须包含名为'transform'的函数。"
                        },
                        {
                            name: "args",
                            type: "string",
                            required: false,
                            description: "可选的逗号分隔参数，最多10个参数。"
                        }
                    ],
                    description: "允许Lua脚本对缓冲区应用转换。",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "prefiltering",
            name: "预过滤关键字",
            keywords: [
                {
                    id: "fast_pattern",
                    name: "快速模式",
                    syntax: "fast_pattern;",
                    params: [],
                    description: "指定使用当前content关键字作为多模式匹配器(MPM)的匹配内容。当规则包含多个content关键字时，Suricata默认会选择'最强'的content（基于长度、变化程度和缓冲区）。使用此关键字可以强制Suricata使用特定的content。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "fast_pattern_only",
                    name: "仅快速模式",
                    syntax: "fast_pattern:only;",
                    params: [],
                    description: "当规则只包含一个content关键字时，表示在MPM中找到匹配后不需要进一步检查。虽然Suricata会自动识别这种情况，但此关键字仍然受支持。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "fast_pattern_chop",
                    name: "快速模式截取",
                    syntax: "fast_pattern:{{offset}},{{length}};",
                    params: [
                        {
                            name: "offset",
                            type: "number",
                            required: true,
                            description: "开始截取的偏移量。"
                        },
                        {
                            name: "length",
                            type: "number",
                            required: true,
                            description: "要截取的长度。"
                        }
                    ],
                    description: "指定MPM只使用content的一部分。例如，fast_pattern:8,4;表示只使用最后4个字符。",
                    exclusiveWith: [],
                    requires: ["content"]
                },
                {
                    id: "prefilter",
                    name: "预过滤",
                    syntax: "prefilter;",
                    params: [],
                    description: "启用特定规则的预过滤引擎。对于非MPM关键字，可以使用此关键字来启用预过滤。例如，在规则中使用ttl测试而不是单字节模式进行预过滤。",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "flow",
            name: "流关键字",
            keywords: [
                {
                    id: "flowbits",
                    name: "流标记",
                    syntax: "flowbits:{{action}},{{name}};",
                    params: [
                        {
                            name: "action",
                            type: "enum",
                            options: ["set", "isset", "toggle", "unset", "isnotset", "noalert"],
                            required: true,
                            description: "流标记的动作：set(设置)、isset(检查是否设置)、toggle(切换状态)、unset(取消设置)、isnotset(检查是否未设置)、noalert(不生成警报)"
                        },
                        {
                            name: "name",
                            type: "string",
                            required: true,
                            description: "流标记的名称。区分大小写。可以使用|(管道符)进行OR操作。"
                        }
                    ],
                    description: "用于在流中设置和检查条件，确保只有在特定条件下才生成警报。例如，当两个不同的数据包都匹配时才生成警报。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "flow",
                    name: "流方向",
                    syntax: "flow:{{options}};",
                    params: [
                        {
                            name: "options",
                            type: "enum",
                            options: [
                                "to_client", "to_server", "from_client", "from_server",
                                "established", "not_established", "stateless",
                                "only_stream", "no_stream", "only_frag", "no_frag"
                            ],
                            required: true,
                            multiple: true,
                            description: "流的方向和状态选项。可以组合多个选项，用逗号分隔。"
                        }
                    ],
                    description: "用于匹配流的方向（客户端/服务器）和状态（已建立/未建立）。也可以指定是否只匹配重组后的流或数据包。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "flowint",
                    name: "流整数",
                    syntax: "flowint:{{name}},{{modifier}}[,{{value}}];",
                    params: [
                        {
                            name: "name",
                            type: "string",
                            required: true,
                            description: "变量的名称"
                        },
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["+", "-", "=", ">", "<", ">=", "<=", "==", "!=", "isset", "notset", "isnotset"],
                            required: true,
                            description: "操作符：+（加）、-（减）、=（赋值）、>（大于）、<（小于）、>=（大于等于）、<=（小于等于）、==（等于）、!=（不等于）、isset（已设置）、notset（未设置）、isnotset（未设置）"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: false,
                            description: "要比较或操作的值。可以是整数或另一个变量。"
                        }
                    ],
                    description: "允许在流中存储和进行数学运算。类似于flowbits，但可以存储和操作整数值，而不仅仅是标志。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "stream_size",
                    name: "流大小",
                    syntax: "stream_size:{{direction}},{{modifier}},{{number}};",
                    params: [
                        {
                            name: "direction",
                            type: "enum",
                            options: ["server", "client", "both", "either"],
                            required: true,
                            description: "要检查的方向：server（服务器）、client（客户端）、both（双方）、either（任意一方）"
                        },
                        {
                            name: "modifier",
                            type: "enum",
                            options: [">", "<", "=", "!=", ">=", "<="],
                            required: true,
                            description: "比较操作符：>（大于）、<（小于）、=（等于）、!=（不等于）、>=（大于等于）、<=（小于等于）"
                        },
                        {
                            name: "number",
                            type: "number",
                            required: true,
                            description: "要比较的字节数"
                        }
                    ],
                    description: "根据序列号注册的字节数匹配流量。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "flow_age",
                    name: "流年龄",
                    syntax: "flow.age:{{op}}{{number}};",
                    params: [
                        {
                            name: "op",
                            type: "enum",
                            options: ["", "<", ">", ">=", "<=", "=", "!="],
                            required: false,
                            description: "比较操作符：空（等于）、<（小于）、>（大于）、>=（大于等于）、<=（小于等于）、=（等于）、!=（不等于）"
                        },
                        {
                            name: "number",
                            type: "number",
                            required: true,
                            description: "要比较的秒数"
                        }
                    ],
                    description: "匹配流的年龄（以秒为单位）。使用32位无符号整数。在每个数据包上检查，不等待流结束。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "flow_pkts",
                    name: "流数据包数",
                    syntax: "flow.pkts:{{direction}},{{op}}{{number}};",
                    params: [
                        {
                            name: "direction",
                            type: "enum",
                            options: ["toclient", "toserver", "either"],
                            required: true,
                            description: "要检查的方向：toclient（到客户端）、toserver（到服务器）、either（任意方向）"
                        },
                        {
                            name: "op",
                            type: "enum",
                            options: ["", "<", ">", ">=", "<=", "=", "!="],
                            required: false,
                            description: "比较操作符：空（等于）、<（小于）、>（大于）、>=（大于等于）、<=（小于等于）、=（等于）、!=（不等于）"
                        },
                        {
                            name: "number",
                            type: "number",
                            required: true,
                            description: "要比较的数据包数"
                        }
                    ],
                    description: "匹配流中的数据包数量。使用32位无符号整数。在每个数据包上检查，不等待流结束。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "flow_bytes",
                    name: "流字节数",
                    syntax: "flow.bytes:{{direction}},{{op}}{{number}};",
                    params: [
                        {
                            name: "direction",
                            type: "enum",
                            options: ["toclient", "toserver", "either"],
                            required: true,
                            description: "要检查的方向：toclient（到客户端）、toserver（到服务器）、either（任意方向）"
                        },
                        {
                            name: "op",
                            type: "enum",
                            options: ["", "<", ">", ">=", "<=", "=", "!="],
                            required: false,
                            description: "比较操作符：空（等于）、<（小于）、>（大于）、>=（大于等于）、<=（小于等于）、=（等于）、!=（不等于）"
                        },
                        {
                            name: "number",
                            type: "number",
                            required: true,
                            description: "要比较的字节数"
                        }
                    ],
                    description: "匹配流中的字节数。使用64位无符号整数。在每个数据包上检查，不等待流结束。",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        }
    ],

    // 协议特定关键字分类
    protocolCategories: [
        {
            id: "ip",
            name: "IP协议",
            protocols: ["ip"],
            keywords: [
                {
                    id: "ttl",
                    name: "生存时间",
                    syntax: "ttl:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 255,
                            description: "要匹配的IP TTL值。TTL值决定了数据包在互联网系统中可以存在的最长时间。如果此字段设置为0，则数据包必须被销毁。TTL基于跳数，数据包经过的每个路由器都会将TTL计数器减1。"
                        }
                    ],
                    description: "检查数据包IP头中的特定TTL值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "ipopts",
                    name: "IP选项",
                    syntax: "ipopts:{{option}};",
                    params: [
                        {
                            name: "option",
                            type: "enum",
                            options: [
                                "rr", "eol", "nop", "ts", "sec", "esec",
                                "lsrr", "ssrr", "satid", "any"
                            ],
                            required: true,
                            description: "要匹配的IP选项。每个规则只能匹配一个选项。"
                        }
                    ],
                    description: "检查是否设置了特定的IP选项",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "sameip",
                    name: "相同IP",
                    syntax: "sameip;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用相同IP检查。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "检查源IP地址是否与目标IP地址相同",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "ip_proto",
                    name: "IP协议",
                    syntax: "ip_proto:{{protocol}};",
                    params: [
                        {
                            name: "protocol",
                            type: "enum",
                            options: [
                                "ICMP", "TCP", "UDP", "GRE", "ESP", "AH", "IPv6-ICMP"
                            ],
                            required: true,
                            description: "要匹配的IP协议。可以使用协议名称或协议号。"
                        }
                    ],
                    description: "匹配数据包头中的IP协议",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "ipv4.hdr",
                    name: "IPv4头",
                    syntax: "ipv4.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用IPv4头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配IPv4头中的内容",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "ipv6.hdr",
                    name: "IPv6头",
                    syntax: "ipv6.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用IPv6头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配IPv6头中的内容",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "id",
                    name: "IP ID",
                    syntax: "id:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "要匹配的IP ID值。IP ID用于标识主机发送的每个数据包，通常每个数据包递增1。IP ID用作分片标识号。"
                        }
                    ],
                    description: "匹配特定的IP ID值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "geoip",
                    name: "地理位置",
                    syntax: "geoip: {{direction}},{{countries}};",
                    params: [
                        {
                            name: "direction",
                            type: "enum",
                            options: ["src", "dst", "both", "any"],
                            required: true,
                            description: "指定要检查的IP地址方向。both表示源和目标都要匹配，any表示源或目标匹配即可。"
                        },
                        {
                            name: "countries",
                            type: "string",
                            required: true,
                            placeholder: "例如: CN,US,UK",
                            description: "要匹配的国家代码列表，用逗号分隔。"
                        }
                    ],
                    description: "根据源或目标IPv4地址匹配地理位置",
                    exclusiveWith: [],
                    requires: ["geoip"]
                },
                {
                    id: "fragbits",
                    name: "分片位",
                    syntax: "fragbits:[*+!]<[MDR]>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["*", "+", "!"],
                            required: true,
                            description: "匹配修饰符：+表示匹配指定位和其他位，*表示匹配任何指定位，!表示匹配未设置的指定位"
                        },
                        {
                            name: "bits",
                            type: "enum",
                            options: ["M", "D", "R"],
                            required: true,
                            description: "要匹配的位：M表示更多分片，D表示不分片，R表示保留位"
                        }
                    ],
                    description: "检查IP头中的分片和保留位",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "fragoffset",
                    name: "分片偏移",
                    syntax: "fragoffset:[!|<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["!", "<", ">"],
                            required: true,
                            description: "匹配修饰符：<表示小于指定值，>表示大于指定值，!表示不等于指定值"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            description: "要匹配的分片偏移值"
                        }
                    ],
                    description: "匹配IP分片偏移字段的特定十进制值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "tos",
                    name: "服务类型",
                    syntax: "tos:[!]<number>;",
                    params: [
                        {
                            name: "negate",
                            type: "boolean",
                            default: false,
                            description: "是否取反匹配"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 255,
                            description: "要匹配的TOS值（0-255）。注意：根据RFC2474，该字段的最右2位必须为0。"
                        }
                    ],
                    description: "匹配IP头TOS字段的特定十进制值",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "tcp",
            name: "TCP协议",
            protocols: ["tcp"],
            keywords: [
                {
                    id: "tcp.flags",
                    name: "TCP标志",
                    syntax: "tcp.flags:[!|*|+]<FSRPAUCE0>[,<FSRPAUCE>];",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["!", "*", "+"],
                            required: true,
                            description: "匹配修饰符：+表示匹配指定位和其他位，*表示匹配任何指定位，!表示匹配未设置的指定位"
                        },
                        {
                            name: "flags",
                            type: "enum",
                            options: ["F", "S", "R", "P", "A", "U", "C", "E", "0"],
                            required: true,
                            description: "要匹配的TCP标志位：F(FIN), S(SYN), R(RST), P(PSH), A(ACK), U(URG), C(CWR), E(ECE), 0(无标志)"
                        },
                        {
                            name: "ignore_flags",
                            type: "enum",
                            options: ["F", "S", "R", "P", "A", "U", "C", "E"],
                            required: false,
                            description: "要忽略的TCP标志位，用于处理会话初始化数据包"
                        }
                    ],
                    description: "检查特定的TCP标志位",
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
                            description: "要匹配的TCP序列号。序列号由TCP连接的双方随机生成，每发送一个字节就增加1。如果设置了SYN标志，则第一个数据字节的序列号是这个数字加1。"
                        }
                    ],
                    description: "检查特定的TCP序列号",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "ack",
                    name: "确认号",
                    syntax: "ack:{{value}};",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "要匹配的TCP确认号。确认号是对之前所有数据字节的确认。在大多数情况下，TCP连接的每个数据包在第一个SYN之后都有ACK标志，确认号随着每个新数据字节的接收而增加。"
                        }
                    ],
                    description: "检查特定的TCP确认号",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "window",
                    name: "窗口大小",
                    syntax: "window:[!]<number>;",
                    params: [
                        {
                            name: "negate",
                            type: "boolean",
                            default: false,
                            description: "是否取反匹配"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 2,
                            max: 65535,
                            description: "要匹配的TCP窗口大小（2-65535字节）。窗口大小由接收方设置，表示可以接收的字节数。"
                        }
                    ],
                    description: "检查特定的TCP窗口大小",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "tcp.mss",
                    name: "TCP MSS",
                    syntax: "tcp.mss:[<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["<", ">"],
                            required: false,
                            description: "比较修饰符：<表示小于，>表示大于"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 65535,
                            description: "要匹配的TCP MSS选项值。如果选项不存在则不会匹配。"
                        }
                    ],
                    description: "匹配TCP MSS选项值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "tcp.wscale",
                    name: "TCP窗口缩放",
                    syntax: "tcp.wscale:[<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["<", ">"],
                            required: false,
                            description: "比较修饰符：<表示小于，>表示大于"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 255,
                            description: "要匹配的TCP窗口缩放选项值。如果选项不存在则不会匹配。"
                        }
                    ],
                    description: "匹配TCP窗口缩放选项值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "tcp.hdr",
                    name: "TCP头",
                    syntax: "tcp.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用TCP头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配整个TCP头中的内容",
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
                    id: "udp.hdr",
                    name: "UDP头",
                    syntax: "udp.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用UDP头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配整个UDP头中的内容。例如，可以匹配UDP头中的长度字段，长度为8表示没有负载。",
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
                    syntax: "itype:[<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["<", ">"],
                            required: false,
                            description: "比较修饰符：<表示小于，>表示大于"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 255,
                            description: "要匹配的ICMP类型值。使用8位无符号整数。"
                        }
                    ],
                    description: "匹配特定的ICMP类型值。ICMP使用不同的消息类型和代码来区分各种消息。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icode",
                    name: "ICMP代码",
                    syntax: "icode:[<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["<", ">"],
                            required: false,
                            description: "比较修饰符：<表示小于，>表示大于"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 255,
                            description: "要匹配的ICMP代码值。使用8位无符号整数。代码与ICMP类型一起使用，用于进一步说明消息的具体含义。"
                        }
                    ],
                    description: "匹配特定的ICMP代码值。ICMP代码用于进一步说明ICMP消息的具体含义。",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icmp_id",
                    name: "ICMP ID",
                    syntax: "icmp_id:<number>;",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "要匹配的ICMP ID值。每个ICMP数据包在发送时都会获得一个ID，接收方在回复时会使用相同的ID，以便发送方能够识别并关联正确的ICMP请求。"
                        }
                    ],
                    description: "匹配特定的ICMP ID值",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icmp_seq",
                    name: "ICMP序列号",
                    syntax: "icmp_seq:<number>;",
                    params: [
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            description: "要匹配的ICMP序列号。所有ICMP消息都有序列号，与ID一起使用可以确定哪个回复消息属于哪个请求消息。注意：匹配使用网络字节序（大端序）。"
                        }
                    ],
                    description: "匹配特定的ICMP序列号",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icmpv4.hdr",
                    name: "ICMPv4头",
                    syntax: "icmpv4.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用ICMPv4头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配整个ICMPv4头中的内容",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icmpv6.hdr",
                    name: "ICMPv6头",
                    syntax: "icmpv6.hdr;",
                    params: [
                        {
                            name: "enabled",
                            type: "boolean",
                            required: true,
                            default: true,
                            description: "启用ICMPv6头匹配。此关键字不需要额外配置，只需启用即可。",
                            static: true
                        }
                    ],
                    description: "匹配整个ICMPv6头中的内容",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "icmpv6.mtu",
                    name: "ICMPv6 MTU",
                    syntax: "icmpv6.mtu:[<|>]<number>;",
                    params: [
                        {
                            name: "modifier",
                            type: "enum",
                            options: ["<", ">"],
                            required: false,
                            description: "比较修饰符：<表示小于，>表示大于"
                        },
                        {
                            name: "value",
                            type: "number",
                            required: true,
                            min: 0,
                            max: 4294967295,
                            description: "要匹配的ICMPv6 MTU值。使用32位无符号整数。如果MTU不存在则不会匹配。"
                        }
                    ],
                    description: "匹配ICMPv6 MTU选项值",
                    exclusiveWith: [],
                    requires: []
                }
            ]
        },
        {
            id: "http",
            name: "HTTP协议",
            protocols: ["http"],
            keywords: [
                {
                    id: "http_method",
                    name: "HTTP方法",
                    syntax: "http_method:{{method}};",
                    params: [
                        {
                            name: "method",
                            type: "enum",
                            options: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
                            multi: true,
                            default: [],
                            description: "要匹配的HTTP方法"
                        }
                    ],
                    description: "匹配HTTP请求方法",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "uricontent",
                    name: "URI内容匹配",
                    syntax: "uricontent:\"{{value}}\";",
                    params: [
                        {
                            name: "value",
                            type: "string",
                            required: true,
                            placeholder: "输入要匹配的URI字符串",
                            description: "要在URI中匹配的字符串内容"
                        }
                    ],
                    description: "在URI中匹配指定字符串",
                    exclusiveWith: [],
                    requires: []
                },
                {
                    id: "uricontent_nocase",
                    name: "URI内容不区分大小写",
                    syntax: "uricontent_nocase;",
                    params: [],
                    description: "对前一个uricontent关键字不区分大小写",
                    exclusiveWith: [],
                    requires: ["uricontent"]
                }
            ]
        },
        {
            id: "rpc",
            name: "RPC协议",
            protocols: ["rpc"],
            keywords: [
                {
                    id: "rpc",
                    name: "RPC",
                    syntax: "rpc:<application number>,[<version number>|*],[<procedure number>|*];",
                    params: [
                        {
                            name: "application_number",
                            type: "number",
                            required: true,
                            description: "RPC应用程序编号。"
                        },
                        {
                            name: "version_number",
                            type: "string",
                            required: true,
                            description: "RPC版本号。使用*表示所有版本。"
                        },
                        {
                            name: "procedure_number",
                            type: "string",
                            required: true,
                            description: "RPC过程编号。使用*表示所有过程。"
                        }
                    ],
                    description: "匹配SUNRPC CALL中的RPC过程编号和RPC版本。",
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
                    return { ...keyword, category: category.id, isGeneral: true };
                }
            }
        }

        // 然后在协议特定关键字中查找
        for (const protocolCategory of this.protocolCategories) {
            for (const keyword of protocolCategory.keywords) {
                if (keyword.id === keywordId) {
                    return { ...keyword, category: protocolCategory.id, isGeneral: false };
                }
            }
        }

        return null;
    },

    // 辅助函数：获取示例规则
    getExampleRule: function () {
        const exampleRule = { ...this.ruleTemplate };

        // 添加一些基本的选项
        exampleRule.options.push({ id: "msg", params: { msg: "Example Rule" } });
        exampleRule.options.push({ id: "sid", params: { sid: 1000001 } });
        exampleRule.options.push({ id: "rev", params: { rev: 1 } });
        
        // 根据协议添加特定的选项
        if (exampleRule.protocol === "tcp") {
            exampleRule.options.push({ id: "tcp.flags", params: { flags: "S" } });
        } else if (exampleRule.protocol === "udp") {
            exampleRule.options.push({ id: "udp_length", params: { comparison: ">", value: 100 } });
        }

        // 添加一个通用的payload匹配选项
        exampleRule.options.push({ id: "content", params: { value: "test" } });
        exampleRule.options.push({ id: "nocase", params: {} });

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

        // 特殊处理flow关键字
        if (keywordId === 'flow') {
            const direction = params.direction || '';
            const state = params.state || [];
            
            if (!direction) return '';
            
            let flowValue = direction;
            if (state && state.length > 0) {
                flowValue += ', ' + state.join(', ');
            }
            
            return `flow:${flowValue};`;
        }

        // 处理布尔类型的关键字（无参数的关键字）
        if (keyword.params.length === 1 && keyword.params[0].type === 'boolean' && keyword.params[0].static) {
            return keyword.syntax;
    }

    // 替换普通变量
    for (const paramName in params) {
        if (params.hasOwnProperty(paramName)) {
            const paramValue = params[paramName];
                const paramDef = keyword.params.find(p => p.name === paramName);

                // 处理枚举类型的多选值
                if (paramDef && paramDef.type === 'enum' && paramDef.multi && Array.isArray(paramValue)) {
                    if (paramValue.length > 0) {
                        // 对于多选值，用逗号连接所有选中的值
                ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue.join(','));
                    } else {
                        // 如果多选值为空，保留其他参数的值
                        ruleSyntax = ruleSyntax.replace(`,{{${paramName}}}`, '');
                        ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, '');
                    }
            }
            // 处理布尔值条件渲染
                else if (paramDef && paramDef.type === 'boolean') {
                // 布尔值的条件渲染使用Mustache风格的语法
                ruleSyntax = ruleSyntax.replace(`{{#${paramName}}}`, paramValue ? '' : '').replace(`{{/${paramName}}}`, paramValue ? '' : '');

                // 如果是true，还需要替换变量本身
                if (paramValue) {
                    ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue);
                }
            }
                // 处理字符串和数字类型
                else if (paramValue !== null && paramValue !== undefined && paramValue !== '') {
                    // 如果是字符串类型且需要引号，添加引号
                    if (paramDef && paramDef.type === 'string' && paramDef.quote !== false) {
                        ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, `"${paramValue}"`);
                    } else {
                ruleSyntax = ruleSyntax.replace(`{{${paramName}}}`, paramValue);
                    }
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

        ruleString += ")";
        return ruleString;
    }
};

// 导出数据集
export default suricataKeywords;