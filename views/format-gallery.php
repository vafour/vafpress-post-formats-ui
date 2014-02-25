<div id="vp-pfui-format-gallery-preview" class="vp-pfui-elm-block vp-pfui-elm-block-image" style="display: none;">
	<label><span><?php _e('Gallery Images', 'vp-post-formats-ui'); ?></span></label>
	<div class="vp-pfui-elm-container">

		<?php do_action( 'vp_pfui_before_gallery_meta' ); ?>

		<div class="vp-pfui-gallery-picker">
			<?php
				// query the gallery images meta
				global $post;
				$images = get_post_meta($post->ID, '_format_gallery_images', true);

				echo '<div class="gallery clearfix">';
				if ($images) {
					foreach ($images as $image) {
						$thumbnail = wp_get_attachment_image_src($image, 'thumbnail');
						echo '<span data-id="' . $image . '" title="' . 'title' . '"><img src="' . $thumbnail[0] . '" alt="" /><span class="close">x</span></span>';
					}
				}
				echo '</div>';
			?>
			<input type="hidden" name="_format_gallery_images" value="<?php echo (empty($images) ? "" : implode(',', $images)); ?>" />
			<p class="none"><a href="#" class="button vp-pfui-gallery-button"><?php _e('Pick Images', 'vp-post-formats-ui'); ?></a></p>
		</div>

		<?php do_action( 'vp_pfui_after_gallery_meta' ); ?>

	</div>
</div>