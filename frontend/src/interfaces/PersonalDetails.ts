// interfaces/PersonalDetail.ts
import { PersonalInterface } from "./Personal";
import { AddressInterface } from "./Address";
import { FamilyInterface } from "./Family";
import { OtherInformationInteface } from "./Other";

export interface PersonalDetailInterface {
    personal: PersonalInterface;
    address: AddressInterface;
    family: FamilyInterface;
    other: OtherInformationInteface;
}