import dayjs from "dayjs";
import toast, { Toast } from "react-hot-toast";

export interface ToastNotify {
    className?: string;
    t: Toast;
    info?: NotifyServiceConsume
}
export function ToastNotify({ className = "", t, info }: ToastNotify) {

    return <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${className}`}
    >
        <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <img
                        className="h-20 w-20 "
                        src={info?.thumbnailUrls?.["default"]?.url}
                        alt=""
                    />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-lg font-primary font-bold text-gray-900">
                        {info?.title || "Unknown"}
                    </p>
                    <p className=" text-sm text-gray-500">
                        Shared by {info?.sharedBy?.email ?? "Unknown@gmail.com"} at {dayjs(info?.sharedTime ?? Date.now()).format("HH:mm")}
                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-row border-gray-200">
            <a
                target="_blank"
                href={`https://youtube.com/watch?v=${info?.id ?? "Unknown"}`}
                className="w-full  p-4 flex items-center justify-center text-sm font-medium  
                bg-youtube-primary text-white font-primary  hover:shadow-inner hover:!text-white hover:grayscale-[20%]">
                Watch
            </a>
            <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent 
                rounded-none rounded-r-lg p-4 flex items-center 
                justify-center text-sm font-medium 
                font-primary
                hover:opacity-[50%]
                "
            >
                Close
            </button>
        </div>
    </div>
}