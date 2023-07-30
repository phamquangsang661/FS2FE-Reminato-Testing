import { Layout, VideoItem } from "@components";

export function Home() {
    return <Layout
        title="Home"
        content="Home page"
        className="py-20"
    >

        <div className="flex flex-col gap-[60px] justify-center items-center">
            <VideoItem videoInfo={{
                id: "abcd",
                title: "Hà Anh Tuấn - Tháng Tư Là Lời Nói Dối Của Em (Official MV)",
                videoId: "UCXao7aTDQM",
                upvote: 10,
                downvote: 10,
                isOwner: false,
                isVoted: false,
                isVoteDown: false,
                isVoteUp: false,
                sharedTime: new Date(),
                sharedBy: {
                    email: "phamquangsang661@gmail.com"
                },
                sharedById: "abcdefg",
                thumbnails: {},
                description: `Ca Sĩ Hà Anh Tuấn
                Bài Hát :Tháng Tư Là Lời Nối Dối Của Em.
                Hãy “ Subscribe” theo dõi kênh Ca Sĩ Hà Anh Tuấn để có cái nhìn cận cảnh hơn về những cống hiến trong âm nhạc của Ca Sĩ Hà Anh Tuấn   nhé.
                ♫Subscribe : https://www.youtube.com/c/casihaanhtu...
                Hà Anh Tuấn sinh ngày 17/12/1984 tại Sài Gòn, là một ca sĩ  R&B Việt Nam. Bố Mẹ Hà Anh Tuấn quê gốc ở Ninh Bình.Từ khi còn là học sinh Hà Anh Tuấn đã tham gia rất nhiều phong trào văn nghệ của trường. Hà Anh Tuấn được biết đến qua cuộc thi Sao Mai Điểm Hẹn. 
                ----
                Sáng tác: Phạm Toàn Thắng.
                Hòa âm & Phối khí: Nguyễn Hoàng Anh.
                Thu & Mix master: Nguyễn Hoàng Gia.
                Biểu diễn: Hà Anh Tuấn.
                -------------------------------------------------------------
                Bài hát lấy cảm hứng từ bộ anime "Your Lie In April"
                của tác giả truyện tranh - hoạ sĩ Naoshi Arakawa (Nhật Bản)
                
                -------------------------------------------------------------
                Đạo diễn: Lê Thiện Viễn
                Giám đốc sáng tạo: Cao Trung Hiếu
                Khách mời: Thanh Hằng.
                DOP: Trần Ngọc Khuyên`
            }} />
            <VideoItem videoInfo={{
                id: "abcd",
                title: "Hà Anh Tuấn - Tháng Tư Là Lời Nói Dối Của Em (Official MV)",
                videoId: "UCXao7aTDQM",
                upvote: 10,
                downvote: 10,
                isOwner: false,
                isVoted: false,
                isVoteDown: false,
                isVoteUp: false,
                sharedTime: new Date(),
                sharedBy: {
                    email: "phamquangsang661@gmail.com"
                },
                sharedById: "abcdefg",
                thumbnails: {},
                description: `Ca Sĩ Hà Anh Tuấn
                Bài Hát :Tháng Tư Là Lời Nối Dối Của Em.
                Hãy “ Subscribe” theo dõi kênh Ca Sĩ Hà Anh Tuấn để có cái nhìn cận cảnh hơn về những cống hiến trong âm nhạc của Ca Sĩ Hà Anh Tuấn   nhé.
                ♫Subscribe : https://www.youtube.com/c/casihaanhtu...
                Hà Anh Tuấn sinh ngày 17/12/1984 tại Sài Gòn, là một ca sĩ  R&B Việt Nam. Bố Mẹ Hà Anh Tuấn quê gốc ở Ninh Bình.Từ khi còn là học sinh Hà Anh Tuấn đã tham gia rất nhiều phong trào văn nghệ của trường. Hà Anh Tuấn được biết đến qua cuộc thi Sao Mai Điểm Hẹn. 
                ----
                Sáng tác: Phạm Toàn Thắng.
                Hòa âm & Phối khí: Nguyễn Hoàng Anh.
                Thu & Mix master: Nguyễn Hoàng Gia.
                Biểu diễn: Hà Anh Tuấn.
                -------------------------------------------------------------
                Bài hát lấy cảm hứng từ bộ anime "Your Lie In April"
                của tác giả truyện tranh - hoạ sĩ Naoshi Arakawa (Nhật Bản)
                
                -------------------------------------------------------------
                Đạo diễn: Lê Thiện Viễn
                Giám đốc sáng tạo: Cao Trung Hiếu
                Khách mời: Thanh Hằng.
                DOP: Trần Ngọc Khuyên`
            }} />
        </div>

    </Layout>
}