(function() {

Plugin.register('modded_entity_1_5_2', {
	title: 'Modded Entity 1.5.2',
	icon: '',
	author: 'Sockthing',
	description: 'Exports the model for 1.5.2',
	min_version: '3.5.0',
	onload() {
		Codecs.modded_entity.templates['1.5.2'] = {
			name: '1.5.2',
			flip_y: true,
			integer_size: false,
			file:
		   `// Made with Blockbench %(bb_version)
			// Exported for Minecraft version 1.5.2
			// Paste this class into your mod and generate all required imports

			package net.minecraft.src;

			public class %(identifier) extends ModelBase {
				%(fields)

				public %(identifier)() {
					textureWidth = %(texture_width);
					textureHeight = %(texture_height);

					%(content)
				}
				/**
     		* Sets the models various rotation angles then renders the model.
     		*/
				@Override
				public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
					super.render(entity, f, f1, f2, f3, f4, f5);
					%(renderers)
				}

				public void setRotation(ModelRenderer modelRenderer, float x, float y, float z) {
					modelRenderer.rotateAngleX = x;
					modelRenderer.rotateAngleY = y;
					modelRenderer.rotateAngleZ = z;
				}

			}`,
			field: `private final ModelRenderer %(bone);`,
			bone: 
		  `%(bone) = new ModelRenderer(this);
			%(bone).setRotationPoint(%(x), %(y), %(z));
			?(has_parent)%(parent).addChild(%(bone));
			?(has_rotation)setRotation(%(bone), %(rx), %(ry), %(rz));
			%(cubes)`,
			renderer: `%(bone).render(f5);`,
			cube: `this.%(bone).setTextureOffset(%(uv_x), %(uv_y)).addBox(%(x), %(y), %(z), int(%(dx)), int(%(dy)), int(%(dz)), %(inflate));`,
		}
	},
	onunload() {
		delete Codecs.modded_entity.templates['1.5.2'];
	}
});

})()
