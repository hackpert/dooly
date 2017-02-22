//really really hacky stuff

String.prototype.format = function() {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {       
        var reg = new RegExp("\\{" + i + "\\}", "gm");             
        str = str.replace(reg, arguments[i]);
    }
    return str;
}


//var tasks = JSON.parse(localStorage.tasks);

var injectHTML = '<div class="link odd thing"data-author=dooly data-context=listing data-type=link onclick=click_thing(this)><p class=parent></p><span class=rank>!</span><div class="unvoted midcol"><div class="access-required arrow login-required up"aria-label=upvote data-event-action=upvote role=button tabindex=0></div><div class="score dislikes"title=19102>todo!!</div><div class="score unvoted"title=19103>todo</div><div class="score likes"title=19104>let\'s do</div><div class="access-required arrow login-required down"aria-label=downvote data-event-action=downvote role=button tabindex=0></div></div><a class="thumbnail"><img alt=""height=70 src={0} width=70></a><div class="unvoted entry"><p class=title><a class="title may-blank"data-event-action=title rel=""tabindex=1>{1}</a> <span class=domain>(<a href=//doo.ly>doo.ly</a>)</span><p class=tagline>due in <time class=live-timestamp datetime=2017-02-22T12:40:17+00:00 title="Wed Feb 22 12:40:17 2017 UTC">{2} hours.</time> An anti-distraction reminder by <a class=author href=https://doo.ly>dooly</a><span class=userattrs></span></div><div class=child></div><div class=clearleft></div></div>'

var port = chrome.extension.connect({name: "randomtaskgetter"});
port.postMessage({request: "SendTask"});
port.onMessage.addListener(function(msg) {
    var task = msg.todo;
    var injection;
    if(task == undefined || task == 'undefined') {
      injection = injectHTML.format(chrome.extension.getURL('panic.jpg'),'NOTHING on your to-do list?! Go find something productive','X');
    } else {
      injection = injectHTML.format(chrome.extension.getURL('panic.jpg'),task,'X');
    }
    $(injection).insertBefore('.nav-buttons');
});


