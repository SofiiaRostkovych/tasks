import { APIRequestContext, APIResponse, Page } from "playwright";
import { UserDto } from "../dto/userDto";
import { URLS } from "../config/urlProvider";

export class UserApiClient {
  readonly USER_API: string = "/api/User/";
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(userDto: UserDto): Promise<APIResponse> {
    const response: APIResponse = await this.request.post(this.USER_API, {
      data: userDto,
    });
    return response;
  }

  async getUser(userId: string): Promise<APIResponse> {
    const response: APIResponse = await this.request.get(
      this.USER_API + userId,
    );
    return response;
  }

  async updateUser(userId: string, userDto: UserDto): Promise<APIResponse> {
    const response: APIResponse = await this.request.put(
      this.USER_API + userId,
      {
        data: userDto,
      },
    );
    return response;
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    const response: APIResponse = await this.request.delete(
      this.USER_API + userId,
    );
    return response;
  }

  async getUserList() {
    const response: APIResponse = await this.request.get(this.USER_API);
    return response;
  }
}
