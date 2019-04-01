"use strict";const e=Editor.require("scene://utils/scene");module.exports={"create-nodes-by-uuids"(n,o,t,c,d){e.createNodes(o,t,c,d)},"create-node-by-classid"(n,o,t,c,d){Editor.Ipc.sendToMain("metrics:track-event",{category:"Scene",action:"Node Prefab Add",label:"Empty"}),e.createNodeByClassID(o,t,c,d)},"create-node-by-prefab"(n,o,t,c,d){Editor.Ipc.sendToMain("metrics:track-event",{category:"Scene",action:"Node Prefab Add",label:o.replace("New ","")}),e.createNodeByPrefab(o,t,c,d)},"new-property"(n,o){e.createProperty(o.id,o.path,o.type)},"reset-property"(n,o){e.resetProperty(o.id,o.path,o.type)},"set-property"(n,o){e.setProperty(o);let t=cc.engine.getInstanceById(o.id);t&&setTimeout(()=>{Editor.Ipc.sendToAll("scene:node-component-updated",{node:t.node?t.node.uuid:t.id,component:t.node?o.id:null,property:t.path,value:o.value})},100)},"add-component"(n,o,t){o||(o=Editor.Selection.curActivate("node")),Editor.Ipc.sendToMain("metrics:track-event",{category:"Scene",action:"Component Add",label:t}),e.addComponent(o,t),Editor.Ipc.sendToAll("scene:node-component-added",{node:o,component:t})},"remove-component"(n,o,t){e.removeComponent(o,t),Editor.Ipc.sendToAll("scene:node-component-removed",{node:o,component:t})},"reset-node"(e,n){let o=cc.engine.getInstanceById(n);o&&(_Scene.Undo.recordNode(o.uuid,"Reset Node"),_Scene.resetNode(o),_Scene.Undo.commit())},"reset-all"(e,n){let o=cc.engine.getInstanceById(n);if(o){_Scene.Undo.recordNode(o.uuid,"Reset All"),_Scene.resetNode(o);for(var t=0;t<o._components.length;++t)_Scene.resetComponent(o._components[t]);_Scene.Undo.commit()}},"move-up-component"(e,n,o){let t=cc.engine.getInstanceById(n),c=cc.engine.getInstanceById(o);if(!t||!c)return;let d=t._components.indexOf(c);if(d<=0)return;let r=d-1;t._components.splice(d,1),t._components.splice(r,0,c)},"move-down-component"(e,n,o){let t=cc.engine.getInstanceById(n),c=cc.engine.getInstanceById(o);if(!t||!c)return;let d=t._components.indexOf(c);if(d>=t._components.length)return;let r=d+1;t._components.splice(d,1),t._components.splice(r,0,c)},"reset-component"(e,n,o){let t=cc.engine.getInstanceById(o);t&&(_Scene.Undo.recordNode(n,"Reset Component"),_Scene.resetComponent(t),_Scene.Undo.commit())},"copy-component"(n,o){e.copyComponent(o)},"paste-component"(n,o,t){e.pasteComponent(o,t)},"move-nodes"(n,o,t,c){e.moveNodes(o,t,c)},"delete-nodes"(n,o){e.deleteNodes(o)},"copy-nodes"(n,o){e.copyNodes(o)},"paste-nodes"(n,o){e.pasteNodes(o)},"duplicate-nodes"(n,o){e.duplicateNodes(o)},"create-prefab"(e,n,o){_Scene.createPrefab(n,o)},"apply-prefab"(e,n){_Scene.applyPrefab(n)},"revert-prefab"(e,n){_Scene.revertPrefab(n)},"set-prefab-sync"(e,n){_Scene.setPrefabSync(n)},"break-prefab-instance"(){let e=Editor.Selection.curSelection("node");_Scene.breakPrefabInstance(e)},"link-prefab"(){_Scene.linkPrefab()},"regenerate-polygon-points"(e,n){var o=cc.engine.getInstanceById(n);o&&o.resetPointsByContour&&o.resetPointsByContour()},"search-skeleton-animation-clips"(e,n){var o=cc.engine.getInstanceById(n);o&&o.searchClips&&o.searchClips()},"change-node-lock"(e,n,o){let t=cc.engine.getInstanceById(n);t instanceof cc.Node&&(void 0===o&&(o=!(t._objFlags&cc.Object.Flags.LockedInEditor)),_Scene.Undo.recordNode(t.uuid),t._objFlags=o?t._objFlags|cc.Object.Flags.LockedInEditor:t._objFlags^cc.Object.Flags.LockedInEditor,_Scene.Undo.commit())}};