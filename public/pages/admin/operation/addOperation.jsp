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
    <div id="myWindow" class="container"></div>
    <table>
        <tr><td>名称*</td><td><div id="name" class="container"></div></td></tr>
        <tr><td>父级*</td><td><div id="dataSelect"></div></td></tr>
        <tr><td>url*</td><td><div id="url" class="container"></div></td></tr>
        <tr><td>类型*</td><td>
            <select id="type" name="type">
                <%for(int i = 0; i < arr.length; i++) {%>
                    <option value="<%=arr[i].getCode()%>"><%=arr[i].getDesc()%></option>
                <%}%>
            </select>
        </td></tr>
    </table>
    <button id="submit">提交</button>

    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/addOperation.js"></script>
</body>
</html>
