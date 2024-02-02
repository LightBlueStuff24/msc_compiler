const { Decorator } = require("./Decorator.js");
const { Item } = require("./Item.js");
const { Block } = require("./Block.js")

class FluidBlock extends Block {

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
    static NeedsBucket;
    /**
     * @type {boolean}
     * Optional. If their is no bottle item provided and this is marked as true, a bottle will be generated for you based off the fluids texture
     */
    static NeedsBottle;
}

/**
 * @class IFluid
 * @classdesc A decorator as an alternative to the FluidBlock class
 * @extends {Decorator}
 * @implements {FluidBlock}
 */
class IFluid extends Decorator {
    // How fast they can swim when in the fluid 
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
    static NeedsBucket;
    /**
     * @type {boolean}
     * Optional. If their is no bottle item provided and this is marked as true, a bottle will be generated for you based off the fluids texture
     */
    static NeedsBottle;

    constructor(target) {
        
        super(target)
        target.Permutations = {};
        Object.assign(target, IFluid);
    }
}
module.exports = { FluidBlock, IFluid };

@IFluid
/**
 * @implements {FluidBlock}
 */
class FG extends Block {
    static
}
