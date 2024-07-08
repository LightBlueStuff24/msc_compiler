import { SubjectType } from "../enums"

interface IHasEquipment {

}


// Complete this later
interface IFilter {
   AllOf:IFilter[],
   AnyOf:IFilter[],
   NoneOf:IFilter[],
   Subject:SubjectType
}

export type {
    IHasEquipment,
    IFilter
}