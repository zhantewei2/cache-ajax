import {Observable} from 'rxjs/Observable';

export const queryStringify=obj=>{
  if(!obj)return '';
  let str='';
  for(let i in obj){
    str+=i+'='+obj[i]+'&'
  }
  return str.slice(0,-1);
}

export class httpBase{
  constructor(){
    const xhr=new XMLHttpRequest();
    this.send=(method,address,params,headers={})=> {
      method=method.toLowerCase();
      let query,sendQuery='';
      if(params)query=queryStringify(params);
      return Observable.create((ob) => {
        xhr.onreadystatechange = () => {
          if(xhr.readyState===4){
            if(xhr.status===0){
              console.error('connect failure,status:'+xhr.status)
              return ob.error('err')
            }
            ob.next({status:xhr.status,content:xhr.responseText})
          }
        };
        if(method==='get'){
          if(query)address+='?'+query;
        }else{
          sendQuery=query;
          headers=Object.assign({'Content-type':'application/x-www-form-urlencoded'},headers)
        }
        //unsubscribe abort xhr:
        const old=ob.unsubscribe;
        ob.unsubscribe=()=>{
          xhr.abort();
          old.call(ob);
        };

        //send msg:
        xhr.open(method, address);
        for(let i in headers){
          xhr.setRequestHeader(i,headers[i]);
        }
        xhr.send(sendQuery);

      })
    }
  }
}
