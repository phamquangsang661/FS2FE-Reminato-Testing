import { useEffect, useState } from "react";
import io, { ManagerOptions, SocketOptions } from "socket.io-client";
export const useSocket = ({
    url,
    ops = {}
}: {
    url: string;
    ops?: Partial<ManagerOptions & SocketOptions>
}) => {
    const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        const socketIo = io(url, {
            ...ops,
        });
        setSocket(socketIo);

        function cleanup() {
            socketIo.disconnect();
        }
        return cleanup;
    }, []);

    return socket;
};
