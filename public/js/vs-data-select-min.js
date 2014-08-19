KISSY.add("vs-data-select", ["./node", "./base", "./vs-round-input"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    var VsRoundInput = require("./vs-round-input");
    function VsDataSelect(container, config) {
        var self = this;
        if (!(self instanceof VsDataSelect)) {
            return new VsDataSelect(container, config);
        }
        /**
         * 容器元素
         * @type {Element}
         */
        self.container = container = S.one(container);
        if (!container) return;
        VsDataSelect.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsDataSelect, Base);

    VsDataSelect.ATTRS = {
        width:{
            value:310
        },
        height:{
            value:310
        },
        click:{
            value:function()
            {
                alert("Ok");
            }
        }
    };

    S.augment(VsDataSelect, {
        _init:function()
        {
            var self = this;
            var width = self.get("width");
            var roundWidth = width - 20;
            var imgUrl = CurSite.getAbsolutePath("img/data_select.png");
            self.container.append('<div class="container" style="float:left;width:' + roundWidth + 'px;"></div>');

            var selectButton = Node.one('<div class="container" style="float:left;cursor:pointer;padding-left:2px;padding-top:5px;width:' + 20 + 'px;"><img width="20px" height="20px" src="' + imgUrl + '"/></div>');
            selectButton.on("click", self.get("click"));
            self.container.append(selectButton);

            var divList = self.container.children();
            var setHDiv = divList[0];

            self.vsRoundInput = new VsRoundInput(setHDiv, {width:roundWidth});
        },
        setData:function(data)
        {
            var self = this;
            self.vsRoundInput.setData(data);
        }
    });
    return VsDataSelect;
});