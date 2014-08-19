KISSY.use("io,node,json,vs-data-select,vs-round-input,vs-step", function(S, Io, Node, Json, VsDataSelect, VsRoundInput, VsStep){

    var step = new VsStep("#myWindow", {title:"权限设置", width:600, height:480,
        sureEvent:function(data){

        },
        pages:[
            'pages/admin/operation/selectUserType.jsp',
            'pages/admin/operation/selectUserType.jsp'
        ]
    });

});
