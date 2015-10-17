$(document).ready(function() {
	$('*[func]').click(function() {
		var elem = $(this);
		var id = elem.attr('id');
		var reload = function() {
			window.location.reload();
		};
		if(elem.attr('func') == 'change'){
			$.post('/getone', { change: id } ,function(data) {
				$('.change').text(data);
			});
		}
		if(elem.attr('func') == 'del'){
			$.get('/', { del: id }, reload);
		}
  	});
});