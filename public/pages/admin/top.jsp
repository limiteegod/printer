<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
    String userId = (String)request.getAttribute("userId");
%>
<html>
<head>
<title>用户登录</title>
<link rel="stylesheet" type="text/css" href="../../css/site.css"/>
<style type="text/css">
</style>
</head>
<body>
    <%if(userId == null || userId.length() == 0) { %>
        <input id="userId" type="hidden" value=""/>
    <%} else {%>
        <input id="userId" type="hidden" value="<%= userId%>"/>
        欢迎您，<%= userId%>
    <%}%>
    <script type="text/javascript" src="../../js/md5.js"></script>
    <script type="text/javascript" src="../../js/site.js"></script>
    <script type="text/javascript" src="../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/top.js"></script>
</body>
</html>
