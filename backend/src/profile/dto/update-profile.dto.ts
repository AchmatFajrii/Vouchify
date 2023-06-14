import { Gender, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";

export class UpdateProfileDto implements Prisma.UserUpdateInput {
    @Expose()
    name?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined;

    @Expose()
    gender?: Prisma.NullableEnumGenderFieldUpdateOperationsInput | Gender | null | undefined;

    @Expose()
    phoneNumber?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined;
}