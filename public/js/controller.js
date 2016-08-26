var app = angular.module('myApp', []);

app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
	'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
	'https://streamable.com/**', 'https://my.mixtape.moe/**', 
	'https://www.youtube.com/**', 'https://www.facebook.com/**' ]);
});

app.directive('redditPost', function () {
  return {
    scope: {
      post: '=redditPost'
    },
    restrict: 'EA',
    template: '<button type="button" class="btn btn-xs btn-primary" disabled="disabled">{{ post.data.ups }}&nbsp;' + 
    '<span class="glyphicon glyphicon-arrow-up"></span></button>&nbsp;<a target="_blank" href="{{ post.data.url }}">' +
    '{{ post.data.title }} </a>'
    };
});

app.directive('post', function () {
  return {
    scope: {
      post: '=post'
    },
    restrict: 'EA',
    template: '<button type="button" class="btn btn-xs btn-primary" disabled="disabled">{{ post.data.ups }}&nbsp;' + 
    '<span class="glyphicon glyphicon-arrow-up"></span></button>&nbsp;<a target="_blank" href="{{ post.data.url }}">' +
    '{{ post.data.title }} </a> <a target="_blank" href="https://reddit.com{{post.data.permalink}}">[comments]</a>' +
    '&nbsp;<a target="_blank" ng-href="http://{{ post.data.domain }}"><span class="small-text">{{ post.data.domain }}</span></a>'
    };
});

app.directive('mediaPost', function () {
  return {
    scope: {
      post: '=mediaPost',
      index: '@'
    },
    restrict: 'EA',
    template: '<button type="button" class="btn btn-xs btn-primary" disabled="disabled"> {{ post.data.ups }} <span class="glyphicon glyphicon-arrow-up"></span></button>' +
          '<a target="_blank" href="{{ post.data.url }}"> {{ post.data.title }} </a> <a target="_blank" href="https://reddit.com{{post.data.permalink}}">[comments]</a>' +
          '&nbsp;<a data-toggle="collapse" href="#collapse{{index}}"><span class="glyphicon glyphicon-chevron-down"></span>' +
          '&nbsp;<span class="small-text">{{ post.data.domain }}</span></a>' +
          '<br><br><div class="collapse" id="collapse{{index}}" style="width: 100%; height: 0px; position: relative; padding-bottom: 56.250%;">' +
          '<iframe ng-src="{{ post.data.url }}" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no" style="width: 100%; height: 100%; position: absolute;"></iframe></div>'
    };
});

app.controller('myCtrl', function($scope, $http) {
	function loadPosts(data) {
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
			var url = children[i].data.url;
			if(url.indexOf('streamable') > -1 && url.indexOf('/e/') < 0){
	    		comIndex = url.indexOf('.com');
	    		new_url = url.slice(0,comIndex+4) + '/e/' + url.slice(comIndex+5);
	    		children[i].data.url = new_url;
	    	}
	    	if(url.indexOf('youtube') > -1 && url.indexOf('embed') < 0){
	    		idIndex = url.indexOf('v=');
	    		new_url = 'https://www.youtube.com/embed/' + url.slice(idIndex+2);
	    		children[i].data.url = new_url;
	    	}
	    	if(url.indexOf('facebook') > -1 && url.indexOf('plugins/video') < 0){
	    		new_url = 'https://www.facebook.com/plugins/video.php?href=' + url;
	    		children[i].data.url = new_url;
	    	}
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
	}
    $http.get('/.json').then(function(res) {
	    var data = JSON.parse(res.data);
	    loadPosts(data);
	});
	$("#loadForm").submit(function(){
		var parameters = {
			sort: $("#rankingSel").val(),
			time: $("#timeSel").val()
		}
        $http.get('/.json', { params: parameters }).then(function(res) {
        	var data = JSON.parse(res.data);
		    loadPosts(data);
	    });
    });
});