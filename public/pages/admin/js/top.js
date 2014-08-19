KISSY.use('base, node, event', function(S, Base, Node, Event) {
    var userId = Node.one("#userId").val();
    if(userId.length == 0)
    {
        parent.window.location = CurSite.getAbsolutePath("pages/admin/login.html");
    }
});