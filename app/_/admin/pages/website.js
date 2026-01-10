(function () {
	const response = {
		data: {
			"type": "page",
			"body": {
				"type": "crud",
				"onEvent": {
					"filter": {
						"actions": [
							{
								"actionType": "reload",
								"componentId": "siteStatusService",
								"description": "当CRUD过滤条件变化时刷新站点状态"
							}
						]
					}
				},
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
					"url": "/_api_/website/query",
					"method": "get",
					"adaptor": "return {\n  \"status\": 0,\n  \"msg\": \"\",\n  \"data\": {\n    \"items\": payload.data,\n    \"total\": payload.total,\n  \"www_total\": payload.www_total,\n  \"count\": payload.count,\n  \"items_count\": payload.data.length\  }\n}"
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
						"api": "delete:/_api_/website/delete?ids=${ids|raw}",
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
					{
						"type": "button",
						"label": "数据备份",
						"level": "primary",
						"actionType": "ajax", // 使用 ajax 类型动作发送请求
						"api": {
							"method": "get", // 定义请求方法为 POST
							"url": "/_api_/data/download", // 替换成您实际的 API 地址
						},
					},
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
									"url": "/_api_/website/create",
									"data": {
										"data": {
											"to_lang": "${to_lang}",
											"conf": {
												"friend_links": {
													"location": "${conf.friend_links.location}",
													"all": "${conf.friend_links.all}",
													"index": "${conf.friend_links.index}",
													"page": "${conf.friend_links.page}"
												},
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
											"target_replace": "${target_replace}"
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
									// 插入新的 service，用于加载 target_replace 数据
									{
										"type": "service",
										"api": "/_api_/target/query_details?domain=$target_domain",  // 动态加载 target_replace 数据的 API
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
								"api": "/_api_/website/create",
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
												"name": "target_replace_cover",
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
												"name": "to_lang",
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
										"label": "加载建站文档 (doc/website.txt)",
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

								]
							}
						}
					},
					{
						"type": "tpl",
						"tpl": "主站: ${www_total} | 泛站: ${total-www_total} | 共: ${total}",
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
									"value": 2
								},
								{
									"label": "主站",
									"value": 1
								},
								{
									"label": "泛站",
									"value": 0
								}
							],
							"value": 2,
							"placeholder": "选择站点类型"
						}
					},
					{
						"name": "siteStatusService",
						"interval": 15000, // 每5秒自动刷新一次
						"silentPolling": true, // 静默刷新，不显示loading
						"label": "站点状态",
						"width": 115,
						"type": "service",
						"api": "/_api/site_status?domain=${domain}&title=${conf.website_info.title}",
						"body": [
							{
								"type": "tpl",
								"tpl": "${message |default:...加载中}",
								"wrapperComponent": "",
								"className": "${ message ? 'font-bold' : 'font-bold text-gray-500' }",
							}
						]
					},

					{
						"label": "域名",
						"name": "domain",
						"width": 225,
						"type": "container",
						"sortable": true,
						// "copyable": true,
						"searchable": {
							"name": "domain",
							"clearable": true,
							"maxLength": 1000
						},
						"body": [
							{
								"type": "icon",
								"className": "pr-1",
								"icon": "${to_lang === 'zh' ? '/_/admin/zh.svg' : to_lang === 'en' ? '/_/admin/en.svg' : 'fa fa-globe'}",
								"visible": "this.to_lang"
							},
							{
								"type": "tpl",
								"inline": true,
								"tpl": "<a href='http://${domain}' target='_blank' class='link-style'>${domain}</a>",
							},
							{
								"type": "button",
								"level": "link",
								"icon": "fa fa-files-o text-muted",
								"tooltip": "复制",
								"tooltipPlacement": "right",
								"className": "p-1 min-w-1",
								"actionType": "copy",
								"content": "${domain}",
								"visibleOn": "this.domain"
							},
							{
								"type": "button",
								"level": "link",
								"icon": "fa fa-eraser text-danger",
								"actionType": "ajax",
								"tooltipPlacement": "top",
								"tooltip": "清空缓存",
								"confirmText": "确认清空【${domain}】所有缓存数据？",
								"api": "delete:/_api_/website_cache/delete?domain=${domain}",
								"className": "p-0 min-w-0",
								"reload": "none"
							}
						]
					},
					{
						"name": "conf.website_info.title",
						"label": "标题",
						"copyable": true,
						"popOver": {
							"trigger": "hover",
							"body": {
								"type": "tpl",
								"tpl": "【${domain}】${conf.website_info.title}<br /><br />关键词：${conf.website_info.keywords}<br />描述：${conf.website_info.description}<br /><br />查标题排名：<br /><a href='https://www.google.com/search?q=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>谷歌</a> | <a href='https://www.bing.com/search?q=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>必应</a> | <a href='https://www.baidu.com/s?wd=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>百度</a> | <a href='https://www.sogou.com/web?query=${conf.website_info.title}' target='_blank' class='link-style' title='${conf.website_info.title}'>搜狗</a>"
							}
						}
					},
					// {
					// 	"name": "show_status",
					// 	"label": "状态",
					// 	"type": "text",
					// 	// "deferApi": "/_api_/website/get_status?domain=${domain}",
					// 	"initApi": "/_api/user_ip",
					// },
					// {
					// 	"label": "状态",
					// 	"type": "service",
					// 	// 在 service 容器上配置 initApi，它一定会自动加载
					// 	"api": "/_api/user_ip_json",
					// 	"body": [
					// 		{
					// 		// 这里可以是 text 或 static
					// 		"name": "show_status",
					// 		"type": "static"
					// 		// 这里不需要 api 了，它会自动使用 service 请求回来的数据
					// 		// 假设 /_api/user_ip 返回 { "data": { "show_status": "在线" } }，这里就会自动显示“在线”
					// 		}
					// 	]
					// },
					{
						"name": "to_lang",
						"label": "语言",
						"visible": false,
						"sortable": true,
					},
					{
						"label": "目标站",
						"name": "target_domain",
						"type": "container",
						"width": 225,
						// "inline": true,
						"sortable": true,
						// "copyable": true,
						"searchable": {
							"name": "target",
							"clearable": true,
							"maxLength": 1000
						},
						"body": [
							// {
							// "type": "icon",
							// "icon": "fa fa-globe text-primary",   // 或: "fa fa-link", "iconfont icon-website" 等
							// "className": "pr-1"
							// },
							{
								"type": "tpl",
								"className": "pr-1 text-2xl text-primary",
								"tpl": "<span style=\"font-size: 0.5em;\">${target_lang} |</span>",
								// "icon": "${target_lang === 'zh' ? 'fi fi-cn' : target_lang === 'en' ? 'fi fi-us' : 'fa fa-globe'}",
								// "icon": "${target_lang}",
								// "visible": "this.target_lang"
							},
							// {
							// "type": "icon",
							// "className": "pr-1",
							// "icon": "${target_lang === 'zh' ? '/_/admin/zh.svg' : target_lang === 'en' ? '/_/admin/en.svg' : 'fa fa-globe'}",
							// "visible": "this.target_lang"
							// },
							{
								"type": "tpl",
								"inline": true,
								"tpl": "<a href='http://${target_domain}' target='_blank' class='link-style'>${target_domain}</a>",
							},
							// {
							// 	"type": "tpl",
							// 	"inline": true,
							// 	"tpl": "${target_domain ? '<a href=\"javascript:void(0);\" class=\"link-icon\">' + target_domain + '</a>' : '无'}",
							// 	"onEvent": {
							// 		"click": {
							// 			"actions": [
							// 				{
							// 					"actionType": "custom",
							// 					"script": "if (event.data.target_domain) { window.open('http://' + event.data.target_domain, '_blank'); }"
							// 				}
							// 			]
							// 		}
							// 	}
							// },
							{
								"type": "button",
								"level": "link",
								"icon": "fa fa-files-o text-muted",
								"tooltip": "复制",
								"tooltipPlacement": "right",
								"className": "p-1 min-w-1",
								"actionType": "copy",
								"content": "${target_domain}",
								"visibleOn": "this.target_domain"
							},
							{
								"type": "button",
								"level": "link",
								"icon": "fa fa-eraser text-danger",
								"actionType": "ajax",
								"tooltipPlacement": "top",
								"tooltip": "清空目标站缓存",
								"confirmText": "确认清空目标站【${target_domain}】所有缓存数据？",
								"api": "delete:/_api_/target_cache/delete?domain=${target_domain}",
								"className": "p-0 min-w-0",
								"reload": "none"
							}
						]
					},
					// {
					// 	"label": "目标站标题",
					// 	"type": "service",
					// 	"api": "/_api/site_status?domain=${target_domain}",
					// 	"loadingConfig": {
					// 		"show": false
					// 	},
					// 	"body": [
					// 		{
					// 			"type": "tpl",
					// 			"tpl": "${title | default:${message}}",
					// 			"visibleOn": "!used_time"
					// 		},
					// 		{
					// 			"type": "tpl",
					// 			"tpl": "[⚡${used_time}ms]  ${title | default:${message}}",
					// 			"visibleOn": "used_time"
					// 		}
					// 	]
					// },
					{
						"label": "目标站标题",
						"type": "service",
						"key": "${id}-target-status",
						"api": "/_api/site_status?domain=${target_domain}",
						"initFetch": true,

						// "loadingConfig": {
						// 	"show": false
						// },
						"body": [
							{
								"type": "tpl",
								"className": "${ used_time ? '' : 'text-gray-500' }",
								"tpl": "${ used_time ? (used_time < 1500 ? (title || message) + ' 🟢 ' + used_time + ' ms' : used_time < 2500 ? (title || message) + ' 🟡 ' + used_time + ' ms' : (title || message) + ' 🔴 ' + used_time + ' ms') : (title || message || '...加载中 ') }",
							},
						]
					},
					// {
					// 	"label": "目标站标题",
					// 	"type": "service",
					// 	"api": "/_api/site_status?domain=${target_domain}",
					// 	"loadingConfig": {
					// 		"show": false   // 关闭 loading 遮罩和图标
					// 	},
					// 	"body": [
					// 		{
					// 			"type": "tpl",
					// 			"tpl": "${title |default:-}",
					// 			"wrapperComponent": "",
					// 		}
					// 	]
					// },					
					// {
					// 	"name": "conf.website_info.keywords",
					// 	"label": "关键词",
					// 	"copyable": true,
					// 	"popOver": {
					// 		"trigger": "hover",
					// 		"body": {
					// 			"type": "tpl",
					// 			"tpl": "${domain} 查关键词排名：<a href='https://www.google.com/search?q=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>谷歌</a> | <a href='https://www.bing.com/search?q=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>必应</a> | <a href='https://www.baidu.com/s?wd=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>百度</a> | <a href='https://www.sogou.com/web?query=${conf.website_info.keywords | split:',' | first}' target='_blank' class='link-style' title='${conf.website_info.keywords | split:',' | first}'>搜狗</a>"
					// 		}
					// 	}
					// },
					// {
					// 	"name": "conf.website_info.description",
					// 	"label": "描述",
					// 	"copyable": true
					// },

					{
						"name": "root_domain",
						"label": "根域名",
						"sortable": true,
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
									"actions": [
										{
											"type": "button",
											"label": "关闭",
											"actionType": "close"  // 手动关闭
										},
										{
											"type": "button",
											"label": "保存",
											"level": "primary",
											"actionType": "submit"  // 触发表单提交
										}
									],
									"resizable": true,
									"size": "lg",
									"width": "50%",
									"title": "编辑【${domain}】",
									"body": {
										"type": "form",
										"name": "sample-edit-form",
										// "api": "post:/_api_/website/create?id=${id}",
										"api": {
											"method": "post",
											"url": "/_api_/website/create",
											"data": {
												"data": {
													"to_lang": "${to_lang}",
													"subdomain": "${subdomain}",
													"conf": {
														"friend_links": {
															"location": "${conf.friend_links.location}",
															"all": "${conf.friend_links.all}",
															"index": "${conf.friend_links.index}",
															"page": "${conf.friend_links.page}"
														},
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
												"type": "group",
												"body": [
													// {
													// 	"type": "input-text",
													// 	"name": "target_domain",
													// 	"label": "目标域名",
													// 	"addOn": {
													// 		"type": "button",
													// 		"icon": "fa fa-refresh",
													// 		"label": "更换"
													// 	},
													// 	"placeholder": "例如: www.example.com"
													// },

													// 这里是可以的 用表格加载目标库域名 然后选用
													// 													{
													//   "type": "input-text",
													//   "name": "target_domain",
													//   "id": "domainInput",
													//   "label": "目标域名",
													//   "placeholder": "例如: www.example.com",
													//   "addOn": {
													//     "type": "button",
													//     "icon": "fa fa-refresh",
													//     "label": "更换",
													//     "onEvent": {
													//       "click": {
													//         "actions": [
													//           {
													//             "actionType": "drawer",     // 也可以换成 dialog
													//             "drawer": {
													//               "title": "请选择域名",
													//               "size": "md",
													//               "body": [
													//                 {
													//                   "type": "crud",       // 表格
													//                   "syncLocation": false,
													//                   "api": "/_api/random_target_domain",   // 返回 {data: {items: [...]}}
													//                   "columns": [
													//                     {
													//                       "name": "domain",
													//                       "label": "域名"
													//                     },
													//                     {
													//                       "type": "button",
													//                       "label": "选用",
													//                       "actionType": "setValue",
													//                       "componentId": "domainInput",
													//                       "args": {
													//                         "value": "${domain}"
													//                       },
													//                       "close": true      // 点完后自动关抽屉
													//                     }
													//                   ]
													//                 }
													//               ]
													//             }
													//           }
													//         ]
													//       }
													//     }
													//   }
													// },


													{
														"type": "input-text",
														"name": "target_domain",
														"id": "domainInput",
														"label": "目标域名",
														"placeholder": "例如: www.example.com",
														"addOn": {
															"type": "button",
															"icon": "fa fa-refresh",
															"label": "更换",
															"onEvent": {
																"click": {
																	"actions": [
																		{
																			"actionType": "ajax",
																			"api": {
																				"method": "get",
																				"url": "/_api/random_target_domain"
																			},
																			"outputVar": "domainResult"
																		},
																		{
																			"actionType": "setValue",
																			"componentId": "domainInput",
																			"args": {
																				"value": "${domainResult.target_domain}"
																			}
																		}
																	]
																}
															}
														}
													},

													// {
													// 	"type": "input-text",
													// 	"name": "target_domain",
													// 	"id": "domainInput",
													// 	"label": "目标域名",
													// 	"placeholder": "例如: www.example.com",
													// 	"addOn": {
													// 		"type": "button",
													// 		"icon": "fa fa-refresh",
													// 		"label": "更换",
													// 		"onEvent": {
													// 		"click": {
													// 			"actions": [
													// 			{
													// 				"actionType": "setValue",
													// 				"componentId": "domainInput",
													// 				"args": {
													// 				"value": "test-${DATETIMESTAMP}.com"
													// 				}
													// 			}
													// 			]
													// 		}
													// 		}
													// 	}
													// },
													{
														"type": "service",
														"api": "/_api/site_status?domain=${target_domain}",
														"body": [
															{
																"type": "static",
																"name": "title",
																"label": "目标站标题",
																"popOver": {
																	"trigger": "hover",
																	"position": "bottom",   // 让气泡出现在下方
																	"offset": { "top": 0, "left": -10 },
																	"body": {
																		"type": "tpl",
																		"tpl": "<a href='http://${target_domain | split:'|' | last}' target='_blank' class='link-style' title='${target_domain | split:'|' | last}'>${target_domain | split:'|' | last}</a><br/>响应时间：${used_time} ms<br/>状态消息：${message || '无'}"
																	}
																}
															},
														]
													},
												]
											},

											{
												"type": "divider",
												"title": "【替换规则】",
												"titlePosition": "center"
											},

											// 插入新的 service，用于加载 target_replace 数据
											{
												"type": "service",
												"api": "/_api_/target/query_details?domain=$target_domain",  // 动态加载 target_replace 数据的 API
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
												"title": "【友链设置】",
												"titlePosition": "center"
											},
											{
												"type": "input-array",
												"name": "conf.friend_links.all",
												"label": "全局友链",
												"desc": "注意：标签在保存后会自动解析。更多标签详情请查看《标签文档》",
												"items": {
													"type": "input-text",
													"validations": {
														"matchRegexp": "<a\\s+[^>]*href\\s*=\\s*[\"'][^\"']*[\"'][^>]*>.*</a>"
													},
													"validationErrors": {
														"matchRegexp": "请输入有效的HTML链接格式（必须包含完整a标签）",
														"unique": "友链样式 不能重复"
													}
												},
												"addButtonText": "友链",
												"scaffold": '<a target="_blank" title="{*主站.标题 #88}" href="{*主站.首页 #88}">{*主站.核心词 #88}</a>',
												"minItems": 0,
												"unique": true
											},
											{
												"type": "input-array",
												"name": "conf.friend_links.index",
												"label": "首页友链",
												"desc": "注意：标签在保存后会自动解析。更多标签详情请查看《标签文档》",
												"items": {
													"type": "input-text",
													"validations": {
														"matchRegexp": "<a\\s+[^>]*href\\s*=\\s*[\"'][^\"']*[\"'][^>]*>.*</a>"
													},
													"validationErrors": {
														"matchRegexp": "请输入有效的HTML链接格式（必须包含完整a标签）",
														"unique": "友链样式 不能重复"
													}
												},
												"addButtonText": "友链",
												"scaffold": '<a target="_blank" title="{*主站.标题 #88}" href="{*主站.首页 #88}">{*主站.核心词 #88}</a>',
												"minItems": 0,
												"unique": true
											},
											{
												"type": "input-array",
												"name": "conf.friend_links.page",
												"label": "内页友链",
												"desc": "注意：标签在保存后会自动解析。更多标签详情请查看《标签文档》",
												"items": {
													"type": "input-text",
													"validations": {
														"matchRegexp": "<a\\s+[^>]*href\\s*=\\s*[\"'][^\"']*[\"'][^>]*>.*</a>"
													},
													"validationErrors": {
														"matchRegexp": "请输入有效的HTML链接格式（必须包含完整a标签）",
														"unique": "友链样式 不能重复"
													}
												},
												"addButtonText": "友链",
												"scaffold": '<a target="_blank" title="{*主站.标题 #88}" href="{*主站.首页 #88}">{*主站.核心词 #88}</a>',
												"minItems": 0,
												"unique": true
											},
											{
												"type": "input-text",
												"name": "conf.friend_links.location",
												"label": "友链位置",
												"placeholder": "{}</body> (默认为空，表示页面底部)"
											},

											// {
											// 	"type": "checkboxes",
											// 	"name": "conf.mulu_config.mulu_mode",
											// 	"label": "友链模式",
											// 	"checkAll": true,
											// 	"optionType": "button",
											// 	"options": [
											// 		{ "label": "全站模式", "value": "404" },
											// 		{ "label": "经首页", "value": "all_page" },
											// 		{ "label": "自定义路径", "value": "custom_header" }
											// 	]
											// },
											// {
											// 	"type": "input-array",
											// 	"name": "conf.mulu_config.mulu_custom_header",
											// 	"label": "自定义路径",
											// 	"items": {
											// 		"type": "input-text",
											// 		"name": "/",
											// 		"label": "/",
											// 		"unique": true
											// 	},
											// 	"addButtonText": "泛目录路径",
											// 	"minItems": 0
											// },
											{
												"type": "group",
												"body": [
													{
														"type": "static-datetime",
														"name": "created_at",
														"label": "创建于"
													},
													{
														"type": "static-datetime",
														"name": "updated_at",
														"label": "更新于"
													}]
											}
										]
									}
								}
							},
							{
								"type": "button",
								"icon": "fa fa-trash text-danger",
								"actionType": "ajax",
								"tooltipPlacement": "top",
								"confirmText": "确认删除【${id}】${domain}",
								"api": "delete:/_api_/website/delete?ids=${id}"
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