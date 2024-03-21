export enum MenuCategories {
    Construction = 'construction',
    Equipments = 'equipments',
    Items = 'items',
    Nature = 'nature',
    None = 'none'
}

export enum MenuGroups {
    Anvil = 'itemGroup.name.anvil',
    Arrow = 'itemGroup.name.arrow',
    Axe = 'itemGroup.name.axe',
    Banner = 'itemGroup.name.banner',
    BannerPattern = 'itemGroup.name.banner_pattern',
    Bed = 'itemGroup.name.bed',
    Boat = 'itemGroup.name.boat',
    Boots = 'itemGroup.name.boots',
    Buttons = 'itemGroup.name.buttons',
    Candles = 'itemGroup.name.candles',
    Chalkboard = 'itemGroup.name.chalkboard',
    Chemistrytable = 'itemGroup.name.chemistrytable',
    Chest = 'itemGroup.name.chest',
    Chestboat = 'itemGroup.name.chestboat',
    Chestplate = 'itemGroup.name.chestplate',
    Concrete = 'itemGroup.name.concrete',
    ConcretePowder = 'itemGroup.name.concretePowder',
    CookedFood = 'itemGroup.name.cookedFood',
    Copper = 'itemGroup.name.copper',
    Coral = 'itemGroup.name.coral',
    CoralDecorations = 'itemGroup.name.coral_decorations',
    Crop = 'itemGroup.name.crop',
    Door = 'itemGroup.name.door',
    Dye = 'itemGroup.name.dye',
    Element = 'itemGroup.name.element',
    EnchantedBook = 'itemGroup.name.enchantedBook',
    Fence = 'itemGroup.name.fence',
    FenceGate = 'itemGroup.name.fenceGate',
    Firework = 'itemGroup.name.firework',
    FireworkStars = 'itemGroup.name.fireworkStars',
    Flower = 'itemGroup.name.flower',
    Glass = 'itemGroup.name.glass',
    GlassPane = 'itemGroup.name.glassPane',
    GlazedTerracotta = 'itemGroup.name.glazedTerracotta',
    GoatHorn = 'itemGroup.name.goatHorn',
    Grass = 'itemGroup.name.grass',
    HangingSign = 'itemGroup.name.hanging_sign',
    Helmet = 'itemGroup.name.helmet',
    Hoe = 'itemGroup.name.hoe',
    HorseArmor = 'itemGroup.name.horseArmor',
    Leaves = 'itemGroup.name.leaves',
    Leggings = 'itemGroup.name.leggings',
    LingeringPotion = 'itemGroup.name.lingeringPotion',
    Log = 'itemGroup.name.log',
    Minecart = 'itemGroup.name.minecart',
    MiscFood = 'itemGroup.name.miscFood',
    MobEgg = 'itemGroup.name.mobEgg',
    MonsterStoneEgg = 'itemGroup.name.monsterStoneEgg',
    Mushroom = 'itemGroup.name.mushroom',
    NetherWartBlock = 'itemGroup.name.netherWartBlock',
    Ore = 'itemGroup.name.ore',
    Permission = 'itemGroup.name.permission',
    Pickaxe = 'itemGroup.name.pickaxe',
    Planks = 'itemGroup.name.planks',
    Potion = 'itemGroup.name.potion',
    PotterySherds = 'itemGroup.name.potterySherds',
    PressurePlate = 'itemGroup.name.pressurePlate',
    Rail = 'itemGroup.name.rail',
    RawFood = 'itemGroup.name.rawFood',
    Record = 'itemGroup.name.record',
    Sandstone = 'itemGroup.name.sandstone',
    Sapling = 'itemGroup.name.sapling',
    Sculk = 'itemGroup.name.sculk',
    Seed = 'itemGroup.name.seed',
    Shovel = 'itemGroup.name.shovel',
    ShulkerBox = 'itemGroup.name.shulkerBox',
    Sign = 'itemGroup.name.sign',
    Skull = 'itemGroup.name.skull',
    Slab = 'itemGroup.name.slab',
    SmithingTemplates = 'itemGroup.name.smithing_templates',
    SplashPotion = 'itemGroup.name.splashPotion',
    StainedClay = 'itemGroup.name.stainedClay',
    Stairs = 'itemGroup.name.stairs',
    Stone = 'itemGroup.name.stone',
    StoneBrick = 'itemGroup.name.stoneBrick',
    Sword = 'itemGroup.name.sword',
    Trapdoor = 'itemGroup.name.trapdoor',
    Walls = 'itemGroup.name.walls',
    Wood = 'itemGroup.name.wood',
    Wool = 'itemGroup.name.wool',
    WoolCarpet = 'itemGroup.name.woolCarpet'
}

export enum DamageType {
    /**
        * @remarks
        * Damage caused by a falling anvil.
        *
        */
    anvil = 'anvil',
    /**
     * @remarks
     * Damage caused from a non-Entity explosion. For example, an
     * exploding bed.
     *
     */
    blockExplosion = 'blockExplosion',
    campfire = 'campfire',
    /**
     * @remarks
     * Unused.
     *
     */
    charging = 'charging',
    /**
     * @remarks
     * Damage caused by physically touching an Entity or Block. For
     * example, touching a Sweet Berry bush or Pufferfish.
     *
     */
    contact = 'contact',
    /**
     * @remarks
     * Damage caused by an Entity being out of air and inside a
     * liquid block.
     *
     */
    drowning = 'drowning',
    /**
     * @remarks
     * Damage caused by an Entity attack.
     *
     */
    entityAttack = 'entityAttack',
    /**
     * @remarks
     * Damage caused by an Entity explosion. For example, a Creeper
     * or Wither.
     *
     */
    entityExplosion = 'entityExplosion',
    /**
     * @remarks
     * Damage caused by falling onto the ground.
     *
     */
    fall = 'fall',
    /**
     * @remarks
     * Damage caused by falling blocks. Note: Anvils and
     * Stalactites have their own damage causes.
     *
     */
    fallingBlock = 'fallingBlock',
    /**
     * @remarks
     * Damage caused by catching on fire.
     *
     */
    fire = 'fire',
    /**
     * @remarks
     * Damage caused by burning over time.
     *
     */
    fireTick = 'fireTick',
    /**
     * @remarks
     * Damage caused by fireworks.
     *
     */
    fireworks = 'fireworks',
    /**
     * @remarks
     * Damage caused by flying into a wall at high speed while
     * gliding with Elytra.
     *
     */
    flyIntoWall = 'flyIntoWall',
    /**
     * @remarks
     * Damage caused by staying inside a Powder Snow block.
     *
     */
    freezing = 'freezing',
    /**
     * @remarks
     * Damage caused by touching a Lava block.
     *
     */
    lava = 'lava',
    /**
     * @remarks
     * Damage caused by being struck by lightning.
     *
     */
    lightning = 'lightning',
    /**
     * @remarks
     * Damage caused by magical attacks. For example, Evoker Fang
     * or Conduit Block.
     *
     */
    magic = 'magic',
    /**
     * @remarks
     * Damage caused by touching a Magma block.
     *
     */
    magma = 'magma',
    /**
     * @remarks
     * Damage caused by no source. For example, from a command or
     * script.
     *
     */
    none = 'none',
    /**
     * @remarks
     * Damage caused by an indirect source. For example, setting a
     * mob's health to 0 in a behavior pack.
     *
     */
    override = 'override',
    /**
     * @remarks
     * Damage caused by a Piston.
     *
     */
    piston = 'piston',
    /**
     * @remarks
     * Damage caused by a projectile.
     *
     */
    projectile = 'projectile',
    ramAttack = 'ramAttack',
    selfDestruct = 'selfDestruct',
    sonicBoom = 'sonicBoom',
    soulCampfire = 'soulCampfire',
    /**
     * @remarks
     * Damage caused by a falling Stalactite block.
     *
     */
    stalactite = 'stalactite',
    /**
     * @remarks
     * Damage caused by touching a Stalagmite block.
     *
     */
    stalagmite = 'stalagmite',
    /**
     * @remarks
     * Damage caused over time by having an empty hunger bar.
     *
     */
    starve = 'starve',
    /**
     * @remarks
     * Damage caused by an Entity being out of air and inside a
     * non-liquid block.
     *
     */
    suffocation = 'suffocation',
    /**
     * @remarks
     * Damage caused by an Entity killing itself. For example, from
     * the /kill command.
     *
     */
    suicide = 'suicide',
    /**
     * @remarks
     * Damage caused by an Entity being in an inhabitable climate.
     * For example, a Snow Golem in a biome with a temperature
     * greater than 1.
     *
     */
    temperature = 'temperature',
    /**
     * @remarks
     * Damage caused by the Thorns armor enchantment and by the
     * Guardian thorns effect.
     *
     */
    thorns = 'thorns',
    /**
     * @remarks
     * Damage caused over time by falling into the void.
     *
     */
    void = 'void',
    /**
     * @remarks
     * Damage caused by the Wither effect. For example, from
     * touching a Wither Rose.
     *
     */
    wither = 'wither',
}

//#region Filter Enums

export enum SubjectType {

}

export enum OperatorType {
    NotEqual = '!=',
    LessThan = '<',
    LessThanOrEqualTo = '<=',
    EqualTo = '=',
    ExactlyEqualTo = '==',
    GreaterThan = '>',
    GreaterThanOrEqualTo = '>=',
}


//#endregion