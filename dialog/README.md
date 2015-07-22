jquery的弹窗组件
---

使用`new $.wz.Dialog()`即能调用出默认的窗口，同时，还对外提供了多个参数进行定制化：
```javascript
{
	width:'400', 		// 宽度
    height:'300',		// 高度
    location : 'center',// center, topleft(lefttop), topright(righttop), bottomleft(leftbottom), bottomright(rightbottom)
    shade : true,       // 是否需要遮罩
    shadeClose : true,  // 点击遮罩是否关闭弹窗
    btn : [],           // 要显示的按钮 {name:"确定" //按钮名称, close:false //点击后是否关闭弹窗, action:function(){} // 点击按钮要执行的方法}
    ease : 'fade',      // 显示和隐藏形式
    title:'提示框',      // 弹窗标题
    content:'内容加载中...',// 弹窗内容
    countdown:0,    	// 倒计时的时间，若小于等于0则表示不启动倒计时
}
```

1.在右下角显示弹窗：
```javascript
new $.wz.Dialog({
	location : 'bottomright' // 或'rightbottom'
});
```

2.显示确定和取消按钮：
按钮设置为一个`array`类型，是为了能够实现添加多个按钮的功能
```javascript
new $.wz.Dialog({
	btn : [
		{
			name : "确定",
			close : false,
			action : function(){
				alert("这是确定按钮");
			}
		},
		{
			name : "取消",
			action : function(){
				alert("这是取消按钮");
			}
		}
	]
})
```

3.显示相应的内容
```
new $.wz.Dialog({
	content : 'this dialog is used by wenzi',
	btn : [
		{
			name : "确定",
		}
	]
})
```

4.倒计时关闭弹窗
```javascript
new $.wz.Dialog({
	countdown : 5
})
```

推荐样式：  
```css
.wz_shade{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #333;
    opacity: 0.7;
    filter: alpha(opacity=70);
    z-index: 998;
}
.wz_dialog{
    position: fixed;
    background: #ffffff;
    width: auto;
    height: auto;
    margin-left: 0px;
    margin-top: 0px;
    z-index: 999;
    background-color: #eef;
    display: none;
}
.wz_dialog .wz_title{
    background: #92A9E0;
    padding: 10px;
}
.wz_dialog .wz_close{
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    position: absolute;
    right: 8px;
    top: 9px;
    background: #fff;
    text-decoration: none;
}
.wz_dialog .wz_close:hover{
    color: #dd553b;
}
.wz_dialog .wz_content{
    padding: 10px;
    margin-bottom: 24px;
}
.wz_dialog .wz_bottom{
    padding: 10px;
    position: absolute;
    bottom: 0px;
    right: 0;
}
.wz_dialog .wz_btn a{
    text-decoration: none;
    color: #fff;
    padding: 4px 8px;
    background: #92A9E0;
    margin-left: 6px;
    -moz-transition-delay: 0.2s; /* Firefox 4 */
    -webkit-transition-delay: 0.2s; /* Safari 和 Chrome */
    -o-transition-delay: 0.2s; /* Opera */
    transition-delay: 0.2s;
}
.wz_dialog .wz_btn a:hover{
    background: #dda669;
    color: #4A4242;
}
```
