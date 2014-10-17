if($.browser.msie)$(function(){
var parseCSS=function(sheet){
	var ret=[];
	$(sheet=sheet.replace(/\/\*.*\*\//g,'').replace(/\s+/g,' ').split('}')).each(function(){
		var tmp={};
		if((tmp.sel=this.split('{')[0].replace(/^\s|\s$/g,''))&&(tmp.styles=this.split('{')[1].split(';')))
			ret.push(tmp);
	});
	return ret;
};

var findSelector=function(css,rx){
	var tmp,i,j,ret=[];
	for(i in css)
		if(rx.test(css[i].sel))
			ret.push(css[i]);
	return ret;
};

var prprCSSjson=function(arr){
	var ret={},tmp=[];
	$(arr).each(function(){
		tmp=this.split(':');
		ret[tmp[0].replace(/^\s|\s$/g,'')]=tmp[1];
	});
	return ret;
};

var prcssCSS3selectors=function(sheet){
	$(findSelector(parseCSS(sheet),/(:nth)|(:last)|(:first)|(:only)|(:not)|(:empty)/)).each(function(){
		$(this.sel).css(prprCSSjson(this.styles));
	});
};
	
$('link,style').each(function(){
	var el=this;
	if(this.tagName.toLowerCase()=='style')
		prcssCSS3selectors(el.innerHTML);
	if(this.tagName.toLowerCase()=='link')
		$.get(this.href,{},function(ret){
			prcssCSS3selectors(ret);
		});
});
	
});
/*Y29kZSBieSBwbHprbg==*/