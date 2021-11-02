<template>
	<div id="dataMapecharts"></div>
</template>
<script>
import china from './newChina.json'
export default {
	name: 'chinaMap',
	data() {
		return {}
	},
	mounted() {
		this.mYecharts()
	},
	methods: {
		mYecharts() {
			this.$echarts.registerMap('china', china, {})
			//加载中国地图
			var myChart = this.$echarts.init(document.getElementById('dataMapecharts'))
			// 绘制图表
			var chinaMap = {
				// title: {
				//   //标题
				//   text: '省级统计',
				//   left: 'center',
				// },

				//鼠标移动到某个省份时显示内容
				tooltip: {
					// 提示框浮层的文本样式。
					padding: 9,
					textStyle: {
						color: '#fff',
						fontSize: 10,
					},
					show: true,
					alwaysShowContent: false, // 悬浮层是否一直显示
					formatter: function (item) {
						// 自定义悬浮层样式
						let resData = item.data,
							renderHtml = (data = {}) => {
								return `<li style='width:128px;padding:7px 6px;display:flex;flex-direction:row;justify-content:space-between'><span>${data.text}</span><span>${data.data}</span></li>`
							}
						if (resData) {
							return `<ul  class='hoverContent' style=''>${renderHtml({ text: '总成交量', data: 25640 })}${renderHtml({ text: '机票兑换率', data: '85%' })}${renderHtml({ text: '平均客座率', data: '75%' })}
              ${renderHtml({ text: '未绑定率', data: '30%' })}
              </ul>`
						}
					},
				},
				selectedMode: 'single',
				geo: {
					zoom: 1.13, // 当前地图缩放比例
					// 设置地图的显示信息
					map: 'china', // 注意  哪个区域的就显示哪个区域的名称
					label: {
						show: true,
						normal: {
							show: false,
							textStyle: {
								color: '#ffffff',
								fontSize: 12,
							},
						},
						emphasis: {
							//是否在高亮状态下显示标签
							show: true,
							//高亮状态下的标签文本样式
							textStyle: {
								color: '#ffffff',
								fontSize: 16,
								fontWeight: 'bold',
							},
						},
					},
					roam: false,
					//地图区域的多边形 图形样式
					itemStyle: {
						normal: {
							borderColor: '#071d51',
							areaColor: '#1a55e9',
							borderWidth: 2,
						},
						emphasis: {
							areaColor: '#FF822D',
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					//   left: "5%",
					//   right: "5%",
					top: "7%",
					//   bottom: "5%",
				},
				series: [
					{
						type: 'map',
						geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
						data: [
							{ name: '北京', selected: false, value: 1 },
							{ name: '天津', selected: false, value: 2 },
							{ name: '上海', selected: false, value: 3 },
							{ name: '重庆', selected: false, value: 4 },
							{ name: '河北', selected: false, value: 5 },
							{ name: '河南', selected: false, value: 6 },
							{ name: '云南', selected: false, value: 7 },
							{ name: '辽宁', selected: false, value: 8 },
							{ name: '黑龙江', selected: false, value: 9 },
							{ name: '湖南', selected: false, value: 10 },
							{ name: '安徽', selected: false, value: 11 },
							{ name: '山东', selected: false, value: 12 },
							{ name: '新疆', selected: false, value: 13 },
							{ name: '江苏', selected: false, value: 14 },
							{ name: '浙江', selected: false, value: 15 },
							{ name: '江西', selected: false, value: 16 },
							{ name: '湖北', selected: false, value: 17 },
							{ name: '广西', selected: false, value: 18 },
							{ name: '甘肃', selected: false, value: 19 },
							{ name: '山西', selected: false, value: 20 },
							{ name: '内蒙古', selected: false, value: 21 },
							{ name: '陕西', selected: false, value: 22 },
							{ name: '吉林', selected: false, value: 23 },
							{ name: '福建', selected: false, value: 24 },
							{ name: '贵州', selected: false, value: 25 },
							{ name: '广东', selected: false, value: 26 },
							{ name: '青海', selected: false, value: 27 },
							{ name: '西藏', selected: false, value: 28 },
							{ name: '四川', selected: false, value: 29 },
							{ name: '宁夏', selected: false, value: 30 },
							{ name: '海南', selected: false, value: 31 },
							{ name: '台湾', selected: false, value: 32 },
							{ name: '香港', selected: false, value: 33 },
							{ name: '澳门', selected: false, value: 34 },
						],
					},
				],
				dataRange: {
					//给各个省份设置不同颜色
					x: '-1000 px', //图例横轴位置
					y: '-1000 px', //图例纵轴位置
					borderColor: '#071d51', //边框颜色
					borderWidth: 5,
					splitList: [
						{
							start: 1,
							end: 1,
							label: '北京',
							color: '#256bbe',
						},
						{ start: 2, end: 2, label: '天津', color: '#1B5AF4' },
						{ start: 3, end: 3, label: '上海', color: '#1a55e9' },
						{ start: 4, end: 4, label: '重庆', color: '#0c4ca1' },
						{ start: 5, end: 5, label: '河北', color: '#1B5AF4' },
						{ start: 6, end: 6, label: '河南', color: '#1279F4' },
						{ start: 7, end: 7, label: '云南', color: '#0c4da3' },
						{ start: 8, end: 8, label: '辽宁', color: '#1B5AF4' },
						{ start: 9, end: 9, label: '黑龙江', color: '#1B5AF4' },
						{ start: 10, end: 10, label: '湖南', color: '#1279F4' },
						{ start: 11, end: 11, label: '安徽', color: '#1B5AF4' },
						{ start: 12, end: 12, label: '山东', color: '#1279F4' },
						{ start: 13, end: 13, label: '新疆', color: '#1b4f93' },
						{ start: 14, end: 14, label: '江苏', color: '#1B5AF4' },
						{ start: 15, end: 15, label: '浙江', color: '#1B5AF4' },
						{ start: 16, end: 16, label: '江西', color: '#1B5AF4' },
						{ start: 17, end: 17, label: '湖北', color: '#1279F4' },
						{ start: 18, end: 18, label: '广西', color: '#0c4da2' },
						{ start: 19, end: 19, label: '甘肃', color: '#0c4fc2' },
						{ start: 20, end: 20, label: '山西', color: '#1B5AF4' },
						{ start: 21, end: 21, label: '内蒙古', color: '#1B5AF4' },
						{ start: 22, end: 22, label: '陕西', color: '#0c4b9f' },
						{ start: 23, end: 23, label: '吉林', color: '#1B5AF4' },
						{ start: 24, end: 24, label: '福建', color: '#1B5AF4' },
						{ start: 25, end: 25, label: '贵州', color: '#0c4da2' },
						{ start: 26, end: 26, label: '广东', color: '#1279F4' },
						{ start: 27, end: 27, label: '青海', color: '#0c4fc2' },
						{ start: 28, end: 28, label: '西藏', color: '#0c4ca0' },
						{ start: 29, end: 29, label: '四川', color: '#0c4fc2' },
						{ start: 30, end: 30, label: '宁夏', color: '#0c4b9f' },
						{ start: 31, end: 31, label: '海南', color: '#0d4ea4' },
						{ start: 32, end: 32, label: '台湾', color: '#1c5299' },
						{ start: 33, end: 33, label: '香港', color: '#1B5AF4' },
						{ start: 34, end: 34, label: '澳门', color: '#1B5AF4' },
					],
				}, //各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称；color：自定义颜色值；名字与json对应，（start: 1,  end: 1）是data数组的key值
			}

			myChart.on('click', function (param) {
				//地图省份点击事件
				console.log(param, param.name)
			})
			myChart.setOption(chinaMap)
			window.addEventListener('resize', function () {
				myChart.resize()
			})
		},
	},
}
</script>
<style lang="less" scoped>
@import '../../style/base.css';
#dataMapecharts {
	width: 85%;
	margin: 0 auto;
	height: 550px;
}
</style>
