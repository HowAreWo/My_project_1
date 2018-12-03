var pid;
var num;
var price;
var title;
var img;

$(function(){
    var pid=location.search.split("=")[1];
    $.ajax({
        url:'http://127.0.0.1:3000/details',
        type:'get',
        data:{pid},
        dataType:'json',
        success:function(result){
            var res=result[0];
            pid=res.pid;
            price=res.subprice.toFixed(2);
            title=res.title;
            img=res.img1;


            $(".zp-xqy-center-2>h1").html(`${res.title}`);
            $(".zp-xqy-center-2>p").html(`${res.subtitle}`);
            $(".zp-scj").html(`${res.price.toFixed(2)}`);
            $(".zp-red-jg>span").html(`${res.subprice.toFixed(2)}`);
            $(".g-cx-2 b").html(`${(res.price-res.subprice).toFixed(2)}`);
            $(".g-pp").html(`
                <ul class="clearfix">
                <li>
                    <span class="g-hl">品牌</span>
                    <span class="g-con">${res.brand}</span>
                </li>
                <li>
                    <span class="g-hl">净含量</span>
                    <span class="g-con">${res.spec}</span>
                </li>
                <li>
                    <span class="g-hl">商品编号</span>
                    <span class="g-con">${res.iname}</span>
                </li>
                </ul>
            `)
            $(".zp-sm-img").html(`
                <ul>
                    <li class="active">
                        <img src="${res.img1}" alt="">
                    </li>
                    <li>
                        <img src="${res.img2}" alt="">
                    </li>
                    <li>
                        <img src="${res.img3}" alt="">
                    </li>
                    <li>
                        <img src="${res.img4}" alt="">
                    </li>
                    <li>
                        <img src="${res.img5}" alt="">
                    </li>
                    <li>
                        <img src="${res.img6}" alt="">
                    </li>
                </ul>
            `)
            $(".big-img>ul>li").html(`<img src="${res.img1}" alt="">`)
            $(".zp-sm-img img").click(function(){
                $(".zp-sm-img .active").removeClass("active")
                $(this).parent().addClass("active")
                $(".big-img img").attr("src",$(this).attr("src"))
            })
            $(".sm-img a:first-child").click(function(){
                var img=$(".zp-sm-img .active")
                if(img.prev().length>0){
                    img.removeClass("active");
                    img.prev().addClass("active")
                    $(".big-img img").attr("src",img.prev().children().attr("src"))
                }
            })
            $(".sm-img a:last-child").click(function(){
                var img=$(".zp-sm-img .active")
                if(img.next().length>0){
                    img.removeClass("active");
                    img.next().addClass("active")
                    $(".big-img img").attr("src",img.next().children().attr("src"))
                }
            })


            $(".g-cart").click(function(){
                num=$(".g-input").val();
                $.ajax({
                    url:"http://127.0.0.1:3000/gwc",
                    type:"post",
                    data:{pid,num,price,title,img},
                    dataType:"json",
                    success:function(res){
                        if(res.ok==-1){
                            alert("请登录");
                        }else{
                            alert("添加成功")

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
                        }
                    }
                })
            })

            $(".g-input").next().click(function(){
                $(".g-input").val(parseInt($(".g-input").val())+1)
            })
            $(".g-input").prev().click(function(){
                if($(".g-input").val()>1){
                    $(".g-input").val(parseInt($(".g-input").val())-1)
                }
            })
        }
    }) 
})




















