import { getError } from '@utils/error'
import api from "@utils/api";
import { afterEach, describe, expect, it, vi } from 'vitest';
import { authGetMe, authSignIn, authVerifyToken } from '@services/auth';
import { fakeCookie, fakeLoginData, fakeUserData } from '../../__mock__/fake/user';

vi.mock("@utils/api")

describe('Service auth sign in', () => {

    afterEach(() => {
        vi.restoreAllMocks()
    })


    it('Sign in', async () => {
        const resolveData = {
            access_token: fakeCookie.jwt,
            refresh_token: fakeCookie.rs,
            user: fakeUserData,
        }
        vi.mocked(api.post).mockResolvedValue({
            data: {
                data: resolveData
            },
        })

        try {
            const res = await authSignIn({
                data: fakeLoginData
            })

            expect(res.data).toMatchObject(resolveData)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }

    });

    it("Get user me", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                data: fakeUserData,
                message: "Success",
            },
        });

        try {
            const res = await authGetMe();
            expect(res.data?.data).toBe(fakeUserData)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }
    })

    it("Verify token", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                data: true,
                message: "Success",
            },
        })

        try {
            const res = await authVerifyToken();
            expect(res.data?.data).toBe(true)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }

    })
})

/* Fake data */

