var a,b,c,d,e;
setInterval(function(){

  var uname = $('.regist_body_ul li:nth-child(1) input').val();
  var upwd = $('.regist_body_ul li:nth-child(2) input').val();
  var email = $('.regist_body_ul li:nth-child(4) input').val();
  if(a==1&&b==1&&c==1&d==1&&e==1){
    $(".input4").addClass("btn")
  }else{
    $(".input4").removeClass("btn");
  }
},300)
$('.input4').click(function(){
    if(a==1&&b==1&&c==1&d==1&&e==1){
    var uname = $('.regist_body_ul li:nth-child(1) input').val();
    var upwd = $('.regist_body_ul li:nth-child(2) input').val();
    var email = $('.regist_body_ul li:nth-child(4) input').val();
    (function(){
      $.ajax({
        url:'http://127.0.0.1:3000/user/register',
        type:'post',
        data:{uname,upwd,email},
        dataType:'json',
        success: function(res){
          if(res.code == 402||res.code==404){
           alert(res.msg)
          }else if(res.code == 301){
            alert(res.msg);
          }else{
            alert(res.msg); //注册成功
            location.href='zp-login.html';
          }
        }
      })
    })()
  }else{
    alert("注册失败");
  }
})

var str_txt='';
    $(function () {
        $("#user-name").blur(function(){
            var username = $(this).val();
            var na = /^[A-Za-z0-9\u4e00-\u9fa5_]+$/;
            $("#name").remove();
            if(username==null || username==""){
                $("#user-name").before("<span id='name' style='margin-right:29px;'>用户名不能为空</span>")
a=0;
            }else if(!na.test(username)){
                $("#user-name").before("<span id='name'>用户名格式不正确</span>")
a=0;
            }else {
                $.post("/user/selectByName",{"username":username},function(data){
                    if(data){
                        $("#user-name").before("<span id='name' style='margin-right:40px;'>用户名已存在</span>")
a=0;
                    }else{
a=1;
}
                })
            }
        });
        $("#user-upwd").blur(function(){
            var userpwd = $(this).val();
            var p = /^[A-Za-z0-9]{6,16}$/;
            $("#pwd").remove();
            if(userpwd==null || userpwd==""){
                $("#user-upwd").before("<span id='pwd' style='margin-right:40px;'>密码不能为空</span>")
b=0;
            }else if(!p.test(userpwd)){
                $("#user-upwd").before("<span id='pwd' style='margin-right:29px;'>密码格式不正确</span>")
b=0;
            }else{
b=1;
}
        });
        $("#user-upwd1").blur(function(){
            var userpwd1 = $(this).val();
            var userpwd = $("#user-upwd").val();
            $("#pwd1").remove();
            if(userpwd1==null || userpwd1==""){
                $("#user-upwd1").before("<span id='pwd1'>确认密码不能为空</span>")
c=0;
            }else if(userpwd1 != userpwd){
                $("#user-upwd1").before("<span id='pwd1' style='margin-right:29px;'>两次密码不一致</span>")
c=0;
            }else{
c=1;
}
        });
        $("#user-email").blur(function(){
            var useremail = $(this).val();
            var ema =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            $("#email").remove();
              if(useremail==null ||useremail==""){
              $("#user-email").before("<span id='email' style='margin-right:40px;'>邮箱不能为空</span>")
              d=0;
              }
              else if(!ema.test(useremail)){
              $("#user-email").before("<span id='email' style='margin-right:29px;'>邮箱格式不正确</span>")
              d=0;
              }else{
                d=1;
              }
            });
        $(".input2").blur(function(){
            var canvas = $(this).val();
            $("#can").remove();
              if(canvas==null ||canvas==""){
              $("#canvas").before("<span id='can' style='margin-right:29px;'>验证码不能为空</span>")
              e=0;
              }
              else if(canvas!=str_txt){
              $("#canvas").before("<span id='can' style='margin-right:40px;'>验证码不正确</span>")
              e=0;
              }else{
                e=1;
              }
            });
          });






    /**生成一个随机数**/
    function randomNum(min,max){
      return Math.floor( Math.random()*(max-min)+min);
  }
  /**生成一个随机色**/
  function randomColor(min,max){
      var r = randomNum(min,max);
      var g = randomNum(min,max);
      var b = randomNum(min,max);
      return "rgb("+r+","+g+","+b+")";
  }
  drawPic();
  document.getElementById("canvas").onclick = function(e){
      e.preventDefault();
      drawPic();
  }

  /**绘制验证码图片**/
  function drawPic(){
      var canvas=document.getElementById("canvas");
      var width=canvas.width;
      var height=canvas.height;
      var ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';
      /**绘制背景色**/
      ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
      ctx.fillRect(0,0,width,height);
      /**绘制文字**/
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
      str_txt='';
      for(var i=0; i<4; i++){
          ctx.save();
          var txt = str[randomNum(0,str.length)];
          str_txt +=txt;
          //console.log(str_txt);
          ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
          ctx.font = randomNum(28,40)+'px SimHei'; //随机生成字体大小
          var x = 10+i*25;
          var y = randomNum(25,30);
          var deg = randomNum(-45, 45);
          //修改坐标原点和旋转角度
          ctx.translate(x,y);
          ctx.rotate(deg*Math.PI/180);
          ctx.fillText(txt, 0,0);
          //恢复坐标原点和旋转角度
          ctx.rotate(-deg*Math.PI/180);
          ctx.translate(-x,-y);
          ctx.restore();
      }
      /**绘制干扰线**/
      for(var i=0; i<5; i++){
          ctx.strokeStyle = randomColor(40,180);
          ctx.beginPath();
          ctx.moveTo( randomNum(0,width), randomNum(0,height) );
          ctx.lineTo( randomNum(0,width), randomNum(0,height) );
          ctx.closePath();
          ctx.stroke();
      }
      /**绘制干扰点**/
      for(var i=0; i<100; i++){
          ctx.fillStyle = randomColor(0,255);
          ctx.beginPath();
          ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
          ctx.closePath();
          ctx.fill();
      }
  }
