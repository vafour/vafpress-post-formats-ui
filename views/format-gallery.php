<div id="cfpf-format-gallery-preview" class="cf-elm-block cf-elm-block-image" style="display: none;">
	<label><span><?php _e('Gallery Images', 'cf-post-format'); ?></span></label>
	<div class="cf-elm-container">

		<?php do_action( 'cfpf_before_gallery_meta' ); ?>

		<div class="cfpf_gallery_picker">
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
			<p class="none"><a href="#" class="button cfpf_gallery_button"><?php _e('Pick Images', 'cf-post-format'); ?></a></p>
		</div>

		<?php do_action( 'cfpf_after_gallery_meta' ); ?>

	</div>
</div>