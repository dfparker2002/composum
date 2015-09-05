<%@page session="false" pageEncoding="utf-8"%>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.2"%>
<%@taglib prefix="cpn" uri="http://sling.composum.com/cpnl/1.0"%>
<sling:defineObjects/>
<cpn:component id="browser" type="com.composum.sling.core.browser.Browser" scope="request">
  <div class="image detail-panel" data-path="${browser.currentPathUrl}" data-mapped="${browser.currentUrl}">
    <div class="image-toolbar detail-toolbar">
      <div class="btn-group btn-group-sm" role="group">
        <span class="resolver fa fa-external-link btn btn-default" title="Resolver Mapping ON/OFF"></span>
      </div>
      <%--
      <div class="btn-group btn-group-sm" role="group">
        <div class="selectors input-group input-group-sm">
          <span class="input-group-addon" title="Sling selectors">.x.</span>
          <input type="text" class="form-control" placeholder="Sling selectors">
        </div>
      </div>
      --%>
      <div class="btn-group btn-group-sm" role="group">
        <div class="parameters input-group input-group-sm">
          <span class="fa fa-question input-group-addon" title="URL parameters"></span>
          <input type="text" class="form-control" placeholder="URL parameters">
        </div>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <button type="button" class="reload fa fa-refresh btn btn-default" title="Reload"><span class="label">Reload</span></span>
        <button type="button" class="open fa fa-globe btn btn-default" title="Open in a separate view"><span class="label">Open</span></button>
      </div>
    </div>
    <div class="detail-content">
      <div class="image-frame">
        <div class="image-background">
          <img src=""/>
        </div>
      </div>
    </div>
  </div>
</cpn:component>