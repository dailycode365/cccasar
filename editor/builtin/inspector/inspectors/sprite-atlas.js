(()=>{"use strict";return{dependencies:["packages://inspector/share/meta-header.js"],template:'\n      <cc-meta-header id="header"\n        :target="target"\n        icon="unpack://static/icon/assets/sprite-atlas.png"\n      ></cc-meta-header>\n\n      <div class="props flex-1">\n        <ui-prop name="Raw Texture File" type="asset" assetType="texture" v-value="target.rawTextureUuid"></ui-prop>\n        <ui-prop name="Type" type="string" v-value="target.type" readonly></ui-prop>\n        <ui-prop name="Width" type="number" v-value="target.size.width" readonly></ui-prop>\n        <ui-prop name="Height" type="number" v-value="target.size.height" readonly></ui-prop>\n      </div>\n    ',ready(){},methods:{}}})();