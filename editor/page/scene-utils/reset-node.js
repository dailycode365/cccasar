var e=["_name","_objFlags","_parent","_children","_tag","name","parent","uuid","children","childrenCount","active","activeInHierarchy","_active","_components","_prefab","_persistNode"],n=["_name","_objFlags","node","name","uuid","__scriptAsset","_enabled","enabled","enabledInHierarchy","_isOnLoadCalled","__eventTargets"];function t(e,n){var t=e.constructor,r={},o=new t;return t.__props__.forEach(function(t){-1===n.indexOf(t)&&(cc.Class.attr(e,t)&&(r[t]=o[t]))}),r}_Scene.resetNode=function(n){var r=t(n,e);_Scene._UndoImpl.restoreObject(n,r)},_Scene.resetComponent=function(e){var r=t(e,n);try{_Scene._UndoImpl.restoreObject(e,r)}catch(n){return cc._throw(n),Editor.error(`Failed to reset the component ${cc.js.getClassName(e)}, if you can't easily fix it, you can implement the "onRestore" function in the component.`),void 0}cc.director._nodeActivator.resetComp(e)};