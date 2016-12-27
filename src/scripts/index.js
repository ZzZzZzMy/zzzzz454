var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/selector');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/touch');
require('./common/libs/zepto-modules/ajax');

var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');

var echarts = require('./common/libs/echarts.js')
// edit index
$(".swiper-container").show();
$("#mainContainer").hide();

var swiper = new Swiper('.swiper-container',{
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
});
//表格
 var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
    title : {
        text: '个人掌握技能图表',
       
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {

        orient: 'vertical',
        left: 'left',
        top:'15%',
        data: ['类库','规范','框架','插件','布局','程序']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '25%',
            center: ['20%', '60%'],
            data:[
                {value:335, name:'类库'},
                {value:310, name:'规范'},
                {value:234, name:'框架'},
                {value:135, name:'插件'},
                {value:1548, name:'布局'},
                {value:956, name:'程序'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
       $('#mc_play').tap(function(){
       	play_music();
       })
function play_music(){
        if ($('#mc_play').hasClass('on')){
            $('#mc_play audio').get(0).pause();
            $('#mc_play').attr('class','stop');
        }else{
            $('#mc_play audio').get(0).play();
            $('#mc_play').attr('class','on');
        }
        $('#music_play_filter').hide();
        event.stopPropagation(); //阻止冒泡 
    }
    function just_play(id){
        $('#mc_play audio').get(0).play();
        $('#mc_play').attr('class','on');
        if (typeof(id)!='undefined'){
            $('#music_play_filter').hide();
        }
        event.stopPropagation(); //阻止冒泡 
    } 
   
    




$("#enter").click(function(){

	$(".swiper-container").hide();
	$("#mainContainer").show();
	addjson.Add('skill');
	$('#footer').find('ul').find('li').click(function(){

		var jsonname = $(this).attr('id');
		if(jsonname === 'skill'){
			$('.table').css('display','block');
		}else{
			$('.table').css('display','none');
		};

		addjson.Add(jsonname);
	})

	
	
    /*$('#me').tap(function(){
        alert(1);
        $('.skill').css('display','none');

        $('.me').css('display','block');
    })*/
	
})
var addjson = {
        Add:function(jsonname){
         if(jsonname==='me'){
                $('.skill').html('');
                var html = "<li>MyName:zzzzzzz</li><li>ConnectMe</li><li>1008208820</li><li>1041951643</li><li>1041951643</li>"
                 $('.me').html(html);   
                // $('.me').css('display','block');
        }else{
             $('.me').html('');
            $('.skill').css('display','block');
            $.post('http://localhost:8000/'+jsonname,function(data){
         // $('#wrapper').find('ul').find('li').not(':first').remove();
                 var str = '';

                 for(var i=0;i<data.length;i++){  
                    str+="<li>";
                     for(var each in data[i]){
                        if(each === 'img'){
                            str +="<div class='pic'><p>"+data[i][each]+"</p></div>";
                        }else{
                            str +="<div class='exp'><p>"+data[i][each]+"</p></div>";         
                        }
                                 
                             }
                      str+="</li>";
                     }
      
                $('#wrapper').find("ul").html(str); 
                setTimeout(function(){
            myScroll.scrollTo(0,0);
            myScroll.refresh();

          }, 100)

             })  
        }

        
        var myScroll;
        myScroll = new IScroll('#wrapper', { mouseWheel: true });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
        }
    }