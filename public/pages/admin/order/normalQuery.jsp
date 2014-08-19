<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.mcp.core.util.cons.GameType" %>
<%@ page import="com.mcp.core.util.cons.SchemeType" %>
<%@ page import="org.springframework.mock.web.MockJspWriter" %>
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

    <input id="frameId" type="hidden" value="<%=(String)request.getAttribute("frameId")%>"/>
    <input id="gameCodeFromServer" type="hidden" value="<%=(String)request.getAttribute("gameCode")%>"/>
    <input id="termCodeFromServer" type="hidden" value="<%=(String)request.getAttribute("termCode")%>"/>
    <input id="schemeIdFromServer" type="hidden" value="<%=(String)request.getAttribute("schemeId")%>"/>

    <table>
        <tr>
            <td width="122px"><select id="gameCode">
                <option value="-1">所有</option>
            </select></td>
            <td>期次:</td>
            <td width="200px"><div id="termCode" class="container"/></td>
            <td>方案id:</td>
            <td width="200px"><div id="schemeId" class="container"/></td>
            <td>方案类型:</td>
            <td width="200px"><select id="schemeType">
                <option value="-1">所有</option>
                <%
                    SchemeType[] schemeTypes = SchemeType.values();
                    for(SchemeType type:schemeTypes)
                    {
                        out.print("<option value=\"" + type.ordinal() + "\">" + type.getDesc() + "</option>");
                    }
                %>
            </select></td>
            <td><input id="search" type="button" value="查询"/></td>
        </tr>
    </table>

    <div id="gridTable" class="container">
        <table>
            <thead><tr><td>id</td><td>操作</td></tr></thead>
            <tbody><tr><td>a</td><td><input type="button" value="确定"/></td></tr></tbody>
            <tfoot><tr><td>总计</td><td>id</td></tr></tfoot>
        </table>
    </div>


    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/normalQuery.js"></script>
</body>
</html>
