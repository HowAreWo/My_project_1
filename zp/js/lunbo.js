//控制让几号图片  隐藏/显示的
  //让颜色改变的
var c = 0;
//设置定时器，控制自动轮播
var timer=setInterval(run,3000);
//定时器调用的函数
function run(){
    c++;
    if(c==5){
        c=0;
    }
    //让c号图片显示，兄弟图片隐藏
    $("#flash img").eq(c).fadeIn(300).siblings("img").fadeOut(300);
    $("#flash img").parent().parent().css('background-color',$("#flash img").eq(c).attr('data-color'));
    //让c号li变红，其他li变灰色
    $("#flash ul li").eq(c).css("background","#a10000").siblings("li").css("background","#ddd");
}


$("#flash").hover(function(){
    //清理定时器；
    clearInterval(timer);
},function(){
    timer = setInterval(run, 3000);
})

$("#flash ul li").mouseenter(function(){
    c = $(this).index();
    //让c号图片显示，兄弟图片隐藏
    $("#flash img").eq(c).fadeIn(100).siblings("img").fadeOut(100);
    $("#flash img").parent().parent().css('background-color',$("#flash img").eq(c).attr('data-color'));
    //让c号li变红，其他li变灰色
    $("#flash ul li").eq(c).css("background","#a10000").siblings("li").css("background","#ddd");
})

//获取对象
