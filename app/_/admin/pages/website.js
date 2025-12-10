(function () {
	const response = {
		data: {
			"type": "page",
			"body": {
				"type": "crud",
				"itemBadge": {
					"text": "${subdomain == 'www' ? '主站' : '泛站'}",
					"mode": "ribbon",
					"position": "top-left",
					"level": "${subdomain == 'www' ? 'info' : 'danger'}"
				},
				"onEvent": {
					"selectedChange": {
						"actions": [
							{
								"actionType": "toast",
								"args": {
									"msg": "已选择${event.data.selectedItems.length}条记录"
								}
							}
						]
					}
				},
				"id": "crud-table",
				"syncLocation": false,
				"api": {
					"url": "/_api_/rest/v1/website/query",
					"method": "get",
					"adaptor": "return {\n  \"status\": 0,\n  \"msg\": \"\",\n  \"data\": {\n    \"items\": payload.data,\n    \"count\": payload.total\n  }\n}"
				},
				"perPageAvailable": [10, 20, 100, 500],
				"perPage": 10,
				"keepItemSelectionOnPageChange": true,
				"autoFillHeight": true,
				"labelTpl": "【${id}】${domain}",
				"autoGenerateFilter": {
					"columnsNum": 6,
					"showBtnToolbar": true
				},
				"bulkActions": [
					{
						"label": "批量删除",
						"level": "danger",
						"actionType": "ajax",
						"api": "delete:/_api_/rest/v1/website/delete?ids=${ids|raw}",
						"confirmText": "确认批量删除网站【${ids|raw}】（注意：操作不可逆，请谨慎操作）"
					},
					{
						"label": "批量复制",
						"type": "button",
						"onClick": "const rows = props.data.selectedItems; if (rows && rows.length) { const textToCopy = rows.map(row => row.domain ? row.domain : '').join('\\n'); const textArea = document.createElement('textarea'); textArea.value = textToCopy; document.body.appendChild(textArea); textArea.select(); document.execCommand('copy'); document.body.removeChild(textArea); props.env.notify('success', '已复制以下域名到剪贴板：\\n' + textToCopy);}"
					}
				],
				"filterTogglable": true,
				"headerToolbar": [
					"bulkActions",
					"export-excel",
					// {
					// 	"type": "button",
					// 	"actionType": "dialog",
					// 	"label": "建站",
					// 	"icon": "fa fa-plus pull-left",
					// 	"primary": true,
					// 	"dialog": {
					// 		"resizable": true,
					// 		"size": "lg",
					// 		"title": "新建网站",
					// 		"body": {
					// 			"type": "form",
					// 			"size": "lg",
					// 			"name": "sample-edit-form",
					// 			"api": "post:/_api_/rest/v1/website/create",
					// 			"reload": "crud-table",
					// 			"body": [
					// 				{
					// 					"type": "divider",
					// 					"title": "【网站设置】",
					// 					"titlePosition": "center"
					// 				},
					// 				{
					// 					"type": "group",
					// 					"body": [
					// 						{
					// 							"type": "input-text",
					// 							"name": "domain",
					// 							"label": "域名",
					// 							"required": true,
					// 							"validations": {
					// 								"matchRegexp": "^(?!https?://)([\\w-]+\\.)+[\\w-]{2,}$"
					// 							},
					// 							"validationErrors": {
					// 								"matchRegexp": "请输入有效的纯域名，不带http头"
					// 							},
					// 							"placeholder": "请输入纯域名，不带http头 例如: www.abc.com"
					// 						},
					// 						{
					// 							"type": "group",
					// 							"body": [
					// 								{
					// 									"type": "select",
					// 									"name": "to_lang",
					// 									"label": "语言",
					// 									"options": [
					// 										{
					// 											"label": "中文",
					// 											"value": "zh"
					// 										},
					// 										{
					// 											"label": "英文",
					// 											"value": "en"
					// 										}
					// 									],
					// 									"value": "zh",
					// 									"placeholder": "请选择语言"
					// 								},
					// 								{
					// 									"name": "conf.website_info.homepage_update_time",
					// 									"type": "input-number",
					// 									"label": "首页更新时间",
					// 									"width": "80px",
					// 									"value": 0,
					// 									"required": true,
					// 									"desc": "单位：天 填0关闭"
					// 								}
					// 							]
					// 						}
					// 					]
					// 				},
					// 				{
					// 					"type": "group",
					// 					"body": [
					// 						{
					// 							"type": "input-text",
					// 							"name": "root_domain",
					// 							"label": "根域名",
					// 							"required": true,
					// 							"placeholder": "例如: abc.com"
					// 						},
					// 						{
					// 							"type": "input-text",
					// 							"name": "subdomain",
					// 							"label": "子域名",
					// 							"value": "www",
					// 							"placeholder": "默认为 www"
					// 						}
					// 					]
					// 				},
					// 				{
					// 					"type": "input-text",
					// 					"name": "conf.website_info.title",
					// 					"label": "网站标题",
					// 					"placeholder": "请输入网站标题",
					// 					"required": true
					// 				},
					// 				{
					// 					"type": "input-text",
					// 					"name": "conf.website_info.keywords",
					// 					"label": "关键词",
					// 					"placeholder": "请输入网站关键词（以,号隔开）",
					// 					"required": true
					// 				},
					// 				{
					// 					"type": "textarea",
					// 					"name": "conf.website_info.description",
					// 					"label": "描述",
					// 					"placeholder": "请输入描述内容",
					// 					"minRows": 3,
					// 					"maxRows": 6,
					// 					"required": true
					// 				},
					// 				{
					// 					"type": "group",
					// 					"body": [
					// 						{
					// 							"type": "select",
					// 							"name": "conf.replace_rules.replace_mode",
					// 							"label": "替换模式",
					// 							"options": [
					// 								{
					// 									"label": "0. 仅目标站替换",
					// 									"value": 0
					// 								},
					// 								{
					// 									"label": "1. 先 目标站替换 后 本站替换",
					// 									"value": 1
					// 								},
					// 								{
					// 									"label": "2. 仅本站替换",
					// 									"value": 2
					// 								},
					// 								{
					// 									"label": "3. 先 本站替换 后 目标站替换",
					// 									"value": 3
					// 								}
					// 							],
					// 							"value": 0
					// 						},
					// 						{
					// 							"type": "select",
					// 							"name": "conf.website_info.link_mapping",
					// 							"label": "链接映射",
					// 							"options": [
					// 								{
					// 									"label": "开启",
					// 									"value": true
					// 								},
					// 								{
					// 									"label": "关闭",
					// 									"value": false
					// 								}
					// 							],
					// 							"value": false,
					// 							"placeholder": "是否开启链接映射"
					// 						}
					// 					]
					// 				},
					// 				{
					// 					"type": "divider",
					// 					"title": "【目标站设置】",
					// 					"titlePosition": "center"
					// 				},
					// 				{
					// 					"type": "input-text",
					// 					"name": "target_domain",
					// 					"label": "目标域名",
					// 					"placeholder": "例如: www.example.com",
					// 					"desc": "填写要抓取的目标网站域名"
					// 				},
					// 				{
					// 					"type": "alert",
					// 					"body": "注意：如果目标域名未在目标站库中，系统会自动创建"
					// 				},
					// 				{
					// 					"type": "divider",
					// 					"title": "【替换规则】",
					// 					"titlePosition": "center"
					// 				},
					// 				{
					// 					"type": "input-array",
					// 					"name": "conf.replace_rules.all",
					// 					"label": "全局替换",
					// 					"items": {
					// 						"type": "input-text",
					// 						"name": "-",
					// 						"label": "-",
					// 						"unique": true
					// 					},
					// 					"addButtonText": "规则",
					// 					"scaffold": "待替换字符串 -> {keyword}",
					// 					"minItems": 0
					// 				},
					// 				{
					// 					"type": "input-array",
					// 					"name": "conf.replace_rules.index",
					// 					"label": "首页替换",
					// 					"items": {
					// 						"type": "input-text",
					// 						"name": "-",
					// 						"label": "-",
					// 						"unique": true
					// 					},
					// 					"addButtonText": "规则",
					// 					"minItems": 0
					// 				},
					// 				{
					// 					"type": "input-array",
					// 					"name": "conf.replace_rules.page",
					// 					"label": "内页替换",
					// 					"items": {
					// 						"type": "input-text",
					// 						"name": "-",
					// 						"label": "-",
					// 						"unique": true
					// 					},
					// 					"addButtonText": "规则",
					// 					"minItems": 0
					// 				},
					// 				{
					// 					"type": "divider",
					// 					"title": "【泛目录配置】",
					// 					"titlePosition": "center"
					// 				},
					// 				{
					// 					"name": "conf.mulu_config.mulu_tem_max",
					// 					"type": "input-number",
					// 					"label": "生成模板数量",
					// 					"required": true,
					// 					"value": 0,
					// 					"desc": "填写0则不会自动生成模板"
					// 				},
					// 				{
					// 					"type": "select",
					// 					"name": "conf.mulu_config.mulu_static",
					// 					"label": "泛目录模式",
					// 					"options": [
					// 						{
					// 							"label": "静态",
					// 							"value": true
					// 						},
					// 						{
					// 							"label": "动态（蜘蛛池）",
					// 							"value": false
					// 						}
					// 					],
					// 					"value": true
					// 				},
					// 				{
					// 					"type": "checkboxes",
					// 					"name": "conf.mulu_config.mulu_mode",
					// 					"label": "泛目录路由",
					// 					"checkAll": true,
					// 					"optionType": "button",
					// 					"options": [
					// 						{ "label": "404页面", "value": "404" },
					// 						{ "label": "非首页（所有页面）", "value": "all_page" },
					// 						{ "label": "自定义路径", "value": "custom_header" }
					// 					]
					// 				},
					// 				{
					// 					"type": "input-array",
					// 					"name": "conf.mulu_config.mulu_custom_header",
					// 					"label": "自定义路径",
					// 					"items": {
					// 						"type": "input-text",
					// 						"name": "/",
					// 						"label": "/",
					// 						"unique": true
					// 					},
					// 					"addButtonText": "泛目录路径",
					// 					"minItems": 0
					// 				},
					// 				{
					// 					"type": "input-array",
					// 					"name": "conf.mulu_config.mulu_keywords_file",
					// 					"label": "关键词库",
					// 					"items": {
					// 						"type": "input-text",
					// 						"name": "词库路径",
					// 						"label": "词库路径",
					// 						"unique": true
					// 					},
					// 					"addButtonText": "关键词库",
					// 					"minItems": 0
					// 				}
					// 			]
					// 		}
					// 	}
					// },
					{
						"type": "button",
						"actionType": "dialog",
						"label": "建站",
						"icon": "fa fa-plus pull-left",
						"primary": true,
						"dialog": {
							"resizable": true,
							"size": "lg",
							"title": "新建网站",
							"body": {
								"type": "form",
								"size": "lg",
								"name": "sample-edit-form",
								"api": {
									"method": "post",
									"url": "/_api_/rest/v1/website/create",
									"data": {
										"data": {
											"to_lang": "${to_lang}",
											"subdomain": "${subdomain}",
											"conf": {
												"replace_rules": {
													"replace_mode": "${conf.replace_rules.replace_mode}",
													"all": "${conf.replace_rules.all}",
													"index": "${conf.replace_rules.index}",
													"page": "${conf.replace_rules.page}"
												},
												"website_info": {
													"link_mapping": "${conf.website_info.link_mapping}",
													"homepage_update_time": "${conf.website_info.homepage_update_time}",
													"title": "${conf.website_info.title}",
													"keywords": "${conf.website_info.keywords}",
													"description": "${conf.website_info.description}"
												},
												"mulu_config": {
													"mulu_static": "${conf.mulu_config.mulu_static}",
													"mulu_tem_max": "${conf.mulu_config.mulu_tem_max}",
													"mulu_mode": "${conf.mulu_config.mulu_mode}",
													"mulu_custom_header": "${conf.mulu_config.mulu_custom_header}",
													"mulu_keywords_file": "${conf.mulu_config.mulu_keywords_file}"
												}
											},
											"domain": "${domain}",
											"target_domain": "${target_domain}",
											"root_domain": "${root_domain}"
										}
									}
								},
								"reload": "crud-table",
								"body": [
									{
										"type": "divider",
										"title": "【网站设置】",
										"titlePosition": "center"
									},
									{
										"type": "group",
										"body": [
											{
												"type": "input-text",
												"name": "domain",
												"label": "域名",
												"required": true,
												"validations": {
													"matchRegexp": "^(?!https?://)([\\w-]+\\.)+[\\w-]{2,}$"
												},
												"validationErrors": {
													"matchRegexp": "请输入有效的纯域名，不带http头"
												},
												"placeholder": "请输入纯域名，不带http头 例如: www.abc.com"
											},
											{
												"type": "group",
												"body": [
													{
														"type": "select",
														"name": "to_lang",
														"label": "语言",
														"options": [
															{
																"label": "中文",
																"value": "zh"
															},
															{
																"label": "英文",
																"value": "en"
															}
														],
														"value": "zh",
														"placeholder": "请选择语言"
													},
													{
														"name": "conf.website_info.homepage_update_time",
														"type": "input-number",
														"label": "首页更新时间",
														"width": "80px",
														"value": 0,
														"required": true,
														"desc": "单位：天 填0关闭"
													}
												]
											}
										]
									},
									{
										"type": "group",
										"body": [
											{
												"type": "input-text",
												"name": "root_domain",
												"label": "根域名",
												"required": true,
												"placeholder": "例如: abc.com"
											},
											{
												"type": "input-text",
												"name": "subdomain",
												"label": "子域名",
												"value": "www",
												"placeholder": "默认为 www"
											}
										]
									},
									{
										"type": "input-text",
										"name": "conf.website_info.title",
										"label": "网站标题",
										"placeholder": "请输入网站标题",
										"required": true
									},
									{
										"type": "input-text",
										"name": "conf.website_info.keywords",
										"label": "关键词",
										"placeholder": "请输入网站关键词（以,号隔开）",
										"required": true
									},
									{
										"type": "textarea",
										"name": "conf.website_info.description",
										"label": "描述",
										"placeholder": "请输入描述内容",
										"minRows": 3,
										"maxRows": 6,
										"required": true
									},
									{
										"type": "group",
										"body": [
											{
												"type": "select",
												"name": "conf.replace_rules.replace_mode",
												"label": "替换模式",
												"options": [
													{
														"label": "0. 仅目标站替换",
														"value": 0
													},
													{
														"label": "1. 先 目标站替换 后 本站替换",
														"value": 1
													},
													{
														"label": "2. 仅本站替换",
														"value": 2
													},
													{
														"label": "3. 先 本站替换 后 目标站替换",
														"value": 3
													}
												],
												"value": 0
											},
											{
												"type": "select",
												"name": "conf.website_info.link_mapping",
												"label": "链接映射",
												"options": [
													{
														"label": "开启",
														"value": true
													},
													{
														"label": "关闭",
														"value": false
													}
												],
												"value": false,
												"placeholder": "是否开启链接映射"
											}
										]
									},
									{
										"type": "divider",
										"title": "【目标站设置】",
										"titlePosition": "center"
									},
									{
										"type": "input-text",
										"name": "target_domain",
										"label": "目标域名",
										"placeholder": "例如: www.example.com",
										"desc": "填写要抓取的目标网站域名"
									},
									{
										"type": "alert",
										"body": "注意：如果目标域名未在目标站库中，系统会自动创建"
									},
									{
										"type": "divider",
										"title": "【替换规则】",
										"titlePosition": "center"
									},
									{
										"type": "input-array",
										"name": "conf.replace_rules.all",
										"label": "全局替换",
										"items": {
											"type": "input-text",
											"name": "-",
											"label": "-",
											"unique": true
										},
										"addButtonText": "规则",
										"scaffold": "待替换字符串 -> {keyword}",
										"minItems": 0
									},
									{
										"type": "input-array",
										"name": "conf.replace_rules.index",
										"label": "首页替换",
										"items": {
											"type": "input-text",
											"name": "-",
											"label": "-",
											"unique": true
										},
										"addButtonText": "规则",
										"minItems": 0
									},
									{
										"type": "input-array",
										"name": "conf.replace_rules.page",
										"label": "内页替换",
										"items": {
											"type": "input-text",
											"name": "-",
											"label": "-",
											"unique": true
										},
										"addButtonText": "规则",
										"minItems": 0
									},
									{
										"type": "divider",
										"title": "【泛目录配置】",
										"titlePosition": "center"
									},
									{
										"name": "conf.mulu_config.mulu_tem_max",
										"type": "input-number",
										"label": "生成模板数量",
										"required": true,
										"value": 0,
										"desc": "填写0则不会自动生成模板"
									},
									{
										"type": "select",
										"name": "conf.mulu_config.mulu_static",
										"label": "泛目录模式",
										"options": [
											{
												"label": "静态",
												"value": true
											},
											{
												"label": "动态（蜘蛛池）",
												"value": false
											}
										],
										"value": true
									},
									{
										"type": "checkboxes",
										"name": "conf.mulu_config.mulu_mode",
										"label": "泛目录路由",
										"checkAll": true,
										"optionType": "button",
										"options": [
											{ "label": "404页面", "value": "404" },
											{ "label": "非首页（所有页面）", "value": "all_page" },
											{ "label": "自定义路径", "value": "custom_header" }
										]
									},
									{
										"type": "input-array",
										"name": "conf.mulu_config.mulu_custom_header",
										"label": "自定义路径",
										"items": {
											"type": "input-text",
											"name": "/",
											"label": "/",
											"unique": true
										},
										"addButtonText": "泛目录路径",
										"minItems": 0
									},
									{
										"type": "input-array",
										"name": "conf.mulu_config.mulu_keywords_file",
										"label": "关键词库",
										"items": {
											"type": "input-text",
											"name": "词库路径",
											"label": "词库路径",
											"unique": true
										},
										"addButtonText": "关键词库",
										"minItems": 0
									}
								]
							}
						}
					},
					{
						"type": "button",
						"label": "批量建站",
						"icon": "fa fa-plus pull-left",
						"primary": true,
						"actionType": "drawer",
						"drawer": {
							"resizable": true,
							"size": "lg",
							"width": "90%",
							"title": "批量建站",
							"body": {
								"type": "form",
								"name": "sample-edit-form",
								"api": "/_api_/rest/v1/website/create",
								"reload": "crud-table",
								"body": [
									{
										"type": "divider",
										"title": "【建站策略】",
										"titlePosition": "center"
									},
									{
										"type": "group",
										"body": [
											{
												"type": "select",
												"name": "over_write",
												"label": "建站模式",
												"options": [
													{
														"label": "覆盖已有网站",
														"value": true
													},
													{
														"label": "跳过已有网站",
														"value": false
													}
												],
												"value": false,
												"placeholder": "是否覆盖"
											},
											{
												"type": "select",
												"name": "target_replace_over_write",
												"label": "目标站替换词",
												"options": [
													{
														"label": "存在则强制覆盖",
														"value": true
													},
													{
														"label": "存在则跳过",
														"value": false
													}
												],
												"value": false,
												"placeholder": "是否覆盖"
											},]
									},
									{
										"type": "divider",
										"title": "【网站设置】",
										"titlePosition": "center"
									},
									{
										"type": "group",
										"body": [
											{
												"type": "select",
												"name": "replace_mode",
												"label": "替换模式",
												"options": [
													{
														"label": "0. 仅目标站替换",
														"value": 0
													},
													{
														"label": "1. 先 目标站替换 后 本站替换",
														"value": 1
													},
													{
														"label": "2. 仅本站替换",
														"value": 2
													},
													{
														"label": "3. 先 本站替换 后 目标站替换",
														"value": 3
													},
												],
												"value": 0,
											},
											{
												"type": "select",
												"name": "link_mapping",
												"label": "链接映射",
												"options": [
													{
														"label": "开启",
														"value": true
													},
													{
														"label": "关闭",
														"value": false
													}
												],
												"value": false,
												"placeholder": "是否开启链接映射"
											},
											{
												type: "input-number",
												name: "homepage_update_time",
												label: "首页更新时间",
												required: true,
												desc: "单位：天 填0关闭",
												"value": 0,  // 设置默认值
											},
											{
												"type": "select",
												"name": "lang",
												"label": "语言",
												// "required": true,
												"options": [
													{
														"label": "中文",
														"value": "zh"
													},
													{
														"label": "英文",
														"value": "en"
													}
												],
												"value": "zh",  // 设置默认值为 zh
												"placeholder": "请选择语言"
											},
										]
									},


									// {
									// 	"type": "alert",
									// 	"body": "格式：<域名>__<目标站>__<链接映射(true/false)>__<标题>__<关键词>__<描述>__<替换模式(0/1/2/3)>__<目标站替换词(可留空)>__<本站替换词(可留空)>"
									// },
									{
										"type": "alert",
										"body": "例子：www.domain.com___en|www.target.com___网站标题___网站关键词___网站描述___关于我们----------{keyword}##########公司名称----------【关键词】___关于我们 -> {keyword} ; 公司名称 -> 【关键词】"
									},

									{
										"type": "button",
										"className": "pull-right",
										"label": "清空",
										"onEvent": {
											"click": {
												"actions": [
													{
														"actionType": "clear",
														"componentId": "content"
													}
												]
											}
										}
									},
									{
										"type": "button",
										"icon": "fa fa-plus",
										"level": "link",
										"label": "加载预建站文档",
										"actionType": "ajax",
										"api": "get:/_api_/file/query?path=doc/website.txt",
										"messages": {
											"success": "加载成功",
											"failed": "加载失败"
										},
									},
									{
										"type": "editor",
										"language": "yaml",
										"name": "content",
										"id": "content",
										"label": "建站信息",
										"placeholder": "<域名>___<目标站>___<标题>___<关键词>___<描述>___<目标站替换词(可留空)>___<本站替换词(可留空)>",
										"value": "",
									},
									{
										"type": "alert",
										"level": "info",
										"showIcon": true,
										"body": "标准格式： 间隔符为\" -> \"，多组分隔符为\" ; \"，如：关于我们 -> {keyword} ; 公司名称 -> 【关键词】"
									},
									{
										"type": "alert",
										"level": "info",
										"showIcon": true,
										"body": "兼容格式： 间隔符为\"----------\"，多组分隔符为\"##########\"，如：关于我们----------{keyword}##########公司名称----------【关键词】"
									}
									,
									{
										"type": "divider",
										"title": "【泛目录配置】",
										"titlePosition": "center"
									},
									{
										type: "checkboxes",
										name: "mulu_mode",
										label: "泛目录路由",
										checkAll: true,
										optionType: "button",
										options: [
											{ label: "404页面", value: "404" },
											{ label: "非首页（所有页面）", value: "all_page" },
											{ label: "自定义路径", value: "custom_header" },
										]
									},
									{
										"type": "group",
										"body": [
											{
												name: "mulu_tem_max",
												type: "input-number",
												label: "生成模板数量",
												required: true,
												value: 0,
												desc: "填写0则不会自动生成模板"
											},
											{
												"type": "select",
												"name": "mulu_static",
												"label": "泛目录模式",
												"options": [
													{
														"label": "静态",
														"value": true
													},
													{
														"label": "动态（蜘蛛池）",
														"value": false
													}
												],
												"value": true,
											}]
									},
									{
										"type": "group",
										"body": [
											{
												"type": "input-array",
												"name": "mulu_custom_header",
												"label": "自定义路径",
												"items": {
													"type": "input-text",
													"name": "/",
													"label": "/",
													"unique": true,
												},
												"addButtonText": "泛目录路径",
												"minItems": 0,
											},
											{
												"type": "input-array",
												"name": "mulu_keywords_file",
												"label": "关键词库",
												"items": {
													"type": "input-text",
													"name": "词库路径",
													"label": "词库路径",
													"unique": true,
												},
												"addButtonText": "关键词库",
												"minItems": 0,
											},]
									},
								]
							}
						}
					},
					{
						"type": "tpl",
						"tpl": "主站: ${www_count} | 泛站: ${web_count} | 共: ${total}",
						"className": "v-middle"
					},
					"reload",
					{
						"type": "columns-toggler",
						"align": "right"
					},
					{
						"type": "pagination",
						"align": "right"
					},
					{
						"type": "tpl",
						"tpl": "当前：${items_count} 项 | 共：${count} 项",
						"align": "right"
					}
				],
				"footerToolbar": [
					"statistics",
					{
						"type": "pagination",
						"layout": "perPage,pager,go"
					}
				],
				"columns": [
					{
						"type": "tpl",
						"name": "id",
						"label": "ID",
						"searchable": {
							"type": "textarea",
							"name": "search_term",
							"label": "🔍搜索",
							"clearable": true,
							"maxLength": 10000,
							"showCounter": true
						},
						"fixed": "left",
						"sortable": true
					},
					{
						"type": "static-mapping",
						"name": "subdomain",
						"label": "站点类型",
						"visible": false,
						"searchable": {
							"type": "select",
							"name": "is_www",
							"label": "站点类型",
							"options": [
								{
									"label": "主站+泛站",
									"value": 0
								},
								{
									"label": "主站",
									"value": 1
								},
								{
									"label": "泛站",
									"value": 2
								}
							],
							"value": 0,
							"placeholder": "选择站点类型"
						}
					},
					{
						"type": "tpl",
						"tpl": "<a href='http://${domain}' target='_blank' class='link-style'>${domain}</a>",
						"name": "domain",
						"label": "域名",
						"fixed": "left",
						"copyable": true,
						"searchable": {
							"name": "domain",
							"clearable": true,
							"maxLength": 1000
						}
					},
					{
						"name": "to_lang",
						"label": "语言"
					},
					{
						"name": "root_domain",
						"label": "根域名",
						"copyable": true,
						"popOver": {
							"trigger": "hover",
							"body": {
								"type": "tpl",
								"tpl": "${root_domain} 查收录：<a href='https://www.google.com/search?q=site%3A${root_domain}' target='_blank' class='link-style' title='site:${root_domain}'>谷歌</a> | <a href='https://www.bing.com/search?q=site%3A${root_domain}' target='_blank' class='link-style' title='site:${root_domain}'>必应</a> | <a href='https://www.baidu.com/s?wd=site%3A${root_domain}' target='_blank' class='link-style' title='site:${root_domain}'>百度</a> | <a href='https://www.sogou.com/web?query=site%3A${root_domain}' target='_blank' class='link-style' title='site:${root_domain}'>搜狗</a>"
							}
						},
						"sortable": {
							"orderBy": "root_domain"
						},
						"searchable": {
							"name": "root_domain",
							"clearable": true,
							"maxLength": 1000
						}
					},
					{
						"type": "tpl",
						"tpl": "${target_domain ? '<a href=\"javascript:void(0);\" class=\"link-icon\">' + target_domain + '</a>' : '无'}",
						"name": "target_domain",
						"label": "目标站",
						"copyable": true,
						"searchable": {
							"name": "target",
							"clearable": true,
							"maxLength": 1000
						},
						"onEvent": {
							"click": {
								"actions": [
									{
										"actionType": "custom",
										"script": "if (event.data.target_domain) { window.open('http://' + event.data.target_domain, '_blank'); }"
									}
								]
							}
						}
					},
					{
						"name": "conf.website_info.title",
						"label": "网站标题",
						"copyable": true,
						"popOver": {
							"trigger": "hover",
							"body": {
								"type": "tpl",
								"tpl": "${domain} 查标题排名：<a href='https://www.google.com/search?q=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>谷歌</a> | <a href='https://www.bing.com/search?q=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>必应</a> | <a href='https://www.baidu.com/s?wd=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>百度</a> | <a href='https://www.sogou.com/web?query=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>搜狗</a>"
							}
						}
					},
					{
						"name": "conf.website_info.keywords",
						"label": "关键词",
						"copyable": true,
						"popOver": {
							"trigger": "hover",
							"body": {
								"type": "tpl",
								"tpl": "${domain} 查关键词排名：<a href='https://www.google.com/search?q=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>谷歌</a> | <a href='https://www.bing.com/search?q=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>必应</a> | <a href='https://www.baidu.com/s?wd=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>百度</a> | <a href='https://www.sogou.com/web?query=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>搜狗</a>"
							}
						}
					},
					{
						"name": "conf.website_info.description",
						"label": "描述",
						"copyable": true
					},
					{
						"type": "datetime",
						"name": "updated_at",
						"label": "更新于",
						"width": 150,
						"sortable": true
					},
					{
						"type": "operation",
						"fixed": "right",
						"label": "操作",
						"width": 110,
						"buttons": [
							{
								"type": "button",
								"icon": "fa fa-pencil",
								"tooltipPlacement": "top",
								"tooltip": "编辑",
								"actionType": "drawer",
								"drawer": {
									"resizable": true,
									"size": "lg",
									"width": "50%",
									"title": "编辑【${domain}】",
									"body": {
										"type": "form",
										"name": "sample-edit-form",
										// "api": "post:/_api_/rest/v1/website/create?id=${id}",
										"api": {
											"method": "post",
											"url": "/_api_/rest/v1/website/create",
											"data": {
												"data": {
													"to_lang": "${to_lang}",
													"subdomain": "${subdomain}",
													"conf": {
														"replace_rules": {
															"replace_mode": "${conf.replace_rules.replace_mode}",
															"all": "${conf.replace_rules.all}",
															"index": "${conf.replace_rules.index}",
															"page": "${conf.replace_rules.page}"
														},
														"website_info": {
															"link_mapping": "${conf.website_info.link_mapping}",
															"homepage_update_time": "${conf.website_info.homepage_update_time}",
															"title": "${conf.website_info.title}",
															"keywords": "${conf.website_info.keywords}",
															"description": "${conf.website_info.description}"
														},
														"mulu_config": {
															"mulu_static": "${conf.mulu_config.mulu_static}",
															"mulu_tem_max": "${conf.mulu_config.mulu_tem_max}",
															"mulu_mode": "${conf.mulu_config.mulu_mode}",
															"mulu_custom_header": "${conf.mulu_config.mulu_custom_header}",
															"mulu_keywords_file": "${conf.mulu_config.mulu_keywords_file}"
														}
													},
													"domain": "${domain}",
													"target_domain": "${target_domain}",
													"target_replace": "${target_replace}",
													"root_domain": "${root_domain}"
												}
											}
										},
										"reload": "crud-table",
										"body": [
											{
												"type": "static",
												"name": "id",
												"label": "ID",
												"visible": false
											},
											{
												"type": "divider",
												"title": "【网站设置】",
												"titlePosition": "center"
											},
											{
												"type": "group",
												"body": [
													{
														"type": "static",
														"name": "domain",
														"label": "域名"
													},
													{
														"type": "select",
														"name": "to_lang",
														"label": "语言",
														"options": [
															{
																"label": "中文",
																"value": "zh"
															},
															{
																"label": "英文",
																"value": "en"
															}
														]
													}
												]
											},
											{
												"type": "group",
												"body": [
													{
														"type": "static",
														"name": "root_domain",
														"label": "根域名"
													},
													{
														"name": "conf.website_info.homepage_update_time",
														"type": "input-number",
														"label": "首页更新时间",
														"desc": "单位：天 填0关闭"
													}
												]
											},
											{
												"type": "input-text",
												"name": "conf.website_info.title",
												"label": "网站标题",
												"required": true
											},
											{
												"type": "input-text",
												"name": "conf.website_info.keywords",
												"label": "关键词"
											},
											{
												"type": "textarea",
												"name": "conf.website_info.description",
												"label": "描述"
											},
											{
												"type": "group",
												"body": [
													{
														"type": "select",
														"name": "conf.replace_rules.replace_mode",
														"label": "替换模式",
														"options": [
															{
																"label": "仅目标站替换",
																"value": 0
															},
															{
																"label": "先目标站替换后本站替换",
																"value": 1
															},
															{
																"label": "仅本站替换",
																"value": 2
															},
															{
																"label": "先本站替换后目标站替换",
																"value": 3
															}
														]
													},
													{
														"type": "select",
														"name": "conf.website_info.link_mapping",
														"label": "链接映射",
														"options": [
															{
																"label": "开启",
																"value": true
															},
															{
																"label": "关闭",
																"value": false
															}
														]
													}
												]
											},
											{
												"type": "divider",
												"title": "【目标站设置】",
												"titlePosition": "center"
											},
											{
												"type": "input-text",
												"name": "target_domain",
												"label": "目标域名",
												"placeholder": "例如: www.example.com"
											},
											{
												"type": "divider",
												"title": "【替换规则】",
												"titlePosition": "center"
											},
											// 插入新的 service，用于加载 target_replace 数据
											{
												"type": "service",
												"api": "/_api_/rest/v1/target/query?domain=$target_domain",  // 动态加载 target_replace 数据的 API
												"body": [
													{
														"type": "editor",
														"language": "yaml",
														"name": "target_replace",
														"label": "目标站替换",
														"value": "全局替换:\n  - '待替换字符串 -> {关键词}'\n首页替换:\n  - '待替换字符串 -> {关键词2}'\n内页替换:\n  - '待替换字符串 -> 替换词'"
													}
												]
											},
											{
												"type": "alert",
												"level": "info",
												"showIcon": true,
												"body": "注意：替换词格式按照“先长后短”方式，如“hello world -> {关键词}”在上，“hello -> 你好”在下",
											},
											{
												"type": "input-array",
												"name": "conf.replace_rules.all",
												"label": "全局替换",
												"items": {
													"type": "input-text",
													"name": "-",
													"label": "-",
													"unique": true
												},
												"addButtonText": "规则",
												"scaffold": "待替换字符串 -> {keyword}",
												"minItems": 0
											},
											{
												"type": "input-array",
												"name": "conf.replace_rules.index",
												"label": "首页替换",
												"items": {
													"type": "input-text",
													"name": "-",
													"label": "-",
													"unique": true
												},
												"addButtonText": "规则",
												"minItems": 0
											},
											{
												"type": "input-array",
												"name": "conf.replace_rules.page",
												"label": "内页替换",
												"items": {
													"type": "input-text",
													"name": "-",
													"label": "-",
													"unique": true
												},
												"addButtonText": "规则",
												"minItems": 0
											},
											{
												"type": "divider",
												"title": "【泛目录配置】",
												"titlePosition": "center"
											},
											{
												"name": "conf.mulu_config.mulu_tem_max",
												"type": "input-number",
												"label": "生成模板数量",
												"desc": "填写0则不会自动生成模板"
											},
											{
												"type": "select",
												"name": "conf.mulu_config.mulu_static",
												"label": "泛目录模式",
												"options": [
													{
														"label": "静态",
														"value": true
													},
													{
														"label": "动态（蜘蛛池）",
														"value": false
													}
												]
											},
											{
												"type": "checkboxes",
												"name": "conf.mulu_config.mulu_mode",
												"label": "泛目录路由",
												"checkAll": true,
												"optionType": "button",
												"options": [
													{ "label": "404页面", "value": "404" },
													{ "label": "非首页（所有页面）", "value": "all_page" },
													{ "label": "自定义路径", "value": "custom_header" }
												]
											},
											{
												"type": "input-array",
												"name": "conf.mulu_config.mulu_custom_header",
												"label": "自定义路径",
												"items": {
													"type": "input-text",
													"name": "/",
													"label": "/",
													"unique": true
												},
												"addButtonText": "泛目录路径",
												"minItems": 0
											},
											{
												"type": "static-datetime",
												"name": "updated_at",
												"label": "更新于"
											},
											{
												"type": "static-datetime",
												"name": "created_at",
												"label": "创建于"
											}
										]
									}
								}
							},
							{
								"type": "button",
								"icon": "fa fa-eraser text-danger",
								"actionType": "ajax",
								"tooltipPlacement": "top",
								"tooltip": "清空缓存",
								"confirmText": "确认清空【${domain}】所有缓存数据？",
								"api": "delete:/_api_/rest/v1/website_cache/delete?domain=${domain}",
								"reload": "none"
							},
							{
								"type": "button",
								"icon": "fa fa-trash text-danger",
								"actionType": "ajax",
								"tooltipPlacement": "top",
								"confirmText": "确认删除【${id}】${domain}",
								"api": "delete:/_api_/rest/v1/website/delete?ids=${id}"
							}
						],
						"toggled": true
					}
				]
			}
		},
		status: 0
	}

	window.jsonpCallback && window.jsonpCallback(response);
})();