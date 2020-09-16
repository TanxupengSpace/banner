;(function(){
    $.fn.banner_slide = function(){
        var settings = $.extend({
            auto: true, // 设置自动播放
            loop: true, // 自动循环播放
            playspeed: 3500, // 自动播放倒计时，也就是多长时间之后开始轮播
            slidspeed: 500, // 自动循环轮播时间
            pagination: true, // 是否显示角标
            pagiposition: "center", // 是否居中    left: 左边   center: 右边   right: 右边
            nav: true, // 是否显示切换按钮  true 显示   false 不显示
            paginationclick: true // 是否可以通过页码点击切换轮播图
        });
        this.each(function(){
            var thisObj = $(this),
                banner = thisObj.children(), // 轮播图
                index = 0, // 当前所在轮播图的索引
                len = banner.length - 1; // 轮播的图片总和
            /**
             * 设置打开页面显示的第一张图片
             */
            if(!navigator.userAgent.match(/mobile/i)){ // 当前不是手机
                banner.hide(); // 隐藏所有要轮播的图片
                banner.eq(index).show();
            }else{ // 是移动设备
                banner.css({"opacity": "0"});
                banner.eq(index).css({"opacity": "1"});
            }
            /**
             * 轮播滑动样式
             */
            slideBanner = function(){
                if(!navigator.userAgent.match(/mobile/i)){ // 当前不是手机
                    banner.fadeOut(settings.slidspeed);
                    banner.eq(index).fadeIn(settings.slidspeed);
                }else{ // 是移动设备
                    banner.css({"opacity": "0", "-webkit-transition": settings.slidspeed / 1000 + "s"});
                    banner.eq(index).css({"opacity": "1", "-webkit-transition": settings.slidspeed / 1000 + "s"});
                }
            }
            /**
             * 下一张
             */
            bannerAdd = function(){
                index === len ? index = 0 : index ++;
                slideBanner(); // 滑动轮播图
            }
            /**
             * 上一张
             */
            bannerReduce = function(){
                index === 0 ? index = len : index --;
                slideBanner(); // 滑动轮播图
            }
            /**
             * 生成页面的html元素
             */
            add_pagilable = function(){
                $(".banner-pagination").empty();
                $(".banner-pagination").children().removeClass("span-active");
                for(var i = 0 ; i <= len ; i ++){
                    if(i === index){ // 表示当前所在的轮播图
                        $(".banner-pagination").append("<span class='span-active'></span>");
                        continue;
                    }
                    $(".banner-pagination").append("<span></span>");
                }
                if(settings.paginationclick){ // 可以通过页面来切换轮播
                    $(".banner-pagination").children().each(function(ind){
                        $(".banner-pagination").children().eq(ind).click(function(){
                            index = ind; // 设置页面的位置
                            slideBanner();
                            $(".banner-pagination").children().removeClass("span-active");
                            $(this).addClass("span-active");
                        });
                    });
                }
            }
            /**
             * 显示页码
             */
            if(settings.pagination){
                add_pagilable();
                if(settings.pagiposition === "left"){
                    $(".banner-pagination").css({"text-align" : "left"});
                }
                if(settings.pagiposition === "center"){
                    $(".banner-pagination").css({"text-align" : "center"});
                }
                if(settings.pagiposition === "right"){
                    $(".banner-pagination").css({"text-align" : "right"});
                }
            }
            /**
             * 是否自动播放
             */
            if(settings.auto){ // 是自动播放
                setInterval(function(){
                    bannerAdd();
                    /**
                     * 是否需要页码
                     */
                    if(settings.pagination){
                        add_pagilable();
                    }
                }, settings.playspeed);
            }
            nav_button = function(){
                var nav = '<div class="banner-button">\
                               <div class="prev"></div>\
                               <div class="next"></div>\
                          </div>';
                return nav;
            }
            /**
             * 是否有左右按钮
             */
            if(settings.nav){
                $(".banner-container").append(nav_button());
                $(".prev").click(function(){
                    bannerReduce();
                    add_pagilable();
                });
                $(".next").click(function(){
                    bannerAdd();
                    add_pagilable();
                })
            }
        });
    };
})();