<div id="vp-pfui-format-quote-fields" style="display: none;">
	<?php do_action( 'vp_pfui_before_quote_meta' ); ?>
	<div class="vp-pfui-elm-block">
		<label for="vp-pfui-format-quote-source-name"><?php _e('Source Name', 'vp-post-formats-ui'); ?></label>
		<input type="text" name="_format_quote_source_name" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_quote_source_name', true)); ?>" id="vp-pfui-format-quote-source-name" tabindex="1" />
	</div>
	<div class="vp-pfui-elm-block">
		<label for="vp-pfui-format-quote-source-url"><?php _e('Source URL', 'vp-post-formats-ui'); ?></label>
		<input type="text" name="_format_quote_source_url" value="<?php echo esc_attr(get_post_meta($post->ID, '_format_quote_source_url', true)); ?>" id="vp-pfui-format-quote-source-url" tabindex="1" />
	</div>
	<?php do_action( 'vp_pfui_after_quote_meta' ); ?>
</div>
