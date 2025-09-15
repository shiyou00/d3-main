// D3.js 主文件 - 函数式实现
function createD3Visualization() {
    // 数据状态
    let data = [
        { name: '北京', value: 120 },
        { name: '上海', value: 95 },
        { name: '广州', value: 80 },
        { name: '深圳', value: 75 },
        { name: '杭州', value: 60 },
        { name: '成都', value: 55 },
        { name: '武汉', value: 45 },
        { name: '西安', value: 40 }
    ];
    
    // 图表配置
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // D3 对象
    let svg, g, xScale, yScale, xAxis, yAxis, tooltip;
    
    // 初始化图表
    function initChart() {
        // 创建SVG容器
        svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        
        g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // 创建比例尺
        xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        
        yScale = d3.scaleLinear()
            .range([height, 0]);
        
        // 创建坐标轴
        xAxis = g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", `translate(0,${height})`);
        
        yAxis = g.append("g")
            .attr("class", "axis axis-y");
        
        // 添加坐标轴标签
        g.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("数值");
        
        g.append("text")
            .attr("class", "axis-label")
            .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 5})`)
            .style("text-anchor", "middle")
            .text("城市");
        
        // 创建工具提示
        tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
        
        updateChart();
    }
    
    // 更新图表
    function updateChart() {
        // 更新比例尺域
        xScale.domain(data.map(d => d.name));
        yScale.domain([0, d3.max(data, d => d.value)]);
        
        // 更新X轴
        xAxis.transition()
            .duration(750)
            .call(d3.axisBottom(xScale));
        
        // 更新Y轴
        yAxis.transition()
            .duration(750)
            .call(d3.axisLeft(yScale));
        
        // 选择所有柱子
        const bars = g.selectAll(".bar")
            .data(data, d => d.name);
        
        // 移除不需要的柱子
        bars.exit()
            .transition()
            .duration(750)
            .attr("y", height)
            .attr("height", 0)
            .remove();
        
        // 添加新柱子
        const barsEnter = bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.name))
            .attr("width", xScale.bandwidth())
            .attr("y", height)
            .attr("height", 0)
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`${d.name}: ${d.value}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
        // 更新现有柱子
        bars.merge(barsEnter)
            .transition()
            .duration(750)
            .attr("x", d => xScale(d.name))
            .attr("width", xScale.bandwidth())
            .attr("y", d => yScale(d.value))
            .attr("height", d => height - yScale(d.value));
    }
    
    // 更新数据
    function updateData() {
        data = data.map(d => ({
            ...d,
            value: Math.floor(Math.random() * 100) + 20
        }));
        updateChart();
    }
    
    // 添加数据点
    function addData() {
        const cities = ['重庆', '天津', '苏州', '南京', '长沙', '青岛', '大连', '厦门'];
        const newCity = cities[Math.floor(Math.random() * cities.length)];
        const newValue = Math.floor(Math.random() * 80) + 20;
        
        if (!data.find(d => d.name === newCity)) {
            data.push({ name: newCity, value: newValue });
            updateChart();
        }
    }
    
    // 重置数据
    function resetData() {
        data = [
            { name: '北京', value: 120 },
            { name: '上海', value: 95 },
            { name: '广州', value: 80 },
            { name: '深圳', value: 75 },
            { name: '杭州', value: 60 },
            { name: '成都', value: 55 },
            { name: '武汉', value: 45 },
            { name: '西安', value: 40 }
        ];
        updateChart();
    }
    
    // 绑定事件
    function bindEvents() {
        document.getElementById('updateData').addEventListener('click', updateData);
        document.getElementById('addData').addEventListener('click', addData);
        document.getElementById('resetData').addEventListener('click', resetData);
    }
    
    // 初始化
    function init() {
        initChart();
        bindEvents();
    }
    
    // 返回公共方法（如果需要外部访问）
    return {
        init,
        updateData,
        addData,
        resetData,
        updateChart
    };
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const visualization = createD3Visualization();
    visualization.init();
});
