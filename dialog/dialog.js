;(function($){
    var shade = '<div class="wz_shade"></div>';
    var html = '<div class="wz_dialog"><div class="wz_title">{0}</div><a href="javascript:;" class="wz_close">x</a><div class="wz_content">{1}</div><div class="wz_bottom">{2}{3}</div></div>';
    var btn = '<span class="wz_btn">{0}</span>';
    var counthtml = '<span class="countdown"><em>{0}</em> 秒后关闭</span>';

    var defaults = {};

    function Dialog(_default){
        var _defaults = {
            width:'300',
            height:'auto',
            location : 'center',// center, topleft(lefttop), topright(righttop), bottomleft(leftbottom), bottomright(rightbottom)
            shade : true,       // 是否需要遮罩
            shadeClose : true,  // 点击遮罩是否关闭弹窗
            btn : [],           // 是否显示按钮 {name, close, action}
            ease : 'fade',      // 显示和隐藏形式
            title:'提示框',      // 弹窗标题
            content:'内容加载中...',// 弹窗内容
            countdown:0,        // 倒计时时间，若小于等于0，则表示不开启
        }
        defaults = $.extend(_defaults, _default);
        
        this.distance = null;
        this.init();
    }
    Dialog.prototype = {
        init : function () {
            if(!this.distance){
                var s = '';
                if(defaults.btn.length){
                    for(var i=0; i<defaults.btn.length; i++){
                        defaults.btn[i] = $.extend({
                            name : 'yes',       // 按钮名称
                            close : true,       // 点击后是否关闭弹窗
                            action : function(){// 点击事件
                                
                            }
                        }, defaults.btn[i]);
                        s += '<a href="javascript:;" class="btn_a">'+defaults.btn[i].name+'</a>';
                    }
                }
                this.distance = this.format(html, [
                    defaults.title, 
                    defaults.content, 
                    (defaults.countdown>0 ? this.format(counthtml, [defaults.countdown]) : ''), 
                    (defaults.btn.length ? this.format(btn, [s]) : '')
                ]);
            }

            // defaults.shade && (this.distance = this.format(shade, [this.distance]));
            defaults.shade && (this.distance=shade+this.distance);

            $('body').append( $(this.distance) );

            defaults.ease=='fade'? $('.wz_dialog').fadeIn() : $('.wz_dialog').show();

            this.style();
            this.bind();
        },

        // 设定样式
        style : function(){
            var $dialog = $('.wz_dialog');
            var $content = $dialog.children('.wz_content');

            defaults.width = defaults.width==='auto' ? ($content.width()+parseFloat($content.css('padding-left'))+parseFloat($content.css('padding-right'))) : defaults.width;
            defaults.height = defaults.height==='auto' ? ($content.height()+parseFloat($content.css('padding-top'))+parseFloat($content.css('padding-bottom'))+58) : defaults.height;

            $dialog.css({
                'width' : defaults.width,
                'height' : defaults.height,
                'margin-left' : 0,
                'margin-top' : 0
            });

            switch (defaults.location){
                case 'center' : {
                    $dialog.css({
                        'top':'50%',
                        'left':'50%',
                        'marginLeft':'-'+defaults.width/2+'px',
                        'marginTop':'-'+defaults.height/2+'px'
                    });
                    break;
                }
                case "topleft":
                case "lefttop":{
                    $dialog.css({
                        'top':0,
                        'left':0
                    })
                    break;
                }
                case "topright":
                case "righttop":{
                    $dialog.css({
                        'top':0,
                        'left':'initial',
                        'right':0
                    })
                    break;
                }
                case "bottomleft":
                case "leftbottom":{
                    $dialog.css({
                        'top':'initial',
                        'bottom':0,
                        'left':0
                    })
                    break;
                }
                case "bottomright":
                case "rightbottom":{
                    $dialog.css({
                        'top':'initial',
                        'bottom':0,
                        'left':'initial',
                        'right':0
                    })
                    break;
                }
            }
        },

        // 绑定事件
        bind : function(){
            var $dialog = $('.wz_dialog');
            var self = this;
            $dialog.find('.wz_close').on('click', function(){
                self.close();
            })
            $dialog.find('.btn_a').each(function(index){
                $(this).on('click', function(){
                    $.isFunction(defaults.btn[index].action) && defaults.btn[index].action();
                    defaults.btn[index].close && self.close();
                })
            })

            defaults.shadeClose && $('.wz_shade').on('click', function(){
                self.close();
            })

            // 倒计时关闭
            if(defaults.countdown>0){
                var times = defaults.countdown;
                var $em = $('.wz_dialog').find('.countdown em');
                var self = this;

                self.timer && clearInterval(self.timer);
                self.timer = setInterval(function(){
                    times--;
                    if(times<=0){
                        clearInterval(self.timer);
                        self.close();
                    }else{
                        $em.text(times);
                    }
                    
                }, 1000);
            }
        },

        // 关闭弹出层
        close : function(){
            defaults.ease=='fade'?$('.wz_shade').fadeOut(function(){
                $(this).remove();
            }) : $('.shade').remove();
            
            defaults.ease=='fade'? $('.wz_dialog').fadeOut(function(){
                $(this).remove();
            }) : $('.dialog').show(function(){
                $(this).remove();
            });
            this.timer && clearInterval(this.timer);
        },

        format : function(str, args){
            var reg = /\{(\d+)\}/g;
            return str.replace(reg, function (g0, g1) {
                return args[+g1] || '';
            });
        }
    }

    $.wz = $.wz || {};
    $.wz.Dialog = Dialog;
})(jQuery);