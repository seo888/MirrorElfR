(function () {
	const response = {
		data:
		{
  "type": "page",
  "title": "系统实时监控",
  "className": "bg-gray-100 p-4",
  "body": {
    "type": "service",
    "api": "/status",
    "interval": 15000,
    "body": [
      {
        "type": "panel",
        "title": "系统平均负载 (Load Average)",
        "className": "shadow-sm mb-4",
        "body": {
          "type": "grid",
          "columns": [
            {
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "className": "h-24",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 100,
                    "strokeWidth": 8,
                    /* 关键：将负载数值映射为 0-100 的百分比进度 */
                    "value": "${(system_load_1min / 2) * 100}",
                    "valueTpl": "<div style='line-height:1;text-align:center'><b>${system_load_1min}</b><div style='font-size:10px;color:#999'>1 min</div></div>",
                    "map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  }
                ]
              }
            },
            {
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "className": "h-24",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 100,
                    "strokeWidth": 8,
                    "value": "${(system_load_5min / 2) * 100}",
                    "valueTpl": "<div style='line-height:1;text-align:center'><b>${system_load_5min}</b><div style='font-size:10px;color:#999'>5 min</div></div>",
                    "map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  }
                ]
              }
            },
            {
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "className": "h-24",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 100,
                    "strokeWidth": 8,
                    "value": "${(system_load_15min / 2) * 100}",
                    "valueTpl": "<div style='line-height:1;text-align:center'><b>${system_load_15min}</b><div style='font-size:10px;color:#999'>15 min</div></div>",
                    "map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "type": "grid",
        "className": "gap-4",
        "columns": [
          {
            "body": {
              "type": "panel",
              "title": "CPU 状态",
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "direction": "column",
                "className": "p-4 min-h-[220px]",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 150,
                    "strokeWidth": 12,
                    "value": "${system_cpu_usage_percent}",
                    "valueTpl": "<div style='text-align:center'><b>${system_cpu_usage_percent}%</b><div style='font-size:12px;color:#999'>使用率</div></div>",
					"map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  },
                  { "type": "tpl", "tpl": "<div class='mt-4 text-gray-400 text-sm'>进程数: ${system_processes_total}</div>" }
                ]
              }
            }
          },
          {
            "body": {
              "type": "panel",
              "title": "内存资源",
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "direction": "column",
                "className": "p-4 min-h-[220px]",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 150,
                    "strokeWidth": 12,
                    "value": "${system_memory_usage_percent}",
                    "valueTpl": "<div style='text-align:center'><b>${system_memory_usage_percent}%</b><div style='font-size:12px;color:#999'>已占用</div></div>",
                    "map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  },
                  { "type": "tpl", "tpl": "<div class='mt-4 text-gray-400 text-sm text-center'>总: <b class='text-success'>${system_memory_total_bytes} </b>可用: <b class='text-success'>${system_memory_available_bytes}</b></div>" }
                ]
              }
            }
          },
          {
            "body": {
              "type": "panel",
              "title": "磁盘空间",
              "body": {
                "type": "flex",
                "justify": "center",
                "alignItems": "center",
                "direction": "column",
                "className": "p-4 min-h-[220px]",
                "items": [
                  {
                    "type": "progress",
                    "mode": "circle",
                    "width": 150,
                    "strokeWidth": 12,
                    "value": "${system_root_disk_usage_percent}",
                    "valueTpl": "<div style='text-align:center'><b>${system_root_disk_usage_percent}%</b><div style='font-size:12px;color:#999'>已使用</div></div>",
                    "map": [
                    {
                      "value": 70,
                      "color": "#4caf50"
                    },
                    {
                      "value": 90,
                      "color": "#ff9800"
                    },
                    {
                      "color": "#f44336"
                    }]
                  },
                  { "type": "tpl", "tpl": "<div class='mt-4 text-gray-400 text-sm text-center'>总: <b class='text-primary'>${system_root_disk_total_bytes} </b>剩余: <b class='text-primary'>${system_root_disk_available_bytes}</b></div>" }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
		,
		status: 0
	}

	window.jsonpCallback && window.jsonpCallback(response);
})();
