
var createGoodsTable = function() {
	viewModel.db.transaction(function(tx) {
		// 商品テーブルの作成
		var sql_create = 'create table if not exists goods_tbl' +
			'(sid integer primary key autoincrement, id text, goods text, item integer, stock integer, price integer, amount integer, salesDate text, dispDate text, deleteFlg integer default 0, update_tstamp CURRENT_TIMESTAMP)';
		tx.executeSql(sql_create);

		getGoodsTableCount();
		getGoodsTableObj();
	});
}

var deleteAllGoodsTblObj = function() {
	viewModel.db.transaction(function(tx) {
		// 商品テーブルの作成
		var sql_drop = 'drop table goods_tbl';
		tx.executeSql(sql_drop);

		var sql_create = 'create table if not exists goods_tbl' +
			'(sid integer primary key autoincrement, id text, goods text, item integer, stock integer, price integer, amount integer, salesDate text, dispDate text, deleteFlg integer default 0, update_tstamp CURRENT_TIMESTAMP)';
		tx.executeSql(sql_create);

		viewModel.rows(0);
		getGoodsTableCount();
		getGoodsTableObj();
		viewModel.nowPage(1);
	});
}

var getDetailObj = function() {
	viewModel.db.transaction(function(tx) {
		var sql_insert = "insert into goods_tbl (id) values('')";
		tx.executeSql(sql_insert);

		viewModel.db.transaction(function(tx) {
			var sql_select = 'select * from goods_tbl where ROWID = last_insert_rowid()';
			tx.executeSql(sql_select, [], function(tx,rs) {
				var sid = rs.rows.item(0).sid;
				viewModel.storage.setItem('detailSid', sid);
				getGoodsTableDetailObj(sid);
			}, null);
		});
	});
}

var getSumObj = function() {

	// 全合計
	getSumAllObj();

	// アイテム別
	getSumItemObj();

	// 期間別
	getSumYearObj();
	getSumMonthObj();
}

var getSumAllObj = function() {
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select sum(stock) as sumStock,sum(price) as sumPrice,sum(price) - sum(stock) as sumAmount from goods_tbl';
		tx.executeSql(sql_select, [], function(tx,rs) {
			viewModel.sumItems.sumStock(rs.rows.item(0).sumStock);
			viewModel.sumItems.sumPrice(rs.rows.item(0).sumPrice);
			viewModel.sumItems.sumAmount(rs.rows.item(0).sumAmount);
		}, null);
	});
}

var getSumItemObj = function() {
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select item,sum(stock) as sumStock,sum(price) as sumPrice,sum(price) - sum(stock) as sumAmount from goods_tbl where deleteFlg=0 group by item';
		tx.executeSql(sql_select, [], function(tx,rs) {
			for(var i=0; i<rs.rows.length; i++) {
				viewModel.sumItemData[i] = rs.rows.item(i);
			}
			viewModel.sumItemItems(viewModel.sumItemData);
		}, null);
	});
}

var getSumMonthObj = function() {
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select substr(dispDate,0,5) || substr(dispDate,6,2) as sumDate ,sum(stock) as sumStock, sum(price) as sumPrice,sum(price) - sum(stock) as sumAmount from goods_tbl where deleteFlg=0 group by sumDate';
		tx.executeSql(sql_select, [], function(tx,rs) {
			for(var i=0; i<rs.rows.length; i++) {
				viewModel.sumMonthData[i] = rs.rows.item(i);
			}
			viewModel.sumMonthItems(viewModel.sumMonthData);
		}, null);
	});
}

var getSumYearObj = function() {
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select substr(dispDate,0,5) as sumDate ,sum(stock) as sumStock, sum(price) as sumPrice,sum(price) - sum(stock) as sumAmount from goods_tbl where deleteFlg=0 group by sumDate';
		tx.executeSql(sql_select, [], function(tx,rs) {
			for(var i=0; i<rs.rows.length; i++) {
				viewModel.sumYearData[i] = rs.rows.item(i);
			}
			viewModel.sumYearItems(viewModel.sumYearData);
		}, null);
	});
}

var createGoodsTableRow = function() {
	viewModel.db.transaction(function(tx) {
		var sql_insert = "insert into goods_tbl (id) values('')";
		tx.executeSql(sql_insert);
		getGoodsTableCount();
		getGoodsTableObj();
	});
}

var deleteGoodsTableSid = function(sid) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set deleteFlg=1 where sid =" + sid;
		tx.executeSql(sql_update);
		getGoodsTableCount();
		getGoodsTableObj();
	});
}

var deleteGoodsTableDetailSid = function(sid) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set deleteFlg=1 where sid =" + sid;
		tx.executeSql(sql_update);
		getGoodsTableCount();
		getGoodsTableDetailObj(sid);
	});
}

var updateGoodsTableId = function(sid, selectId) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set id='" + selectId + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblGoods = function(sid, selectGoods) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set goods='" + selectGoods + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblItem = function(sid, selectItem) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set item='" + selectItem + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblStock = function(sid, selectStock) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set stock='" + selectStock + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblPrice = function(sid, selectPrice) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set price='" + selectPrice + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblAmount = function(sid, amount) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set amount='" + selectAmount + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblSalesDate = function(sid, selectSalesDate) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set salesDate='" + selectSalesDate + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

var updateGoodsTblDispDate = function(sid, selectDispDate) {
	viewModel.db.transaction(function(tx) {
		var sql_update = "update goods_tbl set dispDate='" + selectDispDate + "' where sid=" + sid;
		tx.executeSql(sql_update);
	});
}

// 表示系
var getGoodsTableObj = function() {
	viewModel.tableData = Array();
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select * from goods_tbl where deleteFlg=0 order by sid asc limit ' + viewModel.rows() + ',10';
		tx.executeSql(sql_select, [], function(tx,rs) {
			for(var i=0; i<rs.rows.length; i++) {
				viewModel.tableData[i] = rs.rows.item(i);
			}
			viewModel.tableItems(viewModel.tableData);
		}, null);
	});
}

var getGoodsTableDetailObj = function(sid) {
	viewModel.storage.setItem('detailSid', sid);
	viewModel.detailData = Array();
	viewModel.db.transaction(function(tx) {
		var sql_select = 'select * from goods_tbl where deleteFlg=0 and sid=' + sid;
		tx.executeSql(sql_select, [], function(tx,rs) {
			viewModel.tableDetailItems.sid(rs.rows.item(0).sid);
			viewModel.tableDetailItems.id(rs.rows.item(0).id);
			viewModel.tableDetailItems.goods(rs.rows.item(0).goods);
			viewModel.tableDetailItems.item(rs.rows.item(0).item);
			viewModel.tableDetailItems.stock(rs.rows.item(0).stock);
			viewModel.tableDetailItems.price(rs.rows.item(0).price);
			viewModel.tableDetailItems.salesDate(rs.rows.item(0).salesDate);
			viewModel.tableDetailItems.dispDate(rs.rows.item(0).dispDate);
		}, null);
	});
}

var getGoodsTableCount = function() {
	viewModel.db.transaction(function(tx) {
		var sql_count = 'select * from goods_tbl where deleteFlg=0';
		tx.executeSql(sql_count, [], function(tx,rs) {
			if(0 == rs.rows.length) {
				viewModel.maxPage(1);
			} else {
				viewModel.maxPage(Math.ceil(rs.rows.length / 10));
			}
		}, null);
	});
}