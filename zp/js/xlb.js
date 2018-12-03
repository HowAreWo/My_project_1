//控制让几号图片  隐藏/显示的
  //让颜色改变的
  var b = 0;
  var L=$(".zp-xlb-d1>ul>li").length;
  //设置定时器，控制自动轮播
  var timer=setInterval(run,3000);
  //定时器调用的函数
  function run(){
      var L=$(".zp-xlb-d1>ul>li").length;
      //让c号图片显示，兄弟图片隐藏
      for(var i=0;i<5;i++){
        if(b==L){
          b=0;
        }
        $(".zp-xlb-d1>ul>li").eq(b).fadeOut(300) 
        b++; 
      }
      for(var i=0;i<5;i++){
        if(b==L){
          b=0;
        }
        $(".zp-xlb-d1>ul>li").eq(b).fadeIn(300) 
        b++; 
      }
      b=b-5;
  }
  
  
  $(".zp-xlb-d1>ul>li").hover(function(){
      //清理定时器；
      clearInterval(timer);
  },function(){
      timer = setInterval(run, 3000);
  })
