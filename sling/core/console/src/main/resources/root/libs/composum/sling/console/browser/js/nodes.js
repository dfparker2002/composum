/**
 *
 *
 */
(function(core) {
    'use strict';

    core.nodes = core.nodes || {};

(function(nodes) {

    nodes.getCreateNodeDialog = function() {
        return core.getView('#node-create-dialog', nodes.CreateNodeDialog);
    }

    nodes.getMoveNodeDialog = function() {
        return core.getView('#node-move-dialog', nodes.MoveNodeDialog);
    }

    nodes.getDeleteNodeDialog = function() {
        return core.getView('#node-delete-dialog', nodes.DeleteNodeDialog);
    }

    nodes.CreateNodeDialog = core.components.Dialog.extend({

        initialize: function(options) {
            core.components.Dialog.prototype.initialize.apply(this, [options]);
            this.$form = core.getWidget(this.el, 'form.widget-form', core.components.FormWidget);
            this.$panel = this.$('.form-panel');
            this.$path = this.$('input[name="path"]');
            this.$type = this.$('input[name="type"]');
            this.$name = this.$('input[name="name"]');
            this.$file = this.$('input[name="file"]');
            this.$type.on('change.type', _.bind(this.typeChanged, this));
            this.$file.on('change.file', _.bind(this.fileChanged, this));
            this.$('button.create').click(_.bind(this.createNode, this));
        },

        initParentPath: function(path) {
            this.$path.val(path);
        },

        createNode: function(event) {
            event.preventDefault();
            if (this.$form.isValid()) {
                this.submitForm(function() {
                    core.browser.tree.refresh();
                });
            } else {
                this.alert ('danger', 'a parent path, type and name must be specified');
            }
            return false;
        },

        typeChanged: function() {
            var value = this.$type.val();
            if (value && value.match(/(file|[Rr]esource)$/)) {
                this.setTypeView ('binary');
            } else if (value && !value.match(/^(nt|rep):/)) {
                this.setTypeView ('sling');
            } else if (value && value.match(/^(nt|sling):linked.*/)) {
                this.setTypeView ('linked');
            } else {
                this.setTypeView ('default');
            }
        },

        /**
         * selects the type class of the form panel to switch to the appropriate dialog variation
         */
        setTypeView: function(type) {
            this.$panel.removeClass ('default binary sling linked'); // remove all type classes
            this.$panel.addClass (type); // set the specified type class at the form panel
        },

        fileChanged: function() {
            var fileWidget = this.widgetOf(this.$file);
            var nameWidget = this.widgetOf(this.$name);
            var value = fileWidget.getValue();
            if (value) {
                var name = nameWidget.getValue();
                if (!name) {
                    var match = /^(.*[\\\/])?([^\\\/]+)$/.exec(value);
                    nameWidget.setValue ([match[2]]);
                }
            }
        },

        reset: function() {
            core.components.Dialog.prototype.reset.apply(this);
            this.typeChanged();
        }
    });

    nodes.MoveNodeDialog = core.components.Dialog.extend({

        initialize: function(options) {
            core.components.Dialog.prototype.initialize.apply(this, [options]);
            this.$form = core.getWidget(this.el, 'form.widget-form', core.components.FormWidget);
            this.$node = this.$('input[name="target-node"]');
            this.$path = this.$('input[name="path"]');
            this.$name = this.$('input[name="name"]');
            this.$('button.move').click(_.bind(this.moveNode, this));
            this.$('button.order').click(_.bind(this.reorderNode, this));
        },

        setNode: function(node) {
            this.$node.val(node.path);
            this.$path.val(core.getParentPath(node.path));
            this.$name.val(node.name);
        },

        setValues: function(draggedNode, dropTarget) {
            this.$node.val(draggedNode.path);
            this.$path.val(dropTarget.path);
            this.$name.val(draggedNode.name);
        },

        moveNode: function(event) {
            event.preventDefault();
            this.moveOrReorderNode('move');
            return false;
        },

        reorderNode: function(event) {
            event.preventDefault();
            this.moveOrReorderNode('reorder');
            return false;
        },

        moveOrReorderNode: function(option) {
            var node = this.$node.val();
            if (this.$form.isValid()) {
                this.submitPUT (
                    'reorder node',
                    '/bin/core/node.' + option + '.json' + core.encodePath(node), {
                        name: this.$name.val(),
                        path: this.$path.val()
                    },
                    function() {
                        core.browser.tree.refresh();
                    });
            } else {
                this.alert ('danger', 'a valid target path and the node must be specified');
            }
        }
    });

    nodes.DeleteNodeDialog = core.components.Dialog.extend({

        initialize: function(options) {
            core.components.Dialog.prototype.initialize.apply(this, [options]);
            this.$form = core.getWidget(this.el, 'form.widget-form', core.components.FormWidget);
            this.$path = this.$('input[name="path"]');
            this.$('button.delete').click(_.bind(this.deleteNode, this));
        },

        setNode: function(node) {
            this.$path.val(node.path);
        },

        deleteNode: function(event) {
            event.preventDefault();
            var path = this.$path.val();
            if (this.$form.isValid()) {
                $.ajax({
                    url: "/bin/core/node.json" + core.encodePath(path),
                    type: 'DELETE',
                    complete: _.bind (function (result) {
                        if (result.status == 200) {
                            this.hide();
                            core.browser.tree.refresh();
                        } else {
                            this.alert('danger', 'Error on delete node', result);
                        }
                    }, this)
                });
            } else {
                this.alert('danger','a valid node path must be specified');
            }
            return false;
        }
    });

})(core.nodes);

})(window.core);
