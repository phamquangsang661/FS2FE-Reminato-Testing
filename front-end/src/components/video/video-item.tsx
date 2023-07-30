import YouTube from 'react-youtube';
import { Icon } from 'semantic-ui-react';
import { RichTextRender } from '../rich-text/rich-text-render';
import { authStore } from '@stores/auth-store';
import { videoVoteVideo } from '@services/video';
import { useState } from 'react';

export interface VideoItem {
    className?: string;
    videoInfo: VideoShareModelType
}
export function VideoItem({ videoInfo: input, className = "" }: VideoItem) {
    const { isAuth, onOpen } = authStore();
    const [videoInfo, setVideoInfo] = useState(input)
    const voteVideo = (type: "up" | "down") => () => {
        const clone = { ...videoInfo }
        videoVoteVideo({
            params: {
                id: videoInfo.id
            },
            body: {
                type
            }
        });
        if (type == "up") {
            if (clone.isVoteUp) {
                clone.isVoteUp = false;
                clone.upvote -= 1;
                clone.isVoted = false;
            } else {
                clone.isVoteUp = true;
                clone.upvote += 1;
                clone.isVoted = true;
            }
        } else {
            if (clone.isVoteDown) {
                clone.isVoteDown = false;
                clone.downvote -= 1;
                clone.isVoted = false;
            } else {
                clone.isVoteDown = true;
                clone.downvote += 1;
                clone.isVoted = true;
            }
        }
        setVideoInfo(clone)
    }
    return <div className={`flex flex-col md:flex-row gap-[15px] sm:gap-[25px] md:gap-[40px]  ${className} w-[320px] sm:w-[400px] md:w-[800px] md:h-[250px]`}>
        <YouTube className="hidden sm:block " opts={{
            width: 400,
            height: 250,
            loop: 1
        }} videoId={videoInfo.videoId} />
        <YouTube className="block sm:hidden " opts={{
            width: 320,
            height: 200,
            loop: 1
        }} videoId={videoInfo.videoId} />
        <div className=" gap-1 w-[320px] sm:w-[400px]">
            <h1 className="font-bold text-[22px] font-primary  text-youtube-primary  text-eclipse-2-line">{videoInfo.title}</h1>
            <p className="font-primary text-[20px]">Shared by: <span className="font-primary font-bold">{videoInfo.sharedBy.email}</span></p>
            <div className="flex flex-row gap-4 py-1">
                {!isAuth && (
                    <>
                        <p className="flex row gap-2 justify-center items-center">
                            <span className=" font-primary  font-bold  text-[20px]">{videoInfo.upvote}</span>
                            <Icon onClick={onOpen} className="!outline-none hover:scale-[1.2] transition-all cursor-pointer " name="thumbs up outline" size="large" />
                        </p>
                        <p className="flex row gap-2 justify-center items-center font-primary  font-bold">
                            <span className=" font-primary  font-bold  text-[20px]">{videoInfo.downvote}</span>
                            <Icon onClick={onOpen} className="!outline-none hover:scale-[1.2] transition-all cursor-pointer" name="thumbs down outline" size="large" />
                        </p>
                    </>
                )}
                {isAuth && (
                    <>

                        <p className="flex row gap-2 justify-center items-center">
                            <span className=" font-primary  font-bold  text-[20px]">{videoInfo.upvote}</span>
                            <Icon onClick={!videoInfo.isVoteDown && voteVideo("up")}
                                className={`
                                ${videoInfo.isVoteUp
                                        ? " "
                                        : "outline hover:scale-[1.2]  "
                                    } icon thumbs up   !outline-none transition-all cursor-pointer `} size="large" />
                        </p>


                        <p className="flex row gap-2 justify-center items-center font-primary  font-bold">
                            <span className=" font-primary  font-bold  text-[20px]">{videoInfo.downvote}</span>
                            <Icon onClick={!videoInfo.isVoteUp && voteVideo("down")}
                                className={`
                                ${videoInfo.isVoteDown
                                        ? " "
                                        : "outline hover:scale-[1.2]  "
                                    } icon thumbs down   !outline-none transition-all cursor-pointer `} size="large" />
                        </p>
                    </>
                )}
            </div>
            <div className="h-full">
                <p className="pb-2 font-bold font-primary text-[15px]">Description</p>
                <RichTextRender component='p' className='font-primary text-[15px]  text-eclipse-5-line ' content={videoInfo?.description ?? ""} />
            </div>
        </div>
    </div>
}
