// Based off the js linked below for Minecraft 1.5.2
// https://github.com/JannisX11/blockbench/blob/master/js/io/formats/modded_entity.js

(function() {

Plugin.register('modded_entity_1_5_2', {
	title: 'Modded Entity 1.5.2',
	icon: 'icon-player',
	author: 'Sockthing',
	version: '1.1',
	description: 'Exports the model as a java file for Minecraft 1.5.2 (MCP)',
	min_version: '3.5.0',
	tags: ["Minecraft: Java Edition"],

	onload() {
		Codecs.modded_entity.templates['1.5.2'] = {
			name: 'Minecraft 1.5.2 (MCP)',
			flip_y: true,
			integer_size: true,
			file:
		   `// Made with Blockbench %(bb_version)
			// Exported for Minecraft version 1.5.2
			// Paste this class into your mod and call render() in your Entity Render class
			// Note: You may need to adjust the y values of the 'setRotationPoint's 
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
					this.setRotationAngles(f, f1, f2, f3, f4, f5, entity);
					%(renderers)
				}

				/**
				* Sets the model's various rotation angles. For bipeds, f and f1 are used for animating the movement of arms
				* and legs, where f represents the time(so that arms and legs swing back and forth) and f1 represents how
				* "far" arms and legs can swing at most.
				*/
				@Override
    			public void setRotationAngles(float f, float f1, float f2, float f3, float f4, float f5, Entity entity) {

    			}
				
				/**
				*	Sets the rotation of a ModelRenderer. Only called if the ModelRenderer has a rotation
				*/
    			public void setRotation(ModelRenderer modelRenderer, float x, float y, float z) {
					modelRenderer.rotateAngleX = x;
					modelRenderer.rotateAngleY = y;
					modelRenderer.rotateAngleZ = z;
				}
			}`,
			field: `private final ModelRenderer %(bone);`,
			bone: `%(bone) = new ModelRenderer(this);
			%(bone).setRotationPoint(%(x), %(y), %(z));
			?(has_parent)%(parent).addChild(%(bone));
			?(has_rotation)setRotation(%(bone), %(rx), %(ry), %(rz));
			%(cubes)`,
			renderer: `%(bone).render(f5);`,
			cube: `this.%(bone).setTextureOffset(%(uv_x), %(uv_y)).addBox(%(x), %(y), %(z), %(dx), %(dy), %(dz), %(inflate));`,
		}
	},

	onunload() {
		delete Codecs.modded_entity.templates['1.5.2'];
	}
});

})()