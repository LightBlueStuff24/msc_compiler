
const validEntities = new Set([
	"agent",
	"allay",
	"area_effect_cloud",
	"armadillo",
	"armor_stand",
	"arrow",
	"axolotl",
	"balloon",
	"bat",
	"bee",
	"blaze",
	"boat",
	"breeze",
	"camel",
	"cat",
	"cave_spider",
	"chalkboard",
	"chest_boat",
	"chest_minecart",
	"chicken",
	"cod",
	"command_block_minecart",
	"cow",
	"creeper",
	"dolphin",
	"donkey",
	"dragon_fireball",
	"drowned",
	"egg",
	"elder_guardian",
	"elder_guardian_ghost",
	"ender_crystal",
	"ender_dragon",
	"ender_pearl",
	"enderman",
	"endermite",
	"evocation_fang",
	"evocation_illager",
	"eye_of_ender_signal",
	"falling_block",
	"fireball",
	"fireworks_rocket",
	"fishing_hook",
	"fox",
	"frog",
	"ghast",
	"glow_squid",
	"goat",
	"guardian",
	"hoglin",
	"hopper_minecart",
	"horse",
	"husk",
	"ice_bomb",
	"iron_golem",
	"item",
	"leash_knot",
	"lightning_bolt",
	"lingering_potion",
	"llama",
	"llama_spit",
	"magma_cube",
	"minecart",
	"mooshroom",
	"moving_block",
	"mule",
	"npc",
	"ocelot",
	"painting",
	"panda",
	"parrot",
	"phantom",
	"pig",
	"piglin",
	"piglin_brute",
	"pillager",
	"player",
	"polar_bear",
	"pufferfish",
	"rabbit",
	"ravager",
	"salmon",
	"sheep",
	"shield",
	"shulker",
	"shulker_bullet",
	"silverfish",
	"skeleton",
	"skeleton_horse",
	"slime",
	"small_fireball",
	"sniffer",
	"snow_golem",
	"snowball",
	"spider",
	"splash_potion",
	"squid",
	"stray",
	"strider",
	"tadpole",
	"thrown_trident",
	"tnt",
	"tnt_minecart",
	"trader_llama",
	"tripod_camera",
	"tropicalfish",
	"turtle",
	"vex",
	"villager",
	"villager_v2",
	"vindicator",
	"wandering_trader",
	"warden",
	"wind_charge_projectile",
	"witch",
	"wither",
	"wither_skeleton",
	"wither_skull",
	"wither_skull_dangerous",
	"wolf",
	"xp_bottle",
	"xp_orb",
	"zoglin",
	"zombie",
	"zombie_horse",
	"zombie_pigman",
	"zombie_villager",
	"zombie_villager_v2"
])

const supportedLanguages = new Set([
	'id_ID', 'da_DK', 'de_DE',
	'en_GB', 'en_US', 'es_ES',
	'es_MX', 'fr_CA', 'fr_FR',
	'it_IT', 'hu_HU', 'nl_NL',
	'nb_NO', 'pl_PL', 'pt_BR',
	'pt_PT', 'sk_SK', 'fi_FI',
	'sv_SE', 'tr_TR', 'cs_CZ',
	'el_GR', 'bg_BG', 'ru_RU',
	'uk_UA', 'ja_JP', 'zh_CN',
	'zh_TW', 'ko_KR'
  ])
const validCategories = new Set(['construction', 'items', 'equipments', 'nature', 'none'])
const validGroups = new Set([
	"itemGroup.name.anvil",
	"itemGroup.name.arrow",
	"itemGroup.name.axe",
	"itemGroup.name.banner",
	"itemGroup.name.banner_pattern",
	"itemGroup.name.bed",
	"itemGroup.name.boat",
	"itemGroup.name.boots",
	"itemGroup.name.buttons",
	"itemGroup.name.candles",
	"itemGroup.name.chalkboard",
	"itemGroup.name.chemistrytable",
	"itemGroup.name.chest",
	"itemGroup.name.chestboat",
	"itemGroup.name.chestplate",
	"itemGroup.name.concrete",
	"itemGroup.name.concretePowder",
	"itemGroup.name.cookedFood",
	"itemGroup.name.copper",
	"itemGroup.name.coral",
	"itemGroup.name.coral_decorations",
	"itemGroup.name.crop",
	"itemGroup.name.door",
	"itemGroup.name.dye",
	"itemGroup.name.element",
	"itemGroup.name.enchantedBook",
	"itemGroup.name.fence",
	"itemGroup.name.fenceGate",
	"itemGroup.name.firework",
	"itemGroup.name.fireworkStars",
	"itemGroup.name.flower",
	"itemGroup.name.glass",
	"itemGroup.name.glassPane",
	"itemGroup.name.glazedTerracotta",
	"itemGroup.name.goatHorn",
	"itemGroup.name.grass",
	"itemGroup.name.hanging_sign",
	"itemGroup.name.helmet",
	"itemGroup.name.hoe",
	"itemGroup.name.horseArmor",
	"itemGroup.name.leaves",
	"itemGroup.name.leggings",
	"itemGroup.name.lingeringPotion",
	"itemGroup.name.log",
	"itemGroup.name.minecart",
	"itemGroup.name.miscFood",
	"itemGroup.name.mobEgg",
	"itemGroup.name.monsterStoneEgg",
	"itemGroup.name.mushroom",
	"itemGroup.name.netherWartBlock",
	"itemGroup.name.ore",
	"itemGroup.name.permission",
	"itemGroup.name.pickaxe",
	"itemGroup.name.planks",
	"itemGroup.name.potion",
	"itemGroup.name.potterySherds",
	"itemGroup.name.pressurePlate",
	"itemGroup.name.rail",
	"itemGroup.name.rawFood",
	"itemGroup.name.record",
	"itemGroup.name.sandstone",
	"itemGroup.name.sapling",
	"itemGroup.name.sculk",
	"itemGroup.name.seed",
	"itemGroup.name.shovel",
	"itemGroup.name.shulkerBox",
	"itemGroup.name.sign",
	"itemGroup.name.skull",
	"itemGroup.name.slab",
	"itemGroup.name.smithing_templates",
	"itemGroup.name.splashPotion",
	"itemGroup.name.stainedClay",
	"itemGroup.name.stairs",
	"itemGroup.name.stone",
	"itemGroup.name.stoneBrick",
	"itemGroup.name.sword",
	"itemGroup.name.trapdoor",
	"itemGroup.name.walls",
	"itemGroup.name.wood",
	"itemGroup.name.wool",
	"itemGroup.name.woolCarpet"
])

const validItems = new Set([
	"acacia_button",
	"acacia_door",
	"acacia_fence",
	"acacia_fence_gate",
	"acacia_hanging_sign",
	"acacia_log",
	"acacia_planks",
	"acacia_pressure_plate",
	"acacia_stairs",
	"acacia_standing_sign",
	"acacia_trapdoor",
	"acacia_wall_sign",
	"activator_rail",
	"air",
	"allow",
	"amethyst_block",
	"amethyst_cluster",
	"ancient_debris",
	"andesite",
	"andesite_stairs",
	"anvil",
	"azalea",
	"azalea_leaves",
	"azalea_leaves_flowered",
	"bamboo",
	"bamboo_block",
	"bamboo_button",
	"bamboo_door",
	"bamboo_double_slab",
	"bamboo_fence",
	"bamboo_fence_gate",
	"bamboo_hanging_sign",
	"bamboo_mosaic",
	"bamboo_mosaic_double_slab",
	"bamboo_mosaic_slab",
	"bamboo_mosaic_stairs",
	"bamboo_planks",
	"bamboo_pressure_plate",
	"bamboo_sapling",
	"bamboo_slab",
	"bamboo_stairs",
	"bamboo_standing_sign",
	"bamboo_trapdoor",
	"bamboo_wall_sign",
	"barrel",
	"barrier",
	"basalt",
	"beacon",
	"bed",
	"bedrock",
	"bee_nest",
	"beehive",
	"beetroot",
	"bell",
	"big_dripleaf",
	"birch_button",
	"birch_door",
	"birch_fence",
	"birch_fence_gate",
	"birch_hanging_sign",
	"birch_log",
	"birch_planks",
	"birch_pressure_plate",
	"birch_stairs",
	"birch_standing_sign",
	"birch_trapdoor",
	"birch_wall_sign",
	"black_candle",
	"black_candle_cake",
	"black_carpet",
	"black_concrete",
	"black_concrete_powder",
	"black_glazed_terracotta",
	"black_shulker_box",
	"black_stained_glass",
	"black_stained_glass_pane",
	"black_terracotta",
	"black_wool",
	"blackstone",
	"blackstone_double_slab",
	"blackstone_slab",
	"blackstone_stairs",
	"blackstone_wall",
	"blast_furnace",
	"blue_candle",
	"blue_candle_cake",
	"blue_carpet",
	"blue_concrete",
	"blue_concrete_powder",
	"blue_glazed_terracotta",
	"blue_ice",
	"blue_shulker_box",
	"blue_stained_glass",
	"blue_stained_glass_pane",
	"blue_terracotta",
	"blue_wool",
	"bone_block",
	"bookshelf",
	"border_block",
	"brain_coral",
	"brewing_stand",
	"brick_block",
	"brick_stairs",
	"brown_candle",
	"brown_candle_cake",
	"brown_carpet",
	"brown_concrete",
	"brown_concrete_powder",
	"brown_glazed_terracotta",
	"brown_mushroom",
	"brown_mushroom_block",
	"brown_shulker_box",
	"brown_stained_glass",
	"brown_stained_glass_pane",
	"brown_terracotta",
	"brown_wool",
	"bubble_column",
	"bubble_coral",
	"budding_amethyst",
	"cactus",
	"cake",
	"calcite",
	"calibrated_sculk_sensor",
	"camera",
	"campfire",
	"candle",
	"candle_cake",
	"carrots",
	"cartography_table",
	"carved_pumpkin",
	"cauldron",
	"cave_vines",
	"cave_vines_body_with_berries",
	"cave_vines_head_with_berries",
	"chain",
	"chain_command_block",
	"chemical_heat",
	"chemistry_table",
	"cherry_button",
	"cherry_door",
	"cherry_double_slab",
	"cherry_fence",
	"cherry_fence_gate",
	"cherry_hanging_sign",
	"cherry_leaves",
	"cherry_log",
	"cherry_planks",
	"cherry_pressure_plate",
	"cherry_sapling",
	"cherry_slab",
	"cherry_stairs",
	"cherry_standing_sign",
	"cherry_trapdoor",
	"cherry_wall_sign",
	"cherry_wood",
	"chest",
	"chiseled_bookshelf",
	"chiseled_copper",
	"chiseled_deepslate",
	"chiseled_nether_bricks",
	"chiseled_polished_blackstone",
	"chiseled_tuff",
	"chiseled_tuff_bricks",
	"chorus_flower",
	"chorus_plant",
	"clay",
	"client_request_placeholder_block",
	"coal_block",
	"coal_ore",
	"cobbled_deepslate",
	"cobbled_deepslate_double_slab",
	"cobbled_deepslate_slab",
	"cobbled_deepslate_stairs",
	"cobbled_deepslate_wall",
	"cobblestone",
	"cobblestone_wall",
	"cocoa",
	"colored_torch_bp",
	"colored_torch_rg",
	"command_block",
	"composter",
	"conduit",
	"copper_block",
	"copper_bulb",
	"copper_door",
	"copper_grate",
	"copper_ore",
	"copper_trapdoor",
	"coral_block",
	"coral_fan",
	"coral_fan_dead",
	"coral_fan_hang",
	"coral_fan_hang2",
	"coral_fan_hang3",
	"cracked_deepslate_bricks",
	"cracked_deepslate_tiles",
	"cracked_nether_bricks",
	"cracked_polished_blackstone_bricks",
	"crafter",
	"crafting_table",
	"crimson_button",
	"crimson_door",
	"crimson_double_slab",
	"crimson_fence",
	"crimson_fence_gate",
	"crimson_fungus",
	"crimson_hanging_sign",
	"crimson_hyphae",
	"crimson_nylium",
	"crimson_planks",
	"crimson_pressure_plate",
	"crimson_roots",
	"crimson_slab",
	"crimson_stairs",
	"crimson_standing_sign",
	"crimson_stem",
	"crimson_trapdoor",
	"crimson_wall_sign",
	"crying_obsidian",
	"cut_copper",
	"cut_copper_slab",
	"cut_copper_stairs",
	"cyan_candle",
	"cyan_candle_cake",
	"cyan_carpet",
	"cyan_concrete",
	"cyan_concrete_powder",
	"cyan_glazed_terracotta",
	"cyan_shulker_box",
	"cyan_stained_glass",
	"cyan_stained_glass_pane",
	"cyan_terracotta",
	"cyan_wool",
	"dark_oak_button",
	"dark_oak_door",
	"dark_oak_fence",
	"dark_oak_fence_gate",
	"dark_oak_hanging_sign",
	"dark_oak_log",
	"dark_oak_planks",
	"dark_oak_pressure_plate",
	"dark_oak_stairs",
	"dark_oak_trapdoor",
	"dark_prismarine_stairs",
	"darkoak_standing_sign",
	"darkoak_wall_sign",
	"daylight_detector",
	"daylight_detector_inverted",
	"dead_brain_coral",
	"dead_bubble_coral",
	"dead_fire_coral",
	"dead_horn_coral",
	"dead_tube_coral",
	"deadbush",
	"decorated_pot",
	"deepslate",
	"deepslate_brick_double_slab",
	"deepslate_brick_slab",
	"deepslate_brick_stairs",
	"deepslate_brick_wall",
	"deepslate_bricks",
	"deepslate_coal_ore",
	"deepslate_copper_ore",
	"deepslate_diamond_ore",
	"deepslate_emerald_ore",
	"deepslate_gold_ore",
	"deepslate_iron_ore",
	"deepslate_lapis_ore",
	"deepslate_redstone_ore",
	"deepslate_tile_double_slab",
	"deepslate_tile_slab",
	"deepslate_tile_stairs",
	"deepslate_tile_wall",
	"deepslate_tiles",
	"deny",
	"detector_rail",
	"diamond_block",
	"diamond_ore",
	"diorite",
	"diorite_stairs",
	"dirt",
	"dirt_with_roots",
	"dispenser",
	"double_cut_copper_slab",
	"double_plant",
	"double_stone_block_slab",
	"double_stone_block_slab2",
	"double_stone_block_slab3",
	"double_stone_block_slab4",
	"double_wooden_slab",
	"dragon_egg",
	"dried_kelp_block",
	"dripstone_block",
	"dropper",
	"element_0",
	"element_1",
	"element_10",
	"element_100",
	"element_101",
	"element_102",
	"element_103",
	"element_104",
	"element_105",
	"element_106",
	"element_107",
	"element_108",
	"element_109",
	"element_11",
	"element_110",
	"element_111",
	"element_112",
	"element_113",
	"element_114",
	"element_115",
	"element_116",
	"element_117",
	"element_118",
	"element_12",
	"element_13",
	"element_14",
	"element_15",
	"element_16",
	"element_17",
	"element_18",
	"element_19",
	"element_2",
	"element_20",
	"element_21",
	"element_22",
	"element_23",
	"element_24",
	"element_25",
	"element_26",
	"element_27",
	"element_28",
	"element_29",
	"element_3",
	"element_30",
	"element_31",
	"element_32",
	"element_33",
	"element_34",
	"element_35",
	"element_36",
	"element_37",
	"element_38",
	"element_39",
	"element_4",
	"element_40",
	"element_41",
	"element_42",
	"element_43",
	"element_44",
	"element_45",
	"element_46",
	"element_47",
	"element_48",
	"element_49",
	"element_5",
	"element_50",
	"element_51",
	"element_52",
	"element_53",
	"element_54",
	"element_55",
	"element_56",
	"element_57",
	"element_58",
	"element_59",
	"element_6",
	"element_60",
	"element_61",
	"element_62",
	"element_63",
	"element_64",
	"element_65",
	"element_66",
	"element_67",
	"element_68",
	"element_69",
	"element_7",
	"element_70",
	"element_71",
	"element_72",
	"element_73",
	"element_74",
	"element_75",
	"element_76",
	"element_77",
	"element_78",
	"element_79",
	"element_8",
	"element_80",
	"element_81",
	"element_82",
	"element_83",
	"element_84",
	"element_85",
	"element_86",
	"element_87",
	"element_88",
	"element_89",
	"element_9",
	"element_90",
	"element_91",
	"element_92",
	"element_93",
	"element_94",
	"element_95",
	"element_96",
	"element_97",
	"element_98",
	"element_99",
	"emerald_block",
	"emerald_ore",
	"enchanting_table",
	"end_brick_stairs",
	"end_bricks",
	"end_gateway",
	"end_portal",
	"end_portal_frame",
	"end_rod",
	"end_stone",
	"ender_chest",
	"exposed_chiseled_copper",
	"exposed_copper",
	"exposed_copper_bulb",
	"exposed_copper_door",
	"exposed_copper_grate",
	"exposed_copper_trapdoor",
	"exposed_cut_copper",
	"exposed_cut_copper_slab",
	"exposed_cut_copper_stairs",
	"exposed_double_cut_copper_slab",
	"farmland",
	"fence_gate",
	"fire",
	"fire_coral",
	"fletching_table",
	"flower_pot",
	"flowering_azalea",
	"flowing_lava",
	"flowing_water",
	"frame",
	"frog_spawn",
	"frosted_ice",
	"furnace",
	"gilded_blackstone",
	"glass",
	"glass_pane",
	"glow_frame",
	"glow_lichen",
	"glowingobsidian",
	"glowstone",
	"gold_block",
	"gold_ore",
	"golden_rail",
	"granite",
	"granite_stairs",
	"grass",
	"grass_path",
	"gravel",
	"gray_candle",
	"gray_candle_cake",
	"gray_carpet",
	"gray_concrete",
	"gray_concrete_powder",
	"gray_glazed_terracotta",
	"gray_shulker_box",
	"gray_stained_glass",
	"gray_stained_glass_pane",
	"gray_terracotta",
	"gray_wool",
	"green_candle",
	"green_candle_cake",
	"green_carpet",
	"green_concrete",
	"green_concrete_powder",
	"green_glazed_terracotta",
	"green_shulker_box",
	"green_stained_glass",
	"green_stained_glass_pane",
	"green_terracotta",
	"green_wool",
	"grindstone",
	"hanging_roots",
	"hard_black_stained_glass",
	"hard_black_stained_glass_pane",
	"hard_blue_stained_glass",
	"hard_blue_stained_glass_pane",
	"hard_brown_stained_glass",
	"hard_brown_stained_glass_pane",
	"hard_cyan_stained_glass",
	"hard_cyan_stained_glass_pane",
	"hard_glass",
	"hard_glass_pane",
	"hard_gray_stained_glass",
	"hard_gray_stained_glass_pane",
	"hard_green_stained_glass",
	"hard_green_stained_glass_pane",
	"hard_light_blue_stained_glass",
	"hard_light_blue_stained_glass_pane",
	"hard_light_gray_stained_glass",
	"hard_light_gray_stained_glass_pane",
	"hard_lime_stained_glass",
	"hard_lime_stained_glass_pane",
	"hard_magenta_stained_glass",
	"hard_magenta_stained_glass_pane",
	"hard_orange_stained_glass",
	"hard_orange_stained_glass_pane",
	"hard_pink_stained_glass",
	"hard_pink_stained_glass_pane",
	"hard_purple_stained_glass",
	"hard_purple_stained_glass_pane",
	"hard_red_stained_glass",
	"hard_red_stained_glass_pane",
	"hard_white_stained_glass",
	"hard_white_stained_glass_pane",
	"hard_yellow_stained_glass",
	"hard_yellow_stained_glass_pane",
	"hardened_clay",
	"hay_block",
	"heavy_weighted_pressure_plate",
	"honey_block",
	"honeycomb_block",
	"hopper",
	"horn_coral",
	"ice",
	"infested_deepslate",
	"info_update",
	"info_update2",
	"invisible_bedrock",
	"iron_bars",
	"iron_block",
	"iron_door",
	"iron_ore",
	"iron_trapdoor",
	"jigsaw",
	"jukebox",
	"jungle_button",
	"jungle_door",
	"jungle_fence",
	"jungle_fence_gate",
	"jungle_hanging_sign",
	"jungle_log",
	"jungle_planks",
	"jungle_pressure_plate",
	"jungle_stairs",
	"jungle_standing_sign",
	"jungle_trapdoor",
	"jungle_wall_sign",
	"kelp",
	"ladder",
	"lantern",
	"lapis_block",
	"lapis_ore",
	"large_amethyst_bud",
	"lava",
	"leaves",
	"leaves2",
	"lectern",
	"lever",
	"light_block",
	"light_blue_candle",
	"light_blue_candle_cake",
	"light_blue_carpet",
	"light_blue_concrete",
	"light_blue_concrete_powder",
	"light_blue_glazed_terracotta",
	"light_blue_shulker_box",
	"light_blue_stained_glass",
	"light_blue_stained_glass_pane",
	"light_blue_terracotta",
	"light_blue_wool",
	"light_gray_candle",
	"light_gray_candle_cake",
	"light_gray_carpet",
	"light_gray_concrete",
	"light_gray_concrete_powder",
	"light_gray_shulker_box",
	"light_gray_stained_glass",
	"light_gray_stained_glass_pane",
	"light_gray_terracotta",
	"light_gray_wool",
	"light_weighted_pressure_plate",
	"lightning_rod",
	"lime_candle",
	"lime_candle_cake",
	"lime_carpet",
	"lime_concrete",
	"lime_concrete_powder",
	"lime_glazed_terracotta",
	"lime_shulker_box",
	"lime_stained_glass",
	"lime_stained_glass_pane",
	"lime_terracotta",
	"lime_wool",
	"lit_blast_furnace",
	"lit_deepslate_redstone_ore",
	"lit_furnace",
	"lit_pumpkin",
	"lit_redstone_lamp",
	"lit_redstone_ore",
	"lit_smoker",
	"lodestone",
	"loom",
	"magenta_candle",
	"magenta_candle_cake",
	"magenta_carpet",
	"magenta_concrete",
	"magenta_concrete_powder",
	"magenta_glazed_terracotta",
	"magenta_shulker_box",
	"magenta_stained_glass",
	"magenta_stained_glass_pane",
	"magenta_terracotta",
	"magenta_wool",
	"magma",
	"mangrove_button",
	"mangrove_door",
	"mangrove_double_slab",
	"mangrove_fence",
	"mangrove_fence_gate",
	"mangrove_hanging_sign",
	"mangrove_leaves",
	"mangrove_log",
	"mangrove_planks",
	"mangrove_pressure_plate",
	"mangrove_propagule",
	"mangrove_roots",
	"mangrove_slab",
	"mangrove_stairs",
	"mangrove_standing_sign",
	"mangrove_trapdoor",
	"mangrove_wall_sign",
	"mangrove_wood",
	"medium_amethyst_bud",
	"melon_block",
	"melon_stem",
	"mob_spawner",
	"monster_egg",
	"moss_block",
	"moss_carpet",
	"mossy_cobblestone",
	"mossy_cobblestone_stairs",
	"mossy_stone_brick_stairs",
	"moving_block",
	"mud",
	"mud_brick_double_slab",
	"mud_brick_slab",
	"mud_brick_stairs",
	"mud_brick_wall",
	"mud_bricks",
	"muddy_mangrove_roots",
	"mycelium",
	"nether_brick",
	"nether_brick_fence",
	"nether_brick_stairs",
	"nether_gold_ore",
	"nether_sprouts",
	"nether_wart",
	"nether_wart_block",
	"netherite_block",
	"netherrack",
	"netherreactor",
	"normal_stone_stairs",
	"noteblock",
	"oak_fence",
	"oak_hanging_sign",
	"oak_log",
	"oak_planks",
	"oak_stairs",
	"observer",
	"obsidian",
	"ochre_froglight",
	"orange_candle",
	"orange_candle_cake",
	"orange_carpet",
	"orange_concrete",
	"orange_concrete_powder",
	"orange_glazed_terracotta",
	"orange_shulker_box",
	"orange_stained_glass",
	"orange_stained_glass_pane",
	"orange_terracotta",
	"orange_wool",
	"oxidized_chiseled_copper",
	"oxidized_copper",
	"oxidized_copper_bulb",
	"oxidized_copper_door",
	"oxidized_copper_grate",
	"oxidized_copper_trapdoor",
	"oxidized_cut_copper",
	"oxidized_cut_copper_slab",
	"oxidized_cut_copper_stairs",
	"oxidized_double_cut_copper_slab",
	"packed_ice",
	"packed_mud",
	"pearlescent_froglight",
	"pink_candle",
	"pink_candle_cake",
	"pink_carpet",
	"pink_concrete",
	"pink_concrete_powder",
	"pink_glazed_terracotta",
	"pink_petals",
	"pink_shulker_box",
	"pink_stained_glass",
	"pink_stained_glass_pane",
	"pink_terracotta",
	"pink_wool",
	"piston",
	"piston_arm_collision",
	"pitcher_crop",
	"pitcher_plant",
	"podzol",
	"pointed_dripstone",
	"polished_andesite",
	"polished_andesite_stairs",
	"polished_basalt",
	"polished_blackstone",
	"polished_blackstone_brick_double_slab",
	"polished_blackstone_brick_slab",
	"polished_blackstone_brick_stairs",
	"polished_blackstone_brick_wall",
	"polished_blackstone_bricks",
	"polished_blackstone_button",
	"polished_blackstone_double_slab",
	"polished_blackstone_pressure_plate",
	"polished_blackstone_slab",
	"polished_blackstone_stairs",
	"polished_blackstone_wall",
	"polished_deepslate",
	"polished_deepslate_double_slab",
	"polished_deepslate_slab",
	"polished_deepslate_stairs",
	"polished_deepslate_wall",
	"polished_diorite",
	"polished_diorite_stairs",
	"polished_granite",
	"polished_granite_stairs",
	"polished_tuff",
	"polished_tuff_double_slab",
	"polished_tuff_slab",
	"polished_tuff_stairs",
	"polished_tuff_wall",
	"portal",
	"potatoes",
	"powder_snow",
	"powered_comparator",
	"powered_repeater",
	"prismarine",
	"prismarine_bricks_stairs",
	"prismarine_stairs",
	"pumpkin",
	"pumpkin_stem",
	"purple_candle",
	"purple_candle_cake",
	"purple_carpet",
	"purple_concrete",
	"purple_concrete_powder",
	"purple_glazed_terracotta",
	"purple_shulker_box",
	"purple_stained_glass",
	"purple_stained_glass_pane",
	"purple_terracotta",
	"purple_wool",
	"purpur_block",
	"purpur_stairs",
	"quartz_block",
	"quartz_bricks",
	"quartz_ore",
	"quartz_stairs",
	"rail",
	"raw_copper_block",
	"raw_gold_block",
	"raw_iron_block",
	"red_candle",
	"red_candle_cake",
	"red_carpet",
	"red_concrete",
	"red_concrete_powder",
	"red_flower",
	"red_glazed_terracotta",
	"red_mushroom",
	"red_mushroom_block",
	"red_nether_brick",
	"red_nether_brick_stairs",
	"red_sandstone",
	"red_sandstone_stairs",
	"red_shulker_box",
	"red_stained_glass",
	"red_stained_glass_pane",
	"red_terracotta",
	"red_wool",
	"redstone_block",
	"redstone_lamp",
	"redstone_ore",
	"redstone_torch",
	"redstone_wire",
	"reeds",
	"reinforced_deepslate",
	"repeating_command_block",
	"reserved6",
	"respawn_anchor",
	"sand",
	"sandstone",
	"sandstone_stairs",
	"sapling",
	"scaffolding",
	"sculk",
	"sculk_catalyst",
	"sculk_sensor",
	"sculk_shrieker",
	"sculk_vein",
	"sea_lantern",
	"sea_pickle",
	"seagrass",
	"shroomlight",
	"silver_glazed_terracotta",
	"skull",
	"slime",
	"small_amethyst_bud",
	"small_dripleaf_block",
	"smithing_table",
	"smoker",
	"smooth_basalt",
	"smooth_quartz_stairs",
	"smooth_red_sandstone_stairs",
	"smooth_sandstone_stairs",
	"smooth_stone",
	"sniffer_egg",
	"snow",
	"snow_layer",
	"soul_campfire",
	"soul_fire",
	"soul_lantern",
	"soul_sand",
	"soul_soil",
	"soul_torch",
	"sponge",
	"spore_blossom",
	"spruce_button",
	"spruce_door",
	"spruce_fence",
	"spruce_fence_gate",
	"spruce_hanging_sign",
	"spruce_log",
	"spruce_planks",
	"spruce_pressure_plate",
	"spruce_stairs",
	"spruce_standing_sign",
	"spruce_trapdoor",
	"spruce_wall_sign",
	"standing_banner",
	"standing_sign",
	"sticky_piston",
	"sticky_piston_arm_collision",
	"stone",
	"stone_block_slab",
	"stone_block_slab2",
	"stone_block_slab3",
	"stone_block_slab4",
	"stone_brick_stairs",
	"stone_button",
	"stone_pressure_plate",
	"stone_stairs",
	"stonebrick",
	"stonecutter",
	"stonecutter_block",
	"stripped_acacia_log",
	"stripped_bamboo_block",
	"stripped_birch_log",
	"stripped_cherry_log",
	"stripped_cherry_wood",
	"stripped_crimson_hyphae",
	"stripped_crimson_stem",
	"stripped_dark_oak_log",
	"stripped_jungle_log",
	"stripped_mangrove_log",
	"stripped_mangrove_wood",
	"stripped_oak_log",
	"stripped_spruce_log",
	"stripped_warped_hyphae",
	"stripped_warped_stem",
	"structure_block",
	"structure_void",
	"suspicious_gravel",
	"suspicious_sand",
	"sweet_berry_bush",
	"tallgrass",
	"target",
	"tinted_glass",
	"tnt",
	"torch",
	"torchflower",
	"torchflower_crop",
	"trapdoor",
	"trapped_chest",
	"trial_spawner",
	"trip_wire",
	"tripwire_hook",
	"tube_coral",
	"tuff",
	"tuff_brick_double_slab",
	"tuff_brick_slab",
	"tuff_brick_stairs",
	"tuff_brick_wall",
	"tuff_bricks",
	"tuff_double_slab",
	"tuff_slab",
	"tuff_stairs",
	"tuff_wall",
	"turtle_egg",
	"twisting_vines",
	"underwater_torch",
	"undyed_shulker_box",
	"unknown",
	"unlit_redstone_torch",
	"unpowered_comparator",
	"unpowered_repeater",
	"verdant_froglight",
	"vine",
	"wall_banner",
	"wall_sign",
	"warped_button",
	"warped_door",
	"warped_double_slab",
	"warped_fence",
	"warped_fence_gate",
	"warped_fungus",
	"warped_hanging_sign",
	"warped_hyphae",
	"warped_nylium",
	"warped_planks",
	"warped_pressure_plate",
	"warped_roots",
	"warped_slab",
	"warped_stairs",
	"warped_standing_sign",
	"warped_stem",
	"warped_trapdoor",
	"warped_wall_sign",
	"warped_wart_block",
	"water",
	"waterlily",
	"waxed_chiseled_copper",
	"waxed_copper",
	"waxed_copper_bulb",
	"waxed_copper_door",
	"waxed_copper_grate",
	"waxed_copper_trapdoor",
	"waxed_cut_copper",
	"waxed_cut_copper_slab",
	"waxed_cut_copper_stairs",
	"waxed_double_cut_copper_slab",
	"waxed_exposed_chiseled_copper",
	"waxed_exposed_copper",
	"waxed_exposed_copper_bulb",
	"waxed_exposed_copper_door",
	"waxed_exposed_copper_grate",
	"waxed_exposed_copper_trapdoor",
	"waxed_exposed_cut_copper",
	"waxed_exposed_cut_copper_slab",
	"waxed_exposed_cut_copper_stairs",
	"waxed_exposed_double_cut_copper_slab",
	"waxed_oxidized_chiseled_copper",
	"waxed_oxidized_copper",
	"waxed_oxidized_copper_bulb",
	"waxed_oxidized_copper_door",
	"waxed_oxidized_copper_grate",
	"waxed_oxidized_copper_trapdoor",
	"waxed_oxidized_cut_copper",
	"waxed_oxidized_cut_copper_slab",
	"waxed_oxidized_cut_copper_stairs",
	"waxed_oxidized_double_cut_copper_slab",
	"waxed_weathered_chiseled_copper",
	"waxed_weathered_copper",
	"waxed_weathered_copper_bulb",
	"waxed_weathered_copper_door",
	"waxed_weathered_copper_grate",
	"waxed_weathered_copper_trapdoor",
	"waxed_weathered_cut_copper",
	"waxed_weathered_cut_copper_slab",
	"waxed_weathered_cut_copper_stairs",
	"waxed_weathered_double_cut_copper_slab",
	"weathered_chiseled_copper",
	"weathered_copper",
	"weathered_copper_bulb",
	"weathered_copper_door",
	"weathered_copper_grate",
	"weathered_copper_trapdoor",
	"weathered_cut_copper",
	"weathered_cut_copper_slab",
	"weathered_cut_copper_stairs",
	"weathered_double_cut_copper_slab",
	"web",
	"weeping_vines",
	"wheat",
	"white_candle",
	"white_candle_cake",
	"white_carpet",
	"white_concrete",
	"white_concrete_powder",
	"white_glazed_terracotta",
	"white_shulker_box",
	"white_stained_glass",
	"white_stained_glass_pane",
	"white_terracotta",
	"white_wool",
	"wither_rose",
	"wood",
	"wooden_button",
	"wooden_door",
	"wooden_pressure_plate",
	"wooden_slab",
	"yellow_candle",
	"yellow_candle_cake",
	"yellow_carpet",
	"yellow_concrete",
	"yellow_concrete_powder",
	"yellow_flower",
	"yellow_glazed_terracotta",
	"yellow_shulker_box",
	"yellow_stained_glass",
	"yellow_stained_glass_pane",
	"yellow_terracotta",
	"yellow_wool"
])


function isValidCategory(category) {
	return validCategories.has(category) ?? false
}
function isValidGroup(group) {
	return validGroups.has(group) ?? false
}
/**
 * 
 * @param {string} key 
 * @returns {boolean}
 */
function validateFormat(key) {
	return key.includes('minecraft') || !key.includes(':') || !key.split(':').pop() || !key.split(':').unshift()
}

function validateTypes(types, targets, errorOrder, t) {
	const { ME } = require('./exports_util');
	for (let i = 0; i < types.length; i++) {
		const typeList = types[i].includes('|') ? types[i].split('|').map(t => t.trim()) : [types[i]];
		const target = targets[i];
		const errorOrderItem = errorOrder[i];
		if (target) {
			if (typeof target === 'object') {
				if (!validateObjectTypes(typeList, target)) {
					return ME(t, target, errorOrderItem, types[i]);
				}
			} else {
				if (!typeList.some(type => validateType(type, target))) {
					return ME(t, target, errorOrderItem, types[i]);
				}
			}
		} else continue;
	}
}

function validateObjectTypes(typeList, obj) {
	const keys = Object.keys(obj);
	for (const key of keys) {
		const value = obj[key];
		if (!typeList.some(type => validateType(type, value))) {
			return false;
		}
	}
	return true;
}

function validateType(type, target) {

	switch (type) {
		case 'number':
			return typeof target === 'number';
		case 'string':
			return typeof target === 'string';
		case 'object':
			return typeof target === 'object' && target !== null && !Array.isArray(target);
		default:
			return false;

	}
}


/**
 * @param {string[]} expectedKeys 
 * @param {object} targetObj 
 * @param {object} t 
 * @param {string | string[]} com 
 */
function validateKeys(expectedKeys, targetObj, t, com) {
	const { getLabel } = require('./exports_util')
	const comLabels = Array.isArray(com) ? com.map((k, i) => `[${getLabel(i)}:${k}]`) : [`[component: ${com}]`];
	if (expectedKeys.length > Object.keys(targetObj).length) throw new Error(`[${this.name}] ${comLabels.join(' ')}: Expected ${expectedKeys.length} ${expectedKeys.length > 1 ? "properties" : "property"}, instead found ${Object.keys(targetObj).length}`);
	Object.keys(targetObj).forEach(key => {
		if (!expectedKeys.includes(key)) {
			const errorMessage = `[${t.name}] ${comLabels.join(' ')}: Unexpected key "${key}" found. Did you mean ${expectedKeys.map(k => `"${k}"`).join('|')}`;
			throw new Error(errorMessage);
		}
	});
}


module.exports = {
	isValidCategory,
	isValidGroup,
	validateTypes,
	validateFormat,
	validCategories,
	validEntities,
	validGroups,
	validItems,
	validateKeys,
	supportedLanguages
}