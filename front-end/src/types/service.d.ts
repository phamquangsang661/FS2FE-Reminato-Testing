type NotifyServiceConsume={
    id:string;
    sharedBy: {
        email:string;
    },
    thumbnailUrls: VideoShareThumbnailsModelType;
    title: string;
    description: string;
    sharedTime: string;
    upvote: number;
    downvote: number;
}