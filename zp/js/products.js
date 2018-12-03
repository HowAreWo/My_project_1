$(function(){
    if(location.search.indexOf("kwords=")!=-1){
        var kwords=location.search.split("=")[1];
        var jm=decodeURI(kwords)
        var pno=1;
        $.ajax({
            url:"http://127.0.0.1:3000/products",
            type:"get",
            data:{kwords:jm,pno},
            dataType:"json",
            success:function(output){
                console.log(output)
                $(".zp-list-sp").html('')
                for(var i=0;i<output.length;i++){
                   
                $(".zp-list-sp").append(` 
                    <div class="zp-list-sp-1 float-left">
                        <div class="zp-right-img"></div>
                        <dl class="zp-right-dl">
                            <dt>
                                <a href="#" target="_blank">
                                    <img src="${output[i].img1}">
                                </a>
                            </dt>
                            <dd>
                                <p class="zp-list-sp-1-p1" title="${output[i].title}">${output[i].title}</p>
                                <p class="zp-list-sp-1-p2" title="${output[i].subtitle}">  ${output[i].subtitle} </p>
                            </dd>
                            <dd>
                                <p class="zp-nowPrice">￥${output[i].subprice}</p>
                            </dd>
                            <dd>
                                <p class="zp-peopleGood">341人好评</p>
                            </dd>
                            
                        </dl>
                        <!--还没搞出来！！！-->
                        <dd class="zp-cart-show">
                            <p>
                            <span>加入购物车</span>
                            <input type="hidden" name="productExtId" class="productExtId" value="18007">
                            </p>
                        </dd>
                    </div>`
                )}

            }
        })
    }
})