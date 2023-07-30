import YouTube from 'react-youtube';
import { Icon } from 'semantic-ui-react';
import { RichTextRender } from '../rich-text/rich-text-render';

export interface VideoItem {
    className?: string;
    videoInfo: VideoShareModelType
}
export function VideoItem({ videoInfo, className = "" }: VideoItem) {
    return <div className={`flex flex-col md:flex-row gap-[15px] sm:gap-[25px] md:gap-[40px]  ${className} w-[320px] sm:w-[400px] md:w-[800px] md:h-[250px]`}>
        <YouTube className="hidden sm:block " opts={{
            width: 400,
            height: 250,
            loop: 1
        }} videoId="IOe0tNoUGv8" />
        <YouTube className="block sm:hidden " opts={{
            width: 320,
            height: 200,
            loop: 1
        }} videoId="IOe0tNoUGv8" />
        <div className=" gap-1 w-[320px] sm:w-[400px]">
            <h1 className="font-bold text-[22px] font-primary  text-youtube-primary  ">{videoInfo.title}</h1>
            <p className="font-primary text-[20px]">Shared by: {videoInfo.sharedBy.email}</p>
            <div className="flex flex-row gap-4 py-1">
                <p className="flex row gap-2 justify-center items-center">
                    <span className=" font-primary  font-bold  text-[20px]">{videoInfo.upvote}</span>
                    <Icon className="!outline-none " name="thumbs up outline" size="large" />
                </p>
                <p className="flex row gap-2 justify-center items-center font-primary  font-bold">
                    <span className=" font-primary  font-bold  text-[20px]">{videoInfo.downvote}</span>
                    <Icon className="!outline-none" name="thumbs down outline" size="large" />
                </p>
            </div>
            <div className="h-full">
                <p className="pb-2 font-bold font-primary text-[15px]">Description</p>
                <RichTextRender component='p' className='font-primary text-[15px]  text-eclipse-5-line ' content={videoInfo?.description ?? ""} />
            </div>
        </div>
    </div>
}
