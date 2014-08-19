<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="org.codehaus.jackson.JsonNode" %>
<%@ page import="org.codehaus.jackson.node.ArrayNode" %>
<%@ page import="com.mcp.admin.util.GameUtil" %>
<%@ page import="com.mcp.admin.util.DateConvert" %>
<%@ page import="com.mcp.admin.util.StatusUtil" %>
<%@ page import="com.mcp.core.util.StringUtil" %>
<%@ page import="com.mcp.core.util.cons.TermReportType" %>
<%@ page import="com.mcp.core.util.cons.TOrderType" %>
<%
    JsonNode bodyNode = (JsonNode)request.getAttribute("termData");
    JsonNode termInfoBodyNode = (JsonNode)request.getAttribute("termInfoData");
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
    <table>
        <tr>
            <td width="122px"><select id="gameCode"></select></td>
            <td>期次:</td>
            <td><div id="termCode" class="container"/></td>
            <td><input id="search" type="button" value="查询"/></td>
        </tr>
    </table>
    <%
        if(bodyNode != null)
        {
            ArrayNode rstNode = (ArrayNode)bodyNode.get("rst");
            if(rstNode.size() > 0)
            {
                JsonNode termNode = rstNode.get(0);
    %>
                <div id="detail" class="container" title="详细信息">
                    <table>
                        <tr><td>游戏：</td><td><%=GameUtil.getNameByCode(termNode.get("gameCode").getTextValue())%></td></tr>
                        <tr><td>期号：</td><td><%=termNode.get("code").getTextValue()%></td></tr>
                        <tr>
                            <td>开售时间：</td>
                            <td><%=DateConvert.getCommonDate(termNode.get("openTime").getTextValue())%></td>
                        </tr>
                        <tr>
                            <td>停售时间：</td>
                            <td><%=DateConvert.getCommonDate(termNode.get("endTime").getTextValue())%></td>
                        </tr>
                        <tr>
                            <td>状态：</td>
                            <td><%=termNode.get("status").getIntValue()%>(<%=StatusUtil.getTermStatusDes(termNode.get("status").getIntValue())%>)</td>
                        </tr>
                    </table>
                </div>
    <%
            }
        }
    %>

    <!--报表信息 -->
    <%if(termInfoBodyNode != null){
        ArrayNode termInfoRstNode = (ArrayNode)termInfoBodyNode.get("reportList");
    %>

    <div id="refundDetail" class="container" title="退款信息">
        <table style="text-align: left">
            <tr><td width="80px">渠道</td><td width="80px">类型</td><td width="80px">票据数目</td><td width="80px">票据金额</td><td width="80px">订单数目</td><td width="80px">订单金额</td></tr>
            <%
                long allTicketCount = 0, allTicketAmount = 0, allOrderCount = 0, allOrderAmount = 0;
                for(JsonNode rptNode:termInfoRstNode)
                {
                    int rptType = rptNode.get("rptType").getIntValue();
                    if(TermReportType.values()[rptType] == TermReportType.SALE) {
                        allTicketCount += rptNode.get("ticketRefundCount").getLongValue();
                        allTicketAmount += rptNode.get("ticketRefundAmount").getLongValue();
                        allOrderCount += rptNode.get("orderRefundCount").getLongValue();
                        allOrderAmount += rptNode.get("orderRefundAmount").getLongValue();
            %>
            <tr>
                <td><%=rptNode.get("channelCode").getTextValue()%></td>
                <td><%=TOrderType.values()[rptNode.get("type").getIntValue()].getDesc()%></td>
                <td><%=rptNode.get("ticketRefundCount").getLongValue()%></td>
                <td><%=rptNode.get("ticketRefundAmount").getLongValue()%></td>
                <td><%=rptNode.get("orderRefundCount").getLongValue()%></td>
                <td><%=rptNode.get("orderRefundAmount").getLongValue()%></td>
            </tr>
            <%
                    }
                }
            %>
        </table>
        <table style="border-top:1px solid #28afae;">
            <tr>
                <td width="160px" colspan="2">总计</td>
                <td width="80px"><%=allTicketCount%></td>
                <td width="80px"><%=allTicketAmount%></td>
                <td width="80px"><%=allOrderCount%></td>
                <td width="80px"><%=allOrderAmount%></td>
            </tr>
        </table>
    </div>

    <br/>

    <!-- 出票信息 -->
    <div id="printDetail" class="container" title="出票信息(票级别)">
        <table style="text-align: left;width:800px;">
            <tr><td>出票中心</td><td>票据中奖数目</td><td>中奖票据销售额</td><td>票据未中奖数目</td><td>未中奖票据销售额</td><td>税后奖金</td><td>税前奖金</td></tr>
            <%
                long allTicketPrintHitCount = 0, allTicketPrintHitAmount = 0, allTicketPrintNotHitCount = 0, allTicketPrintNotHitAmount = 0, allTicketPrintBonus = 0, allTicketPrintBonusBeforeTax = 0;
                for(JsonNode rptNode:termInfoRstNode)
                {
                    int rptType = rptNode.get("rptType").getIntValue();
                    if(TermReportType.values()[rptType] == TermReportType.PRINT) {
                        allTicketPrintHitCount += rptNode.get("ticketHitCount").getLongValue();
                        allTicketPrintHitAmount += rptNode.get("ticketHitAmount").getLongValue();
                        allTicketPrintNotHitCount += rptNode.get("ticketNotHitCount").getLongValue();
                        allTicketPrintNotHitAmount += rptNode.get("ticketNotHitAmount").getLongValue();
                        allTicketPrintBonus += rptNode.get("ticketHitBonus").getLongValue();
                        allTicketPrintBonusBeforeTax += rptNode.get("ticketHitBonusBeforeTax").getLongValue();
            %>
            <tr>
                <td><%=rptNode.get("channelCode").getTextValue()%></td>
                <td><%=rptNode.get("ticketHitCount").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("ticketNotHitCount").getLongValue()%></td>
                <td><%=rptNode.get("ticketNotHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitBonus").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitBonusBeforeTax").getLongValue()%></td>
            </tr>
            <%
                    }
                }
            %>
            <tr>
                <td colspan="1" class="table_bottom_sum_td">总计</td>
                <td class="table_bottom_sum_td"><%=allTicketPrintHitCount%></td>
                <td class="table_bottom_sum_td"><%=allTicketPrintHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allTicketPrintNotHitCount%></td>
                <td class="table_bottom_sum_td"><%=allTicketPrintNotHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allTicketPrintBonus%></td>
                <td class="table_bottom_sum_td"><%=allTicketPrintBonusBeforeTax%></td>
            </tr>
        </table>
    </div>

    <br/>

    <!-- 中奖信息(票级别) -->
    <div id="hitDetail" class="container" title="中奖信息(票级别)">
        <table style="text-align: left;width:800px;">
            <tr><td>渠道</td><td>类型</td><td>票据中奖数目</td><td>中奖票据销售额</td><td>票据未中奖数目</td><td>未中奖票据销售额</td><td>税后奖金</td><td>税前奖金</td></tr>
            <%
                long allTicketHitCount = 0, allTicketHitAmount = 0, allTicketNotHitCount = 0, allTicketNotHitAmount = 0, allTicketBonus = 0, allTicketBonusBeforeTax = 0;
                for(JsonNode rptNode:termInfoRstNode)
                {
                    int rptType = rptNode.get("rptType").getIntValue();
                    if(TermReportType.values()[rptType] == TermReportType.SALE) {
                        allTicketHitCount += rptNode.get("ticketHitCount").getLongValue();
                        allTicketHitAmount += rptNode.get("ticketHitAmount").getLongValue();
                        allTicketNotHitCount += rptNode.get("ticketNotHitCount").getLongValue();
                        allTicketNotHitAmount += rptNode.get("ticketNotHitAmount").getLongValue();
                        allTicketBonus += rptNode.get("ticketHitBonus").getLongValue();
                        allTicketBonusBeforeTax += rptNode.get("ticketHitBonusBeforeTax").getLongValue();
            %>
            <tr>
                <td><%=rptNode.get("channelCode").getTextValue()%></td>
                <td><%=TOrderType.values()[rptNode.get("type").getIntValue()].getDesc()%></td>
                <td><%=rptNode.get("ticketHitCount").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("ticketNotHitCount").getLongValue()%></td>
                <td><%=rptNode.get("ticketNotHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitBonus").getLongValue()%></td>
                <td><%=rptNode.get("ticketHitBonusBeforeTax").getLongValue()%></td>
            </tr>
            <%
                    }
                }
            %>
            <tr>
                <td colspan="2" class="table_bottom_sum_td">总计</td>
                <td class="table_bottom_sum_td"><%=allTicketHitCount%></td>
                <td class="table_bottom_sum_td"><%=allTicketHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allTicketNotHitCount%></td>
                <td class="table_bottom_sum_td"><%=allTicketNotHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allTicketBonus%></td>
                <td class="table_bottom_sum_td"><%=allTicketBonusBeforeTax%></td>
            </tr>
        </table>
    </div>

    <br/>

    <!-- 中奖信息(订单级别) -->
    <div id="hitOrderDetail" class="container" title="中奖信息(订单级别)">
        <table style="text-align: left;width:800px;">
            <tr><td>渠道</td><td>类型</td><td>订单中奖数目</td><td>中奖订单销售额</td><td>订单未中奖数目</td><td>未中奖订单销售额</td><td>税后奖金</td><td>税前奖金</td></tr>
            <%
                long allOrderHitCount = 0, allOrderHitAmount = 0, allOrderNotHitCount = 0, allOrderNotHitAmount = 0, allOrderBonus = 0, allOrderBonusBeforeTax = 0;
                for(JsonNode rptNode:termInfoRstNode)
                {
                    int rptType = rptNode.get("rptType").getIntValue();
                    if(TermReportType.values()[rptType] == TermReportType.SALE) {
                        allOrderHitCount += rptNode.get("orderHitCount").getLongValue();
                        allOrderHitAmount += rptNode.get("orderHitAmount").getLongValue();
                        allOrderNotHitCount += rptNode.get("orderNotHitCount").getLongValue();
                        allOrderNotHitAmount += rptNode.get("orderNotHitAmount").getLongValue();
                        allOrderBonus += rptNode.get("orderHitBonus").getLongValue();
                        allOrderBonusBeforeTax += rptNode.get("orderHitBonusBeforeTax").getLongValue();
            %>
            <tr>
                <td><%=rptNode.get("channelCode").getTextValue()%></td>
                <td><%=TOrderType.values()[rptNode.get("type").getIntValue()].getDesc()%></td>
                <td><%=rptNode.get("orderHitCount").getLongValue()%></td>
                <td><%=rptNode.get("orderHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("orderNotHitCount").getLongValue()%></td>
                <td><%=rptNode.get("orderNotHitAmount").getLongValue()%></td>
                <td><%=rptNode.get("orderHitBonus").getLongValue()%></td>
                <td><%=rptNode.get("orderHitBonusBeforeTax").getLongValue()%></td>
            </tr>
            <%
                    }
                }
            %>
            <tr>
                <td colspan="2" class="table_bottom_sum_td">总计</td>
                <td class="table_bottom_sum_td"><%=allOrderHitCount%></td>
                <td class="table_bottom_sum_td"><%=allOrderHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allOrderNotHitCount%></td>
                <td class="table_bottom_sum_td"><%=allOrderNotHitAmount%></td>
                <td class="table_bottom_sum_td"><%=allOrderBonus%></td>
                <td class="table_bottom_sum_td"><%=allOrderBonusBeforeTax%></td>
            </tr>
        </table>
    </div>

    <!--报表信息 -->
    <%}%>

    <script type="text/javascript" src="../../../js/md5.js"></script>
    <script type="text/javascript" src="../../../js/site.js"></script>
    <script type="text/javascript" src="../../../js/seed-min.js"></script>
    <script type="text/javascript" src="./js/detailInfo.js"></script>
</body>
</html>
