$(function() {

	$.get('/blocks', appendToList);			//returns blocks in json format

	$('form').on('submit', function(event) {
		event.preventDefault();				// stop form from being immediately submitted
		var form = $(this);
		var blockData = form.serialize();	// jquery: transforms form data to URL encoded notation

		$.ajax({							// use ajax to POST the serailized form input to the /blocks URL
			type: 'POST', url: '/newBlock', data: blockData
		}).done(function(blockName) {
			appendToList([blockName]);		// pass newly entered block detail, and append to list output
			form.trigger('reset');			// cleans up form text input fields
		})
	})

	$('.block-list').on('click', 'a[data-block]', function(event) {
		if(!confirm('Delete the item?')) {
			return false;
		}

		var target = $(event.currentTarget); // clicked link element	

		$.ajax({
			type: 'DELETE', url: '/blocks/' + target.data('block')  // reads block name from link data-block attribute
		}).done(function() {
			target.parents('li').remove();	// Remove li element containing the link						
		})
	})


	function appendToList(blocks) {
		var list = [];
		var content, block;

		for (var i in blocks) {
			block = blocks[i];
			content = '<a href="#" data-block="' + block + '"><img src="delete.png" class="del-img"></a> ' + '<a href="/blocks/' + block + '" class="li-text">' + block + '</a>';
			list.push($('<li>', { html: content }));
		};

		$('.block-list').append(list);
	};
});