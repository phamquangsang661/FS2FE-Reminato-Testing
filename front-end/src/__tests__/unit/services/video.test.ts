import { getError } from '@utils/error'
import api from "@utils/api";
import { faker } from '@faker-js/faker';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { fakeVideoData, fakeVideoSharing } from '../../__mock__/fake/video';
import { videoGetVideos, videoSharing, videoVoteVideo } from '@services/video';

vi.mock("@utils/api")

describe('Service auth sign in', () => {
    beforeAll(() => {

    })
    afterEach(() => {
        vi.restoreAllMocks()
    })


    it('Get list videos', async () => {
        const resolveData = {
            data: fakeVideoData.slice(0, 4),
            pagination: {
                cursor: fakeVideoData[4].id,
                limit: 5
            }
        };

        vi.mocked(api.get).mockResolvedValue({
            data: resolveData
        })


        try {
            const res = await videoGetVideos({
                query: {}
            })

            expect(res.data).toMatchObject(resolveData)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }
    });

    it('Get list videos with query', async () => {
        const query = {
            limit: "4",
            cursor: undefined
        }
        const resolveData = {
            data: fakeVideoData.slice(0, 4),
            pagination: {
                cursor: fakeVideoData[4].id,
                limit: +query.limit
            }
        }

        vi.mocked(api.get).mockResolvedValue({
            data: resolveData
        })

        try {
            const res = await videoGetVideos({
                query
            })

            expect(res.data).toMatchObject(resolveData)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }
    });

    it("Sharing video", async () => {
        vi.mocked(api.post).mockResolvedValue({
            data: {
                data: fakeVideoSharing
            }
        })

        try {

            const res = await videoSharing({
                data: {
                    url: faker.internet.url()
                }
            })

            expect(res.data.data).toMatchObject(fakeVideoSharing)
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }
    })
    it("Vote video", async () => {
        vi.mocked(api.put).mockResolvedValue({
            data: {
                message: "Vote video success",
            }
        })

        try {

            const res = await videoVoteVideo({
                body: {
                    type: faker.string.fromCharacters(["up", "down"]) as "up" | "down"
                },
                params: {
                    id: faker.string.uuid()
                }
            })

            expect(res.data.message).toBe("Vote video success")
        } catch (err) {
            expect(getError(err)).toBeTypeOf("string")
        }
    })
})
