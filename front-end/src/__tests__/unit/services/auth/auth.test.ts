import { getError } from '@utils/error'
import api from "@utils/api";
import { faker } from '@faker-js/faker';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { authGetMe, authSignIn, authVerifyToken } from '@services/auth';
import { AxiosError } from 'axios';

vi.mock("@utils/api")

describe('Service auth sign in', () => {
    beforeAll(() => {

    })
    afterEach(() => {
        vi.restoreAllMocks()
    })


    it('Sign in Success', async () => {
        vi.mocked(api.post).mockResolvedValue({
            data: {
                data: {
                    access_token: fakeCookie.jwt,
                    refresh_token: fakeCookie.rs,
                    user: fakeUserData,
                }
            },
        })

        const signIn = authSignIn({
            data: fakeLoginData
        })

        expect(signIn).resolves.toMatchObject({
            data: {
                data: {
                    access_token: fakeCookie.jwt,
                    refresh_token: fakeCookie.rs,
                    user: fakeUserData,
                }
            }
        })

    });

    it('Sign in with incorrect username or password', () => {
        // case wrong password 
        vi.mocked(api.post).mockResolvedValue({
            data: {
                message: "Incorrect username or password"
            },
        });


        const signIn = authSignIn({
            data: {
                ...fakeLoginData,
                password: "other password"
            }
        });

        expect(signIn).resolves.toMatchObject({
            data: {
                message: "Incorrect username or password"
            }
        })

    });

    it('Sign in with request rejected', async () => {
        // case wrong password 
        vi.mocked(api.post).mockRejectedValue(new AxiosError("Internal server error"))

        try {
            await authSignIn({
                data: fakeLoginData
            });
        } catch (err) {
            const error = getError(err)
            expect(error).toBe("Internal server error")
        }
    });

    it("Get user me", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                data: fakeUserData,
                message: "Success",
            },
        });
        const res = await authGetMe();
        expect(res.data?.data).toEqual(fakeUserData)
    })

    it("Verify token", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                data: true,
                message: "Success",
            },
        }).mockRejectedValue(new AxiosError("Internal server error"))

        try {
            const res = await authVerifyToken();
            expect(res.data?.data).toBe(true)
        } catch (err) {
            const error = getError(err)
            expect(error).toBe("Internal server error")
        }

    })
})

/* Fake data */

const fakeUserData = {
    email: faker.internet.email(),
    id: faker.string.uuid(),
}


const fakeLoginData = {
    email: fakeUserData.email,
    password: "1234567"
}


const fakeCookie = {
    jwt: faker.string.alphanumeric,
    rs: faker.string.alphanumeric,
}