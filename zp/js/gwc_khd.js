$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/goGwc",
        type:"get",
        success:function(res){
            console.log(res);
            if(res.ok==1){
                $(".zp-kgwc").addClass("active")
                $(".zp-gwc").removeClass("active")
            }else{
                $(".zp-kgwc").removeClass("active")
                $(".zp-gwc").addClass("active")
            }
            for(var i=0;i<res.length;i++){
                $(".zp-gwc-top").after(`
                    <div class="zp-gwc-center">
                        <div>
                            <label for="zp-k" class="zp-check zp-k-left zp-back">
                            <img src="">
                            </label>
                        </div>
                        <div style="background-color: #fff8f0">
                            <ul>
                                <a href="#">
                                    <li class="float-left">
                                        <img src="${res[i].img_gwc}">
                                    </li>
                                </a>
                                <li class="float-left">
                                    <p class="ms-info" title="${res[i].title_gwc}">
                                    ${res[i].title_gwc}
                                    </p>
                                    <p>
                                        ZRXZ1390-125
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p>
                                ￥<span class="zp-danjia">${res[i].price_gwc}</span>
                            </p>
                        </div>
                        <div>
                            <button class="jian" data-pid="${res[i].sid}">-</button>
                            <input type="text" readonly value="${res[i].num}">
                            <button class="jia" data-pid="${res[i].sid}">+</button>
                        </div>
                        <div>
                            <p>￥
                                <span class="zp-zongjia">${res[i].price_gwc * res[i].num}</span>
                            </p>

                        </div>
                        <div>
                            <div class="g-shanchu" data-pid="${res[i].sid}"></div>
                        </div>
                    </div>
                `)
            }

            /*全选事件*/
            $(".zp-all").click(function(){
                if($(this).find("img").attr('src')==''){
                    $(this).find('img').attr('src','../img/dui.png')
                    $(".zp-k-left").find("img").attr("src","../img/dui.png")
                    qx();
                }else{
                    $(this).find('img').attr('src','')
                    $(".zp-k-left").find("img").attr("src","")
                    $(".red-money>span").html((0).toFixed(2));
                    $(".zp-sp>span").html("0");
                }
            })
            $(".zp-k-left").click(function(){
               
                if($(this).find("img").attr('src')==''){
                    $(this).find('img').attr('src','../img/dui.png')
                }else{
                    $(this).find('img').attr('src','')
                    $(".zp-all").find("img").attr("src","")
                }
                dx();
                var a=$(".zp-k-left");
                var is=true;
                for(var i=0;i<a.length;i++){
                    if($(a[i]).find("img").attr("src")==""){
                        is=false;
                    }
                }
                if(is){
                    $(".zp-all").find("img").attr("src","../img/dui.png")
                    qx();
                }else{
                    $(".zp-all").find("img").attr("src","")
                }
            })

            function qx(){             
                var zj=$(".zp-zongjia");
                var num=0;
                for(var i=0;i<zj.length;i++){
                    num +=parseFloat($(zj[i]).html());
                }
                $(".red-money>span").html(num.toFixed(2));
                
                var zs=$(".jian").next();
                num=0;
                for(var i=0;i<zs.length;i++){
                    num +=parseInt($(zs[i]).val())
                }
                $(".zp-sp>span").html(num);
            }

            function dx(){
                var dxk=$(".zp-k-left");
                var num=0;
                for(var i=0;i<dxk.length;i++){
                    if($(dxk[i]).find("img").attr("src")!=""){
                     var n= parseFloat($(dxk[i]).parent().next().next().next().next().children().children().html());
                     num +=n;
                    }
                }
                $(".red-money>span").html(num.toFixed(2));

                
                num = 0;
                for(var i=0;i<dxk.length;i++){
                    if($(dxk[i]).find("img").attr("src")!=""){
                    var n =$(dxk[i]).parent().next().next().next().children().eq(1).val();
                    num += parseInt(n);
                    }
                }
                $('.zp-sp>span').html(num);
            }

            /*删除点击事件*/
            $(".g-shanchu").click(function(){
                var sid=$(this).attr("data-pid");
                $.ajax({
                    url:"http://127.0.0.1:3000/shanchu",
                    type:"post",
                    data:{sid},
                    dataType:"json",
                    success:function(){  
                        location.href="zp-gwc.html";
                    }
                })
            })
            /*加减事件*/ 
            $(".jian").click(function(){
                var sid=$(this).attr("data-pid");
                var s= -1;
                $.ajax({
                    url:"http://127.0.0.1:3000/getNum",
                    type:"post",
                    data:{sid,s},
                    dataType:"json",
                    success:(res)=>{
                        if(res.ok == 1){
                            $(this).next().val(res.num);
                            $(this).parent().next().children().children().html(($(this).parent().prev().children().children().html()*res.num).toFixed(2))
                            $(".num").html(parseInt($(".num").html())-1);
                            dx();
                        }else{
                            location.href="zp-gwc.html";
                        }   
                    }
                })
            })

            /*加*/
            $(".jia").click(function(){
                var sid=$(this).attr("data-pid");
                var s= 1;
                $.ajax({
                    url:"http://127.0.0.1:3000/getNum",
                    type:"post",
                    data:{sid,s},
                    dataType:"json",
                    success:(res)=>{
                        if(res.ok == 1){
                            $(this).prev().val(res.num);
                            $(this).parent().next().children().children().html(($(this).parent().prev().children().children().html()*res.num).toFixed(2))
                            $(".num").html(parseInt($(".num").html())+1);
                            dx();
                        }else{
                            location.href="zp-gwc.html";
                        }   
                    }
                })
            })
        }
    })
})
