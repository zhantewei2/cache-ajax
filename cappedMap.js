export class CappedMap{
  constructor(limit=100,skip=10){
    let
      store=new Map(),
      totalLimit=limit+skip,
      useCount=0,
      handleOverflow=()=>{
        if(useCount>=totalLimit){
          let deleteCount=0;
          for(let i of store.keys()){
            store.delete(i);
            if(++deleteCount>=skip){
              useCount=limit;
              break;
            }
          }
        }
      },
      _set=store.set;
    store.set=(key,value)=>{
      handleOverflow();
      _set.call(store,key,value);
      useCount++;
    }
    return store;
  }

}
