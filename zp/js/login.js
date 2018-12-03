    setInterval(
        function(){
            var uname=$('#one').val();
            var upwd=$('#two').val();
            if(uname!=''&&upwd!=''){
            $("#three").addClass("btn")
            }else{
                $("#three").removeClass("btn")
            }
    },300)
$('#three').click(function(){
    console.log(1);
    var uname=$('#one').val();
    var upwd=$('#two').val();
    
    $.ajax({
        url:"http://127.0.0.1:3000/login/login",
        type:"post",
        data:{uname,upwd},
        dataType:"json",
        success:function (res){
            //session!!!!!!!!!!!!!!!
            /*if(res.ok==0){
                $("#signout").show().next().hide();
            }else{
                $("#uname").html(res.uname);
                $("#signout").hide().next().show()
            }
            /////sdasdasdasdsa*/
            if(res.code==404||res.code==402||res.code==301){
                alert(res.msg);
            }else{
                alert(res.msg);
                if(location.search.startsWith("?back=")){
                    var url=location.search.slice(6);
                }else{
                    var url='index.html';
                }
                location.href=url;
            }
        }
    })
})