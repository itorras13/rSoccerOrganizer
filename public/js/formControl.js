$("#rankingSel").on('change', function() {
    if ($(this).val() == 'top'){
        $("#timeSel").prop('disabled', false);
    } else {
    	$('#timeSel option[value=""]').attr("selected", "selected");
    	$("#timeSel").prop('disabled', true);
    }
});
