<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.mcp.core.util.cons.GameType" %>
<%
    int gameType = (Integer)request.getAttribute("gameType");
%>
<html>
<head>
<title>期次详细信息</title>
<link rel="stylesheet" type="text/css" href="../../../css/site.css"/>
<style type="text/css">
</style>
</head>
<body height="800px">
    <input type="hidden" id="gameType" value="<%=gameType%>"/>
    <input type="hidden" id="vsgame" value=""/>

    游戏类型:<%=GameType.values()[gameType].getDesc()%>
    <div id="termTable" class="container"></div>

    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/onSale.js"></script>
</body>
</html>
