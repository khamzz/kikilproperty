(function ($) {
    'use strict';
    var ERE_ADMIN = {
        init: function () {
            this.toolTip();
            this.formSearchProcess();
            this.additionalFieldProcess();
            this.additionalFeaturesProcess();
        },
        toolTip: function () {
            $('.tips, .help_tip').tipTip({
                'attribute': 'data-tip',
                'fadeIn': 50,
                'fadeOut': 50,
                'delay': 200
            });
        },
        formSearchProcess: function () {
            var css_class_wrap = '.ere-property-select-meta-box-wrap';
            var ajax_url = ere_admin_vars.ajax_url;
            var enable_filter_location=ere_admin_vars.enable_filter_location;
            if(enable_filter_location=='1')
            {
                $('.ere-property-country-ajax', css_class_wrap).select2();
                $('.ere-property-state-ajax', css_class_wrap).select2();
                $('.ere-property-city-ajax', css_class_wrap).select2();
                $('.ere-property-neighborhood-ajax', css_class_wrap).select2();
            }

            var ere_get_states_by_country = function () {
                var $this = $(".ere-property-country-ajax", css_class_wrap);
                var $property_state = $(".ere-property-state-ajax", css_class_wrap);
                var $is_slug = $property_state.attr('data-slug');
                if (typeof($is_slug) === 'undefined') {
                    $is_slug='1';
                }
                if ($this.length && $property_state.length) {
                    var selected_country = $this.val();
                    $.ajax({
                        type: "POST",
                        url: ajax_url,
                        data: {
                            'action': 'ere_get_states_by_country_ajax',
                            'country': selected_country,
                            'type': 0,
                            'is_slug':$is_slug
                        },
                        beforeSend: function () {
                            $this.parent().children('.ere-loading').remove();
                            $this.parent().append('<span class="ere-loading"><i class="fa fa-spinner fa-spin"></i></span>');
                        },
                        success: function (response) {
                            $property_state.html(response);
                            var val_selected =$property_state.attr('data-selected');
                            if (typeof val_selected !== 'undefined') {
                                $property_state.val(val_selected);
                            }
                            $this.parent().children('.ere-loading').remove();
                        },
                        error: function () {
                            $this.parent().children('.ere-loading').remove();
                        },
                        complete: function () {
                            $this.parent().children('.ere-loading').remove();
                        }
                    });
                }
            };
            ere_get_states_by_country();

            $(".ere-property-country-ajax", css_class_wrap).on('change', function () {
                ere_get_states_by_country();
            });

            var ere_get_cities_by_state = function () {
                var $this = $(".ere-property-state-ajax", css_class_wrap);
                var $property_city = $(".ere-property-city-ajax", css_class_wrap);
                var $is_slug = $property_city.attr('data-slug');
                if (typeof($is_slug) === 'undefined') {
                    $is_slug='1';
                }
                if ($this.length && $property_city.length) {
                    var selected_state = $this.val();
                    $.ajax({
                        type: "POST",
                        url: ajax_url,
                        data: {
                            'action': 'ere_get_cities_by_state_ajax',
                            'state': selected_state,
                            'type': 0,
                            'is_slug':$is_slug
                        },
                        beforeSend: function () {
                            $this.parent().children('.ere-loading').remove();
                            $this.parent().append('<span class="ere-loading"><i class="fa fa-spinner fa-spin"></i></span>');
                        },
                        success: function (response) {
                            $property_city.html(response);
                            var val_selected = $property_city.attr('data-selected');
                            if (typeof val_selected !== 'undefined') {
                                $property_city.val(val_selected);
                            }
                            $this.parent().children('.ere-loading').remove();
                        },
                        error: function () {
                            $this.parent().children('.ere-loading').remove();
                        },
                        complete: function () {
                            $this.parent().children('.ere-loading').remove();
                        }
                    });
                }
            };
            ere_get_cities_by_state();

            $(".ere-property-state-ajax", css_class_wrap).on('change', function () {
                ere_get_cities_by_state();
            });

            var ere_get_neighborhoods_by_city = function () {
                var $this = $(".ere-property-city-ajax", css_class_wrap);
                var $property_neighborhood = $(".ere-property-neighborhood-ajax", css_class_wrap);
                var $is_slug = $property_neighborhood.attr('data-slug');
                if (typeof($is_slug) === 'undefined') {
                    $is_slug='1';
                }
                if ($this.length && $property_neighborhood.length) {
                    var selected_city = $this.val();
                    $.ajax({
                        type: "POST",
                        url: ajax_url,
                        data: {
                            'action': 'ere_get_neighborhoods_by_city_ajax',
                            'city': selected_city,
                            'type': 0,
                            'is_slug':$is_slug
                        },
                        beforeSend: function () {
                            $this.parent().children('.ere-loading').remove();
                            $this.parent().append('<span class="ere-loading"><i class="fa fa-spinner fa-spin"></i></span>');
                        },
                        success: function (response) {
                            $property_neighborhood.html(response);
                            var val_selected = $property_neighborhood.attr('data-selected');
                            if (typeof val_selected !== 'undefined') {
                                $property_neighborhood.val(val_selected);
                            }
                            $this.parent().children('.ere-loading').remove();
                        },
                        error: function () {
                            $this.parent().children('.ere-loading').remove();
                        },
                        complete: function () {
                            $this.parent().children('.ere-loading').remove();
                        }
                    });
                }
            };
            ere_get_neighborhoods_by_city();

            $(".ere-property-city-ajax", css_class_wrap).on('change', function () {
                ere_get_neighborhoods_by_city();
            });
        },
        additionalFieldProcess: function () {
            var $wrapAdditionalField = $('#additional_fields');
            this.additionalFieldReadOnly();
            this.additionalFieldEventProcess($wrapAdditionalField);
            $wrapAdditionalField.on('gsf_add_clone_field', function (event) {
                var $target = $(event.target);
                ERE_ADMIN.additionalFieldEventProcess($target);

                $target.find('.gsf-field-panel-content,.gsf-clone-field-panel-inner')
                    .find('#additional_fields_label input,#additional_fields_id input,#additional_fields_select_choices textarea')
                    .val('');

                $target.find('.gsf-field-panel-content,.gsf-clone-field-panel-inner')
                    .find('#additional_fields_field_type select').val('text');
            });

            $(document).on('gsf_save_option_success', function () {
                console.log('Done');
                ERE_ADMIN.additionalFieldReadOnly();
            });
        },
        additionalFieldReadOnly: function() {
            $('.gsf-field-panel-content,.gsf-clone-field-panel-inner').each(function () {
                var $label = $(this).find('#additional_fields_label input'),
                    $id = $label.closest('.gsf-field-panel-content,.gsf-clone-field-panel-inner').find('#additional_fields_id input');
                if ($id.val() !== '') {
                    $id.attr('readonly', 'readonly');
                }
            });

        },
        additionalFieldEventProcess: function($wrap) {
            $wrap.find('.gsf-field-panel-content,.gsf-clone-field-panel-inner').find('#additional_fields_label input').on('change', function () {
                var $label = $(this),
                    $id = $label.closest('.gsf-field-panel-content,.gsf-clone-field-panel-inner').find('#additional_fields_id input');
                if ($id.attr('readonly') !== 'readonly') {
                    $id.val(ERE_ADMIN.toSlug($label.val()));
                }
            });
        },

        additionalFeaturesProcess: function() {
            var $wrap = $('#real_estate_additional_features');

            $wrap.find('button').on('click', function () {
                var count = $wrap.find('tbody tr').length;
                var html = '<tr>\n' +
                    '    <td class="sort">\n' +
                    '        <span><i class="dashicons dashicons-menu"></i></span>\n' +
                    '    </td>\n' +
                    '    <td class="title">\n' +
                    '        <input type="text" name="real_estate_additional_feature_title[' + count +  ']" value="">\n' +
                    '    </td>\n' +
                    '    <td class="value">\n' +
                    '        <input type="text" name="real_estate_additional_feature_value[' + count + ']" value="">\n' +
                    '    </td>\n' +
                    '    <td class="remove"><i class="dashicons dashicons-dismiss"></i></td>\n' +
                    '</tr>';

                $wrap.find('tbody').append(html);
                $wrap.find('.total').val(count + 1);
            });

            $wrap.find('tbody').sortable({
                'items': 'tr',
                handle: '.sort > span',
                update: function( event, ui ) {
                    ERE_ADMIN.reindexAdditionalFeatures($wrap);
                },
                stop: function (event, ui) {}
            });

            $wrap.on('click', '.remove > i', function () {
                $(this).closest('tr').remove();
                $wrap.find('.total').val($wrap.find('tbody tr').length);
                ERE_ADMIN.reindexAdditionalFeatures($wrap);
            });
        },
        reindexAdditionalFeatures: function($wrap) {
            $wrap.find(' tbody > tr').each(function (index) {
                $(this).find('input').each(function () {
                    var name = $(this).attr('name');
                    name = name.replace( /^(\w+\[)(\d+)(\].*)$/g , function(m,p1,p2,p3){ return p1+index+p3; });
                    $(this).attr('name', name);
                });
            });
        },

        toSlug: function(str) {
            str = String(str).toString();
            str = str.replace(/^\s+|\s+$/g, "");
            str = str.toLowerCase();

            var swaps = {
                '0': ['??', '???', '??', '???'],
                '1': ['??', '???', '??', '???'],
                '2': ['??', '???', '??', '???'],
                '3': ['??', '???', '??', '???'],
                '4': ['???', '???', '??', '??', '???'],
                '5': ['???', '???', '??', '??', '???'],
                '6': ['???', '???', '??', '??', '???'],
                '7': ['???', '???', '??', '???'],
                '8': ['???', '???', '??', '???'],
                '9': ['???', '???', '??', '???'],
                'a': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '???', '???', '??', '??', '???', '???', '???', '??', '??', '??', '???', '???', '??', '???', '??'],
                'b': ['??', '??', '??', '???', '???', '???'],
                'c': ['??', '??', '??', '??', '??', '???'],
                'd': ['??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '??', '??', '??', '??', '???', '???', '???', '???'],
                'e': ['??', '??', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '??', '??', '???'],
                'f': ['??', '??', '??', '??', '???', '???'],
                'g': ['??', '??', '??', '??', '??', '??', '??', '???', '???', '??', '???'],
                'h': ['??', '??', '??', '??', '??', '??', '???', '???', '???', '???'],
                'i': ['??', '??', '???', '??', '???', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??', '???', '???', '???', '??', '???', '???', '??', '??', '??', '???', '???', '???', '??????', '??', '???', '???', '??', '???'],
                'j': ['??', '??', '??', '???', '??', '???'],
                'k': ['??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '??', '???'],
                'l': ['??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???'],
                'm': ['??', '??', '??', '???', '???', '???'],
                'n': ['??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???'],
                'o': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??????', '??', '??', '??', '???', '???', '???', '??'],
                'p': ['??', '??', '???', '???', '??', '???'],
                'q': ['???', '???'],
                'r': ['??', '??', '??', '??', '??', '??', '???', '???'],
                's': ['??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '??', '???', '???'],
                't': ['??', '??', '??', '??', '??', '??', '??', '???', '???', '??', '???', '???', '???'],
                'u': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '??', '??', '??', '??', '??', '???', '???', '???', '??', '??'],
                'v': ['??', '???', '??', '???'],
                'w': ['??', '??', '??', '???', '???', '???'],
                'x': ['??', '??', '???'],
                'y': ['??', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???'],
                'z': ['??', '??', '??', '??', '??', '??', '???', '???', '???'],
                'aa': ['??', '???', '??'],
                'ae': ['??', '??'],
                'ai': ['???'],
                'ch': ['??', '???', '???', '??'],
                'dj': ['??', '??'],
                'dz': ['??', '???'],
                'ei': ['???'],
                'gh': ['??', '???'],
                'ii': ['???'],
                'ij': ['??'],
                'kh': ['??', '??', '???'],
                'lj': ['??'],
                'nj': ['??'],
                'oe': ['??', '??', '??'],
                'oi': ['???'],
                'oii': ['???'],
                'ps': ['??'],
                'sh': ['??', '???', '??'],
                'shch': ['??'],
                'ss': ['??'],
                'sx': ['??'],
                'th': ['??', '??', '??', '??', '??'],
                'ts': ['??', '???', '???'],
                'ue': ['??'],
                'uu': ['???'],
                'ya': ['??'],
                'yu': ['??'],
                'zh': ['??', '???', '??'],
                '(c)': ['??'],
                'A': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??', '???', '??', '??', '??', '???', '??'],
                'B': ['??', '??', '???', '???'],
                'C': ['??', '??', '??', '??', '??', '???'],
                'D': ['??', '??', '??', '??', '??', '??', '???', '???', '??', '??', '???'],
                'E': ['??', '??', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '??', '???', '??', '??', '??', '??', '??', '???'],
                'F': ['??', '??', '???'],
                'G': ['??', '??', '??', '??', '??', '??', '???'],
                'H': ['??', '??', '??', '???'],
                'I': ['??', '??', '???', '??', '???', '??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '???'],
                'J': ['???'],
                'K': ['??', '??', '???'],
                'L': ['??', '??', '??', '??', '??', '??', '??', '???', '???'],
                'M': ['??', '??', '???'],
                'N': ['??', '??', '??', '??', '??', '??', '??', '???'],
                'O': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '???', '???', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '???', '??'],
                'P': ['??', '??', '???'],
                'Q': ['???'],
                'R': ['??', '??', '??', '??', '??', '???'],
                'S': ['??', '??', '??', '??', '??', '??', '??', '???'],
                'T': ['??', '??', '??', '??', '??', '??', '???'],
                'U': ['??', '??', '???', '??', '???', '??', '???', '???', '???', '???', '???', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '??', '???', '??', '??'],
                'V': ['??', '???'],
                'W': ['??', '??', '??', '???'],
                'X': ['??', '??', '???'],
                'Y': ['??', '???', '???', '???', '???', '??', '???', '???', '???', '??', '??', '??', '??', '??', '??', '???'],
                'Z': ['??', '??', '??', '??', '??', '???'],
                'AE': ['??', '??'],
                'Ch': ['??'],
                'Dj': ['??'],
                'Dz': ['??'],
                'Gx': ['??'],
                'Hx': ['??'],
                'Ij': ['??'],
                'Jx': ['??'],
                'Kh': ['??'],
                'Lj': ['??'],
                'Nj': ['??'],
                'Oe': ['??'],
                'Ps': ['??'],
                'Sh': ['??'],
                'Shch': ['??'],
                'Ss': ['???'],
                'Th': ['??'],
                'Ts': ['??'],
                'Ya': ['??'],
                'Yu': ['??'],
                'Zh': ['??']
            };
            Object.keys(swaps).forEach(function (swap) {
                swaps[swap].forEach(function (s) {
                    str = str.replace(new RegExp(s, "g"), swap);
                });
            });
            return str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
        }
    };

    $(document).ready(function () {
        ERE_ADMIN.init();
    });
})(jQuery);
