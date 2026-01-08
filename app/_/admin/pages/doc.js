(function () {
	const response = {
		"data": {
			"type": "page",
			"title": "文件管理",
			"toolbar": [
				{
					"type": "button",
					"actionType": "dialog",
					"label": "新建文件",
					"level": "primary",
					"dialog": {
						"title": "新建文件",
						"size": "md",
						"body": {
							"type": "form",
							"api": "post:/_api_/file/create",
							"body": [{
									"type": "input-group",
									"label": "文件名",
									"body": [
										{
											"type": "select",
											"name": "filepath",
											"label": "选择目录",
											"placeholder": "请选择目录",
											"value": "doc",
											"options": [
												{
													"label": "doc",
													"value": "doc"
												},
												{
													"label": "templates",
													"value": "templates"
												},
												{
													"label": "_/static/js",
													"value": "_/static/js"
												}
											]
										},
										{
											"type": "input-text",
											"name": "filename",
											"label": "文件名",
											"required": true
										},]
								},
								{
									"type": "editor",
									"name": "content",
									"label": "初始内容",
									"language": "text",
									"size": "lg",
									"options": {
										"lineNumbers": true
									}
								}
							]
						}
					}
				},
				{
					"type": "button",
					"label": "刷新",
					"actionType": "reload",
					"target": "fileCrud"
				}
			],
			"body": [
				{
					"type": "crud",
					"name": "fileCrud",
					"api": "/_api_/file/query",
					"syncLocation": false,
					"pageSize": 10,
					"headerToolbar": [
						"filter-toggler",
						{
							"type": "columns-toggler"
						}
					],
					"footerToolbar": [
						"statistics",
						"pagination"
					],
					"placeholder": "当前目录下还没有任何文件。",
					"filter": {
						"type": "form",
						"mode": "inline",
						"actions": [],
						"body": [
							{
								"type": "select",
								"name": "filepath",
								"label": "选择目录",
								"placeholder": "请选择目录",
								"value": "doc",
								"options": [
									{
										"label": "doc",
										"value": "doc"
									},
									{
										"label": "templates",
										"value": "templates"
									},
									{
										"label": "_/static/js",
										"value": "_/static/js"
									}
								]
							},
							{
								"type": "input-text",
								"name": "filename",
								"placeholder": "文件名关键字",
								"addOn": {
									"type": "submit",
									"label": "搜索",
									"level": "primary"
								}
							}
						]
					},
					"columns": [
						{
							"name": "filename",
							"label": "文件名",
							"type": "text",
							"width": "280px",
							"popOver": {
								"trigger": "hover",
								"position": "right",
								"offset": { "top": 0, "left": 0 },
								"body": {
									"type": "tpl",
									"tpl": "<pre style=\"white-space: pre-wrap; word-wrap: break-word; margin: 0; max-height: 300px; overflow-y: auto;\">${content}</pre>",
								}
							},
							"toggable": false
						},
						{
							"name": "filepath",
							"label": "文件路径",
							"type": "text",
						},
						{
							"name": "size",
							"label": "文件大小",
							"type": "text"
						},
						{
							"name": "mtime",
							"label": "修改时间",
							"type": "datetime"
						},
						{
							"type": "operation",
							"label": "操作",
							"width": "200px",
							"buttons": [
								{
									"type": "button",
									"icon": "fa fa-edit",
									"tooltip": "编辑",
									"actionType": "drawer",
									"drawer": {
										"title": "编辑文件：${filename}",
										"size": "xl",
										"resizable": true,
										"body": {
											"type": "form",
											"api": "put:/_api_/file/update",
											"initApi": "/_api_/file/query?path=${filepath}",
											"body": [
												{
													"type": "static",
													"label": "文件路径",
													"tpl": "${filepath | raw}"
												},
												{
													"type": "editor",
													"name": "content",
													"label": "文件内容",
													"language": "${language || detectLanguage(filename) || 'text'}",
													"size": "xxl",
													"allowFullscreen": true,
													"options": {
														"lineNumbers": true,
														"wordWrap": true
													}
												}
											],
											"actions": [
												{
													"type": "submit",
													"label": "保存修改",
													"level": "primary"
												},
												{
													"type": "reset",
													"label": "取消"
												}
											]
										}
									}
								},
								{
									"type": "button",
									"icon": "fa fa-trash text-danger",
									"tooltip": "删除",
									"actionType": "ajax",
									"confirmText": "确认删除文件 ${filename} 吗？此操作不可恢复！",
									"api": {
										"method": "delete",
										"url": "/_api_/file/delete",
										"data": {
											"filepath": "${filepath}"
										}
									},
									"reload": "fileCrud"
								}
							]
						}
					]
				}
			]
		},
		"status": 0
	};

	window.jsonpCallback && window.jsonpCallback(response);
})();