$(function() {
    var count = 0;
    var list = [
        {
			service : "twitter",
			user : "JoanZap",
			template : {
				posted : '<img src="images/tweet.png" /> {{html tweet}}'
			}
		},
		{
			service : "github",
			user : "JoanZap",
			template : {
				pushed : '<img src="images/github_act.png" /> <a href="${status.url}" title="{{if title}}${title} by ${author} {{/if}}">pushed</a> to <a href="http://github.com/${repo}/tree/${branchname}">${branchname}</a> at <a href="http://github.com/${repo}">${repo}</a>',
				gist : '<img src="images/github_act.png" /> <a href="${status.payload.url}" title="${status.payload.desc || ""}">${status.payload.name}</a>',
				commented : '<img src="images/github_act.png" /> commented on <a href="${status.url}">${what}</a> on <a href="http://github.com/${repo}">${repo}</a>',
				pullrequest : '<img src="images/github_act.png" /> ${status.payload.action} <a href="${status.url}">pull request #${status.payload.number}</a> on <a href="http://github.com/${repo}">${repo}</a>',
				created : '<img src="images/github_act.png" /> created ${status.payload.ref_type || status.payload.object} <a href="${status.url}">${status.payload.ref || status.payload.object_name}</a> for <a href="http://github.com/${repo}">${repo}</a>',
				createdglobal : '<img src="images/github_act.png" /> created ${status.payload.object} <a href="${status.url}">${title}</a>',
				deleted : '<img src="images/github_act.png" /> deleted ${status.payload.ref_type} ${status.payload.ref} at <a href="http://github.com/${status.repository.owner}/${status.repository.name}">${status.repository.owner}/${status.repository.name}</a>'
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
    
    var lifestreamDisplayed = false;
    
    window.setInterval(function(){
    	if (lifestreamDisplayed) return;
    	 $("#lifestream").append('.');
    }, 400);
    
    $("#title").css('opacity', '0').css('bottom', '15px').animate({bottom: '0px', opacity: '1'}, 'slow', 'easeOutQuad');
    $("#description").css('opacity', '0').css('right', '15px').delay(200).animate({right: '0px', opacity: '1'}, 'slow', 'easeOutQuad');
    $(".avatar").css('opacity', '0').css('left', '15px').delay(400).animate({left: '0px', opacity: '1'}, 'slow', 'easeOutQuad');
    $(".lastActivity").css('opacity', '0').css('left', '15px');
    $("#lifestream").css('opacity', '0').css('left', '15px').delay(500).animate({left: '0px', opacity: '1'}, 'slow', 'easeOutQuad');
    
	$("#lifestream").lifestream({
		feedloaded: function(){
			count++;
			if( count === list.length ){
				lifestreamDisplayed = true;
				$(".lastActivity").animate({left: '0px', opacity: '1'}, 'slow', 'easeOutQuad');
				$("#lifestream li").each(function(index){
					var element = $(this),
					date = new Date(element.data("time"));
					element.append(' <abbr class="timeago" title="' + date.toISO8601(date) + '">' + date + "</abbr>");
					$(this).css('left', '40px').css('opacity', '0').height('0px').css('visibility', 'visible')
							.delay(index*200)
							.animate({height: '25px', left: '0px', opacity: '0.5'}, 'slow', 'easeOutQuad')
							.animate({opacity: '1'});
				});
				$("#lifestream .timeago").timeago();
			 }
		},
		limit : 10,
		list : list
	});
	
	$(".link").each(function(index){
		$(this).prepend('<img class="shadow" src="images/shadow.png" />');
		$(this).css('right', $(window).width()/2+'px').css('opacity', '0')
				.delay(index*300)
				.animate({right: '0px', opacity: '0.7'}, 'slow', 'easeOutQuad').animate({opacity: '1'});
	});
	
	$("#links li").hover(function(){
		$(this).find(".shadow").animate({width:'35px', left:'15px'}, "fast");
		$(this).find("a img").animate({bottom:'15px'}, "fast");
	}, function(){
		$(this).find(".shadow").animate({width:'64px', left:'0px'}, "fast");
		$(this).find("a img").animate({bottom:'0px'}, "fast");
	});
	
});