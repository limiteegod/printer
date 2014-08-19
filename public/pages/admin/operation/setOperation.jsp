<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.versou.forecast.core.common.OperationType" %>
<%
    OperationType[] arr = OperationType.values();
%>
<html>
<head>
<title>用户登录</title>
<link rel="stylesheet" type="text/css" href="../../../css/site.css"/>
<style type="text/css">
</style>
</head>
<body height="800px">
    <div id="myWindow" class="container" style="width:620px;height:500px;"></div>

    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/setOperation.js"></script>
</body>
</html>
