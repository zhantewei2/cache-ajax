Install:
---
        npm install cache-ajax --save

API:
---
#### CacheAjax
CacheAjax(
    {`_expires`?,`limit`?,`skip`?}={},
    filter?:Function<any>
)
        
        const http=new CacheAjax({_expires:5},result=>JSON.parse(result.content));

- _expires Specify glob expires times`(default 0)` `optional`
- limit capped collection max count`(default 100)` `optional`
- skip `(default 10)` `optional`
- filter
    >glob filter request result


#### http:
http.xhr(`method`,`url`,`params`,`options`)
- method: `post` | `get` | `put`
- url : address
- params: `optional`
- options:
    - headers `optional`
    - expires `optional` (min)
    > If you set it,then the server return information will be cached.
    It won't go through the server again within the next xx minutes
    - key `optional`
    > Specify your key;
#### Simple Instance
```js
import {CacheAjax} from 'cache-ajax';
window['myHttp']=new CacheHttp();

myHttp
.xhr('get','http://localhost:3000/get',{name:1})
.subscribe(
    result=>console.log(result),
    err=>console.log(err)
)
```
#### Advance example:
```js
const sub=myHttp.xhr('post','http://localhost:3000/get',{name:1},{
  headers:{storeCode:1},
  expires:.5
})
let order;
const click=()=>order=sub.subscribe(result=>console.log(result));
const cancel=()=>order.unsubscribe();
```

Queue optimization:
---
If your request takes 5 seconds,you have to disabled `button ` during this times.

Now,you don't need to worry it.

`cacheAjax` will make the last event take effective, before the request completed.

#### Specify key
```
myHttp.xhr('get',address,null,{key:'getUser'})
```
