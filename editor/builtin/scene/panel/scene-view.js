(function(){"use strict";const i=Editor.require("scene://edit-mode"),e=Editor.require("packages://scene/grid"),t=Editor.require("packages://scene/gizmo");window.customElements.define("scene-grid",e),window.customElements.define("scene-gizmo",t),Editor.polymerElement({listeners:{mousedown:"_onMouseDown",mousewheel:"_onMouseWheel",mousemove:"_onMouseMove",mouseleave:"_onMouseLeave",keydown:"_onKeyDown",keyup:"_onKeyUp"},properties:{scale:{type:Number,value:1},mode:{type:String,value:"scene"}},_policy:null,ready:function(){var i=[0,1,1],e=[1,0,1];this.$.grid.setScaleH([5,2],.01,1e3),this.$.grid.setMappingH(i[0],i[1],i[2]),this.$.grid.setScaleV([5,2],.01,1e3),this.$.grid.setMappingV(e[0],e[1],e[2]),this.$.grid.setAnchor(.5,.5),this.addEventListener("mousedown",this._onCaptureMousedown.bind(this),!0),this.$.editButtons.addEventListener("mousedown",i=>i.stopPropagation())},_T:function(i){return Editor.T(i)},detached:function(){clearInterval(this._initTimer)},init:function(){this._initTimer=setInterval(()=>{let i=this.getBoundingClientRect();0===i.width&&0===i.height||(clearInterval(this._initTimer),cc.engine.isInitialized?(this.fire("engine-ready"),this.fire("scene-view-ready"),this._resize()):this._initEngine(()=>{this.$.gizmosView.sceneToPixel=this.sceneToPixel.bind(this),this.$.gizmosView.worldToPixel=this.worldToPixel.bind(this),this.$.gizmosView.pixelToScene=this.pixelToScene.bind(this),this.$.gizmosView.pixelToWorld=this.pixelToWorld.bind(this),this._resize()}))},100);var i=cc.ContainerStrategy.extend({apply:function(i,e){var t,s,n=i._frameSize.width,o=i._frameSize.height,r=cc.game.container.style,c=e.width,h=e.height,d=n/c,a=o/h;d<a?(t=n,s=h*d):(t=c*a,s=o),t=n-2*Math.round((n-t)/2),s=o-2*Math.round((o-s)/2),this._setupContainer(i,t,s),r.margin="0"}});this._policy=new cc.ResolutionPolicy(new i,cc.ContentStrategy.SHOW_ALL)},initPosition:function(i,e,t){this.scale=t,this.$.grid.xAxisSync(i,t),this.$.grid.yAxisSync(e,t),this.$.grid.repaint(),this.$.gizmosView.scale=t;["_position","_rotationX","_rotationY","_scaleX","_scaleY","_skewX","_skewY","_name"].forEach(function(i){cc.Class.Attr.setClassAttr(cc.Scene,i,"serializable",!1)});var s=cc.director.getScene();s.setScale(this.$.grid.xAxisScale,this.$.grid.yAxisScale,this.scale),s.setPosition(this.$.grid.xDirection*this.$.grid.xAxisOffset,this.$.grid.yDirection*this.$.grid.yAxisOffset),cc.engine.repaintInEditMode()},_resize:function(){let i=this.getBoundingClientRect();if((0!==i.width||0!==i.height)&&(this.$.grid.resize(),this.$.grid.repaint(),this.$.gizmosView.resize(),cc.engine.isInitialized)){var e=cc.director.getScene();e&&(cc.view.setCanvasSize(i.width,i.height),cc.view.setDesignResolutionSize(i.width,i.height,this._policy||cc.ResolutionPolicy.SHOW_ALL),e.setScale(this.$.grid.xAxisScale,this.$.grid.yAxisScale,this.scale),e.setPosition(this.$.grid.xDirection*this.$.grid.xAxisOffset,this.$.grid.yDirection*this.$.grid.yAxisOffset),cc.engine.repaintInEditMode())}},_initEngine:function(i){var e=this.$["engine-canvas"],t=this.getBoundingClientRect();e.width=t.width,e.height=t.height;var s=Editor.remote._projectProfile,n={id:"engine-canvas",width:t.width,height:t.height,designWidth:t.width,designHeight:t.height,groupList:s.data["group-list"],collisionMatrix:s.data["collision-matrix"]};cc.engine.init(n,()=>{this.fire("engine-ready"),_Scene.initScene(e=>{if(e)return this.fire("scene-view-init-error",e),void 0;this.fire("scene-view-ready"),i&&i()})})},adjustToCenter:function(i,e){var t,s,n,o,r;if(e)n=e.width,o=e.height,t=e.x,s=e.y;else{var c=cc.engine.getDesignResolutionSize();n=c.width,o=c.height,t=0,s=0}var h=this.getBoundingClientRect(),d=h.width-2*i,a=h.height-2*i;if(n<=d&&o<=a)r=1;else{var l=Editor.Utils.fitSize(n,o,d,a);r=l[0]<l[1]?n<=0?1:l[0]/n:o<=0?1:l[1]/o,n=l[0],o=l[1]}this.initPosition(this.$.grid.xDirection*((h.width-n)/2-t*r),this.$.grid.yDirection*((h.height-o)/2-s*r),r)},sceneToPixel:function(i){return cc.v2(this.$.grid.valueToPixelH(i.x),this.$.grid.valueToPixelV(i.y))},worldToPixel:function(i){var e=cc.director.getScene();if(e){var t=e.convertToNodeSpaceAR(i);return this.sceneToPixel(t)}return this.sceneToPixel(i)},pixelToScene:function(i){return cc.v2(this.$.grid.pixelToValueH(i.x),this.$.grid.pixelToValueV(i.y))},pixelToWorld:function(i){var e=cc.director.getScene();return e?cc.v2(e.convertToWorldSpaceAR(this.pixelToScene(i))):this.pixelToScene(i)},_onCaptureMousedown:function(i){if(3===i.which||2===i.which||this.movingScene)return i.stopPropagation(),Editor.UI.startDrag("-webkit-grabbing",i,(i,e,t)=>{this.$.grid.pan(e,t),this.$.grid.repaint(),cc.director.getScene().setPosition(this.$.grid.xDirection*this.$.grid.xAxisOffset,this.$.grid.yDirection*this.$.grid.yAxisOffset),cc.engine.repaintInEditMode()},i=>{i.shiftKey?this.style.cursor="-webkit-grab":this.style.cursor=""}),void 0},_onMouseDown:function(i){if(i.stopPropagation(),1===i.which){var e=!1,t=Editor.Selection.curSelection("node");(i.metaKey||i.ctrlKey)&&(e=!0);var s=i.offsetX,n=i.offsetY;Editor.UI.startDrag("default",i,function(i,o,r,c,h){if(!(c*c+h*h<4)){var d=s,a=n;c<0&&(d+=c,c=-c),h<0&&(a+=h,h=-h),this.$.gizmosView.updateSelectRect(d,a,c,h);var l,g,u=_Scene.rectHitTest(d,a,c,h);if(e)for(g=t.slice(),l=0;l<u.length;++l)-1===g.indexOf(u[l].uuid)&&g.push(u[l].uuid);else for(g=[],l=0;l<u.length;++l)g.push(u[l].uuid);Editor.Selection.select("node",g,!0,!1)}}.bind(this),function(i,o,r,c,h){if(c*c+h*h>=4)return Editor.Selection.confirm(),this.$.gizmosView.fadeoutSelectRect(),void 0;var d=_Scene.hitTest(s,n);if(!d)return Editor.Selection.clear("node"),void 0;let a=d;for(;a;){if(a._objFlags&cc.Object.Flags.LockedInEditor)return;a=a.parent}if(!e)return Editor.Selection.select("node",d.uuid,!0,!0),void 0;-1===t.indexOf(d.uuid)?Editor.Selection.select("node",d.uuid,!1,!0):Editor.Selection.unselect("node",d.uuid,!0)}.bind(this))}},_onMouseWheel:function(i){i.stopPropagation();var e=Editor.Utils.smoothScale(this.scale,i.wheelDelta);e=Editor.Math.clamp(e,this.$.grid.hticks.minValueScale,this.$.grid.hticks.maxValueScale),this.scale=e,this.$.grid.xAxisScaleAt(i.offsetX,e),this.$.grid.yAxisScaleAt(i.offsetY,e),this.$.grid.repaint(),this.$.gizmosView.scale=e;var t=cc.director.getScene();t.setScale(this.$.grid.xAxisScale,this.$.grid.yAxisScale,this.scale),t.setPosition(this.$.grid.xDirection*this.$.grid.xAxisOffset,this.$.grid.yDirection*this.$.grid.yAxisOffset),cc.engine.repaintInEditMode()},_onMouseMove:function(i){if(i.stopPropagation(),this.movingScene)return;var e=_Scene.hitTest(i.offsetX,i.offsetY);if(!e||!e.uuid)return;let t=e;for(;t;){if(t._objFlags&cc.Object.Flags.LockedInEditor)return;t=t.parent}Editor.Selection.hover("node",e.uuid)},_onMouseLeave:function(){Editor.Selection.hover("node",null)},_onKeyDown:function(i){i.stopPropagation(),"space"===Editor.KeyCode(i.which)&&(this.style.cursor="-webkit-grab",this.movingScene=!0)},_onKeyUp:function(i){i.stopPropagation(),"space"===Editor.KeyCode(i.which)&&(this.style.cursor="",this.movingScene=!1)},_inEditMode:function(i){return"scene"!==i},_editModeIcon:function(i){return"scene"===i?"":Editor.url(`app://editor/builtin/scene/icon/${i}.png`)},_onSaveEditMode:function(){i.save()},_onCloseEditMode:function(){i.pop()},_scales:[.25,.33,.5,.67,.75,.8,.9,1,1.1,1.25,1.5,1.75,2,3,4,5],zoomTo(i,e,t){this.scale=i,e=void 0!==e?e:this.offsetWidth/2|0,t=void 0!==t?t:this.offsetHeight/2|0,this.$.grid.xAxisScaleAt(e,i),this.$.grid.yAxisScaleAt(t,i),this.$.grid.repaint(),this.$.gizmosView.scale=i;var s=cc.director.getScene();s.setScale(this.$.grid.xAxisScale,this.$.grid.yAxisScale,this.scale),s.setPosition(this.$.grid.xDirection*this.$.grid.xAxisOffset,this.$.grid.yDirection*this.$.grid.yAxisOffset),cc.engine.repaintInEditMode()},zoomUp(){let i=this.scale;for(let e=0;e<this._scales.length;e++)if(i<this._scales[e])return this.zoomTo(this._scales[e])},zoomDown(){let i=this.scale;for(let e=this._scales.length-1;e>=0;e--)if(i>this._scales[e])return this.zoomTo(this._scales[e])},zoomReset(){this.zoomTo(1)}})})();