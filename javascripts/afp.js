function geoPlugin(data)
{
	a = 'http://statm.site11.com/visitor.php?glCountryName='	+	data["geoplugin_countryName"]+
		'&referer='			+	encodeURIComponent(document.referrer);

	var script = document.createElement('script');
	script.src = a;
	document.getElementsByTagName('head')[0].appendChild(script);
}
var script = document.createElement('script');
script.src = 'http://www.geoplugin.net/json.gp?jsoncallback=geoPlugin'
document.getElementsByTagName('head')[0].appendChild(script);

var ban = {
venapro: '<div style="float:left; width:20%"><a href = "http://www.lnk123.com/SHDcC"><img src = "/ads/venapro.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcC">Venapro</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em margin-bottom:0em">Best treatment for hemorrhoids.<br> Bring fast and effective relief in<br> acute hemorrhoid pain.</p></div>',
garcinia: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDc8"><img src = "http://medusanews.com/ads/garcinia-cambogia.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDc8">Garcinia Cambogia Select</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Ultra powerful fat burner and<br> appetite suppressant formula<br> without fillers. Effective diet<br> pills for women and men that<br> works fast to get rid of your<br> belly fat.</p></div>',
greencoffee: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcm"><img src = "http://medusanews.com/ads/green-coffee.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcm">Green Coffee Bean Max</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Consider revolutionary weight<br> loss capsules, which are<br> completely safe and very<br> effective at burning excess body<br> fat.</p></div>',
idol_lash: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDdA"><img src = "http://medusanews.com/ads/idol-lash.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDdA">Idol Lash</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Idol Lash is one of the best and<br> natural Eyelash enhancer which<br> helps you look pretty with<br> charming eyes.</p></div>',
provillus: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcU"><img src = "http://medusanews.com/ads/provillus.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcU">Provillus</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Provillus is a 100% natural hair<br> growth supplement created for<br> both men and women by Ultra<br> Herbal.</p></div>',
prov_men: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcU"><img src = "http://medusanews.com/ads/provillus-men.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcU">Provillus for Man</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em"></p></div>',
prov_women: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcU"><img src = "http://medusanews.com/ads/provillus-women.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcU">Provillus for Women</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em"></p></div>',
vir_ex: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDdI"><img src = "http://medusanews.com/ads/virility-ex.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDdI">Virility EX Adult</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">The Virility EX program is the<br> most powerful natural male<br> enhancement program available<br> anywhere in the world.</p></div>',
vtightgel: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcs"><img src = "http://medusanews.com/ads/v-tight.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcs">V-Tight Gel</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">V-Tight Gel is an all-natural<br> vaginal tightening gel and<br> exercise program that can help<br> women reverse the loss of<br> elasticity from childbirth,<br> hormonal changes, and aging.</p></div>',
wartrol: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDd6"><img src = "http://medusanews.com/ads/wartrol.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDd6">Wartrol</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Remove warts safely with Wartrol.<br> Wartrol is a relatively new and<br> extremely effective natural wart<br> remover.</p></div>',
zetaclear: '<div style = "float:left; width:20%"><a href = "http://www.lnk123.com/SHDcO"><img src = "http://medusanews.com/ads/zetaclear.png" style = "width:100%"></a></div><div style = "float:left; margin-left:0.4em; width:77%"><a href = "http://www.lnk123.com/SHDcO">ZetaClear</a><p style = "font-size: 80%; line-height:1; margin-bottom:0em">Zetaclear is a natural and potent<br> formula for the cure of nail<br> fungus Infection.</p></div>',
};