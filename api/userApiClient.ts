import { APIRequestContext, APIResponse, Page } from "playwright";
import { UserDto } from "../dto/userDto";
import { URLS } from "../config/urlProvider";

export class UserApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(userDto: UserDto): Promise<APIResponse> {
    const response: APIResponse = await this.request.post(URLS.USER_API, {
      data: userDto,
    });
    return response;
  }

  async getUser(userId: string): Promise<APIResponse> {
    const response: APIResponse = await this.request.get(
      URLS.USER_API + userId,
    );
    return response;
  }

  async updateUser(userId: string, userDto: UserDto): Promise<APIResponse> {
    const response: APIResponse = await this.request.put(
      URLS.USER_API + userId,
      {
        data: userDto,
      },
    );
    return response;
  }

  async deleteUser(userId: string): Promise<APIResponse> {
    const response: APIResponse = await this.request.delete(
      URLS.USER_API + userId,
    );
    return response;
  }

  async listUsers() {
    const response: APIResponse = await this.request.get(URLS.USER_API);
    return response;
  }
}
