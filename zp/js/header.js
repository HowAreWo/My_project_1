$(function(){
    $("#head").load("../zp-header.html")
})


$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/login/islogin",
        type:"get",
        success:function(res){
            if(res.ok == 1){
                $(".login_f").removeClass("active");
                $(".login_t").addClass("active");
                $(".login_t").html(`
                    <a href="#">欢迎：${res.uname}</a> <a href="" class="signout">注销</a>
                `)

                $(".num").addClass("headerCartNum");
                $(".cart-num>a").attr("href","zp-gwc.html");
                $.ajax({
                    url:"http://127.0.0.1:3000/login/gwcNum",
                    type:"get",
                    success:function(res){
                        var num=0;
                        for(var i=0;i<res.length;i++){
                            num += res[i].num;
                        }
                        $(".num").html(num);
                    }
                })

            }else{
                $(".num").removeClass("headerCartNum");
            }
            $(".signout").click(function(){
                console.log(1);
                $.ajax({
                    url:"http://127.0.0.1:3000/login/signout",
                    type:"get",
                    success:function(){
                        $(".login_f").addClass("active");
                        $(".login_t").removeClass("active");
                        $(".num").removeClass("headerCartNum");
                    }
                })
            })
            $(".search-btn").click(function(){
                var inp=$(".search-text").val();
                var zm=encodeURI(inp)
                if(inp!=''){
                    location.href="/zp-list.html?kwords="+zm;
                }else{
                    alert("请输入关键词");
                }
            })
        }
    })
})



