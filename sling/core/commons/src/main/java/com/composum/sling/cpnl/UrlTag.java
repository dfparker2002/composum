package com.composum.sling.cpnl;

import com.composum.sling.clientlibs.processor.RendererContext;
import com.composum.sling.core.BeanContext;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import java.io.IOException;

/**
 * an abstract base tag implementation to generate URL based elements
 */
public abstract class UrlTag extends CpnlBodyTagSupport {

    private static final Logger LOG = LoggerFactory.getLogger(UrlTag.class);

    private String tagName;
    private String urlAttr;
    private String url;
    private Boolean map;
    private String role;
    private String classes;

    protected abstract String getDefaultTagName();

    protected abstract String getDefaultUrlAttr();

    public void setUrl(String url) {
        this.url = url;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    protected String getTagName() {
        return StringUtils.isNotBlank(tagName) ? tagName : getDefaultTagName();
    }

    public void setUrlAttr(String urlAttr) {
        this.urlAttr = urlAttr;
    }

    protected String getUrlAttr() {
        return StringUtils.isNotBlank(urlAttr) ? urlAttr : getDefaultUrlAttr();
    }

    public void setMap(Boolean mapIt) {
        this.map = mapIt;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    protected void clear() {
        super.clear();
        tagName = null;
        urlAttr = null;
        url = null;
        map = null;
        role = null;
        classes = null;
    }

    protected void writeAttributes(JspWriter writer) throws IOException {
        RendererContext rendererContext = RendererContext.instance(new BeanContext.Page(pageContext), request);
        writer.write(" ");
        writer.write(getUrlAttr());
        writer.write("=\"");
        String urlValue = null;
        if (map != null) {
            urlValue = map
                    ? CpnlElFunctions.mappedUrl(request, url)
                    : CpnlElFunctions.unmappedUrl(request, url);
        } else {
            urlValue = CpnlElFunctions.url(request, url);
        }
        writer.write(urlValue);
        writer.write("\"");
        if (StringUtils.isNotBlank(role)) {
            writer.write(" role=\"");
            writer.write(role);
            writer.write("\"");
        }
        if (StringUtils.isNotBlank(classes)) {
            writer.write(" class=\"");
            writer.write(classes);
            writer.write("\"");
        }
    }

    @Override
    public int doStartTag() throws JspException {
        super.doStartTag();
        try {
            JspWriter writer = this.pageContext.getOut();
            writer.write("<");
            writer.write(getTagName());
            writeAttributes(writer);
            writer.write(">");
        } catch (IOException ioex) {
            LOG.error(ioex.getMessage(), ioex);
        }
        return EVAL_BODY_INCLUDE;
    }

    @Override
    public int doEndTag() throws JspException {
        try {
            JspWriter writer = this.pageContext.getOut();
            writer.write("</");
            writer.write(getTagName());
            writer.write(">");
        } catch (IOException ioex) {
            LOG.error(ioex.getMessage(), ioex);
        }
        super.doEndTag();
        return EVAL_PAGE;
    }
}
