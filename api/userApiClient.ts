import { Page } from 'playwright';
import { UserDto } from '../dto/userDto';
import { URLS } from '../config/urlProvider';

export class UserApiClient {
    private request;

    constructor(request) {
        this.request = request;
    }

    async createUser(userDto: UserDto) {
        const response = await this.request.post(URLS.USER_API, {
            data: userDto,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getUser(userId: string) {
        const response = await this.request.get(URLS.USER_API+`/${userId}`);
        return response;
    }

    async updateUser(userId: string, userDto: UserDto) {
        const response = await this.request.put(URLS.USER_API+`/${userId}`, {
            data: userDto,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async deleteUser(userId: string) {
        const response = await this.request.delete(URLS.USER_API+`/${userId}`);
        return response;
    }

    async listUsers() {
        const response = await this.request.get(URLS.USER_API);
        return response;
    }
}