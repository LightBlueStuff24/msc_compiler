import { ObjectStruct } from "./general";

interface ComponentInfo {
    id: string;
    name: string;
}

interface SchemaInfo {
    folder: string;
    name: string;
}
type SchemaParserFunction = (componentInfo: ComponentInfo, component: ObjectStruct, parsedSchemaData: ObjectStruct, schema?: ObjectStruct, ...args: any[]) => void;


export {
    SchemaInfo,
    ComponentInfo,
    SchemaParserFunction
}