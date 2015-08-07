var openDeleteDialog = function(sid) {
	$("#deleteDialog").dialog({
		modal: true,
		resizable:false,
		dialogClass: 'jquery-ui-dialog-alert',
		title: "削除ダイアログ",
		buttons: {
			'確定': function() {
				deleteGoodsTableSid(sid);
				$(this).dialog( 'close' );
			},
			'キャンセル': function() {
				$(this).dialog( 'close' );
			}
		}
	})
}

var openDeleteAllDialog = function(sid) {
	$("#deleteDialog").dialog({
		modal: true,
		resizable:false,
		dialogClass: 'jquery-ui-dialog-alert',
		title: "全削除ダイアログ",
		buttons: {
			'確定': function() {
				deleteAllGoodsTblObj();
				$(this).dialog( 'close' );
			},
			'キャンセル': function() {
				$(this).dialog( 'close' );
			}
		}
	})
}

var openDeleteDetailDialog = function(sid) {
	$("#deleteDialog").dialog({
		modal: true,
		resizable:false,
		title: "削除ダイアログ",
		buttons: {
			'確定': function() {
				deleteGoodsTableDetailSid(sid);
				$(this).dialog( 'close' );
			},
			'キャンセル': function() {
				$(this).dialog( 'close' );
			}
		}
	})
}
