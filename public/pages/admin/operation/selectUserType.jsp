<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.versou.forecast.core.common.SystemUserType" %>
<%
    SystemUserType[] arr = SystemUserType.values();
%>
<html>
<head>
<title>选择用户类型</title>
<link rel="stylesheet" type="text/css" href="../../../css/site.css"/>
<style type="text/css">
</style>
</head>
<body height="800px">

    <input id="backValue" type="hidden" value="{}"/>
    <table>
        <tr><td>类型*</td><td>
            <select id="type" name="type">
                <%for(int i = 0; i < arr.length; i++) {%>
                    <option value="<%=arr[i].getCode()%>"><%=arr[i].getDesc()%></option>
                <%}%>
            </select>
        </td></tr>
    </table>

    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/selectUserType.js"></script>
</body>
</html>
