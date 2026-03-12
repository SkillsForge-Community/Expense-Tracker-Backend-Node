type UserDtoInput = {
  id: number;
  email: string;
  userType: string;
  name: string;
};

export class UserDto {
  id: number;
  email: string;
  username: string;
  userType: string;

  

  constructor(user: UserDtoInput) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.name;
    this.userType = user.userType;
  }

  

  toJSON(): { id: number; email: string; username: string; userType: string } {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      userType: this.userType,
    };
  }
}