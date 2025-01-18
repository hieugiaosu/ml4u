import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { User } from "../user.schema";

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: any) => {
      createMap(
        mapper,
        User,
        UserDto,
        forMember(
          (destination) => destination._id,
          mapFrom((source) => source._id.toString()),
        ),
      );
    };
  }
}