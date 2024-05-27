import { UserDto } from "./user-dto";

export interface AuthenticationResponse {
  token?: string;
  customerDTO: UserDto;
}
