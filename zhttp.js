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
      let sendQuery='';
      if(params&&method==='get')address=address+'?'+queryStringify(params)
      
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
        if(method!=='get'){
          sendQuery=(params instanceof Object)?JSON.stringify(params):(params||'');
          headers=Object.assign({'Content-type':'application/json'},headers)
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
