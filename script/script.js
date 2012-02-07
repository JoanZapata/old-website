$(function() {
	

    var count = 0;
    var list = [
        {
			service : "twitter",
			user : "ShuyaInc",
			template : {
				posted : '<img src="images/tweet.png" /> {{html tweet}}'
			}
		},
		{
			service : "github",
			user : "shuya-inc",
			template : {
				commented : '<img src="images/github_act.png" /> commented on <a href="${status.url}">${what}</a> on <a href="http://github.com/${repo}">${repo}</a>'
			}
			
		}];
	
	Date.prototype.toISO8601 = function(date) {
        var pad = function (amount, width) {
            var padding = "";
            while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
                padding += "0";
            return padding + amount.toString();
        };
        date = date ? date : new Date();
        var offset = date.getTimezoneOffset();
        return pad(date.getFullYear(), 4)
            + "-" + pad(date.getMonth() + 1, 2)
            + "-" + pad(date.getDate(), 2)
            + "T" + pad(date.getHours(), 2)
            + ":" + pad(date.getMinutes(), 2)
            + ":" + pad(date.getUTCSeconds(), 2)
            + (offset > 0 ? "-" : "+")
            + pad(Math.floor(Math.abs(offset) / 60), 2)
            + ":" + pad(Math.abs(offset) % 60, 2);
    };
	
	$("#lifestream").lifestream({
		feedloaded: function(){
			count++;
	          // Check if all the feeds have been loaded
	          if( count === list.length ){
	            $("#lifestream li").each(function(){
	              var element = $(this),
	                  date = new Date(element.data("time"));
	              element.append(' <abbr class="timeago" title="' + date.toISO8601(date) + '">' + date + "</abbr>");
	            });
	            $("#lifestream .timeago").timeago();
	          }
		},
		limit : 6,
		list : list
	});
	
	$(".link").hover(function(){
		$(this).animate({bottom:'15px'}, "fast");
	}, function(){
		$(this).animate({bottom:'0px'}, "fast");
	})
});