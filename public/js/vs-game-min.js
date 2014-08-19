KISSY.add("vs-game", ["./node", "./base"], function(S, require) {
    var Node = require("./node");
    var Base = require("./base");
    function VsGame(container, config) {
        var self = this;
        if (!(self instanceof VsGame)) {
            return new VsGame(container, config);
        }
        VsGame.superclass.constructor.call(self, config);
        self._init();
    };

    S.extend(VsGame, Base);

    VsGame.ATTRS = {

    };

    S.augment(VsGame, {
        _init:function()
        {
            var self = this;
            self.games = [{code:'T01', name:"大乐透"}, {code:"T02", name:"七星彩"}, {code:"T03", name:"排列三"}, {code:"T04", name:"排列五"}, {code:"T05", name:"11选5"}, {code:"F01", name:"双色球"}, {code:"F02", name:"福彩3d"}, {code:"F03", name:"七乐彩"}, {code:"T53", name:"胜负彩"}, {code:"T54", name:"进球彩"}, {code:"T51", name:"竞彩足球"}];

        },
        getNameByCode:function(gameCode)
        {
            var self = this;
            var games = self.games;
            for(var i = 0; i < games.length; i++)
            {
                if(games[i].code == gameCode)
                {
                    return games[i].name;
                }
            }
        },
        getAll:function()
        {
            var self = this;
            return self.games;
        }
    });

    return VsGame;
});