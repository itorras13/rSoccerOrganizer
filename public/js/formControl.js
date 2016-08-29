$(document).ready(function(){
	$(document).on("click", "#embedGoal", function(){
		var data = $(this).attr('data-button');
		split = data.split("|||");
		url = split[0];
		title = split[1];
	  	$("#embedTitleGoal").text(title);
	  	$("#embedFrameGoal").html('<br><div style="width: 100%; height: 0px; position: relative; padding-bottom: 56.250%;">' +
			'<iframe src="' + url +  '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no" style="width: 100%; height: 100%; position: absolute;"></iframe></div>')
	  	// $('#myModal').modal('show')
	});
	$(document).on("click", "#embedMedia", function(){
		var data = $(this).attr('data-button');
		split = data.split("|||");
		url = split[0];
		title = split[1];
	  	$("#embedTitleMedia").text(title);
	  	$("#embedFrameMedia").html('<br><div style="width: 100%; height: 0px; position: relative; padding-bottom: 56.250%;">' +
			'<iframe src="' + url +  '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no" style="width: 100%; height: 100%; position: absolute;"></iframe></div>')
	  	// $('#myModal').modal('show')
	});
	$(".tabs").click(function(){
        $("#embedTitleGoal").text("");
        $("#embedTitleMedia").text("");
        $("#embedFrameGoal").html("");
        $("#embedFrameMedia").html("");
    });
});


