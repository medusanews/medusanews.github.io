function jBox(type, options) {
    this.options = {
        id: null,
        width: 'auto',
        height: 'auto',
        minWidth: null,
        maxHeight: null,
        minWidth: null,
        maxHeight: null,
        attach: null,
        trigger: 'click',
        preventDefault: false,
        title: null,
        content: null,
        getTitle: null,
        getContent: null,
        ajax: {
            url: null,
            data: '',
            reload: false,
            getData: 'data-ajax',
            setContent: true,
            spinner: true
        }, target: null,
        position: {
            x: 'center',
            y: 'center'
        }, outside: null,
        offset: 0,
        attributes: {
            x: 'left',
            y: 'top'
        }, adjustPosition: false,
        adjustTracker: false,
        adjustDistance: 5,
        fixed: false,
        reposition: false,
        pointer: false,
        pointTo: 'target',
        fade: 180,
        animation: null,
        theme: 'Default',
        addClass: '',
        overlay: false,
        zIndex: 10000,
        delayOpen: 0,
        delayClose: 0,
        closeOnEsc: false,
        closeOnClick: false,
        closeOnMouseleave: false,
        closeButton: false,
        constructOnInit: false,
        blockScroll: false,
        appendTo: jQuery('body'),
        draggable: null,
        dragOver: true,
        onInit: function () {}, onCreated: function () {}, onOpen: function () {}, onClose: function () {}, onCloseComplete: function () {}, confirmButton: 'Submit',
        cancelButton: 'Cancel',
        autoClose: 10000,
        color: null,
        stack: true,
        audio: false,
        volume: 100,
        src: 'href',
        gallery: 'data-jbox-image',
        imageLabel: 'title',
        imageFade: 600,
        imageSize: 'cover'
    };
    this.defaultOptions = {
        'Tooltip': {
            getContent: 'title',
            trigger: 'mouseenter',
            position: {
                x: 'center',
                y: 'top'
            }, outside: 'y',
            pointer: true,
            adjustPosition: true,
            reposition: true
        }, 'Mouse': {
            target: 'mouse',
            position: {
                x: 'right',
                y: 'bottom'
            }, offset: 15,
            trigger: 'mouseenter',
            adjustPosition: 'flip'
        }, 'Modal': {
            target: jQuery(window),
            fixed: true,
            blockScroll: true,
            closeOnEsc: true,
            closeOnClick: 'overlay',
            closeButton: true,
            overlay: true,
            animation: 'zoomOut'
        }, 'Confirm': {
            target: jQuery(window),
            fixed: true,
            attach: jQuery('[data-confirm]'),
            getContent: 'data-confirm',
            content: 'Do you really want to do this?',
            minWidth: 320,
            maxWidth: 460,
            blockScroll: true,
            closeOnEsc: true,
            closeOnClick: 'overlay',
            closeButton: true,
            overlay: true,
            animation: 'zoomOut',
            preventDefault: true,
            _onAttach: function (el) {
                var submit = el.attr('onclick') ? el.attr('onclick') : (el.attr('href') ? (el.attr('target') ? 'window.open("' + el.attr('href') + '", "' + el.attr('target') + '");' : 'window.location.href = "' + el.attr('href') + '";') : '');
                el.prop('onclick', null).data('jBox-Confirm-submit', submit)
            }, _onCreated: function () {
                this.footer = jQuery('<div class="jBox-Confirm-footer"/>');
                jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-cancel"/>').html(this.options.cancelButton).click(function () {
                    this.close()
                }.bind(this)).appendTo(this.footer);
                this.submitButton = jQuery('<div class="jBox-Confirm-button jBox-Confirm-button-submit"/>').html(this.options.confirmButton).appendTo(this.footer);
                this.footer.appendTo(this.container)
            }, _onOpen: function () {
                this.submitButton.off('click.jBox-Confirm' + this.id).on('click.jBox-Confirm' + this.id, function () {
                    eval(this.source.data('jBox-Confirm-submit'));
                    this.close()
                }.bind(this))
            }
        }, 'Notice': {
            target: jQuery(window),
            fixed: true,
            position: {
                x: 20,
                y: 20
            }, attributes: {
                x: 'right',
                y: 'top'
            }, animation: 'zoomIn',
            closeOnClick: 'box',
            _onInit: function () {
                this.open();
                this.options.delayClose = this.options.autoClose;
                this.options.delayClose && this.close()
            }, _onCreated: function () {
                this.options.color && this.wrapper.addClass('jBox-Notice-color jBox-Notice-' + this.options.color);
                this.wrapper.data('jBox-Notice-position', this.options.attributes.x + '-' + this.options.attributes.y)
            }, _onOpen: function () {
                jQuery.each(jQuery('.jBox-Notice'), function (index, el) {
                    el = jQuery(el);
                    if (el.attr('id') == this.id || el.data('jBox-Notice-position') != this.options.attributes.x + '-' + this.options.attributes.y) return;
                    if (!this.options.stack) {
                        el.data('jBox').close({
                            ignoreDelay: true
                        });
                        return
                    }
                    el.css('margin-' + this.options.attributes.y, parseInt(el.css('margin-' + this.options.attributes.y)) + this.wrapper.outerHeight() + 10)
                }.bind(this));
                this.options.audio && this.audio({
                    url: this.options.audio,
                    valume: this.options.volume
                })
            }, _onCloseComplete: function () {
                this.destroy()
            }
        }, 'Image': {
            target: jQuery(window),
            fixed: true,
            blockScroll: true,
            closeOnEsc: true,
            closeOnClick: 'overlay',
            closeButton: true,
            overlay: true,
            animation: 'zoomOut',
            width: 800,
            height: 533,
            attach: jQuery('[data-jbox-image]'),
            preventDefault: true,
            _onInit: function () {
                this.images = this.currentImage = {};
                this.imageZIndex = 1;
                jQuery.each(this.attachedElements, function (index, item) {
                    item = jQuery(item);
                    if (item.data('jBox-image-gallery')) return;
                    var gallery = item.attr(this.options.gallery) || 'default';
                    !this.images[gallery] && (this.images[gallery] = []);
                    this.images[gallery].push({
                        src: item.attr(this.options.src),
                        label: (item.attr(this.options.imageLabel) || '')
                    });
                    this.options.imageLabel == 'title' && item.removeAttr('title');
                    item.data('jBox-image-gallery', gallery);
                    item.data('jBox-image-id', (this.images[gallery].length - 1))
                }.bind(this));
                var appendImage = function (gallery, id, preload, open) {
                    if (jQuery('#jBox-image-' + gallery + '-' + id).length) return;
                    var image = jQuery('<div/>', {
                        id: 'jBox-image-' + gallery + '-' + id,
                        'class': 'jBox-image-container'
                    }).css({
                        backgroundImage: 'url(' + this.images[gallery][id].src + ')',
                        backgroundSize: this.options.imageSize,
                        opacity: (open ? 1 : 0),
                        zIndex: (preload ? 0 : this.imageZIndex++)
                    }).appendTo(this.content);
                    var text = jQuery('<div/>', {
                        id: 'jBox-image-label-' + gallery + '-' + id,
                        'class': 'jBox-image-label' + (open ? ' active' : '')
                    }).html(this.images[gallery][id].label).appendTo(this.imageLabel);
                    !open && !preload && image.animate({
                        opacity: 1
                    }, this.options.imageFade)
                }.bind(this);
                var showLabel = function (gallery, id) {
                    jQuery('.jBox-image-label.active').removeClass('active');
                    jQuery('#jBox-image-label-' + gallery + '-' + id).addClass('active')
                };
                this.showImage = function (img) {
                    if (img != 'open') {
                        var gallery = this.currentImage.gallery;
                        var id = this.currentImage.id + (1 * (img == 'prev') ? -1 : 1);
                        id = id > (this.images[gallery].length - 1) ? 0 : (id < 0 ? (this.images[gallery].length - 1) : id)
                    } else {
                        var gallery = this.source.data('jBox-image-gallery');
                        var id = this.source.data('jBox-image-id');
                        jQuery('.jBox-image-pointer-prev, .jBox-image-pointer-next').css({
                            display: (this.images[gallery].length > 1 ? 'block' : 'none')
                        })
                    }
                    this.currentImage = {
                        gallery: gallery,
                        id: id
                    };
                    if (jQuery('#jBox-image-' + gallery + '-' + id).length) {
                        jQuery('#jBox-image-' + gallery + '-' + id).css({
                            zIndex: this.imageZIndex++,
                            opacity: 0
                        }).animate({
                            opacity: 1
                        }, (img == 'open') ? 0 : this.options.imageFade);
                        showLabel(gallery, id)
                    } else {
                        this.wrapper.addClass('jBox-loading');
                        var image = jQuery('<img src="' + this.images[gallery][id].src + '">').load(function () {
                            appendImage(gallery, id, false);
                            showLabel(gallery, id);
                            this.wrapper.removeClass('jBox-loading')
                        }.bind(this))
                    }
                    var next_id = id + 1;
                    next_id = next_id > (this.images[gallery].length - 1) ? 0 : (next_id < 0 ? (this.images[gallery].length - 1) : next_id);
                    (!jQuery('#jBox-image-' + gallery + '-' + next_id).length) && jQuery('<img src="' + this.images[gallery][next_id].src + '">').load(function () {
                        appendImage(gallery, next_id, true)
                    })
                }
            }, _onCreated: function () {
                this.imageLabel = jQuery('<div/>', {
                    'id': 'jBox-image-label'
                }).appendTo(this.wrapper);
                this.wrapper.append(jQuery('<div/>', {
                    'class': 'jBox-image-pointer-prev',
                    click: function () {
                        this.showImage('prev')
                    }.bind(this)
                })).append(jQuery('<div/>', {
                    'class': 'jBox-image-pointer-next',
                    click: function () {
                        this.showImage('next')
                    }.bind(this)
                }))
            }, _onOpen: function () {
                jQuery('body').addClass('jBox-image-open');
                jQuery(document).on('keyup.jBox-' + this.id, function (ev) {
                    (ev.keyCode == 37) && this.showImage('prev');
                    (ev.keyCode == 39) && this.showImage('next')
                }.bind(this));
                this.showImage('open')
            }, _onClose: function () {
                jQuery('body').removeClass('jBox-image-open');
                jQuery(document).off('keyup.jBox-' + this.id)
            }, _onCloseComplete: function () {
                this.wrapper.find('.jBox-image-container').css('opacity', 0)
            }
        }
    };
    if (jQuery.type(type) == 'string') {
        this.type = type;
        type = this.defaultOptions[type]
    }
    this.options = jQuery.extend(true, this.options, type, options);
    if (this.options.id === null) {
        this.options.id = 'jBoxID' + jBox._getUniqueID()
    }
    this.id = this.options.id;
    ((this.options.position.x == 'center' && this.options.outside == 'x') || (this.options.position.y == 'center' && this.options.outside == 'y')) && (this.options.outside = false);
    (!this.options.outside || this.options.outside == 'xy') && (this.options.pointer = false);
    jQuery.type(this.options.offset) != 'object' && (this.options.offset = {
        x: this.options.offset,
        y: this.options.offset
    });
    this.options.offset.x || (this.options.offset.x = 0);
    this.options.offset.y || (this.options.offset.y = 0);
    jQuery.type(this.options.adjustDistance) != 'object' && (this.options.adjustDistance = {
        top: this.options.adjustDistance,
        right: this.options.adjustDistance,
        bottom: this.options.adjustDistance,
        left: this.options.adjustDistance
    });
    this.align = (this.options.outside && this.options.outside != 'xy') ? this.options.position[this.options.outside] : (this.options.position.y != 'center' && jQuery.type(this.options.position.y) != 'number' ? this.options.position.x : (this.options.position.x != 'center' && jQuery.type(this.options.position.x) != 'number' ? this.options.position.y : this.options.attributes.x));
    this.options.outside && this.options.outside != 'xy' && (this.outside = this.options.position[this.options.outside]);
    var userAgent = navigator.userAgent.toLowerCase();
    this.IE8 = userAgent.indexOf('msie') != -1 && parseInt(userAgent.split('msie')[1]) == 8;
    this.prefix = userAgent.indexOf('webkit') != -1 ? '-webkit-' : '';
    this._getOpp = function (opp) {
        return {
            left: 'right',
            right: 'left',
            top: 'bottom',
            bottom: 'top',
            x: 'y',
            y: 'x'
        }[opp]
    };
    this._getXY = function (xy) {
        return {
            left: 'x',
            right: 'x',
            top: 'y',
            bottom: 'y',
            center: 'x'
        }[xy]
    };
    this._getTL = function (tl) {
        return {
            left: 'left',
            right: 'left',
            top: 'top',
            bottom: 'top',
            center: 'left',
            x: 'left',
            y: 'top'
        }[tl]
    };
    this._create = function () {
        if (this.wrapper) return;
        this.wrapper = jQuery('<div/>', {
            id: this.id,
            'class': 'jBox-wrapper' + (this.type ? ' jBox-' + this.type : '') + (this.options.theme ? ' jBox-' + this.options.theme : '') + (this.options.addClass ? ' ' + this.options.addClass : '') + (this.IE8 ? ' jBox-IE8' : '')
        }).css({
            position: (this.options.fixed ? 'fixed' : 'absolute'),
            display: 'none',
            opacity: 0,
            zIndex: this.options.zIndex
        }).data('jBox', this);
        this.options.closeOnMouseleave && this.wrapper.mouseleave(function (ev) {
            !this.source || !(ev.toElement == this.source[0] || jQuery.inArray(this.source[0], jQuery(ev.toElement).parents('*')) !== -1) && this.close()
        }.bind(this));
        (this.options.closeOnClick == 'box') && this.wrapper.on('touchend click', function () {
            this.close({
                ignoreDelay: true
            })
        }.bind(this));
        this.container = jQuery('<div/>', {
            'class': 'jBox-container'
        }).appendTo(this.wrapper);
        this.content = jQuery('<div/>', {
            'class': 'jBox-content'
        }).css({
            width: this.options.width,
            height: this.options.height,
            minWidth: this.options.minWidth,
            minHeight: this.options.minHeight,
            maxWidth: this.options.maxWidth,
            maxHeight: this.options.maxHeight
        }).appendTo(this.container);
        if (this.options.closeButton) {
            this.closeButton = jQuery('<div/>', {
                'class': 'jBox-closeButton jBox-noDrag'
            }).on('touchend click', function (ev) {
                this.isOpen && this.close({
                    ignoreDelay: true
                })
            }.bind(this));
            var closeButtonSVG = this._createSVG('svg', [
                ['viewBox', '0 0 24 24']
            ]);
            this._appendSVG(this._createSVG('path', [
                ['d', 'M22.2,4c0,0,0.5,0.6,0,1.1l-6.8,6.8l6.9,6.9c0.5,0.5,0,1.1,0,1.1L20,22.3c0,0-0.6,0.5-1.1,0L12,15.4l-6.9,6.9c-0.5,0.5-1.1,0-1.1,0L1.7,20c0,0-0.5-0.6,0-1.1L8.6,12L1.7,5.1C1.2,4.6,1.7,4,1.7,4L4,1.7c0,0,0.6-0.5,1.1,0L12,8.5l6.8-6.8c0.5-0.5,1.1,0,1.1,0L22.2,4z']
            ]), closeButtonSVG);
            this.closeButton.append(closeButtonSVG);
            if (this.options.closeButton == 'box' || (this.options.closeButton === true && !this.options.overlay && !this.options.title)) {
                this.wrapper.addClass('jBox-closeButton-box');
                this.closeButton.appendTo(this.container)
            }
        }
        this.wrapper.appendTo(this.options.appendTo);
        if (this.options.pointer) {
            this.pointer = {
                position: (this.options.pointTo != 'target') ? this.options.pointTo : this._getOpp(this.outside),
                xy: (this.options.pointTo != 'target') ? this._getXY(this.options.pointTo) : this._getXY(this.outside),
                align: 'center',
                offset: 0
            };
            this.pointer.element = jQuery('<div/>', {
                'class': 'jBox-pointer jBox-pointer-' + this.pointer.position
            }).appendTo(this.wrapper);
            this.pointer.dimensions = {
                x: this.pointer.element.outerWidth(),
                y: this.pointer.element.outerHeight()
            };
            if (jQuery.type(this.options.pointer) == 'string') {
                var split = this.options.pointer.split(':');
                split[0] && (this.pointer.align = split[0]);
                split[1] && (this.pointer.offset = parseInt(split[1]))
            }
            this.pointer.alignAttribute = (this.pointer.xy == 'x' ? (this.pointer.align == 'bottom' ? 'bottom' : 'top') : (this.pointer.align == 'right' ? 'right' : 'left'));
            this.wrapper.css('padding-' + this.pointer.position, this.pointer.dimensions[this.pointer.xy]);
            this.pointer.element.css(this.pointer.alignAttribute, (this.pointer.align == 'center' ? '50%' : 0)).css('margin-' + this.pointer.alignAttribute, this.pointer.offset);
            this.pointer.margin = {};
            this.pointer.margin['margin-' + this.pointer.alignAttribute] = this.pointer.offset;
            (this.pointer.align == 'center') && this.pointer.element.css(this.prefix + 'transform', 'translate(' + (this.pointer.xy == 'y' ? (this.pointer.dimensions.x * -0.5 + 'px') : 0) + ', ' + (this.pointer.xy == 'x' ? (this.pointer.dimensions.y * -0.5 + 'px') : 0) + ')');
            this.pointer.element.css((this.pointer.xy == 'x' ? 'width' : 'height'), parseInt(this.pointer.dimensions[this.pointer.xy]) + parseInt(this.container.css('border-' + this.pointer.alignAttribute + '-width')));
            this.wrapper.addClass('jBox-pointerPosition-' + this.pointer.position)
        }
        this.setContent(this.options.content, true);
        this.setTitle(this.options.title, true);
        if (this.options.draggable) {
            var handle = (this.options.draggable == 'title') ? this.titleContainer : (this.options.draggable.length > 0 ? this.options.draggable : (this.options.draggable.selector ? jQuery(this.options.draggable.selector) : this.wrapper));
            handle.addClass('jBox-draggable').on('mousedown', function (ev) {
                if (ev.button == 2 || jQuery(ev.target).hasClass('jBox-noDrag') || jQuery(ev.target).parents('.jBox-noDrag').length) return;
                if (this.options.dragOver && this.wrapper.css('zIndex') <= jBox.zIndexMax) {
                    jBox.zIndexMax += 1;
                    this.wrapper.css('zIndex', jBox.zIndexMax)
                }
                var drg_h = this.wrapper.outerHeight(),
                    drg_w = this.wrapper.outerWidth(),
                    pos_y = this.wrapper.offset().top + drg_h - ev.pageY,
                    pos_x = this.wrapper.offset().left + drg_w - ev.pageX;
                jQuery(document).on('mousemove.jBox-draggable-' + this.id, function (ev) {
                    this.wrapper.offset({
                        top: ev.pageY + pos_y - drg_h,
                        left: ev.pageX + pos_x - drg_w
                    })
                }.bind(this));
                ev.preventDefault()
            }.bind(this)).on('mouseup', function () {
                jQuery(document).off('mousemove.jBox-draggable-' + this.id)
            }.bind(this));
            jBox.zIndexMax = !jBox.zIndexMax ? this.options.zIndex : Math.max(jBox.zIndexMax, this.options.zIndex)
        }(this.options.onCreated.bind(this))();
        this.options._onCreated && (this.options._onCreated.bind(this))()
    };
    this.options.constructOnInit && this._create();
    this.options.attach && this.attach();
    this._positionMouse = function (ev) {
        this.pos = {
            left: ev.pageX,
            top: ev.pageY
        };
        var setPosition = function (a, p) {
            if (this.options.position[p] == 'center') {
                this.pos[a] -= Math.ceil(this.dimensions[p] / 2);
                return
            }
            this.pos[a] += (a == this.options.position[p]) ? ((this.dimensions[p] * -1) - this.options.offset[p]) : this.options.offset[p];
            return this.pos[a]
        }.bind(this);
        this.wrapper.css({
            left: setPosition('left', 'x'),
            top: setPosition('top', 'y')
        });
        this.targetDimensions = {
            x: 0,
            y: 0,
            left: ev.pageX,
            top: ev.pageY
        };
        this._adjustPosition()
    };
    this._attachEvents = function () {
        this.options.closeOnEsc && jQuery(document).on('keyup.jBox-' + this.id, function (ev) {
            if (ev.keyCode == 27) {
                this.close({
                    ignoreDelay: true
                })
            }
        }.bind(this));
        if (this.options.closeOnClick === true || this.options.closeOnClick == 'body') {
            jQuery(document).on('touchend.jBox-' + this.id + ' click.jBox-' + this.id, function (ev) {
                if (this.blockBodyClick || (this.options.closeOnClick == 'body' && (ev.target == this.wrapper[0] || this.wrapper.has(ev.target).length))) return;
                this.close({
                    ignoreDelay: true
                })
            }.bind(this))
        }
        if (((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) && !this.fixed && this.outside) {
            var scrollTimer, scrollTimerTriggered = 0,
                scrollTriggerDelay = 150;
            var positionDelay = function () {
                var now = new Date().getTime();
                if (!scrollTimer) {
                    if (now - scrollTimerTriggered > scrollTriggerDelay) {
                        this.options.reposition && this.position();
                        this.options.adjustTracker && this._adjustPosition();
                        scrollTimerTriggered = now
                    }
                    scrollTimer = setTimeout(function () {
                        scrollTimer = null;
                        scrollTimerTriggered = new Date().getTime();
                        this.options.reposition && this.position();
                        this.options.adjustTracker && this._adjustPosition()
                    }.bind(this), scrollTriggerDelay)
                }
            }.bind(this);
            (this.options.adjustTracker && this.options.adjustTracker != 'resize') && jQuery(window).on('scroll.jBox-' + this.id, function (ev) {
                positionDelay()
            }.bind(this));
            ((this.options.adjustTracker && this.options.adjustTracker != 'scroll') || this.options.reposition) && jQuery(window).on('resize.jBox-' + this.id, function (ev) {
                positionDelay()
            }.bind(this))
        }
        this.options.target == 'mouse' && jQuery('body').on('mousemove.jBox-' + this.id, function (ev) {
            this._positionMouse(ev)
        }.bind(this))
    };
    this._detachEvents = function () {
        this.options.closeOnEsc && jQuery(document).off('keyup.jBox-' + this.id);
        (this.options.closeOnClick === true || this.options.closeOnClick == 'body') && jQuery(document).off('touchend.jBox-' + this.id + ' click.jBox-' + this.id);
        if ((this.options.adjustPosition && this.options.adjustTracker) || this.options.reposition) {
            jQuery(window).off('scroll.jBox-' + this.id);
            jQuery(window).off('resize.jBox-' + this.id)
        }
        this.options.target == 'mouse' && jQuery('body').off('mousemove.jBox-' + this.id)
    };
    this._addOverlay = function () {
        if (!this.overlay) {
            this.overlay = jQuery('#jBox-overlay').length ? jQuery('#jBox-overlay').css({
                zIndex: Math.min(jQuery('#jBox-overlay').css('z-index'), (this.options.zIndex - 1))
            }) : (jQuery('<div/>', {
                id: 'jBox-overlay'
            }).css({
                display: 'none',
                opacity: 0,
                zIndex: (this.options.zIndex - 1)
            }).appendTo(jQuery('body')));
            (this.options.closeButton == 'overlay' || this.options.closeButton === true) && ((jQuery('#jBox-overlay .jBox-closeButton').length > 0) ? jQuery('#jBox-overlay .jBox-closeButton').on('touchend click', function () {
                this.isOpen && this.close({
                    ignoreDelay: true
                })
            }.bind(this)) : this.overlay.append(this.closeButton));
            (this.options.closeOnClick == 'overlay') && this.overlay.on('touchend click', function () {
                this.isOpen && this.close({
                    ignoreDelay: true
                })
            }.bind(this))
        }
        var overlay_data = this.overlay.data('jBox') || {};
        overlay_data['jBox-' + this.id] = true;
        this.overlay.data('jBox', overlay_data);
        if (this.overlay.css('display') == 'block') return;
        this.options.fade ? (this.overlay.stop() && this.overlay.animate({
            opacity: 1
        }, {
            queue: false,
            duration: this.options.fade,
            start: function () {
                this.overlay.css({
                    display: 'block'
                })
            }.bind(this)
        })) : this.overlay.css({
            display: 'block',
            opacity: 1
        })
    };
    this._removeOverlay = function () {
        if (!this.overlay) return;
        var overlay_data = this.overlay.data('jBox');
        delete overlay_data['jBox-' + this.id];
        this.overlay.data('jBox', overlay_data);
        if (jQuery.isEmptyObject(overlay_data)) {
            this.options.fade ? (this.overlay.stop() && this.overlay.animate({
                opacity: 0
            }, {
                queue: false,
                duration: this.options.fade,
                complete: function () {
                    this.overlay.css({
                        display: 'none'
                    })
                }.bind(this)
            })) : this.overlay.css({
                display: 'none',
                opacity: 0
            })
        }
    };
    this._createSVG = function (type, options) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', type);
        jQuery.each(options, function (index, item) {
            svg.setAttribute(item[0], (item[1] || ''))
        });
        return svg
    };
    this._appendSVG = function (source, target) {
        return target.appendChild(source)
    };
    this._generateCSS = function () {
        if (this.IE8) return;
        (jQuery.type(this.options.animation) != 'object') && (this.options.animation = {
            pulse: {
                open: 'pulse',
                close: 'zoomOut'
            }, zoomIn: {
                open: 'zoomIn',
                close: 'zoomIn'
            }, zoomOut: {
                open: 'zoomOut',
                close: 'zoomOut'
            }, move: {
                open: 'move',
                close: 'move'
            }, slide: {
                open: 'slide',
                close: 'slide'
            }, flip: {
                open: 'flip',
                close: 'flip'
            }, tada: {
                open: 'tada',
                close: 'zoomOut'
            }
        }[this.options.animation]);
        this.options.animation.open && (this.options.animation.open = this.options.animation.open.split(':'));
        this.options.animation.close && (this.options.animation.close = this.options.animation.close.split(':'));
        this.options.animation.openDirection = this.options.animation.open ? this.options.animation.open[1] : null;
        this.options.animation.closeDirection = this.options.animation.close ? this.options.animation.close[1] : null;
        this.options.animation.open && (this.options.animation.open = this.options.animation.open[0]);
        this.options.animation.close && (this.options.animation.close = this.options.animation.close[0]);
        this.options.animation.open && (this.options.animation.open += 'Open');
        this.options.animation.close && (this.options.animation.close += 'Close');
        var animations = {
            pulse: {
                duration: 350,
                css: [
                    ['0%', 'scale(1)'],
                    ['50%', 'scale(1.1)'],
                    ['100%', 'scale(1)']
                ]
            }, zoomInOpen: {
                duration: (this.options.fade || 180),
                css: [
                    ['0%', 'scale(0.9)'],
                    ['100%', 'scale(1)']
                ]
            }, zoomInClose: {
                duration: (this.options.fade || 180),
                css: [
                    ['0%', 'scale(1)'],
                    ['100%', 'scale(0.9)']
                ]
            }, zoomOutOpen: {
                duration: (this.options.fade || 180),
                css: [
                    ['0%', 'scale(1.1)'],
                    ['100%', 'scale(1)']
                ]
            }, zoomOutClose: {
                duration: (this.options.fade || 180),
                css: [
                    ['0%', 'scale(1)'],
                    ['100%', 'scale(1.1)']
                ]
            }, moveOpen: {
                duration: (this.options.fade || 180),
                positions: {
                    top: {
                        '0%': -12
                    }, right: {
                        '0%': 12
                    }, bottom: {
                        '0%': 12
                    }, left: {
                        '0%': -12
                    }
                }, css: [
                    ['0%', 'translate%XY(%Vpx)'],
                    ['100%', 'translate%XY(0px)']
                ]
            }, moveClose: {
                duration: (this.options.fade || 180),
                timing: 'ease-in',
                positions: {
                    top: {
                        '100%': -12
                    }, right: {
                        '100%': 12
                    }, bottom: {
                        '100%': 12
                    }, left: {
                        '100%': -12
                    }
                }, css: [
                    ['0%', 'translate%XY(0px)'],
                    ['100%', 'translate%XY(%Vpx)']
                ]
            }, slideOpen: {
                duration: 400,
                positions: {
                    top: {
                        '0%': -400
                    }, right: {
                        '0%': 400
                    }, bottom: {
                        '0%': 400
                    }, left: {
                        '0%': -400
                    }
                }, css: [
                    ['0%', 'translate%XY(%Vpx)'],
                    ['100%', 'translate%XY(0px)']
                ]
            }, slideClose: {
                duration: 400,
                timing: 'ease-in',
                positions: {
                    top: {
                        '100%': -400
                    }, right: {
                        '100%': 400
                    }, bottom: {
                        '100%': 400
                    }, left: {
                        '100%': -400
                    }
                }, css: [
                    ['0%', 'translate%XY(0px)'],
                    ['100%', 'translate%XY(%Vpx)']
                ]
            }, flipOpen: {
                duration: 600,
                css: [
                    ['0%', 'perspective(400px) rotateX(90deg)'],
                    ['40%', 'perspective(400px) rotateX(-15deg)'],
                    ['70%', 'perspective(400px) rotateX(15deg)'],
                    ['100%', 'perspective(400px) rotateX(0deg)']
                ]
            }, flipClose: {
                duration: (this.options.fade || 300),
                css: [
                    ['0%', 'perspective(400px) rotateX(0deg)'],
                    ['100%', 'perspective(400px) rotateX(90deg)']
                ]
            }, tada: {
                duration: 800,
                css: [
                    ['0%', 'scale(1)'],
                    ['10%, 20%', 'scale(0.9) rotate(-3deg)'],
                    ['30%, 50%, 70%, 90%', 'scale(1.1) rotate(3deg)'],
                    ['40%, 60%, 80%', 'scale(1.1) rotate(-3deg)'],
                    ['100%', 'scale(1) rotate(0)']
                ]
            }
        };
        jQuery.each(['pulse', 'tada'], function (index, item) {
            animations[item + 'Open'] = animations[item + 'Close'] = animations[item]
        });
        var generateKeyframeCSS = function (ev, position) {
            keyframe_css = '@' + this.prefix + 'keyframes jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
            jQuery.each(animations[this.options.animation[ev]].css, function (index, item) {
                var translate = position ? item[1].replace('%XY', this._getXY(position).toUpperCase()) : item[1];
                animations[this.options.animation[ev]].positions && (translate = translate.replace('%V', animations[this.options.animation[ev]].positions[position][item[0]]));
                keyframe_css += item[0] + ' {' + this.prefix + 'transform:' + translate + ';}'
            }.bind(this));
            keyframe_css += '}';
            keyframe_css += '.jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ' {';
            keyframe_css += this.prefix + 'animation-duration: ' + animations[this.options.animation[ev]].duration + 'ms;';
            keyframe_css += this.prefix + 'animation-name: jBox-animation-' + this.options.animation[ev] + '-' + ev + (position ? '-' + position : '') + ';';
            keyframe_css += animations[this.options.animation[ev]].timing ? (this.prefix + 'animation-timing-function: ' + animations[this.options.animation[ev]].timing + ';') : '';
            keyframe_css += '}';
            return keyframe_css
        }.bind(this);
        var css = '';
        jQuery.each(['open', 'close'], function (index, ev) {
            if (!this.options.animation[ev] || !animations[this.options.animation[ev]] || (ev == 'close' && !this.options.fade)) return '';
            animations[this.options.animation[ev]].positions ? jQuery.each(['top', 'right', 'bottom', 'left'], function (index2, position) {
                css += generateKeyframeCSS(ev, position)
            }) : css += generateKeyframeCSS(ev)
        }.bind(this));
        jQuery('<style/>').append(css).appendTo(jQuery('head'))
    };
    this._blockBodyClick = function () {
        this.blockBodyClick = true;
        setTimeout(function () {
            this.blockBodyClick = false
        }.bind(this), 10)
    };
    this.options.animation && this._generateCSS();
    this._animate = function (ev) {
        if (this.IE8) return;
        ev || (ev = this.isOpen ? 'open' : 'close');
        if (!this.options.fade && ev == 'close') return null;
        var animationDirection = (this.options.animation[ev + 'Direction'] || ((this.align != 'center') ? this.align : this.options.attributes.x));
        this.flipped && this._getXY(animationDirection) == (this._getXY(this.align)) && (animationDirection = this._getOpp(animationDirection));
        var classnames = 'jBox-animation-' + this.options.animation[ev] + '-' + ev + ' jBox-animation-' + this.options.animation[ev] + '-' + ev + '-' + animationDirection;
        this.wrapper.addClass(classnames);
        var animationDuration = parseFloat(this.wrapper.css(this.prefix + 'animation-duration')) * 1000;
        ev == 'close' && (animationDuration = Math.min(animationDuration, this.options.fade));
        setTimeout(function () {
            this.wrapper.removeClass(classnames)
        }.bind(this), animationDuration)
    };
    this._abortAnimation = function () {
        if (this.IE8) return;
        var prefix = 'jBox-animation';
        var classes = this.wrapper.attr('class').split(' ').filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0
        });
        this.wrapper.attr('class', classes.join(' '))
    };
    this._adjustPosition = function () {
        if (!this.options.adjustPosition) return null;
        if (this.positionAdjusted) {
            this.wrapper.css(this.pos);
            this.pointer && this.wrapper.css('padding', 0).css('padding-' + this._getOpp(this.outside), this.pointer.dimensions[this._getXY(this.outside)]).removeClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).addClass('jBox-pointerPosition-' + this.pointer.position);
            this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + this._getOpp(this.outside)).css(this.pointer.margin);
            this.positionAdjusted = false;
            this.flipped = false
        }
        var win = jQuery(window);
        var windowDimensions = {
            x: win.width(),
            y: win.height(),
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        windowDimensions.bottom = windowDimensions.top + windowDimensions.y;
        windowDimensions.right = windowDimensions.left + windowDimensions.x;
        var outYT = (windowDimensions.top > this.pos.top - (this.options.adjustDistance.top || 0)),
            outXR = (windowDimensions.right < this.pos.left + this.dimensions.x + (this.options.adjustDistance.right || 0)),
            outYB = (windowDimensions.bottom < this.pos.top + this.dimensions.y + (this.options.adjustDistance.bottom || 0)),
            outXL = (windowDimensions.left > this.pos.left - (this.options.adjustDistance.left || 0)),
            outX = outXL ? 'left' : (outXR ? 'right' : null),
            outY = outYT ? 'top' : (outYB ? 'bottom' : null),
            out = outX || outY;
        if (!out) return;
        if (this.options.adjustPosition != 'move' && (outX == this.outside || outY == this.outside)) {
            this.target == 'mouse' && (this.outside = 'right');
            if (((this.outside == 'top' || this.outside == 'left') ? (windowDimensions[this._getXY(this.outside)] - (this.targetDimensions[this._getTL(this.outside)] - windowDimensions[this._getTL(this.outside)]) - this.targetDimensions[this._getXY(this.outside)]) : (this.targetDimensions[this._getTL(this.outside)] - windowDimensions[this._getTL(this.outside)])) > this.dimensions[this._getXY(this.outside)] + this.options.adjustDistance[this._getOpp(this.outside)]) {
                this.wrapper.css(this._getTL(this.outside), this.pos[this._getTL(this.outside)] + ((this.dimensions[this._getXY(this.outside)] + this.options.offset[this._getXY(this.outside)] + this.targetDimensions[this._getXY(this.outside)]) * (this.outside == 'top' || this.outside == 'left' ? 1 : -1)));
                this.pointer && this.wrapper.removeClass('jBox-pointerPosition-' + this.pointer.position).addClass('jBox-pointerPosition-' + this._getOpp(this.pointer.position)).css('padding', 0).css('padding-' + this.outside, this.pointer.dimensions[this._getXY(this.outside)]);
                this.pointer && this.pointer.element.attr('class', 'jBox-pointer jBox-pointer-' + this.outside);
                this.positionAdjusted = true;
                this.flipped = true
            }
        }
        var outMove = (this._getXY(this.outside) == 'x') ? outY : outX;
        if (this.pointer && this.options.adjustPosition != 'flip' && this._getXY(outMove) == this._getOpp(this._getXY(this.outside))) {
            if (this.pointer.align == 'center') {
                var spaceAvail = (this.dimensions[this._getXY(outMove)] / 2) - (this.pointer.dimensions[this._getOpp(this.pointer.xy)] / 2) - (parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) * (outMove != this._getTL(outMove) ? -1 : 1))
            } else {
                var spaceAvail = (outMove == this.pointer.alignAttribute) ? parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) : this.dimensions[this._getXY(outMove)] - parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - this.pointer.dimensions[this._getXY(outMove)]
            }
            spaceDiff = (outMove == this._getTL(outMove)) ? windowDimensions[this._getTL(outMove)] - this.pos[this._getTL(outMove)] + this.options.adjustDistance[outMove] : (windowDimensions[this._getOpp(this._getTL(outMove))] - this.pos[this._getTL(outMove)] - this.options.adjustDistance[outMove] - this.dimensions[this._getXY(outMove)]) * -1;
            if (outMove == this._getOpp(this._getTL(outMove)) && this.pos[this._getTL(outMove)] - spaceDiff < windowDimensions[this._getTL(outMove)] + this.options.adjustDistance[this._getTL(outMove)]) {
                spaceDiff -= windowDimensions[this._getTL(outMove)] + this.options.adjustDistance[this._getTL(outMove)] - (this.pos[this._getTL(outMove)] - spaceDiff)
            }
            spaceDiff = Math.min(spaceDiff, spaceAvail);
            if (spaceDiff <= spaceAvail && spaceDiff > 0) {
                this.pointer.element.css('margin-' + this.pointer.alignAttribute, parseInt(this.pointer.element.css('margin-' + this.pointer.alignAttribute)) - (spaceDiff * (outMove != this.pointer.alignAttribute ? -1 : 1)));
                this.wrapper.css(this._getTL(outMove), this.pos[this._getTL(outMove)] + (spaceDiff * (outMove != this._getTL(outMove) ? -1 : 1)));
                this.positionAdjusted = true
            }
        }
    };
    (this.options.onInit.bind(this))();
    this.options._onInit && (this.options._onInit.bind(this))();
    return this
};
jBox.prototype.attach = function (elements, trigger) {
    elements || (elements = jQuery(this.options.attach.selector || this.options.attach));
    trigger || (trigger = this.options.trigger);
    elements && elements.length && jQuery.each(elements, function (index, el) {
        el = jQuery(el);
        if (!el.data('jBox-attached-' + this.id)) {
            (this.options.getContent == 'title' && el.attr('title') != undefined) && el.data('jBox-getContent', el.attr('title')).removeAttr('title');
            this.attachedElements || (this.attachedElements = []);
            this.attachedElements.push(el[0]);
            el.on(trigger + '.jBox-attach-' + this.id, function (ev) {
                this.timer && clearTimeout(this.timer);
                if (trigger == 'mouseenter' && this.isOpen && this.source[0] == el[0]) return;
                if (this.isOpen && this.source && this.source[0] != el[0]) var forceOpen = true;
                this.source = el;
                !this.options.target && (this.target = el);
                trigger == 'click' && this.options.preventDefault && ev.preventDefault();
                this[trigger == 'click' && !forceOpen ? 'toggle' : 'open']()
            }.bind(this));
            (this.options.trigger == 'mouseenter') && el.on('mouseleave', function (ev) {
                if (!this.options.closeOnMouseleave || !(ev.toElement == this.wrapper[0] || jQuery(ev.toElement).parents('#' + this.id).length)) this.close()
            }.bind(this));
            el.data('jBox-attached-' + this.id, trigger);
            this.options._onAttach && (this.options._onAttach.bind(this))(el)
        }
    }.bind(this));
    return this
};
jBox.prototype.detach = function (elements) {
    elements || (elements = this.attachedElements || []);
    elements && elements.length && jQuery.each(elements, function (index, el) {
        el = jQuery(el);
        if (el.data('jBox-attached-' + this.id)) {
            el.off(el.data('jBox-attached-' + this.id) + '.jBox-attach-' + this.id);
            el.data('jBox-attached-' + this.id, null)
        }
        this.attachedElements = jQuery.grep(this.attachedElements, function (value) {
            return value != el[0]
        })
    }.bind(this));
    return this
};
jBox.prototype.setTitle = function (title, ignore_positioning) {
    var wrapperHeight = this.wrapper.height(),
        wrapperWidth = this.wrapper.width();
    if (title == null || title == undefined) return this;
    !this.wrapper && this._create();
    if (!this.title) {
        this.titleContainer = jQuery('<div/>', {
            'class': 'jBox-title'
        });
        this.title = jQuery('<div/>').appendTo(this.titleContainer);
        this.wrapper.addClass('jBox-hasTitle');
        if (this.options.closeButton == 'title' || (this.options.closeButton === true && !this.options.overlay)) {
            this.wrapper.addClass('jBox-closeButton-title');
            this.closeButton.appendTo(this.titleContainer)
        }
        this.titleContainer.insertBefore(this.content)
    }
    this.title.html(title);
    !ignore_positioning && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position();
    return this
};
jBox.prototype.setContent = function (content, ignore_positioning) {
    if (content == null) return this;
    !this.wrapper && this._create();
    var wrapperHeight = this.wrapper.height(),
        wrapperWidth = this.wrapper.width();
    var bodyHeight = jQuery('body').height(),
        bodyWidth = jQuery('body').width();
    switch (jQuery.type(content)) {
    case 'string':
        this.content.html(content);
        break;
    case 'object':
        this.content.children().css({
            display: 'none'
        });
        this.options.content.appendTo(this.content).css({
            display: 'block'
        });
        break
    }
    var adjustOffset = {
        x: bodyWidth - jQuery('body').width(),
        y: bodyHeight - jQuery('body').height()
    };
    !ignore_positioning && (wrapperHeight != this.wrapper.height() || wrapperWidth != this.wrapper.width()) && this.position({
        adjustOffset: adjustOffset
    });
    return this
};
jBox.prototype.position = function (options) {
    options || (options = {});
    this.target = options.target || this.target || this.options.target || jQuery(window);
    this.dimensions = {
        x: this.wrapper.outerWidth(),
        y: this.wrapper.outerHeight()
    };
    if (this.target == 'mouse') return;
    if (this.options.position.x == 'center' && this.options.position.y == 'center') {
        this.wrapper.css({
            left: '50%',
            top: '50%',
            marginLeft: (this.dimensions.x * -0.5 + this.options.offset.x),
            marginTop: (this.dimensions.y * -0.5 + this.options.offset.y)
        });
        return this
    }!this.target.data('jBox-fixed') && this.target.data('jBox-fixed', (this.target[0] != jQuery(window)[0] && (this.target.css('position') == 'fixed' || this.target.parents().filter(function () {
        return jQuery(this).css('position') == 'fixed'
    }).length > 0)) ? 'fixed' : 'static');
    var targetOffset = this.target[this.target.data('jBox-fixed') == 'fixed' ? 'position' : 'offset']();
    this.targetDimensions = {
        x: this.target.outerWidth(),
        y: this.target.outerHeight(),
        top: (targetOffset ? targetOffset.top : 0),
        left: (targetOffset ? targetOffset.left : 0)
    };
    this.pos = {};
    var setPosition = function (p) {
        if (jQuery.inArray(this.options.position[p], ['top', 'right', 'bottom', 'left', 'center']) == -1) {
            this.pos[this.options.attributes[p]] = this.options.position[p];
            return
        }
        var a = this.options.attributes[p] = (p == 'x' ? 'left' : 'top');
        this.pos[a] = this.targetDimensions[a];
        if (this.options.position[p] == 'center') {
            this.pos[a] += Math.ceil((this.targetDimensions[p] - this.dimensions[p]) / 2);
            return
        }(a != this.options.position[p]) && (this.pos[a] += this.targetDimensions[p] - this.dimensions[p]);
        (this.options.outside == p || this.options.outside == 'xy') && (this.pos[a] += this.dimensions[p] * (a != this.options.position[p] ? 1 : -1))
    }.bind(this);
    setPosition('x');
    setPosition('y');
    if (this.options.pointer && jQuery.type(this.options.position.x) != 'number' && jQuery.type(this.options.position.y) != 'number') {
        var adjustWrapper = 0;
        switch (this.pointer.align) {
        case 'center':
            if (this.options.position[this._getOpp(this.options.outside)] != 'center') {
                adjustWrapper += (this.dimensions[this._getOpp(this.options.outside)] / 2)
            }
            break;
        default:
            switch (this.options.position[this._getOpp(this.options.outside)]) {
            case 'center':
                adjustWrapper += ((this.dimensions[this._getOpp(this.options.outside)] / 2) - (this.pointer.dimensions[this._getOpp(this.options.outside)] / 2)) * (this.pointer.align == this._getTL(this.pointer.align) ? 1 : -1);
                break;
            default:
                adjustWrapper += (this.pointer.align != this.options.position[this._getOpp(this.options.outside)]) ? this.dimensions[this._getOpp(this.options.outside)] - (this.pointer.dimensions[this._getOpp(this.options.outside)] / 2) : (this.pointer.dimensions[this._getOpp(this.options.outside)] / 2);
                break
            }
            break
        }
        adjustWrapper *= (this.options.position[this._getOpp(this.options.outside)] == this.pointer.alignAttribute ? -1 : 1);
        adjustWrapper += this.pointer.offset * (this.pointer.align == this._getOpp(this._getTL(this.pointer.align)) ? 1 : -1);
        this.pos[this._getTL(this._getOpp(this.pointer.xy))] += adjustWrapper
    }
    options.adjustOffset && options.adjustOffset.x && (this.pos[this.options.attributes.x] += parseInt(options.adjustOffset.x) * (this.options.attributes.x == 'left' ? 1 : -1));
    options.adjustOffset && options.adjustOffset.y && (this.pos[this.options.attributes.y] += parseInt(options.adjustOffset.y) * (this.options.attributes.y == 'top' ? 1 : -1));
    this.pos[this.options.attributes.x] += this.options.offset.x;
    this.pos[this.options.attributes.y] += this.options.offset.y;
    this.wrapper.css(this.pos);
    this._adjustPosition();
    return this
};
jBox.prototype.open = function (options) {
    options || (options = {});
    !this.wrapper && this._create();
    this.timer && clearTimeout(this.timer);
    this._blockBodyClick();
    if (this.isDisabled) return this;
    var open = function () {
        this.source && this.options.getTitle && (this.source.attr(this.options.getTitle) && this.setTitle(this.source.attr(this.options.getTitle)));
        this.source && this.options.getContent && (this.source.data('jBox-getContent') ? this.setContent(this.source.data('jBox-getContent')) : (this.source.attr(this.options.getContent) ? this.setContent(this.source.attr(this.options.getContent)) : null));
        (this.options.onOpen.bind(this))();
        this.options._onOpen && (this.options._onOpen.bind(this))();
        this.options.ajax && this.options.ajax.url && (!this.ajaxLoaded || this.options.ajax.reload) && this.ajax();
        this.position({
            target: options.target
        });
        this.isClosing && this._abortAnimation();
        if (!this.isOpen) {
            this.isOpen = true;
            this._attachEvents();
            this.options.blockScroll && jQuery('body').addClass('jBox-blockScroll-' + this.id);
            this.options.overlay && this._addOverlay();
            this.options.animation && !this.isClosing && this._animate('open');
            if (this.options.fade) {
                this.wrapper.stop().animate({
                    opacity: 1
                }, {
                    queue: false,
                    duration: this.options.fade,
                    start: function () {
                        this.isOpening = true;
                        this.wrapper.css({
                            display: 'block'
                        })
                    }.bind(this),
                    always: function () {
                        this.isOpening = false
                    }.bind(this)
                })
            } else {
                this.wrapper.css({
                    display: 'block',
                    opacity: 1
                })
            }
        }
    }.bind(this);
    this.options.delayOpen && !this.isOpen && !this.isClosing && !options.ignoreDelay ? (this.timer = setTimeout(open, this.options.delayOpen)) : open();
    return this
};
jBox.prototype.close = function (options) {
    options || (options = {});
    this.timer && clearTimeout(this.timer);
    this._blockBodyClick();
    if (this.isDisabled) return this;
    var close = function () {
        (this.options.onClose.bind(this))();
        this.options._onClose && (this.options._onClose.bind(this))();
        if (this.isOpen) {
            this.isOpen = false;
            this._detachEvents();
            this.options.blockScroll && jQuery('body').removeClass('jBox-blockScroll-' + this.id);
            this.options.overlay && this._removeOverlay();
            this.options.animation && !this.isOpening && this._animate('close');
            if (this.options.fade) {
                this.wrapper.stop().animate({
                    opacity: 0
                }, {
                    queue: false,
                    duration: this.options.fade,
                    start: function () {
                        this.isClosing = true
                    }.bind(this),
                    complete: function () {
                        this.wrapper.css({
                            display: 'none'
                        });
                        this.options.onCloseComplete && (this.options.onCloseComplete.bind(this))();
                        this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))()
                    }.bind(this),
                    always: function () {
                        this.isClosing = false
                    }.bind(this)
                })
            } else {
                this.wrapper.css({
                    display: 'none',
                    opacity: 0
                });
                this.options._onCloseComplete && (this.options._onCloseComplete.bind(this))()
            }
        }
    }.bind(this);
    options.ignoreDelay ? close() : (this.timer = setTimeout(close, Math.max(this.options.delayClose, 10)));
    return this
};
jBox.prototype.toggle = function (options) {
    this[this.isOpen ? 'close' : 'open'](options);
    return this
};
jBox.prototype.disable = function () {
    this.isDisabled = true;
    return this
};
jBox.prototype.enable = function () {
    this.isDisabled = false;
    return this
};
jBox.prototype.ajax = function (options) {
    options || (options = {});
    (this.options.ajax.getData && !options.data && this.source && this.source.attr(this.options.ajax.getData) != undefined) && (options.data = this.source.attr(this.options.ajax.getData) || '');
    var sysOptions = jQuery.extend(true, {}, this.options.ajax);
    this.ajaxRequest && this.ajaxRequest.abort();
    var beforeSend = options.beforeSend || sysOptions.beforeSend ||
    function () {};
    var complete = options.complete || sysOptions.complete ||
    function () {};
    var userOptions = jQuery.extend(true, sysOptions, options);
    userOptions.beforeSend = function () {
        userOptions.spinner && this.wrapper.addClass('jBox-loading');
        (beforeSend.bind(this))()
    }.bind(this);
    userOptions.complete = function (response) {
        this.wrapper.removeClass('jBox-loading');
        userOptions.setContent && this.setContent(response.responseText);
        this.ajaxLoaded = true;
        (complete.bind(this))(response)
    }.bind(this);
    this.ajaxRequest = jQuery.ajax(userOptions);
    return this
};
jBox.prototype.audio = function (options) {
    options || (options = {});
    jBox._audio || (jBox._audio = {});
    if (!options.url || this.IE8) return this;
    if (!jBox._audio[options.url]) {
        var audio = jQuery('<audio/>');
        jQuery('<source/>', {
            src: options.url + '.mp3'
        }).appendTo(audio);
        jQuery('<source/>', {
            src: options.url + '.ogg'
        }).appendTo(audio);
        jBox._audio[options.url] = audio[0]
    }
    jBox._audio[options.url].volume = Math.min((options.volume != undefined ? options.volume : (this.options.volume != undefined ? this.options.volume : 100) / 100), 1);
    jBox._audio[options.url].pause();
    try {
        jBox._audio[options.url].currentTime = 0
    } catch (e) {}
    jBox._audio[options.url].play();
    return this
};
jBox.prototype.destroy = function () {
    this.close({
        ignoreDelay: true
    });
    this.wrapper.remove();
    return this
};
jBox._getUniqueID = (function () {
    var i = 1;
    return function () {
        return i++
    }
}());
jQuery.fn.jBox = function (type, options) {
    type || (type = {});
    options || (options = {});
    return new jBox(type, jQuery.extend(options, {
        attach: this
    }))
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound
    }
}
$(document).ready(function () {
    $('#stephan').mouseenter(function () {
        var ring = $('<div/>').addClass('stephan-ring').appendTo($('#stephan'));
        setTimeout((function () {
            ring.remove()
        }), 600)
    })
});

function convertFileSize(bytes) {
    if (bytes >= 1000000) bytes = (bytes / 1000000).toFixed(2) + ' MB';
    else if (bytes >= 1000) bytes = (bytes / 1000).toFixed(2) + ' KB';
    else if (bytes > 1) bytes = bytes + ' bytes';
    else if (bytes == 1) bytes = bytes + ' byte';
    else bytes = '0 bytes';
    return bytes
}
function htmlEncode(value) {
    return $('<div/>').text(value).html()
}
