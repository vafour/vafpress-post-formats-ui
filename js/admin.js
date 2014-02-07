jQuery(function($) {
	var CF = CF || {};
	
	CF.postFormats = function($) {
		return {
			switchTab: function(clicked) {
				var $this = $(clicked),
					$tab = $this.closest('li');

				if (!$this.hasClass('current')) {
					$this.addClass('current');
					$tab.siblings().find('a').removeClass('current');
					this.switchWPFormat($this.attr('href'));
				}
			},
			
			switchWPFormat: function(formatHash) {
				$(formatHash).trigger('click');
				switch (formatHash) {
					case '#post-format-0':
					case '#post-format-aside':
					case '#post-format-chat':
						CF.postFormats.standard();
						break;
					case '#post-format-status':
					case '#post-format-link':
					case '#post-format-image':
					case '#post-format-gallery':
					case '#post-format-video':
					case '#post-format-quote':
					case '#post-format-audio':
						CF.postFormats[formatHash.replace('#post-format-', '')]();
				}
				$(document).trigger('cf-post-formats-switch', formatHash);
			},

			standard: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#titlewrap').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},
			
			status: function() {
				$('#titlewrap, #cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
				$('#content:visible').focus();
			},

			link: function() {
				$('#cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#titlewrap, #cfpf-format-link-url').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},
			
			image: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#titlewrap').show();
				$('#postimagediv').after('<div id="postimagediv-placeholder"></div>').insertAfter('#titlediv');
			},

			gallery: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-audio-fields').hide();
				$('#titlewrap, #cfpf-format-gallery-preview').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			video: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-gallery-preview, #cfpf-format-audio-fields').hide();
				$('#titlewrap, #cfpf-format-video-fields').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			quote: function() {
				$('#titlewrap, #cfpf-format-link-url, #cfpf-format-video-fields, #cfpf-format-audio-fields, #cfpf-format-gallery-preview').hide();
				$('#cfpf-format-quote-fields').show().find(':input:first').focus();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			},

			audio: function() {
				$('#cfpf-format-link-url, #cfpf-format-quote-fields, #cfpf-format-video-fields, #cfpf-format-gallery-preview').hide();
				$('#titlewrap, #cfpf-format-audio-fields').show();
				$('#postimagediv-placeholder').replaceWith($('#postimagediv'));
			}

		};
	}(jQuery);
	
	// move tabs in to place
	$('#cf-post-format-tabs').insertBefore($('form#post')).show();
	$('#cfpf-format-link-url, #cfpf-format-video-fields, #cfpf-format-audio-fields').insertAfter($('#titlediv'));
	$('#cfpf-format-gallery-preview').find('dt a').each(function() {
		$(this).replaceWith($(this.childNodes)); // remove links
	}).end().insertAfter($('#titlediv'));
	$('#cfpf-format-quote-fields').insertAfter($('#titlediv'));
	
	$(document).trigger('cf-post-formats-init');
	
	// tab switch
	$('#cf-post-format-tabs a').live('click', function(e) {
		CF.postFormats.switchTab(this);
		e.stopPropagation();
		e.preventDefault();
	}).filter('.current').each(function() {
		CF.postFormats.switchWPFormat($(this).attr('href'));
	});

	// Gallery Management
	var postId   = $('#post_ID').val(),
	    $gallery = $('.cfpf_gallery_picker .gallery');

	cfpfMediaControl = {

		// Init a new media manager or returns existing frame
		frame: function() {
			if( this._frame )
				return this._frame;

			this._frame = wp.media({
				title: cfpf_post_format.media_title,
				library: {
					type: 'image'
				},
				button: {
					text: cfpf_post_format.media_button
				},
				multiple: true
			});

			this._frame.on('open', this.updateFrame).state('library').on('select', this.select);

			return this._frame;
		},

		select: function() {
			var selection = this.get('selection');

			selection.each(function(model) {
				var thumbnail = model.attributes.url;
				if( model.attributes.sizes !== undefined && model.attributes.sizes.thumbnail !== undefined )
					thumbnail = model.attributes.sizes.thumbnail.url;
				$gallery.append('<span data-id="' + model.id + '" title="' + model.attributes.title + '"><img src="' + thumbnail + '" alt="" /><span class="close">x</span></span>');
				$gallery.trigger('update');
			});
		},

		updateFrame: function() {
		},

		init: function() {
			$('#wpbody').on('click', '.cfpf_gallery_button', function(e){
				e.preventDefault();
				cfpfMediaControl.frame().open();
			});
		}
	}
	cfpfMediaControl.init();

	$gallery.on('update', function(){
		var ids = [];
		$(this).find('> span').each(function(){
			ids.push($(this).data('id'));
		});
		$('[name="_format_gallery_images"]').val(ids.join(','));
	});

	$gallery.sortable({
		placeholder: "cf-ui-state-highlight",
		revert: 200,
		tolerance: 'pointer',
		stop: function () {
			$gallery.trigger('update');
		}
	});

	$gallery.on('click', 'span.close', function(e){
		$(this).parent().fadeOut(200, function(){
			$(this).remove();
			$gallery.trigger('update');
		});
	});

});
