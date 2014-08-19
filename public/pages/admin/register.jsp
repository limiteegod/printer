<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%String resPath = (String)request.getAttribute("resPath");String basePath = (String)request.getAttribute("basePath");%>
<html>
<head>
<title>用户注册</title>
<link rel="stylesheet" type="text/css" href="<%=resPath%>/css/site.css"/>
<style type="text/css">

</style>
</head>
<body>
    <table>
        <tr><td>用户名</td><td><input id="name" type="text"/></td></tr>
        <tr><td>密码</td><td><input id="pwd" type="password"/></td></tr>
    </table>
    <button class="continue"></button>

    <script type="text/javascript" src="<%=resPath%>/js/md5.js"></script>
    <script type="text/javascript" src="<%=resPath%>/js/site.js"></script>
    <script type="text/javascript" src="<%=resPath%>/js/seed-min.js"></script>
    <script type="text/javascript" src="./js/register.js"></script>
</body>
</html>
