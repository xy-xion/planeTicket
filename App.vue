<template>
	<div id='app' class='wrapContent'>
		<div class='leftContent'>
			<div class='chooseDateContent'>
				<div class='chooseType' @click='onShowChooseType'>{{chooseType[chooseType_index].name}} ></div>
				<div class='dropContent' v-show='isShowChooseType'>
					<p v-for='(item,index) in chooseType' :key='item.id' @click='onChooseDate(index)'><a>{{item.name}}</a></p>
				</div>
				<div class='chooseDate'>2021.04.10-2021.10.10</div>
			</div>
			<div class='wrapEchart'>
				<h2 class='storeProgress'>随心飞数据</h2>
				<div class='leftEchartContent' id='echartLeft'></div>
			</div>
			<div class='wrapEchartPie'>
				<h3>各活动成交量占比</h3>
				<div class='echartPieContent' id='echartPie'></div>
				<div class='echartBarContent' id='echartBar'></div>
			</div>
		</div>
		<div class='midContent'>
			<div class='header'></div>
			<div class='topContent'>
				<ul class='topContentUl'>
					<li v-for='(item, index) in resetTopContentData' :key='index'>
						<div class='cur_icon' :class='item.iconClass'></div>
						<div class='textList'>
							<p class='cur_text'>{{ item.text }}</p>
							<p class='dataTxt'>{{ item.data }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class='mapWrap'>
				<div class='bigTitle'>全国成交量分布</div>
				<ChinaMap />
				<div class='midBottomList' id='echartsBottomList'></div>
			</div>
		</div>

		<div class='rightContent'>
			<div class='cur_date'>
				<p class='curDateTxt'>{{curDate}}</p>
			</div>
			<div class='rightWrapContent'>
				<h1>各活动交易数据</h1>
				<ul class='dealDataList'>
					<li v-for='(item, index) in rightTabData' :key='item.id' @click='onClickTab(index)' :class='{ activeLi: rightTab_index == index }'>{{ item.title
						}}</li>
				</ul>
				<!-- <ul class='storeAverageDataList'>
					<li v-for='(item,index) in storeAverageData' :key='index' :class='renderStoreAverageClass(index)'>{{item.data}}</li>
				</ul> -->
				<!-- <div class='storeAverageTitle'>
					<div class='storeAverage_item' v-for='(item,index) in storeAverageTitle' :key='index'>
						<p>{{item.text}}</p>
					</div>
				</div> -->
				<div class='rightEchartContent' id='echartRight'></div>
				<div class='rightBottomContent'>
					<ul class='tableTitleList'>
						<li v-for='(item,index) in rightBottomListTable' :key='index'>{{item.text}}</li>
					</ul>
					<ul class='tableDataList'>
						<li v-for='(item,index) in resetRightBottomListData' :key='index'>
							<div class='listTit'>{{item.title}}</div>
							<div class='numList'>
								<p v-for='(num_item,num_index) in item.objArr' :key='num_index' :class="'tableNum'+num_index">{{num_item}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChinaMap from './components/chinaMap/index.vue'
import { dateFormat } from './utils/methods'
export default {
	name: 'App',
	components: {
		ChinaMap,
	},
	data() {
		return {
			curDate: dateFormat('YYYY-mm-dd HH:MM:SS', new Date()),
			chooseType: [
				{ name: '按日期', id: 1 }, { name: '按年份', id: 2 }
			],
			chooseType_index: 0,
			isShowChooseType: false,
			renderData: {
				topContentData: [
					{ data: 165000 }, { data: '85%' }, { data: 5000 }, { data: '69.7%' },
				],
				rightBottomListData: [
					{
						title: '华东',
						cityNum: 28,
						storeNum: 101322,
						auctionNum: 11238,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '西南',
						cityNum: 42,
						storeNum: 81234,
						auctionNum: 12328,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '华中',
						cityNum: 62212,
						storeNum: 11222,
						auctionNum: 56111,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '华北',
						cityNum: 22322,
						storeNum: 11232,
						auctionNum: 12518,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '陕西',
						cityNum: 23162,
						storeNum: 11232,
						auctionNum: 31118,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '广东',
						cityNum: 61232,
						storeNum: 12322,
						auctionNum: 21328,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '四川',
						cityNum: 31162,
						storeNum: 12332,
						auctionNum: 21118,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '北区',
						cityNum: 42322,
						storeNum: 13232,
						auctionNum: 21218,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '广西',
						cityNum: 32322,
						storeNum: 12,
						auctionNum:12338,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '江西',
						cityNum: 23232,
						storeNum: 12132,
						auctionNum: 32328,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					},
					{
						title: '西北',
						cityNum: 21232,
						storeNum: 12312,
						auctionNum: 21218,
						dealNum: '67%',
						alreadyAuctionNum: '71%',
						turnoverRateNum: '15.3%'
					}
				],
				legendData: [
					{ value: 355665, name: '周末随心飞', percentage: '87%' },
					{ value: 296665, name: '早晚随心飞', percentage: '7%' },
					{ value: 108600, name: '前程万里', percentage: '6%' },
				],
				// 各模式成交量
				patternTurnoverTitle: ['华东', '西南', '华中', '华北', '陕西', '广东', '四川', '北区', '广西', '江西', '西北'],
				patternTurnoverData: [18555, 4477, 2344, 4232, 6555, 3977, 9844, 7232, 3555, 12377, 4344],
				// 广汇店面展示进度
				storeProgressNum: [
					{ num: 355665, name: '周末随心飞成交量' }, { num: 296665, name: '早晚随心飞成交量' }, { num: '78%', name: '机票兑换率' }
				],
			},
			rightTabData: [
				{ title: '周末随心飞', id: 0 }, { title: '早晚随心飞', id: 1 }, { title: '前程万里', id: 2 }
			],
			rightTab_index: 0,
			rightBottomListTable: [
				{ text: '区域' }, { text: '城市数' }, { text: '成交量' }, { text: '出行量' }, { text: '平均客座率' },
				{ text: '机票兑换率' }, { text: '未绑定率' }
			],
		}
	},
	computed: {
		resetStoreProgressNum() {
			let arr = []
			for (let key in this.renderData.storeProgressNum) {
				arr = [...arr, { data: this.renderData.storeProgressNum[key] }]
			}
			return arr
		},
		renderStoreAverageClass() {
			return function (index) {
				return `storeAverageNum${index}`
			}
		},
		resetTopContentData() {
			const arrTxt = ['各活动总成交量', '机票兑换率', '各省均成交量', '平均客座率'],
				arr = this.renderData.topContentData.map((item, index) => {
					return {
						...item,
						iconClass: `top_icon${index + 1}`,
						text: arrTxt[index],
					}
				})
			return arr
		},
		storeAverageData() {
			let arr = [
				{ name: '活动成交量', data: 48233 },
				{ name: '出行量', data: 20246 },
				{ name: '机票兑换率', data: '74.6%' },
				{ name: '平均客座率', data: '69.5%' },
				{ name: '未绑定率', data: '19.9%' },
			]
			return arr
		},
		resetRightBottomListData() {
			if (
				!this.renderData.rightBottomListData ||
				this.renderData.rightBottomListData.length == 0
			)
				return []
			const data = this.renderData.rightBottomListData,
				reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g'),
				arr = data.map((item) => {
					let objArr = []
					for (let key in item) {
						if (reg.test(item[key]) == false) {
							objArr = [...objArr, item[key]]
						}
					}
					return { ...item, objArr }
				})
			return arr
		},
		// 重构各活动交易数据
		rightEchartSeriesData() {
			let obj = {
					name: '活动成交量',
					type: 'bar',
					barGap: '0%', //  活动成交量和出行量柱子之间的间距
					barWidth: 14, // 柱子宽度
					// barCategoryGap:15,
					yAxisIndex: 2,
					label: {
						//  柱状图上面的文字设置
						show: true,
				position: 'top',
				color: '#ffffff',
				fontSize: 12,
					}
				},
				renderData = [
					{
						title: '周末随心飞数据',
						arr: [
							{ dataTitle: '活动成交量', data: [29400, 67654, 49770, 18432, 49556, 12767, 11856, 69762, 23836, 61820, 12864, 12953] },
							{ dataTitle: '出行量', data: [22500, 21454, 40670, 21492, 42576, 44667, 32956, 31862, 41839, 51880, 21764, 31853] },
							{ dataTitle: '机票兑换率', data: [72, 69, 70, 60, 67, 75, 66, 69,76, 63, 78, 43, 49] },
							{ dataTitle: '平均客座率', data: [] },
							{ dataTitle: '未绑定率', data: [] }
						]
					},
					{
						title: '早晚随心飞数据',
						arr: [
							{ dataTitle: '活动成交量', data: [51640, 21754, 30871, 31472, 41586, 41867, 21756, 21732, 51826, 12810, 41824, 12853] },
							{ dataTitle: '出行量', data: [21500, 21454, 23670, 23492, 12576, 21667, 12956, 31862, 12839, 22880, 21764, 12853] },
							{ dataTitle: '机票兑换率', data: [62, 46, 73, 62, 55, 71, 45, 75, 72, 67, 72, 49, 51] },
							{ dataTitle: '平均客座率', data: [] },
							{ dataTitle: '未绑定率', data: [] }
						]
					},
					{
						title: '前程万里飞数据',
						arr: [
							{ dataTitle: '活动成交量', data: [31440, 31514, 42771, 53172, 31506, 41717, 50706, 41702, 50726, 42710, 51624, 31653] },
							{ dataTitle: '出行量', data: [11500, 11454, 11670, 11492, 11576, 12667, 11956, 11862, 18139, 11880, 11764, 11853] },
							{ dataTitle: '机票兑换率', data: [71, 53, 67, 64, 65, 71, 50, 61, 62, 52, 71, 46, 59] },
							{ dataTitle: '平均客座率', data: [] },
							{ dataTitle: '未绑定率', data: [] }
						]
					},

				],
				resetRenderData = renderData[this.rightTab_index].arr.map(item => {
					let formatter = (item.dataTitle == '机票兑换率' || item.dataTitle == '未绑定率' ? { formatter: '{c}%' } : ''),
					yAxisIndex= (item.dataTitle == '机票兑换率' || item.dataTitle == '未绑定率' ? 0 : 2)
					return {
						...obj,
						data: item.data,
						name: item.dataTitle,
						type: item.dataTitle == '机票兑换率' || item.dataTitle == '未绑定率' ? 'line' : 'bar',
						label:{
						...obj.label,
						...formatter
						},
						yAxisIndex
					}
				})
			return resetRenderData
		},
		// 页面右边各活动交易数据
		resetRightEchartsData() {
			const arr = [
				{
					dataTitle: '周末随心飞数据',
					legend: [
						{ name: '活动成交量', data: 355665 },
						{ name: '出行量', data: 201246 },
						{ name: '机票兑换率', data: '74.6%' },
						{ name: '平均客座率', data: '69.5%' },
						{ name: '未绑定率', data: '19.9%' },
					]
				},
				{
					dataTitle: '早晚随心飞数据',
					legend: [
						{ name: '活动成交量', data: 178233 },
						{ name: '出行量', data: 145446 },
						{ name: '机票兑换率', data: '72.6%' },
						{ name: '平均客座率', data: '65.5%' },
						{ name: '未绑定率', data: '16.9%' },
					]
				},
				{
					dataTitle: '前程万里数据',
					legend: [
						{ name: '活动成交量', data: 108431 },
						{ name: '出行量', data: 108563 },
						{ name: '机票兑换率', data: '72.6%' },
						{ name: '平均客座率', data: '65.5%' },
						{ name: '未绑定率', data: '27.9%' },
					]
				}
			]
			return arr
		}
	},
	mounted() {
		this.runMidContentEcharts()
		this.runRightContentEcharts()
		setTimeout(() => {
			this.runLeftContentEcharts()
		})
		this.runLeftEchartPie()
		this.runLeftEchartBar()
		setInterval(() => {
			this.curDate = dateFormat('YYYY-mm-dd HH:MM:SS', new Date()), 1000
		})
	},
	methods: {
		onShowChooseType() {
			this.isShowChooseType = true
		},
		onChooseDate(index) {
			this.chooseType_index = index
			this.isShowChooseType = false
		},
		runEcharts(id = '', data = {}) {
			let myChart = this.$echarts.init(id),
				option = {
					color: '',
					tooltip: {
						trigger: 'axis',
						axisPointer: { type: 'cross' },
					},
					grid: {
						// right: '20%',
					},
					dataZoom: [
					],
					toolbox: {
						// 是否打开工具视图（数据视图，还原，保存为图片））
						feature: {
							dataView: { show: false, readOnly: false },
							restore: { show: false },
							saveAsImage: { show: false },
						},
					},
					legend: {
						data: [],
						textStyle: {
							color: '#ffffff',
						},
					},
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true,
								show: false,
							},
							nameTextStyle: {
								lineHeight: 56,
							},
							data: ['华东', '西南', '华中', '华北', '陕西', '广东', '四川', '北区', '广西', '江西', '西北'],
							axisPointer: {
								z: 1,
								label: {
									show: false, // X轴指示器的文本标签弹窗是否显示
								},
							},
							axisLabel: {
								show: true,
								margin: 13,
								textStyle: {
									fontSize: '14',
									fontWeight: 'bold',
									color: '#ffffff',
								},
							},
							axisLine: {
								lineStyle: {
									color: '#ffffff', //x轴轴线颜色
								},
							},
						},
					],
					yAxis: [
						// y轴成交率
						{
							// y 轴成交率
							type: 'value',
							name: '',
							min: 0,
							max: 100,
							position: 'right',
							axisLine: {
								show: false,
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.2)',
								},
							},
							splitLine: {
								show: false,
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.2)',
								},
							},
							axisLabel: { formatter: '{value} %' },
							axisTick: {
								show: false, //y轴坐标点消失
							},
							interval: 25,
						},
						{
							type: '',
							name: '',
							min: 0,
							max: '100%',
							position: 'right',
							offset: 80,
							axisLine: {
								show: false,
								lineStyle: {
									color: '',
								},
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.2)',
								},
							},
							axisLabel: {
								formatter: '',
							},
						},
						{
							type: 'value',
							data: [],
							name: '',
							min: 0,
							max: 120000,
							position: 'left',
							axisLine: {
								show: false,
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.2)',
								},
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.2)',
								},
							},
							axisLabel: {
								formatter: '{value}',
							},
							splitNumber: 4,
						},
					],
					series: [
						{
							name: '周末随心飞成交量',
							type: 'bar',
							data: [
								40450, 65544, 70540, 14532, 15556, 17467, 83256, 96232, 73326, 82320, 76324, 95332,
							],
							barGap: '0%', // 上拍台次和成交量柱子之间的间距
							barWidth: 25, // 柱子宽度
							yAxisIndex: 2,
							label: {
								//  柱状图上面的文字设置
								show: true,
								position: 'top',
								color: '#ffffff',
								fontSize: 12,
							},
						},
						{
							name: '早晚随心飞成交量',
							type: 'bar',
							yAxisIndex: 2,
							data: [12236, 52329, 42329, 22326, 21327, 53210, 17325, 15328, 14732, 12832, 56232, 73332],
							barWidth: 25,
							label: {
								//  柱状图上面的文字设置
								show: true,
								position: 'top',
								color: '#ffffff',
								fontSize: 12,
							},
						},
						{
							name: '平均客座率',
							type: 'line',
							yAxisIndex: 0,
							data: [62, 65, 80, 60, 67, 65, 60, 65, 76, 57, 78, 63, 59],
							label: {
								//  柱状图上面的文字设置
								show: true,
								position: 'top',
								color: '#ffffff',
								fontSize: 12,
								formatter: '{c}%',
							},
						},
					],
				}
			if (option && typeof option === 'object') {
				let newData = { ...option, ...data }
				myChart.setOption(newData, true)
				window.addEventListener('resize', function () {
					myChart.resize()
				})
			}
		},
		// 渲染页面中间的图表数据
		runMidContentEcharts() {
			let chartDom = document.getElementById('echartsBottomList'),
				color = ['#449EFF', '#58E8AD', '#FF822D'], // 柱子背景颜色
				option = {
					legend: {
						textStyle: {
							color: '#ffffff',
						},
						right: 80,
						itemGap: 30
					},
					color,
				}
			this.runEcharts(chartDom, option)
		},
		// 渲染页面左边的图表数据
		runLeftContentEcharts() {
			let a = 1
			let leftEchartDom = document.getElementById('echartLeft'),
				defauleLabel = {
					//  柱状图上面的文字设置
					show: true,
					position: 'top',
					color: '#ffffff',
					fontSize: 14,
				},
				defaultObj = {
					legend: {
						// padding: [0, 0, 90, 0],
						textStyle: {
							color: '#ffffff',
							rich: {
								a: {
									fontSize: 26,
									color: '#66fbfc',
									fontWeight: 'bold',
									align: 'center',
									lineHeight: 30,
									padding: [0, 0, -10, -26]
								},
								b: {
									fontSize: 11,
									padding: [28, 0, 0, 0]
								}
							}
						},
						data: [
							{ name: '周末随心飞成交量' }, { name: '早晚随心飞成交量' }, { name: '机票兑换率' }
						],
						itemGap: 65,
						formatter: (name, index) => {
							let obj = {}
							this.renderData.storeProgressNum.forEach(item => {
								if (item.name == name) {
									obj = item
								}
							})
							return `{a|${obj.num}}` + '\n' + `{b|${obj.name}}`
						}
					},
					grid: {
						top: 90,
						// bottom: 54
					},
					color: ['#0326CF', '#407CFF', '#FF822D'], // 柱子背景颜色
					series: [
						{
							name: '周末随心飞成交量',
							type: 'bar',
							data: [
								69400, 56654, 67770, 43332, 51556, 51267, 61256, 45962, 60836, 67820, 69864, 81953,
							],
							barGap: '0%', // 上拍台次和成交量柱子之间的间距
							barWidth: 13, // 柱子宽度
							yAxisIndex: 2,
							label: {
								//  柱状图上面的文字设置
								...defauleLabel,
							},
						},
						{
							name: '早晚随心飞成交量',
							type: 'bar',
							yAxisIndex: 2,
							data: [13326, 31129, 32329, 22326, 43417, 35610, 34375, 16758, 34547, 35528, 56776, 93767],
							barWidth: 13,
							label: {
								//  柱状图上面的文字设置
								...defauleLabel,
							},
						},
						{
							name: '机票兑换率',
							type: 'line',
							yAxisIndex: 0,
							data: [82, 75, 82, 68, 67, 75, 70, 75, 76, 77, 78, 73, 89],
							label: {
								//  柱状图上面的文字设置
								...defauleLabel,
								formatter: '{c}%',
							},
						},
					],
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true,
								show: false,
							},
							nameTextStyle: {
								lineHeight: 56,
							},
							data: ['华东', '西南', '华中', '华北', '陕西', '广东', '四川', '北区', '广西', '江西', '西北'],
							axisPointer: {
								z: 1,
								label: {
									show: false, // X轴指示器的文本标签弹窗是否显示
								},
							},
							axisLabel: {
								show: true,
								margin: 13,
								textStyle: {
									fontSize: '12',
									fontWeight: 'bold',
									color: '#ffffff',
								},
							},
							axisLine: {
								lineStyle: {
									color: '#ffffff', //x轴轴线颜色
								},
							},
						},
					]
				}
			this.runEcharts(leftEchartDom, { ...defaultObj })
		},
		//  渲染页面左边下面的饼图
		runLeftEchartPie() {
			let leftPieDom = document.getElementById('echartPie'),
				myChart = this.$echarts.init(leftPieDom),
				color = ['#58E8AD', '#FFD764', '#FF822D'], // 柱子背景颜色
				option = {
					tooltip: {
						trigger: 'item',
					},
					color: color,
					legend: {
						top: '5%',
						textStyle: {
							color: '#ffffff',
							fontSize: 14,
							fontWeight: 'bold',
							rich: {
								a: {
									fontSize: 20,
									padding: [0, 20, 0, 30],
								},
							},
						},
						left: '40%', //图例距离左的距离
						orient: 'vertical', // 图例列表的布局朝向,纵向排列
						padding: [5, 0, 0, 20], // 设置图例与圆环图之间的距离
						itemGap: 14,
						itemWidth: 20,
						itemHeight: 20,
						itemStyle: {
							borderWidth: 'auto',
						},
						icon: 'rect', // icon的类型，这里设置为矩形
						formatter: (name) => {
							let obj = {}
							this.renderData.legendData.forEach((item) => {
								if (item.name == name) {
									obj = { value: item.value, percentage: item.percentage }
								}
							})
							return `${name}    ${obj.value}    ${obj.percentage}`
						},
					},
					graphic: [
						{
							// 设置圆环内文字始终在圆环的正中间，并且自适应
							type: 'group',
							left: '21%',
							top: '41%',
							bounding: 'raw',
							children: [
								{
									type: 'text',
									style: {
										text: 307698,
										textAlign: 'center',
										fill: '#66FBFC',
										fontSize: 26,
										fontWeight: 700,
									},
								},
							],
							textConfig: {
								origin: 'center',
							},
						},
						{
							type: 'text',
							left: '17%',
							top: '64%',
							bounding: 'all',
							x: 'center',
							y: 'center',
							style: {
								text: '成交量',
								textAlign: 'center',
								fill: '#FFFFFF',
								fontSize: 14,
								fontWeight: 700,
							},
						},
					],
					series: [
						{
							name: '各模式成交量占比',
							type: 'pie',
							radius: ['73%', '90%'],
							z: 999,
							avoidLabelOverlap: false,
							label: {
								show: false,
							},
							silent: true,
							emphasis: {
								// 高亮状态的扇区和标签样式。
								label: {
									show: true,
									fontSize: '14',
									fontWeight: 'bold',
								},
								scale: true,
								scaleSize: 2,
							},
							labelLine: {
								show: false,
							},
							data: this.renderData.legendData,
							center: ['21%', '53%'],
						},
					],
				}
			if (option && typeof option === 'object') {
				myChart.setOption(option)
				window.addEventListener('resize', function () {
					myChart.resize()
				})
			}
		},
		// 渲染页面左边最下角的柱状图
		runLeftEchartBar() {
			let echartBar = document.getElementById('echartBar'),
				myChart = this.$echarts.init(echartBar),
				color = ['#58E8AD', '#FFD764', '#FF822D'], // 柱子背景颜色
				option = {
					color,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// Use axis to trigger tooltip
							type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
						},
					},
					legend: {
						show: false,
					},
					grid: {
						left: '-3%',
						bottom: '3%',
						containLabel: true,
						height: 350,
					},
					xAxis: {
						type: 'value',
						axisLabel: {
							show: false,
						},
						splitLine: {
							show: false,
						},
						axisLine: {
							show: false,
						},
					},
					yAxis: {
						type: 'category',
						data: this.renderData.patternTurnoverTitle,
						axisLine: {
							show: false,
						},
						axisLabel: {
							align: 'left',
							textStyle: {
								color: '#fff',
							},
							margin: 89,
							formatter: (item, index) => {
								const data = this.renderData.patternTurnoverData
								return `{a|${item}}` + `{b|${data[index]}}`
							},
							rich: {
								a: {
									align: 'center',
								},
								b: {
									fontSize: 16,
									fontWeight: 'bold',
									color: '#66FBFC',
									padding: [0, 10, 0, 10],
								},
							},
						},
						splitLine: {
							show: false,
						},
						nameTextStyle: {
							color: 'none',
							fontSize: 12,
						},
					},
					series: [
						{
							name: '周末随心飞 ',
							type: 'bar',
							stack: 'total',
							label: {
								show: false,
							},
							barCategoryGap: 13,
							barWidth: 18,
							emphasis: {
								focus: 'series',
							},
							data: [34920, 13702, 23701, 52134, 52190, 21530, 24320, 21200, 49320, 12400, 34420],
						},
						{
							name: '早晚随心飞',
							type: 'bar',
							stack: 'total',
							label: {
								show: false,
							},
							emphasis: {
								focus: 'series',
							},
							data: [12220, 12232, 14401, 14434, 31190, 22230, 25310, 14334, 32190, 23320, 23210],
						},
						{
							name: '前程万里',
							type: 'bar',
							stack: 'total',
							label: {
								show: false,
							},
							emphasis: {
								focus: 'series',
							},
							data: [22320, 11182, 13291, 23234, 23290, 33210, 33210, 13234, 21190, 22130, 22110],
						},
					],
				}
			if (option && typeof option === 'object') {
				myChart.setOption(option)
				window.addEventListener('resize', function () {
					myChart.resize()
				})
			}
		},

		// 渲染页面右边的图表数据
		runRightContentEcharts() {
			let rightEchartDom = document.getElementById('echartRight'),
				arr = this.rightEchartSeriesData,
				defauleLabel = {
					//  柱状图上面的文字设置
					show: true,
					position: 'top',
					color: '#ffffff',
					fontSize: 12,
				},
				defaultObj = {
					grid: {
						top: 120,
						// bottom: 54
					},
					legend: {
						textStyle: {
							color: '#ffffff',
							fontSize: 11,
							padding: [15, 0, 35, 0],
							rich: {
								a: {
									fontSize: 20,
									color: '#66fbfc',
									fontWeight: 'bold',
									align: 'center',
									lineHeight: 30,
									padding: [23, 0, 0, -20],
								},
								b: {
									fontSize: 11,
									padding: [10, 0, 0, -2],
									align: 'center'
								}
							}
						},
						left: 15,
						itemGap: 48,
						data: [
							{ name: '活动成交量' }, { name: '出行量' }, { name: '机票兑换率' },
							{ name: '平均客座率', icon: 'none' }, { name: '未绑定率', icon: 'none' }
						],
						formatter: (name, index) => {
							let obj = {}
							this.resetRightEchartsData[this.rightTab_index].legend.forEach(item => {
								if (item.name == name) {
									obj = item
								}
							})
							return `{a|${obj.data}}` + '\n' + `{b|${obj.name}}`
						}
					},

					color: ['#0326CF', '#407CFF', '#FF822D'], // 柱子背景颜色
					series: this.rightEchartSeriesData,
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true,
								show: false,
							},
							nameTextStyle: {
								lineHeight: 56,
							},
							data: ['华东', '西南', '华中', '华北', '陕西', '广东', '四川', '北区', '广西', '江西', '西北'],
							axisPointer: {
								z: 1,
								label: {
									show: false, // X轴指示器的文本标签弹窗是否显示
								},
							},
							axisLabel: {
								show: true,
								margin: 13,
								textStyle: {
									fontSize: '12',
									fontWeight: 'bold',
									color: '#ffffff',
								},
							},
							axisLine: {
								lineStyle: {
									color: '#ffffff', //x轴轴线颜色
								},
							},
						},
					]
				}
			this.runEcharts(rightEchartDom, { ...defaultObj })
		},
		onClickTab(index) {
			this.rightTab_index = index
			this.runRightContentEcharts()
		},
	},
}
</script>
<style lang="less" scoped>
@import './style/base.css';
@import './font/font.css';

.wrapContent {
	display: flex;
	background: url('./assets/bigbg.png') repeat-y;
	background-size: cover;
	flex-direction: row;
	padding-bottom: 85px;
	.leftContent {
		flex: 1;
		margin-left: 16px;
		margin-top: 25px;
		.chooseDateContent {
			height: 46px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			position: relative;
			.dropContent {
				position: absolute;
				left: 0;
				top: 46px;
				color: #ffffff;
				background: rgba(19, 19, 19, 0.6);
				width: 29%;
				padding: 5px 0;
				border: 1px solid #66fbfc;
				p {
					text-align: center;
					a {
						display: block;
						padding: 6px 0;
						cursor: pointer;
						color: #ffffff;
					}
					a:hover {
						color: #66fbfc;
					}
				}
			}
			.chooseType {
				width: 30%;
				background: url('./assets/chooseType.png') no-repeat;
				background-size: 99.9% 99.9%;
				height: 46px;
				line-height: 46px;
				margin-right: 10px;
				text-align: center;
				font-size: 15px;
				color: #ffffff;
				cursor: pointer;
			}
			.chooseDate {
				flex: 1;
				background: url('./assets/chooseDate.png') no-repeat;
				background-size: 99.9% 99.9%;
				height: 46px;
				line-height: 46px;
				text-align: center;
				font-size: 15px;
				color: #ffffff;
			}
		}
		.wrapEchart {
			background: url('./assets/leftContentBj.png') no-repeat 0 bottom;
			background-size: 99.9% 99.9%;
			margin-top: 10px;
			.storeProgress {
				font-size: 21px;
				font-weight: bold;
				color: #ffffff;
				text-align: center;
				padding: 18px 0 25px;
			}
			.storeNumList {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0 32px 10px 35px;
				li {
					font-size: 26px;
					font-family: 'DINPro-Bold';
					font-weight: bold;
					color: #66fbfc;
					text-align: center;
					flex: 1;
					// padding-right: 55px;
				}
			}
			.leftEchartContent {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 400px;
			}
		}
		.wrapEchartPie {
			background: url('./assets/leftEchartPie.png') no-repeat 0 bottom;
			background-size: 99.9% 99.9%;
			margin-top: 14px;
			h3 {
				font-size: 21px;
				font-weight: bold;
				color: #ffffff;
				padding: 16px 0 10px;
				text-align: center;
			}
			.echartPieContent {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 140px;
			}
		}
		.echartBarContent {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin-top: 6px;
			height: 370px;
		}
	}
	.rightContent {
		flex: 1;
		margin-right: 17px;
		.cur_date {
			height: 45px;
			margin-top: 25px;
			background: url('./assets/dateBj.png') no-repeat 0 0;
			background-size: 99.9% 99%;
			display: flex;
			align-items: center;
			justify-content: center;
			.curDateTxt {
				font-size: 15px;
				color: #ffffff;
				text-align: center;
			}
		}

		.rightWrapContent {
			width: 100%;
			// height: 100%;
			margin-top: 13px;
			background: url('./assets/rightContentBj.png') no-repeat 0 bottom;
			background-size: 100% 99.99%;
			padding-bottom: 12px;
			position: relative;
			h1 {
				font-size: 21px;
				font-weight: bold;
				color: #ffffff;
				text-align: center;
				padding: 15px 0;
			}
			.dealDataList {
				height: 34px;
				line-height: 30px;
				background: #343d5a;
				border-radius: 2px;
				margin: 0 20px;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 2px;
				li {
					flex: 1;
					text-align: center;
					color: rgba(255, 255, 255, 1);
					cursor: pointer;
					font-size: 14px;
				}
				.activeLi {
					height: 30px;
					line-height: 30px;
					background: #1a55e9;
					border-radius: 2px;
					font-weight: bold;
					color: #ffffff;
				}
			}
			.storeAverageDataList {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 30px 17px 0 19px;
				li {
					font-size: 22px;
					font-family: DINPro-Bold;
					font-weight: bold;
					color: #66fbfc;
					text-align: center;
				}
				.storeAverageNum0 {
					width: 105px;
				}
				.storeAverageNum1 {
					width: 89px;
				}
				.storeAverageNum2 {
					width: 102px;
				}
				.storeAverageNum3,
				.storeAverageNum4 {
					width: 72px;
				}
			}
			.rightEchartContent {
				// display: flex;
				// align-items: center;
				// justify-content: center;
				margin-top: 23px;
				width: 100%;
				height: 389px;
			}
			.storeAverageTitle {
				position: absolute;
				right: 5px;
				top: 166px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.storeAverage_item {
					color: #ffffff;
					font-size: 11px;
					padding-right: 15px;
				}
			}
		}
	}
	.midContent {
		width: 47%;
		display: flex;
		flex-direction: column;
		margin: 0 12px;
		height: 100%;
		.header {
			width: 100%;
			height: 58px;
			background: url('./assets/headerBj.jpg') no-repeat center 0;
			background-size: 100% 99.99%;
			margin-top: 5px;
		}
		.topContent {
			width: 100%;
			height: 110px;
			display: flex;
			margin-bottom: 12px;
			background: url('./assets/topContentBj.png') no-repeat 0 0;
			background-size: 100% 99.9%;
			margin-top: 20px;
			align-items: center;
			.topContentUl {
				display: flex;
				flex-direction: row;
				padding: 0 38px;
				justify-content: space-between;
				width: 100%;
				li {
					color: #ffffff;
					font-size: 14px;
					display: flex;
					flex-direction: row;
					// padding-right: 10px;
					.cur_icon {
						width: 66px;
						height: 72px;
						margin-right: 9px;
					}
					.textList {
						.cur_text {
							color: rgba(255, 255, 255, 1);
							font-size: 14px;
							padding-bottom: 6px;
							margin-top: 5px;
						}
						.dataTxt {
							font-family: 'DINPro-Bold';
							font-size: 30px;
							font-weight: bold;
							color: #66fbfc;
						}
					}
					.top_icon1 {
						background: url('./assets/icon/top_icon2.png') no-repeat 0 0;
						background-size: cover;
					}
					.top_icon2 {
						background: url('./assets/icon/top_icon3.png') no-repeat 0 0;
						background-size: cover;
					}
					.top_icon3 {
						background: url('./assets/icon/top_icon4.png') no-repeat 0 0;
						background-size: cover;
					}
					.top_icon4 {
						background: url('./assets/icon/top_icon5.png') no-repeat 0 0;
						background-size: cover;
					}
					.top_icon5 {
						background: url('./assets/icon/top_icon1.png') no-repeat 0 0;
						background-size: cover;
					}
				}
			}
		}
		.mapWrap {
			background: url('./assets/midContentBj.png') no-repeat 0 bottom;
			background-size: 100% 99.8%;
			position: relative;
			padding-top: 16px;
			.bigTitle {
				font-size: 28px;
				font-weight: bold;
				color: #ffffff;
				text-align: center;
				position: absolute;
				left: 50%;
				transform: translate(-50%);
				top: 25px;
			}
			.midBottomList {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: -28px;
				width: 100%;
				height: 392px;
				margin-left: 33px;
			}
			.midStoreDataWrap {
				display: flex;
				justify-content: center;
				margin-top: -25px;
				padding-bottom: 12px;
				.midStoreDataList {
					display: flex;
					flex-direction: column;
					width: 90%;
					margin-left: 17px;
					li {
						display: flex;
						flex-direction: row;
						color: #ffffff;
						padding-bottom: 6px;
						line-height: 20px;
						.title_item {
							padding-right: 30px;
							font-size: 12px;
						}
						.newTitle_item {
							font-size: 10px;
							text-align: center;
							// width: 35px;
							padding-right: 8px;
						}
						.textList {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							width: 83.5%;
							p {
								font-size: 12px;
							}
						}
						.newTextList {
							width: 85.5%;
						}
					}
				}
			}
		}
	}
	.storeDataWrap {
		display: flex;
		justify-content: center;
		margin-top: -35px;
		padding-bottom: 12px;
		.storeDataList {
			display: flex;
			flex-direction: column;
			width: 90%;
			margin-left: 17px;
			li {
				display: flex;
				flex-direction: row;
				color: #ffffff;
				padding-bottom: 10px;
				.title_item {
					padding-right: 30px;
					font-size: 12px;
				}
				.newTitle_item {
					font-size: 10px;
					text-align: center;
					// width: 35px;
					padding-right: 8px;
				}
				.textList {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					width: 83.5%;
					line-height: 32px;
					p {
						font-size: 12px;
						padding-right: 12px;
					}
				}
				.newTextList {
					width: 85.5%;
				}
			}
		}
		.newStoreDataList {
			margin-left: -29px;
			li {
				padding-bottom: 3px;
			}
		}
	}
	.rightBottomContent {
		padding: 33px 0 0 0;
		.tableTitleList {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 16px 14px;
			li {
				font-size: 11px;
				font-family: MicrosoftYaHei;
				color: #449eff;
			}
		}
		.tableDataList {
			display: flex;
			flex-direction: column;
			padding: 0 10px;
			li {
				color: #ffffff;
				display: flex;
				flex-direction: row;
				height: 37px;
				line-height: 37px;
				background: linear-gradient(
					180deg,
					rgba(251, 252, 255, 0.09) 0%,
					rgba(255, 255, 255, 0.07) 100%
				);
				margin-bottom: 6px;
				.numList {
					width: 89%;
					display: flex;
					flex-direction: row;
					font-size: 12px;
					font-weight: normal;
					// justify-content: space-between;
					margin: 0 0 0 25px;
					p {
						text-align: center;
					}
					.tableNum0 {
						width: 15%;
					}
					.tableNum1 {
						width: 17%;
					}
					.tableNum2 {
						width: 15%;
					}

					.tableNum3 {
						width: 22%;
					}
					.tableNum4 {
						width: 18%;
						margin-right: 37px;
					}
				}
				.listTit {
					font-size: 12px;
					font-weight: bolder;
					padding-left: 9px;
					// padding-right: 40px;
					text-align: left;
					// width:26px
				}
			}
		}
	}
}
#app {
}
</style>
