<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="com.versou.forecast.model.League" %>
<%@ page import="com.versou.forecast.inter.PageInfo" %>
<%
    List<League> leList = (List<League>)request.getAttribute("leagueList");
    PageInfo pi = (PageInfo)request.getAttribute("pageInfo");
%>
<html>
<head>
<title>用户登录</title>
<link rel="stylesheet" type="text/css" href="../../css/site.css"/>
<style type="text/css">

</style>
</head>
<body>
    <input type="hidden" id="page" value="<%=pi.getNumber()%>"/>
    <input type="hidden" id="size" value="<%=pi.getSize()%>"/>
    <%--
    <div class="vs_div_talbe">
        <div class="clearfix"><div class="vs_div_table_head_left">联赛名称</div><div class="vs_div_table_head_content">操作</div></div>
        <%for(League l:leList) {%>
        <div class="clearfix">
            <div class="vs_div_table_content"><%=l.getName()%></div>
            <div class="vs_div_table_content_right">
                <a href="javascript:" class="table_button_edit" dataId="<%=l.getId()%>">编辑</a>
                <a href="javascript:" class="table_button_delete" dataId="<%=l.getId()%>">删除</a>
            </div>
        </div>
        <%}%>
    </div>
    <div>共<%=pi.getTotalPages()%>页,当期第<%=pi.getNumber()+1%>页</div>--%>
    <%--<div id="testTable" class="vs_div_talbe_border">
        <div class="clearfix">
            <div class="vs_div_table_border_head_left"></div>
            <div class="vs_div_table_border_head"></div>
            <div class="vs_div_table_border_head_right"></div>
        </div>
        <div class="clearfix">
            <div class="vs_div_table_border_content_left"></div>
            <div class="vs_div_table_border_content"></div>
            <div class="vs_div_table_border_content_right">
            </div>
        </div>
        <div class="clearfix">
            <div class="vs_div_table_border_bottom_left"></div>
            <div class="vs_div_table_border_bottom"></div>
            <div class="vs_div_table_border_bottom_right">
            </div>
        </div>
    </div>--%>
    <div><input type="button" id="delete" value="删除"/></div>
    <div id="testTable">
    </div>
    <div id="testPanel">
        <p>everything will be ok...</p>
    </div>
    <script type="text/javascript" src="../../js/md5.js"></script>
    <script type="text/javascript" src="../../js/site.js"></script>
    <script type="text/javascript" src="../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/listLeague.js"></script>
</body>
</html>
