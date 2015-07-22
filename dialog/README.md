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
    countdown:false,    // 是否倒计时关闭
    times:5             // 若开启倒计时关闭，则默认5秒后关闭
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
	countdown : true
})
```
