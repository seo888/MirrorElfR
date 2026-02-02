(function () {
  const response = {
    data: {
      "type": "page",
      "title": "系统实时监控",
      "className": "bg-gray-100 p-4",
      "body": [
        {
          "type": "service",
          "api": "/status",
          "interval": 15000,
          "body": [
            {
              "type": "grid",
              "className": "mb-4",
              "columns": [
                {
                  "md": 6,
                  "body": {
                    "type": "panel",
                    "title": "系统负载",
                    "className": "h-full",
                    "body": {
                      "type": "flex",
                      "justify": "space-around",
                      "alignItems": "center",
                      "className": "py-4",
                      "items": [
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 8, "value": "${(system_load_1min / 2) * 100}", "valueTpl": "<div style='line-height:1;text-align:center;font-size:11px'><b>${system_load_1min}</b><div style='font-size:8px;color:#999'>1m</div></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] },
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 8, "value": "${(system_load_5min / 2) * 100}", "valueTpl": "<div style='line-height:1;text-align:center;font-size:11px'><b>${system_load_5min}</b><div style='font-size:8px;color:#999'>5m</div></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] },
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 8, "value": "${(system_load_15min / 2) * 100}", "valueTpl": "<div style='line-height:1;text-align:center;font-size:11px'><b>${system_load_15min}</b><div style='font-size:8px;color:#999'>15m</div></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] }
                      ]
                    }
                  }
                },
                {
                  "md": 2,
                  "body": {
                    "type": "panel",
                    "title": "CPU",
                    "className": "h-full",
                    "body": {
                      "type": "flex",
                      "justify": "center",
                      "alignItems": "center",
                      "direction": "column",
                      "className": "py-2",
                      "items": [
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 7, "value": "${system_cpu_usage_percent}", "valueTpl": "<div style='text-align:center;font-size:13px'><b>${system_cpu_usage_percent}%</b></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] },
                        { "type": "tpl", "tpl": "<div class='text-xs text-gray-400 mt-2'>进程: ${system_processes_total}</div>" }
                      ]
                    }
                  }
                },
                {
                  "md": 2,
                  "body": {
                    "type": "panel",
                    "title": "内存",
                    "className": "h-full",
                    "body": {
                      "type": "flex",
                      "justify": "center",
                      "alignItems": "center",
                      "direction": "column",
                      "className": "py-2",
                      "items": [
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 7, "value": "${system_memory_usage_percent}", "valueTpl": "<div style='text-align:center;font-size:13px'><b>${system_memory_usage_percent}%</b></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] },
                        { "type": "tpl", "tpl": "<div class='text-xs text-gray-400 mt-2 text-center'>${system_memory_total_bytes}</div>" }
                      ]
                    }
                  }
                },
                {
                  "md": 2,
                  "body": {
                    "type": "panel",
                    "title": "磁盘",
                    "className": "h-full",
                    "body": {
                      "type": "flex",
                      "justify": "center",
                      "alignItems": "center",
                      "direction": "column",
                      "className": "py-2",
                      "items": [
                        { "type": "progress", "mode": "circle", "width": 80, "strokeWidth": 7, "value": "${system_root_disk_usage_percent}", "valueTpl": "<div style='text-align:center;font-size:13px'><b>${system_root_disk_usage_percent}%</b></div>", "map": [{ "value": 70, "color": "#52c41a" }, { "value": 90, "color": "#faad14" }, { "color": "#f5222d" }] },
                        { "type": "tpl", "tpl": "<div class='text-xs text-gray-400 mt-2 text-center'>${system_root_disk_total_bytes}</div>" }
                      ]
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "service",
          "api": {
            "url": "/_api_/spider/qps",
            "adaptor": "return { data: { current: payload.current, avg: payload.avg, max: payload.max, total: payload.total, qpsChart: { tooltip: { trigger: 'axis', formatter: '{b}<br/>QPS: {c}' }, grid: { left: 50, right: 20, top: 20, bottom: 40 }, xAxis: { type: 'category', data: payload.data.map(function(d){ var t = new Date(d.timestamp * 1000); return String(t.getMinutes()).padStart(2,'0')+':'+String(t.getSeconds()).padStart(2,'0'); }), axisLabel: { fontSize: 10 }, boundaryGap: false }, yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } } }, series: [{ name: 'QPS', type: 'line', smooth: true, symbol: 'none', areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(24,144,255,0.4)' }, { offset: 1, color: 'rgba(24,144,255,0.05)' }] } }, lineStyle: { color: '#1890ff', width: 2 }, data: payload.data.map(function(d){ return d.qps; }) }] } } };"
          },
          "interval": 10000,
          "body": {
            "type": "panel",
            "title": "实时 QPS 监控",
            "className": "shadow-sm mb-4",
            "body": {
              "type": "grid",
              "columns": [
                { "md": 3, "body": { "type": "tpl", "tpl": "<div class='text-center py-4'><div class='text-3xl font-bold' style='color:#1890ff'>${current}</div><div class='text-sm text-gray-400'>当前 QPS</div></div>" } },
                { "md": 3, "body": { "type": "tpl", "tpl": "<div class='text-center py-4'><div class='text-3xl font-bold' style='color:#52c41a'>${avg}</div><div class='text-sm text-gray-400'>平均 QPS</div></div>" } },
                { "md": 3, "body": { "type": "tpl", "tpl": "<div class='text-center py-4'><div class='text-3xl font-bold' style='color:#faad14'>${max}</div><div class='text-sm text-gray-400'>峰值 QPS</div></div>" } },
                { "md": 3, "body": { "type": "tpl", "tpl": "<div class='text-center py-4'><div class='text-3xl font-bold' style='color:#13c2c2'>${total}</div><div class='text-sm text-gray-400'>60s 总请求</div></div>" } }
              ]
            }
          }
        },
        {
          "type": "panel",
          "title": "蜘蛛访问趋势 (近7天)",
          "className": "shadow-sm",
          "body": { "type": "chart", "api": "/_api_/spider/chart?day=7", "interval": 60000, "height": 350 }
        }
      ]
    },
    status: 0
  };

  window.jsonpCallback && window.jsonpCallback(response);
})();
