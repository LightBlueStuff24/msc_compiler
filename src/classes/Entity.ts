import config from '../../config.ts';
import { IEntityComponents } from '../interfaces/IEntity.ts';
import type { ObjectStruct, bool } from '../utilities/typedef.ts';
import { IEvent } from '../interfaces/IEvent.ts';
import { ParseComponent } from '../contents/ComponentParser.ts';
import { getModel } from '../utilities/Utils.ts';
export class Entity extends IEntityComponents {
    private static Data = {
        "format_version": [],
        "minecraft:entity": {
            "description": {
                "identifier": "",
                "properties": {}
            },
            "component_groups": {},
            "components": {

            },
            "events": {}
        }
    };
    static Components = this.Data["minecraft:entity"].components;
    
    /**
     * Allows you to control this entities animation through scripting
     */
    static UseScriptableAnimations: bool;
    public static Events: ObjectStruct<string, IEvent>;
    static async init() {
        this.Data['minecraft:entity'].description.identifier =
            `${config.prefix}:${this.name.replace(/([a-Z])([A-Z])/, '$1_$2').toLowerCase()}`;

        if (this.UseScriptableAnimations) {
            const modelFile = await getModel(this.Geometry);
            
        }
        const parsedComponentData = await ParseComponent(this, 'entity');
        if (parsedComponentData) {
            this.Components = parsedComponentData;
        }
        return JSON.stringify(this.Data);
    }
}

class T extends Entity {
    static Events: ObjectStruct<string, IEvent> = {
        "FF": {
            Sequence: [
                {
                    AddMobEffect: {

                    }
                }
            ]
        }
    };
}


