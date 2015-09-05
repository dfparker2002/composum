<%@page session="false" pageEncoding="utf-8"%>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.2"%>
<%@taglib prefix="cpn" uri="http://sling.composum.com/cpnl/1.0"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<sling:defineObjects/>
<cpn:component id="browser" type="com.composum.sling.core.browser.Browser" scope="request">
  <div id="node-move-dialog" class="dialog modal fade" role="dialog" aria-hidden="true">
    <div class="modal-dialog form-panel">
      <div class="modal-content">
        <form class="widget-form">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Move/Rename Node</h4>
          </div>
          <div class="modal-body">
            <div class="messages">
              <div class="alert"></div>
            </div>

            <div class="form-group">
              <label class="control-label">Move / Rename / Reorder Node</label>
              <div class="path input-group widget path-widget">
                <input name="target-node" class="form-control" data-rules="mandatory" type="text" />
                  <span class="input-group-btn">
                    <button class="select btn btn-default" type="button" title="Select Repository Path">...</button>
                  </span>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Target Path <span>(new parent - move - or new sibling - reorder)</span></label>
              <div class="path input-group widget path-widget">
                <input name="path" class="form-control" data-rules="mandatory" type="text" />
                  <span class="input-group-btn">
                    <button class="select btn btn-default" type="button" title="Select Repository Path">...</button>
                  </span>
              </div>
            </div>
            <div class="form-group">
              <p>
                If you choice 'reorder' (place before) than the node ist moved implicit if the targets parent differs from the nodes current parent.
              </p>
            </div>
            <div class="form-group">
              <label class="control-label">New Node Name <span>(optional - not changed or blank for a simple move)</span></label>
              <input name="name" class="form-control" type="text"
                     placeholder="enter node name" autofocus>
            </div>
            <div class="form-group">
              <p>
                A combination of move/reorder and rename is always possible.
              </p>
            </div>
          </div>

          <div class="modal-footer buttons">
            <button type="button" class="btn btn-default cancel" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary move">move INTO target</button>
            <button type="submit" class="btn btn-primary order">(re)order BEFORE target</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</cpn:component>