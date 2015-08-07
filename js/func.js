var viewModel = {
	// 初期定義
	db:openDatabase('rentalbox_mng', '1', 'rentalbox_mng', 2*1024*1024),
	storage: localStorage,
	//count: 0,
	nowPage: ko.observable(1),
	rows: ko.observable(0),
	maxPage: ko.observable(1),
	// 一覧ページ
	tableItems: ko.observableArray([]),
	tableData: [],
	// 詳細ページ
	tableDetailItems :{
		sid:ko.observable(),
		id:ko.observable(),
		goods:ko.observable(),
		item:ko.observable(),
		stock:ko.observable(),
		price:ko.observable(),
		salesDate:ko.observable(),
		dispDate:ko.observable(),
	},
	detailData: [],
	sumItems:{
		sumStock:ko.observable(),
		sumPrice:ko.observable(),
		sumAmount:ko.observable(),
	},
	sumYearItems :ko.observableArray([]),
	sumYearData: [],
	sumMonthItems :ko.observableArray([]),
	sumMonthData: [],
	sumItemItems: ko.observableArray([]),
	sumItemData: [],
};

function Initialization(){
	// goods_tblの作成
	createGoodsTable();
	var sid = viewModel.storage.getItem('detailSid');
	getGoodsTableDetailObj(sid);
	// 合計の表示
	getSumObj();
	// 日付設定
	setDatepicker();
}

var setDatepicker = function () {
	$("#datepickerSalesDate").datepicker({
		onSelect: function(dateText, inst){
			jsDetailSalesDate(viewModel.tableDetailItems.sid(), dateText);
		}
	});

	$("#datepickerDispDate").datepicker({
		onSelect: function(dateText, inst){
			jsDetailDispDate(viewModel.tableDetailItems.sid(), dateText);
		}
	});
}

var nextPage = function() {
	if(viewModel.maxPage() <= viewModel.nowPage()) {
		return;
	}
	viewModel.nowPage(viewModel.nowPage() + 1);
	getRows();
	getGoodsTableCount();
	getGoodsTableObj();
}
var prevPage = function() {
	if(1 == viewModel.nowPage()) {
		return;
	}
	viewModel.nowPage(viewModel.nowPage() - 1);
	getRows();
	getGoodsTableCount();
	getGoodsTableObj();
}

var getRows = function() {
	if(1 == viewModel.nowPage()) {
		viewModel.rows(0);
	} else {
		viewModel.rows((viewModel.nowPage() - 1) * 10 + 1);
	}
}

// 更新系
var jsStock = function(sid, stock) {
	var selectStock = $('#stock' + stock).val();
	// ヴァリデーション（空）
	if(isEmpty(selectStock)){
		updateGoodsTblStock(sid, selectStock);
		getGoodsTableObj();
		return;
	}
	// ヴァリデーション（数値）
	if(isNumber(selectStock)){
		return;
	}
	updateGoodsTblStock(sid, selectStock);
	getGoodsTableObj();
}
var jsDetailStock = function(sid) {
	var selectStock = $('#stockDetail').val();
	// ヴァリデーション（空）
	if(isEmpty(selectStock)){
		updateGoodsTblStock(sid, selectStock);
		getGoodsTableDetailObj(sid);
		return;
	}
	// ヴァリデーション（数値）
	if(isNumber(selectStock)){
		return;
	}
	updateGoodsTblStock(sid, selectStock);
	getGoodsTableDetailObj(sid);
}

var jsPrice = function(sid, price) {
	var selectPrice = $('#price' + price).val();
	if(isEmpty(selectPrice)){
		updateGoodsTblPrice(sid, selectPrice);
		getGoodsTableObj();
		return;
	}
	if(isNumber(selectPrice)){
		return;
	}
	updateGoodsTblPrice(sid, selectPrice);
	getGoodsTableObj();
}
var jsDetailPrice = function(sid) {
	var selectPrice = $('#priceDetail').val();
	if(isEmpty(selectPrice)){
		updateGoodsTblPrice(sid, selectPrice);
		getGoodsTableDetailObj(sid);
		return;
	}
	if(isNumber(selectPrice)){
		return;
	}
	updateGoodsTblPrice(sid, selectPrice);
	getGoodsTableDetailObj(sid);
}

var jsId = function(sid, id) {
	var selectId = $('#id' + id).val();
	updateGoodsTableId(sid, selectId);
	getGoodsTableObj();
}
var jsDetailId = function(sid) {
	var selectId = $("#idDetail").val();
	updateGoodsTableId(sid, selectId);
	getGoodsTableDetailObj(sid);
}

var jsItem = function(sid, item) {
	var selectItem = $('#item' + item).val();
	updateGoodsTblItem(sid, selectItem);
	getGoodsTableObj();
}
var jsDetailItem = function(sid) {
	var selectItem = $('#itemDetail').val();
	updateGoodsTblItem(sid, selectItem);
	getGoodsTableDetailObj(sid);
}

var jsGoods = function(sid, goods) {
	var selectGoods = $('#goods' + goods).val();
	updateGoodsTblGoods(sid, selectGoods);
	getGoodsTableObj();
}
var jsDetailGoods = function(sid) {
	var selectGoods = $('#goodsDetail').val();
	updateGoodsTblGoods(sid, selectGoods);
	getGoodsTableDetailObj(sid);
}

var jsAmount = function(sid, amount) {
	var selectAmount = $('#amount' + amount).val();
	updateGoodsTblAmount(sid, selectAmount);
	getGoodsTableObj();
}
var jsDetailAmount = function(sid) {
	var selectAmount = $('#amountDetail').val();
	updateGoodsTblAmount(sid, selectAmount);
	getGoodsTableDetailObj(sid);
}

var jsSalesDate = function(sid, salesDate) {
	var selectSalesDate = $('#salesDate' + salesDate).val();
	updateGoodsTblSalesDate(sid, selectSalesDate);
	getGoodsTableObj();
}
var jsDetailSalesDate = function(sid, dateText) {
	updateGoodsTblSalesDate(sid, dateText);
	getGoodsTableDetailObj(sid);
}

var jsDispDate = function(sid, dispDate) {
	var SelectDispDate = $('#dispDate' + dispDate).val();
	updateGoodsTblDispDate(sid, SelectDispDate);
}
var jsDetailDispDate = function(sid, dateText) {
	updateGoodsTblDispDate(sid, dateText);
	getGoodsTableDetailObj(sid);
}

var updateItemObj = function(sid) {
	openItemObjDialog(sid);
}

var updateItemDeleteFlg = function(sid) {
	openItemDeleteFlgDialog(sid);
}

var deleteAllObj = function() {
	openDeleteAllDialog();
}