import { faker } from "@faker-js/faker";
import _ from "lodash";


export const fakeVideoData = _.range(10).map(() => ({
    "id": faker.string.uuid(),
    "title": faker.lorem.sentence(10),
    "description": faker.lorem.text(),
    "downvote": faker.number.int({
        min: 0
    }),
    "upvote": faker.number.int({
        min: 0
    }),
    "sharedTime": faker.date.anytime().toISOString(),
    "sharedBy": {
        "id": faker.string.uuid(),
        "email": faker.internet.email()
    },
    "videoId": faker.string.uuid(),
    "isOwner": faker.datatype.boolean(),
    "isVoteUp": faker.datatype.boolean(),
    "isVoted": faker.datatype.boolean(),
    "isVoteDown": faker.datatype.boolean(),
    "thumbnails": {
        "default": {
            "url": faker.image.url(),
            "width": 120,
            "height": 90
        },
        "medium": {
            "url": faker.image.url(),
            "width": 320,
            "height": 180
        },
        "high": {
            "url": faker.image.url(),
            "width": 480,
            "height": 360
        },
        "standard": {
            "url": faker.image.url(),
            "width": 640,
            "height": 480
        },
        "maxres": {
            "url": faker.image.url(),
            "width": 1280,
            "height": 720
        }
    }
}))

export const fakeVideoSharing = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    sharedBy: {
        id: faker.string.uuid()
    },
    videoId: faker.string.uuid(),
    thumbnailUrls: faker.string.alphanumeric,
    upvote: 0,
    downvote: 0,
    sharedTime: faker.date.recent(),
    sharedById: faker.string.uuid()
}