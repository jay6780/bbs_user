/**
 * 调用：
let id=startAnimationFrame(fn,2000);   //执行函数 毫秒 间隔时间非必传

停止 
stopAnimationFrame(id);
 */


//封装动画函数
const rafQueue=[] as any;
let rafId=0; 
const rafStart=function(t:number){
    rafQueue.forEach((o:any)=>{
        if(o.intervalTime==undefined||o.lastTime==0||t-o.lastTime>=o.intervalTime){
            o.fn(t);
            o.lastTime=t;
            return;
        };
    });
    if(rafQueue.length)window.requestAnimationFrame(rafStart);
};


/**
 * 启动动画帧
 * @param fn 回调函数
 * @param intervalTime 时间/毫秒
 * @returns 
 */
export const startAnimationFrame = function(fn:Function,intervalTime:number){
    rafId++;
    rafQueue.push({
        fn,
        intervalTime,
        lastTime:0,
        id:rafId
    });
    if(rafQueue.length==1)window.requestAnimationFrame(rafStart);
    return rafId;
};

/**
 * 停止动画帧
 * @param id 
 */
export const stopAnimationFrame = function(id:number){
    for(let i=0;i<rafQueue.length;i++){
        if(rafQueue[i].id==id){
            rafQueue.splice(i,1);
            break;
        };
    };
};