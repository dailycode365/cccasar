var e=0,a=0,m={time:0,realTime:0,deltaTime:0,frameCount:0,maxDeltaTime:.3333333,_update:function(t,i,r){if(!i){r=r||m.maxDeltaTime;var l=t-e;l=Math.min(r,l),m.deltaTime=l,e=t,0===m.frameCount?a=t:(m.time+=l,m.realTime=t-a),++m.frameCount}},_restart:function(a){m.time=0,m.realTime=0,m.deltaTime=0,m.frameCount=0,e=a}};module.exports=m;