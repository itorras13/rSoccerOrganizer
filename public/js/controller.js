var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get('/.json').then(function(res) {
	    var data = JSON.parse(res.data);
	    $scope.goals = [];
	    $scope.threads = [];
	    $scope.rest = [];
	    $scope.reddit = [];
	    $scope.media = [];
	    var children = data.data.children
		for (var i = 0; i < children.length; i++) {
			var title = children[i].data.title;
			title = title.toLowerCase();
			var flair = children[i].data.link_flair_text;
			if((title.match(/\( *\d/) != null || title.indexOf("goal") > -1) && (flair == "Media" || 'content' in children[i].data.media_embed )) {
		    	$scope.goals.push(children[i]);
		    } else if(title.indexOf("thread") > -1 && title.indexOf("match") > -1){
		    	$scope.threads.push(children[i]);
		    } else if (children[i].data.domain == "self.soccer") {
		    	$scope.reddit.push(children[i]);
		    } else if (flair == "Media" || 'content' in children[i].data.media_embed ) {
		    	$scope.media.push(children[i]);
			} else {
		    	$scope.rest.push(children[i]);
		    }
		}
	});
});