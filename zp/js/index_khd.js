function ddd(res,min,max,d){
    for(var i=min;i<=max;i++){
        $(d).append(`
        <a href="zp-xqy.html?pid=${res[i].pid}" target="_blank" class="zy-a1">
            <div>
                <img src="${res[i].img1}" >
            </div>
            <p title="${res[i].title}">${res[i].title}</p>
            <p title="${res[i].subtitle}">${res[i].subtitle}</p>
            <p>￥${(res[i].subprice).toFixed(2)}</p>
        </a>
        `)
    }
}


$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/index",
        type:"get",
        success:function(res){
            console.log(res);
            $(".zp-zyhc-center").html("");
            /*for(var i=0;i<6;i++){    
                $(".zp-zyhc-center").append(`
                <a href="#" target="_blank" class="zy-a1">
                    <div>
                        <img src="${res[i].img1}" alt="">
                    </div>
                    <p title="${res[i].title}">${res[i].title}</p>
                    <p title="${res[i].subtitle}">${res[i].subtitle}</p>
                    <p>${(res[i].subprice).toFixed(2)}</p>
                </a>
                `)
            }*/
            ddd(res,0,5,".d1");
            ddd(res,6,11,".d2");
            ddd(res,12,17,".d3");
        }
    })
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
                    <a href="#">欢迎：${res.uname}</a> <a href="#" class="signout">注销</a>
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
        }
    })
})

$(".login_t").on("click",".signout",function(){
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