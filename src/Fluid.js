import { Item } from "./Item.js";

const { Block } = require("./Block.js");

class FluidBlock extends Block {
    //Add permuations need for it to be a fluid block
 static Permutations = {
    
 }
 // How fast they can swim when in the fluid block
 /**
  * @type {number}
  * How fast the player can move in this fluid
  */
 static SwimSpeed;
 /**
  * @type {Item}
  * The Bucket Item for this fluid
  */
 static BucketItem;
  /**
  * @type {Item}
  * The Bottle Item for this fluid, This is optional
  */
 static BottleItem;
 /**
  * @type {boolean}
  * Optional. If their is no bucket item provided and this is marked as true, a bucket will be generated for you based off the fluids texture
  */
 static usesBucket;
 /**
  * @type {boolean}
  * Optional. If their is no bottle item provided and this is marked as true, a bottle will be generated for you based off the fluids texture
  */
 static usesBottle;
}

module.exports = {FluidBlock};
