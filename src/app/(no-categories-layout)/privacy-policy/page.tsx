'use client';
import React, { useEffect, useState } from 'react';

export interface IPrivacyPolicyProps {}

export default function PrivacyPolicy(props: IPrivacyPolicyProps) {
    const [hostname, setHostname] = useState('');

    useEffect(() => {
        const hostname = window ? window.location.origin : '';

        setHostname(hostname);
    }, []);

    return (
        <section className="w-full flex justify-center py-10">
            <div className="max-w-[1340px] w-full flex flex-col justify-start text-[16px] normal-case gap-4 mb-4 px-4 md:px-[26px] xl:px-0">
                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Chúng tôi là ai</h2>
                    <p>Địa chỉ website là: {hostname}</p>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Thông tin cá nhân nào bị thu thập và tại sao thu thập</h2>
                </div>

                <p className="mt-2">
                    Trong phần này, bạn nên lưu ý dữ liệu cá nhân nào bạn thu thập từ người dùng và khách truy cập. Chúng có thể bao gồm dữ liệu cá nhân, như tên, địa chỉ email,
                    tùy chọn tài khoản cá nhân; dữ liệu giao dịch, như thông tin mua hàng; và dữ liệu kỹ thuật, như thông tin về cookie.
                </p>
                <p className="mt-2">Bạn cũng nên lưu ý các bộ sưu tập và lưu giữ dữ liệu cá nhân nhạy cảm, chẳng hạn như dữ liệu liên quan đến sức khỏe.</p>
                <p className="mt-2">
                    Ngoài việc liệt kê dữ liệu cá nhân nào bạn thu thập, bạn cần lưu ý lý do bạn thu thập dữ liệu đó. Những giải thích này là cơ sở pháp lý cho việc thu thập và lưu
                    giữ dữ liệu của bạn hoặc sự đồng ý hoạt động mà người dùng đã đưa ra.
                </p>
                <p className="mt-2">
                    Dữ liệu cá nhân không chỉ được tạo bởi tương tác của người dùng với trang web của bạn. Dữ liệu cá nhân cũng được tạo ra từ các quy trình kỹ thuật như biểu mẫu
                    liên hệ, bình luận, cookie, phân tích và nhúng của bên thứ ba.
                </p>
                <p className="mt-2">
                    Theo mặc định, WordPress không thu thập bất kỳ dữ liệu cá nhân nào về khách truy cập và chỉ thu thập dữ liệu được hiển thị trên màn hình Hồ sơ người dùng từ
                    người dùng đã đăng ký. Tuy nhiên, một số gói mở rộng của bạn có thể thu thập dữ liệu cá nhân. Bạn nên thêm thông tin liên quan bên dưới.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Cookies</h2>
                </div>
                <p className="mt-2">Trong mục này bạn nên liệt kê các cookie website bạn sử dụng, bao gồm các cookie của plugin, mạng xã hội và các công cụ thống kê</p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Local storege</h2>
                </div>
                <p className="mt-2">Chúng tôi sử dụng local storage để lưu trữ các thông tin đăng nhập và giỏ hàng. Ngoài ra không còn sử dụng cho mục đích nào khác</p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Chúng tôi chia sẻ dữ liệu của bạn với ai</h2>
                </div>

                <p className="mt-2">
                    Trong phần này, bạn nên viết tên và liệt kê tất cả các nhà cung cấp thứ ba mà bạn chia sẻ dữ liệu trang web, bao gồm đối tác, dịch vụ dựa trên đám mây, xử lý
                    thanh toán, nhà cung cấp dịch vụ bên thứ ba và lưu ý những dữ liệu bạn chia sẻ với họ và tại sao. Liên kết tới chính sách bảo mật của riêng họ nếu có thể.
                </p>
                <p className="mt-2">Chúng tôi mặc định không chia sẻ thông tin cá nhân với bất kì ai.</p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Dữ liệu của bạn tồn tại bao lâu</h2>
                </div>

                <p className="mt-2">
                    Trong phần này, bạn nên giải thích thời gian bạn giữ lại dữ liệu cá nhân được thu thập hoặc xử lý bởi trang web. Mặc dù bạn có trách nhiệm đưa ra thời gian về
                    việc bạn lưu giữ mỗi tập dữ liệu trong bao lâu và tại sao bạn giữ nó, thông tin đó cần phải được liệt kê ở đây. Ví dụ: bạn có thể nói rằng bạn giữ các mẫu liên
                    hệ trong sáu tháng, các bản ghi phân tích trong một năm và các bản ghi mua hàng của khách hàng trong mười năm.
                </p>

                <p className="mt-2">
                    Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả
                    người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ họ không thể thay đổi tên người dùng của họ). Quản trị viên trang
                    web cũng có thể xem và chỉnh sửa thông tin đó.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Các quyền nào của bạn với dữ liệu của mình</h2>
                </div>

                <p className="mt-2">Trong phần này, bạn nên giải thích những quyền người dùng của bạn có trên dữ liệu của họ và cách họ có thể gọi những quyền đó.</p>

                <p className="mt-2">
                    <b>Văn bản được đề xuất:</b> Nếu bạn có tài khoản trên trang web này hoặc đã để lại nhận xét, bạn có thể yêu cầu nhận tệp xuất dữ liệu cá nhân mà chúng tôi lưu
                    giữ về bạn, bao gồm mọi dữ liệu bạn đã cung cấp cho chúng tôi. Bạn cũng có thể yêu cầu chúng tôi xóa mọi dữ liệu cá nhân mà chúng tôi lưu giữ về bạn. Điều này
                    không bao gồm bất kỳ dữ liệu nào chúng tôi có nghĩa vụ giữ cho các mục đích hành chính, pháp lý hoặc bảo mật.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Thông tin liên hệ của bạn</h2>
                </div>

                <p className="mt-2">
                    Trong phần này, bạn nên cung cấp một phương thức liên hệ cho các mối quan tâm riêng tư. Nếu bạn được yêu cầu có Cán bộ bảo vệ dữ liệu, hãy liệt kê tên của họ và
                    chi tiết liên hệ đầy đủ tại đây.
                </p>

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="font-semibold text-xl">Thông tin bổ sung</h2>
                </div>
                <p>
                    Nếu bạn sử dụng trang web của mình cho mục đích thương mại và bạn tham gia vào việc thu thập hoặc xử lý dữ liệu cá nhân phức tạp hơn, bạn nên lưu ý các thông
                    tin sau đây trong chính sách bảo mật của bạn ngoài thông tin chúng ta đã trao đổi.
                </p>

                <div className="flex flex-col mt-2">
                    <h3 className="font-semibold text-lg">Cách chúng tôi bảo vệ dữ liệu của bạn</h3>
                </div>

                <p className="mt-2">
                    Trong phần này, bạn nên giải thích các biện pháp bạn đã thực hiện để bảo vệ dữ liệu của người dùng. Điều này có thể bao gồm các biện pháp kỹ thuật như mã hóa;
                    các biện pháp bảo mật như xác thực hai lớp; và các biện pháp như đào tạo nhân viên về bảo vệ dữ liệu. Nếu bạn đã thực hiện Đánh giá tác động bảo mật, bạn cũng
                    có thể đề cập đến nó ở đây.
                </p>

                <div className="flex flex-col mt-2">
                    <h3 className="font-semibold text-lg">Các quá trình tiết lộ dữ liệu mà chúng tôi thực hiện</h3>
                </div>
                <p className="mt-2">
                    Trong phần này bạn nên giải thích quá trình bạn xử lý với các tiết lộ dữ liệu, dù có tiềm ẩn hay thực sự, ví dụ các hệ thống báo cáo nội bộ, các cơ chế liên hệ,
                    hoặc các chương trình tìm kiếm lỗi.
                </p>

                <div className="flex flex-col mt-2">
                    <h3 className="font-semibold text-lg">Những bên thứ ba chúng tôi nhận dữ liệu từ đó</h3>
                </div>
                <p className="mt-2">
                    Nếu website của bạn nhận dữ liệu về người dùng từ các bên thứ ba, bao gồm những nhà quảng cáo, thông tin này phải được bao gồm trong phần thỏa thuận chính sách
                    riêng tư với dữ liệu của bên thứ ba.
                </p>

                <div className="flex flex-col mt-2">
                    <h3 className="font-semibold text-lg">Việc quyết định và/hoặc thu thập thông tin tự động mà chúng tôi áp dụng với dữ liệu người dùng</h3>
                </div>

                <p className="mt-2">
                    Nếu trang web của bạn cung cấp dịch vụ bao gồm đưa ra quyết định tự động – ví dụ, cho phép khách hàng sử dụng thẻ tín dụng hoặc tổng hợp dữ liệu của họ vào hồ
                    sơ quảng cáo – bạn phải lưu ý rằng điều này đang diễn ra và bao gồm thông tin về cách sử dụng thông tin đó , quyết định nào được thực hiện với dữ liệu tổng hợp
                    đó và quyền của người dùng đối với các quyết định được đưa ra mà không có sự can thiệp của con người.
                </p>
                <div className="flex flex-col mt-2">
                    <h3 className="font-semibold text-lg">Các yêu cầu công bố thông tin được quản lý</h3>
                </div>
                <p className="mt-2">
                    Nếu bạn là thành viên của một lĩnh vực được quản lý, hoặc bạn phải tuân thủ các quy định về bảo mật, bạn có thể phải cung cấp các thông tin này ở đây.
                </p>
            </div>
        </section>
    );
}
