var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};


/* Landscape */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new mo.Landscape({
        pic: 'js/motion/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });
};

/* pageslide swiper */
app.template.swiper = function(){};
app.template.swiper.mySwiper = function(){};
app.template.swiper.init = function(){
    this.bind();
};
app.template.swiper.bind = function(){
    $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        // direction : 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画 

            app.template.swiper.on_pageslideend(0);
        }, 
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            app.template.swiper.on_pageslideend(swiper.activeIndex);
            app.template.swiper.mySwiper.lockSwipes();
        } 
    });

    app.template.swiper.lock();
};
app.template.swiper.lock = function(){
    app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
};

app.template.swiper.touch = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
};

app.template.touch = function(){};

app.template.touch.eventlistener_handler = function(e){

    //e.stopPropagation();  // 阻止事件传递
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

app.template.touch.init = function(){

    // fastclick
    FastClick.attach(document.body);

    document.body.addEventListener("touchmove", app.template.touch.eventlistener_handler, false);

    $("body").on("doubleTap longTap swipeLeft swipeRight", function(e){
        // e.stopPropagation();  // 阻止事件传递
        // e.preventDefault();   // 阻止浏览器默认动作(网页滚动)
        return false;
    });
};


app.template.data = {};
app.template.data.add = function(key, value){
    app.template.data[key] = value;
};
app.template.data.get = function(key){
    return app.template.data[key];
};

/*-- tools
====================================================== */
app.tools = function(){};
app.tools.random = function(n, m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

app.tools.getpageurlwithoutparam = function(){
    var url = window.location.href;
    return url.substring(0, url.indexOf("?"));
};

app.tools.getbaseurl = function(){
    var url = window.location.href;
    return url.substring(0, url.lastIndexOf("/") + 1);
};

app.tools.gotourl = function(url){
    window.location.href = url;
};

app.tools.geturlparam = function(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) 
        return unescape(r[2]);
    else
        return undefined;
};

app.tools.substr = function(str, len){
    if(str.length > len)
        str = str.substring(0, len) + "...";

    return str;
};

app.tools.platform = function(){};
app.tools.platform.os = "";
app.tools.platform.debug = ""; // 强制开始指定os模式
app.tools.platform.init = function(){
    var u = navigator.userAgent;

    app.debug.console("userAgent:" + u);

    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
        app.tools.platform.os = "android";
    else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
        app.tools.platform.os = "ios";

    if(app.tools.platform.debug == "ios")
        app.tools.platform.os = "ios";
    else if(app.tools.platform.debug == "android")
        app.tools.platform.os = "android";
};

/*-- debug
====================================================== */
app.debug = function(){};
app.debug.enable = false;
app.debug.maxline = 5;
app.debug.linecount = 0;
app.debug.console = function(str){
    if(app.debug.enable)
    {
        app.debug.linecount ++;

        if($("#debug").length > 0)
        {
            if(app.debug.linecount > app.debug.maxline)
            {
                app.debug.linecount = 0;
                $("#debug").html("<br/> #" + str);
            }
            else
                $("#debug").append("<br/> #" + str);
        }else
        {
            $("body").append("<div id='debug' class='debug'></div>");
            $("#debug").append("<br/> #" + str);
        }
    }
};


/*-- audio player
====================================================== */
app.audio = function(){};
app.audio.player = undefined;
app.audio.status = "";
app.audio.init = function(){
    app.audio.player = $("#audio-player");

    $(".audio-icon").on("touchend", function(){
        if(app.audio.player[0].paused)
        {
            app.audio.play();
            $(".audio-icon").removeClass("audio-icon-stop");
        }
        else
        {
            app.audio.pause();
            $(".audio-icon").addClass("audio-icon-stop");
        }
    });
};


app.audio.show = function(){
    $(".audio-icon").css({"display": "block"});
    $(".audio-icon").addClass("audio-icon-animation");
    app.audio.play();
};

app.audio.play = function(){
    $(".audio-icon").removeClass("audio-icon-stop");
    app.audio.player[0].play();
    if(!app.audio.player[0].paused)
        app.audio.status = "play";
};

app.audio.pause = function(){
    app.audio.status = "pause";
    app.audio.player[0].pause();
};

app.audio.pause_bysystem = function(){
    app.audio.status = "pause_bysystem";
    app.audio.player[0].pause();
};

app.audio.stop = function(){
    app.audio.player.attr("src", "");
    app.audio.player[0].load();
};

app.audio.changesong = function(src){
    app.audio.player.attr("src", src);
    app.audio.player[0].load();

    if(app.audio.status == "play")
       app.audio.play(); 
};
/*-- p5
====================================================== */
app.p5 = function(){};
var name;
var email;
var phone;
var id;

app.p5.init = function(){
 var openid = $OPENID;
        $.post("../../db/finduser.php", {openid: openid},function(r){
            name = r.name;
            email = r.email;
            var phone = r.phone;
            id = r.Id;
          },'json');
};

app.p5.bind_touch_event = function(){
    $(".p5 .gotopay-1").on("touchend", function(){
        app.p5.callpay();
    });
};

app.p5.callpay = function(){
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', app.p5.jsapicall, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', app.p5.jsapicall); 
            document.attachEvent('onWeixinJSBridgeReady', app.p5.jsapicall);
        }
    }else{
        app.p5.jsapicall();
    }
};
var arr = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
app.p5.jsapicall = function(){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', $JSAPIPARAMETERS, function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" )
            {
                $.post("../../db/finduser.php", {openid: $OPENID}, function(data){
                    if(data.code==0)
                    {
                        document.getElementById("e6-7").innerHTML = data.numbers;
                        app.template.swiper.next();
                    }else{
                        alert("Payment Declined! Please contact us!");
                    }


                },'json');
            }else{
                alert("Payment Declined!");
            }
        }
    );
};

app.p5.destory = function(){
};


/*-- p6
====================================================== */
app.p6 = function(){};
app.p6.init = function(){};
app.p6.bind_touch_event = function(){
    $(".p6 .e6-8").on("touchend", function(){
        app.p6.show_layout1 ();
    });
}  
app.p6.show_layout1 = function(){
     window.overlay1 = new mo.Overlay({
        content: '<img src="../../img/p4/e-5.png" alt="" class="m-p1-3">', 
        width: 640,
        height: 1031

    });
    overlay1.on('open', function(){
        $(".m-p1-3").css({"top": "0px","left": "0px","position":"absolute"});
        $('.m-p1-3').on('touchend', function(){
            window.overlay1.close();
        });
    });        
}
/*-- for android
====================================================== */
var fuckandroid = {};
fuckandroid.app = function(){};
fuckandroid.app.audio = function(){};
fuckandroid.app.audio.play_tap = function(){
    //android不能同时播放连个音乐；
};
/*-- page init
====================================================== */
(function(){
    // 检测OS
    app.tools.platform.init();

    // 兼容android(如果开启android模式则重写响应函数用来)
    if(app.tools.platform.debug == "android"
     || app.tools.platform.os == "android")
    {
        app.audio.play_tap = fuckandroid.app.audio.play_tap;
    }

    // 框架
    app.template.touch.init();
    app.template.swiper.init();
    app.template.Landscape.init();
    app.audio.init();
    //tracking.pv_byfrom();

    /* page init */
    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p5.init();
                break;
            case 1:
                app.p5.destory();
                app.p6.init();
                break;
        }
    };
    app.p5.bind_touch_event();
    app.p6.bind_touch_event();
    app.debug.enable = false;
})();

