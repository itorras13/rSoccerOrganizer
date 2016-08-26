$("#rankingSel").on('change', function() {
    if ($(this).val() == 'top'){
        $("#timeSel").prop('disabled', false);
    } else {
    	$('#timeSel option[value=""]').attr("selected", "selected");
    	$("#timeSel").prop('disabled', true);
    }
});
$(document).on("click", "#embedModal", function(){
	var data = $(this).attr('data-button');
	split = data.split("|||");
	url = split[0];
	title = split[1];
  	$("#myModalLabel").text(title);
  	$(".modal-body").html('<br><br><div style="width: 100%; height: 0px; position: relative; padding-bottom: 56.250%;">' +
		'<iframe src="' + url +  '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no" style="width: 100%; height: 100%; position: absolute;"></iframe></div>')
  	$('#myModal').modal('show')
});
$('#myModal').on('hidden.bs.modal', function (e) {
	$(".modal-body").html("");
	$("#myModalLabel").text("");
});
