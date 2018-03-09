/**
 * 该js需加载于dom生成之后
 * 全局接口 Renderer
 * dom格式div#template>div.xxx-template+div.xxx-template,模板内容写在对应的div.xxx-template中
 */
var Renderer=Renderer||{
	symbol:'#',				// 标识符,正则中使用
	/**
	 * template值为包含所有模板的对象,键名为div#template的子代div的类名(xxx-template)去掉-template
	 */
	template:(function(){
		var oTemplate={},
			oEl=document.getElementById('template');
		for(var i=0,len=oEl.children.length;i<len;i++){
			var oChild=oEl.children[i];
			oTemplate[oChild.className.split('-')[0]]=oChild.innerHTML.trim();
		}
		return oTemplate;
	})(),
	/**
	 * 渲染方法,以#为标识符(#xxx#)
	 * @param {[string]} sKey [Renderer.template中的键名]
	 * @param {[array]} oRender [渲染对象,键名为模板中#xxx#中的xxx]
	 */
	render:function(sKey,oRender){
		if(!(sKey in this.template))
			return 'Renderer.template isn`t has this key！';
		var regExp=new RegExp(this.symbol+'[-\\w]+'+this.symbol,'gi');
			sTemplate=this.template[sKey],
			aTemplate=sTemplate.match(regExp);
		if(aTemplate instanceof Array)
			aTemplate.forEach(function(item){
				sTemplate=sTemplate.replace(item,oRender[item.slice(1,item.length-1)]);
			});
		return sTemplate;
	}
};
