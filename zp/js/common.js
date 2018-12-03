//获取页面元素
function $(id){
  if(typeof(id)=="string")return document.getElementById(id);
  
}

//创建异步对象
function createXhr(){
   var xhr=null;
   if(window.XMLHttpRequest){
       var xhr=new XMLHttpRequest(); 
   }else{
       var xhr=new ActiveXObject("Microsoft.XMLHttp");
   }   
   return xhr;
}


















































