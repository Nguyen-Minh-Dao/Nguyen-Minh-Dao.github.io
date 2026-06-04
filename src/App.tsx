// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Apple, Wifi, Battery, Search, ChevronLeft, ChevronRight, 
  Terminal, Code, Cpu, Globe, Database, Server, Sun, Moon,
  User, ArrowLeft, Maximize2, Minus, X, LayoutTemplate, Folder, BookOpen,
  Zap, Lightbulb, MessageSquare, Target, Users, Landmark, Award
} from 'lucide-react';

// --- INJECTED STYLE VỚI HIỆU ỨNG HẠT VÀ NỀN CHUYỂN ĐỘNG VÔ CỰC (AURORA) ---
const ultraStyles = `
  @keyframes gradient-move {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-aurora {
    background-size: 200% 200%;
    animation: gradient-move 15s ease infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
    100% { transform: translateY(0px) rotate(360deg); opacity: 0.2; }
  }
  .floating-particle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%);
    pointer-events: none;
    animation: float 10s infinite ease-in-out;
  }

  @keyframes scale-up {
    0% { transform: scale(0.9) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  .animate-scale-up {
    animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

// Hộp thẻ phát sáng nâng cao thế hệ mới (Interactive Spotlight Card)
function PremiumSpotlightCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 bg-neutral-900/50 border-neutral-800/80 hover:border-amber-500/30 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] backdrop-blur-xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(245,158,11,0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [time, setTime] = useState('');
  const [currentTab, setCurrentTab] = useState('profile');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dockHoveredIdx, setDockHoveredIdx] = useState(null);

  // Hiệu ứng hạt bụi chuyển động ngẫu nhiên phía sau
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generatedParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 40,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  // Lấy thời gian thực
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleDateString('vi-VN', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Tiêm CSS nâng cao
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = ultraStyles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Dữ liệu học tập 15 tuần
  const weeksData = [
    {
      id: 1,
      title: "Tuần 1: Nhập môn Trí tuệ Nhân tạo & Tạo lập tài khoản",
      date: "04/09/2024",
      highlight: "Làm quen với AI, thiết lập tài khoản ChatGPT và tìm hiểu các nguyên tắc cốt lõi.",
      content: {
        intro: "Tuần đầu tiên mở ra cánh cửa vào thế giới Trí tuệ Nhân tạo, giúp tôi định hình lại tư duy học tập trong kỷ nguyên số.",
        keyTakeaway: "Hiểu rõ sự khác biệt giữa AI truyền thống và Generative AI. Nắm vững cách thức hoạt động cơ bản của mô hình ngôn ngữ lớn (LLM).",
        exercises: [
          { name: "Bài tập 1: Khởi tạo tài khoản & Thử nghiệm Prompt cơ bản", desc: "Đăng ký thành công tài khoản ChatGPT, thực hành viết các câu lệnh đơn giản để hỏi đáp thông tin cơ bản về bản thân.", link: "#" },
          { name: "Bài tập 2: Phân tích case-study ứng dụng AI", desc: "Tìm kiếm và tóm tắt 3 bài báo khoa học nói về lợi ích và thách thức khi sinh viên sử dụng AI.", link: "#" }
        ]
      }
    },
    {
      id: 2,
      title: "Tuần 2: Kỹ năng Prompt Engineering & Mô hình tư duy",
      date: "11/09/2024",
      highlight: "Khám phá các cấu trúc câu lệnh nâng cao, kỹ thuật Few-shot, Role-play và chuỗi suy nghĩ.",
      content: {
        intro: "Học cách giao tiếp hiệu quả với AI. Một prompt tốt quyết định 90% chất lượng câu trả lời.",
        keyTakeaway: "Biết cách áp dụng cấu trúc Prompt chuyên nghiệp: Vai trò (Role) -> Bối cảnh (Context) -> Nhiệm vụ (Task) -> Định dạng đầu ra (Output format).",
        exercises: [
          { name: "Bài tập 1: Xây dựng Prompt trợ lý ảo học thuật", desc: "Tạo một prompt dài đóng vai chuyên gia hướng dẫn viết code Python, tối ưu hóa để AI giải thích từng dòng code.", link: "#" }
        ]
      }
    },
    {
      id: 3,
      title: "Tuần 3: AI trong việc Tìm kiếm, Tóm tắt & Xử lý thông tin",
      date: "18/09/2024",
      highlight: "Sử dụng AI để nghiên cứu tài liệu, đọc nhanh các báo cáo PDF dài và tổng hợp từ khóa chính.",
      content: {
        intro: "Tối ưu hóa thời gian nghiên cứu khoa học bằng cách biến AI thành bộ lọc thông tin thông minh.",
        keyTakeaway: "Sử dụng thành thạo các công cụ như Claude, ChatGPT để phân tích cấu trúc một file PDF dài 50 trang.",
        exercises: [
          { name: "Bài tập 1: Trích xuất thông tin từ báo cáo tài chính", desc: "Tải lên một file báo cáo tài chính mẫu, viết prompt để AI liệt kê doanh thu, lợi nhuận dạng bảng.", link: "#" }
        ]
      }
    },
    {
      id: 4,
      title: "Tuần 4: Viết và Sáng tạo nội dung với sự hỗ trợ của AI",
      date: "25/09/2024",
      highlight: "Ứng dụng AI vào viết email, soạn thảo bài thuyết trình và viết bài blog chuẩn SEO.",
      content: {
        intro: "Vượt qua hội chứng sợ trang giấy trắng bằng cách đồng sáng tạo nội dung cùng AI.",
        keyTakeaway: "Cá nhân hóa văn văn phong của AI để bài viết có hồn, mang đậm bản sắc cá nhân.",
        exercises: [
          { name: "Bài tập 1: Lập đề cương chi tiết cho bài tiểu luận", desc: "Sử dụng sơ đồ tư duy kết hợp ChatGPT để lên outline cho đề tài nghiên cứu.", link: "#" }
        ]
      }
    },
    {
      id: 5,
      title: "Tuần 5: Thiết kế Slide bài giảng và Thuyết trình cùng AI",
      date: "02/10/2024",
      highlight: "Tìm hiểu Gamma App, Tome và cách xuất dàn ý sang PowerPoint nhanh chóng.",
      content: {
        intro: "Chuyển đổi ý tưởng dạng chữ thành những trang slide thuyết trình chuyên nghiệp chỉ trong tích tắc.",
        keyTakeaway: "Cách phối hợp Canva và Gamma để thiết kế slide nhanh hơn gấp 5 lần so với làm thủ công.",
        exercises: [
          { name: "Bài tập 1: Tạo Slide tự động từ Outline", desc: "Sử dụng Gamma App thiết kế bộ slide 10 trang về chủ đề Lợi ích của chuyển đổi số.", link: "#" }
        ]
      }
    },
    {
      id: 6,
      title: "Tuần 6: Sáng tạo Hình ảnh với Midjourney & DALL-E 3",
      date: "09/10/2024",
      highlight: "Nắm vững kỹ năng mô tả không gian, ánh sáng, chất liệu để tạo ra tác phẩm nghệ thuật AI.",
      content: {
        intro: "Mở khóa tư duy thị giác. Ai cũng có thể trở thành họa sĩ khi biết cách điều khiển cọ vẽ AI.",
        keyTakeaway: "Hiểu về các tham số góc máy, tiêu cự, phong cách nghệ thuật trong Prompt hình ảnh.",
        exercises: [
          { name: "Bài tập 1: Tạo bộ ảnh minh họa", desc: "Sử dụng DALL-E 3 để tạo ra 4 bức ảnh đồng nhất về phong cách kể về hành trình một chú robot.", link: "#" }
        ]
      }
    },
    {
      id: 7,
      title: "Tuần 7: Tìm hiểu về Sở hữu trí tuệ và Đạo đức AI",
      date: "16/10/2024",
      highlight: "Thảo luận về vấn đề đạo văn, bản quyền hình ảnh do AI tạo ra và trách nhiệm của người dùng.",
      content: {
        intro: "Sử dụng AI thông minh là chưa đủ, chúng ta cần phải sử dụng AI một cách tử tế và có đạo đức.",
        keyTakeaway: "Nguyên tắc ghi nhận nguồn khi sử dụng dữ liệu từ AI. Hiểu về các rủi ro định kiến.",
        exercises: [
          { name: "Bài tập 1: Phân tích tranh chấp bản quyền tác phẩm", desc: "Viết bài thảo luận 500 từ về vụ kiện giữa các nghệ sĩ và Stable Diffusion.", link: "#" }
        ]
      }
    },
    {
      id: 8,
      title: "Tuần 8: Ôn tập giữa kỳ & Hoàn thiện kỹ năng hệ thống",
      date: "23/10/2024",
      highlight: "Tổng hợp toàn bộ kiến thức đã học, đánh giá năng lực ứng dụng thực tế.",
      content: {
        intro: "Điểm lại chặng đường 1/2 học phần, củng cố những lỗ hổng kiến thức để chuẩn bị cho các dự án lớn hơn.",
        keyTakeaway: "Khả năng tự đánh giá và tối ưu hóa quy trình làm việc cá nhân có sự đồng hành của AI.",
        exercises: [
          { name: "Bài tập 1: Thiết kế cẩm nang bỏ túi Prompt Cheatsheet", desc: "Tổng hợp các câu lệnh tâm đắc nhất của bản thân thành một file tài liệu ngắn.", link: "#" }
        ]
      }
    },
    {
      id: 9,
      title: "Tuần 9: Phân tích dữ liệu cơ bản bằng AI (Advanced Data Analysis)",
      date: "30/10/2024",
      highlight: "Tải các tệp Excel, CSV lên AI để phân tích xu hướng, vẽ biểu đồ và trực quan hóa số liệu.",
      content: {
        intro: "Không cần giỏi viết code, bạn vẫn có thể khám phá những câu chuyện ẩn sau các con số nhờ AI.",
        keyTakeaway: "Cách viết prompt để AI làm sạch dữ liệu lỗi, phân tích tương quan và đề xuất giải pháp.",
        exercises: [
          { name: "Bài tập 1: Phân tích hành vi mua sắm", desc: "Sử dụng bộ dữ liệu giả lập về doanh số cửa hàng để nhờ AI tìm ra sản phẩm bán chạy nhất.", link: "#" }
        ]
      }
    },
    {
      id: 10,
      title: "Tuần 10: Xây dựng Chatbot AI tùy chỉnh không dùng code",
      date: "06/11/2024",
      highlight: "Tìm hiểu công cụ GPTs của OpenAI, Poe để tạo trợ lý ảo giải đáp thông tin theo cơ sở dữ liệu riêng.",
      content: {
        intro: "Đóng gói tri thức của bạn thành một thực thể AI hoạt động 24/7.",
        keyTakeaway: "Hiểu quy trình nạp tài liệu (Knowledge base) và định hướng hành vi cho Chatbot tùy chỉnh.",
        exercises: [
          { name: "Bài tập 1: Tạo GPTs Trợ lý học tập", desc: "Nạp giáo trình môn học vào GPTs cá nhân và cấu hình để bot trả lời thân thiện.", link: "#" }
        ]
      }
    },
    {
      id: 11,
      title: "Tuần 11: Ứng dụng AI trong học ngoại ngữ",
      date: "13/11/2024",
      highlight: "Luyện giao tiếp phản xạ, sửa lỗi phát âm và học ngữ cảnh từ vựng cùng AI.",
      content: {
        intro: "Sở hữu một giáo viên bản xứ kèm 1-1 hoàn toàn miễn phí mọi lúc mọi nơi.",
        keyTakeaway: "Cách biến ChatGPT Voice thành người bạn trò chuyện hàng ngày để tăng phản xạ.",
        exercises: [
          { name: "Bài tập 1: Kịch bản mô phỏng phỏng vấn xin việc", desc: "Tạo prompt yêu cầu AI đóng vai nhà tuyển dụng Google phỏng vấn bằng Tiếng Anh.", link: "#" }
        ]
      }
    },
    {
      id: 12,
      title: "Tuần 12: Tự động hóa công việc văn phòng cơ bản",
      date: "20/11/2024",
      highlight: "Kết hợp Make, Zapier hoặc các tiện ích mở rộng để tự động gửi email, lưu trữ tài liệu.",
      content: {
        intro: "Giải phóng bản thân khỏi các tác vụ lặp đi lặp lại nhàm chán để tập trung vào tư duy sáng tạo.",
        keyTakeaway: "Hiểu nguyên lý Trigger - Action trong tự động hóa quy trình làm việc kỹ thuật số.",
        exercises: [
          { name: "Bài tập 1: Thiết kế luồng gửi thư tự động", desc: "Xây dựng sơ đồ quy trình tự động gửi email cảm ơn khi có khách đăng ký.", link: "#" }
        ]
      }
    },
    {
      id: 13,
      title: "Tuần 13: Xây dựng ý tưởng khởi nghiệp (AI Startup Ideation)",
      date: "27/11/2024",
      highlight: "Sử dụng các mô hình SWOT, Lean Canvas kết hợp AI để định hình ý tưởng kinh doanh mới.",
      content: {
        intro: "Kiểm thử nhanh mức độ khả thi của một mô hình kinh doanh tiềm năng chỉ trong vòng 1 giờ.",
        keyTakeaway: "Cách dùng AI đóng vai khách hàng khó tính để phản biện, tìm ra kẽ hở.",
        exercises: [
          { name: "Bài tập 1: Lập bản Lean Canvas cho dự án AI Edu", desc: "Phối hợp cùng AI viết bản kế hoạch kinh doanh tinh gọn.", link: "#" }
        ]
      }
    },
    {
      id: 14,
      title: "Tuần 14: Lập kế hoạch tài chính cá nhân với AI",
      date: "04/12/2024",
      highlight: "Quản lý dòng tiền, lập ngân sách chi tiêu tối ưu và tìm hiểu kiến thức đầu tư cơ bản.",
      content: {
        intro: "Làm chủ tài chính cá nhân một cách khoa học với người cố vấn thông thái.",
        keyTakeaway: "Cách phân bổ thu nhập theo quy tắc 6 chiếc lọ thông qua bảng tính thông minh.",
        exercises: [
          { name: "Bài tập 1: Xây dựng kế hoạch tài chính năm 2025", desc: "Nhập số liệu thu nhập giả định, yêu cầu AI lập bảng phân bổ chi tiêu chi tiết.", link: "#" }
        ]
      }
    },
    {
      id: 15,
      title: "Tuần 15: Hoàn thiện Portfolio cá nhân & Tổng kết môn học",
      date: "11/12/2024",
      highlight: "Xây dựng website cá nhân, lưu trữ và trưng bày các thành quả học tập ấn tượng nhất.",
      content: {
        intro: "Thời khắc nhìn lại cả một hành trình dài bứt phá giới hạn bản thân, đóng gói tri thức số.",
        keyTakeaway: "Kỹ năng đóng gói sản phẩm, trình bày trực quan và định vị thương hiệu cá nhân trong kỷ nguyên số.",
        exercises: [
          { name: "Bài tập 1: Hoàn thiện Website Portfolio", desc: "Hệ thống hóa toàn bộ bài tập 15 tuần học tập vào trang web tương tác cá nhân.", link: "#" }
        ]
      }
    }
  ];

  const filteredWeeks = weeksData.filter(week => 
    week.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    week.highlight.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full relative flex flex-col font-sans select-none overflow-hidden text-neutral-100 bg-black animate-aurora">
      
      {/* NỀN ĐỘNG TRỰC QUAN SỐNG ĐỘNG (Interactive Glass Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#13071f] via-[#05060b] to-[#121c2c] z-0" />
      
      {/* Hiệu ứng các hạt hạt lấp lánh (Floating Light Particles) */}
      {particles.map((p) => (
        <div 
          key={p.id}
          className="floating-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}

      {/* LƯỚI CHIỀU SÂU HIỆN ĐẠI (Tech Grid lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-1" />

      {/* --- MENU BAR GIẢ LẬP CAPTIVATING MENU BAR --- */}
      <header className="relative z-50 flex items-center justify-between px-6 py-2.5 backdrop-blur-xl border-b border-white/5 bg-neutral-950/40 text-xs font-semibold text-neutral-200">
        <div className="flex items-center gap-5">
          <Apple className="w-4 h-4 cursor-pointer text-amber-500 hover:scale-110 active:scale-95 transition-all" />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">PORTFOLIO</span>
          <span className="hidden sm:inline cursor-pointer opacity-70 hover:opacity-100 transition-opacity">Khám phá</span>
          <span className="hidden sm:inline cursor-pointer opacity-70 hover:opacity-100 transition-opacity">Sáng tạo</span>
          <span className="hidden md:inline cursor-pointer opacity-70 hover:opacity-100 transition-opacity">Dự án</span>
        </div>
        
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 opacity-80">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] tracking-wider text-emerald-400 font-bold uppercase">Online</span>
          </span>
          <span className="font-semibold text-neutral-300">{time || 'Đang tải...'}</span>
        </div>
      </header>

      {/* --- WORKSPACE CHÍNH --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 relative z-10 overflow-hidden">
        
        {/* --- CỬA SỔ TRÌNH CHIẾU CAO CẤP (GLASSMORPHISM PRESET) --- */}
        <div className="w-full max-w-6xl h-[80vh] rounded-3xl flex flex-col border border-white/10 bg-neutral-950/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden animate-scale-up">
          
          {/* Windows Header (Spotlight Glass-look Header) */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-neutral-900/30">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80 cursor-pointer hover:bg-rose-500 transition-colors" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80 cursor-pointer hover:bg-amber-500 transition-colors" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 cursor-pointer hover:bg-emerald-500 transition-colors" />
            </div>

            {/* Tìm kiếm phát sáng thông minh */}
            <div className="flex items-center gap-3 w-1/3 max-w-xs">
              <div className="relative w-full flex items-center rounded-xl px-3.5 py-1.5 text-xs bg-neutral-900/80 border border-white/5 focus-within:border-amber-500/50 focus-within:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all">
                <Search className="w-3.5 h-3.5 mr-2 text-amber-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tác phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-xs text-neutral-200 placeholder-neutral-500"
                />
              </div>
            </div>

            <div className="w-14"></div>
          </div>

          {/* Nội dung tương tác bên trong Cửa sổ */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar thiết kế tối giản, trong suốt */}
            <aside className="w-48 md:w-56 p-4 flex flex-col gap-1.5 border-r border-white/5 bg-neutral-950/30 shrink-0">
              <p className="text-[10px] font-bold tracking-wider text-amber-500/80 uppercase px-2 mb-2">Phân mục</p>
              
              <button
                onClick={() => { setCurrentTab('profile'); setSelectedWeek(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  currentTab === 'profile'
                    ? 'bg-amber-500 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Trang cá nhân</span>
              </button>

              <button
                onClick={() => { setCurrentTab('weeks'); setSelectedWeek(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  currentTab === 'weeks'
                    ? 'bg-amber-500 text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Folder className="w-4 h-4" />
                <span>Kho lưu trữ AI</span>
              </button>

              <p className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-2 mt-5 mb-2">Phát triển AI</p>
              
              <div className="flex-1 overflow-y-auto scrollbar-custom space-y-1 pr-1">
                {weeksData.map((week) => (
                  <button
                    key={week.id}
                    onClick={() => { setCurrentTab('weeks'); setSelectedWeek(week); }}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] transition-all duration-200 ${
                      selectedWeek?.id === week.id
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                        : 'text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex-1 truncate">Tuần {week.id}: {week.title.split(':')[1] || week.title}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Khung nội dung chính của Finder */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-custom">
              
              {/* --- TRANG CÁ NHÂN (Ultra modern Profile) --- */}
              {currentTab === 'profile' && (
                <div className="space-y-8 animate-scale-up">
                  
                  {/* Premium Header Card */}
                  <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-amber-500/10 to-orange-500/5 backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                      <div className="relative group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20">
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
                            alt="Avatar" 
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                          Đỗ Xuân Tuyên
                        </h1>
                        <p className="text-sm font-semibold text-amber-400 tracking-wide uppercase">
                          AI Prompt Engineer & Sáng tạo nội dung Kỹ thuật số
                        </p>
                        <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
                          Sở thích chinh phục và tối ưu hóa sức mạnh của các mô hình Generative AI để tạo nên giá trị sáng tạo thực tế, bứt phá năng suất học thuật và làm việc.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mục tiêu & Thế mạnh */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <PremiumSpotlightCard>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-current" /> Sứ mệnh học tập
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Hành trình học tập này giúp tôi tiếp cận với kỹ thuật chuyên sâu về cấu trúc câu lệnh (Prompt Engineering). Giúp tối ưu hóa toàn diện quá trình nghiên cứu, viết báo cáo nhanh chóng, phân tích và trực quan hóa các tập dữ liệu thực tế hiệu quả.
                      </p>
                    </PremiumSpotlightCard>

                    <PremiumSpotlightCard>
                      <h3 className="text-sm font-extrabold uppercase tracking-widest text-orange-400 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Định hướng tương lai
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Không ngừng khám phá các mô hình AI tiên tiến nhất hiện nay để tự động hóa quy trình sản xuất thông tin, xây dựng chatbot chuyên dụng và thiết lập các hệ sinh thái khởi nghiệp số tiềm năng.
                      </p>
                    </PremiumSpotlightCard>
                  </div>

                  {/* Thống kê năng lực (Interactive stats) */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Thành quả đã gặt hái</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Tiến độ học tập", value: "100%", detail: "15 Tuần học hoàn thành", color: "from-amber-500 to-orange-500" },
                        { label: "Thực hành thực tế", value: "30+", detail: "Dự án & sản phẩm AI", color: "from-purple-500 to-pink-500" },
                        { label: "Kỹ năng chuyên biệt", value: "Master", detail: "Prompt Engineering", color: "from-emerald-500 to-teal-500" },
                        { label: "Thời gian làm chủ", value: "120+", detail: "Giờ nghiên cứu ứng dụng", color: "from-rose-500 to-red-500" }
                      ].map((stat, idx) => (
                        <div key={idx} className="relative overflow-hidden p-5 rounded-2xl border border-white/5 bg-neutral-900/40 group hover:border-white/10 transition-all">
                          <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${stat.color}`} />
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">{stat.label}</p>
                          <p className="text-2xl font-black text-white mt-1.5">{stat.value}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">{stat.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* --- KHO LƯU TRỮ AI (Grid layout cực kì chuyên nghiệp) --- */}
              {currentTab === 'weeks' && !selectedWeek && (
                <div className="space-y-6 animate-scale-up">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-white tracking-tight">
                      Hồ sơ Nhật ký học tập 15 tuần
                    </h2>
                    <span className="text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      Chương trình đạt chuẩn xuất sắc
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredWeeks.map((week) => (
                      <div
                        key={week.id}
                        onClick={() => setSelectedWeek(week)}
                        className="relative overflow-hidden p-5 rounded-2xl border border-white/5 bg-neutral-900/30 cursor-pointer hover:bg-neutral-900/50 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all group"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-full" />
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">Tài liệu tuần {week.id}</span>
                          <span className="text-[10px] text-neutral-500">{week.date}</span>
                        </div>
                        
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                          {week.title.split(':')[1] || week.title}
                        </h4>
                        
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {week.highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- CHI TIẾT TUẦN BẮT MẮT --- */}
              {currentTab === 'weeks' && selectedWeek && (
                <div className="space-y-6 animate-scale-up">
                  <button
                    onClick={() => setSelectedWeek(null)}
                    className="flex items-center gap-2 text-xs font-bold py-1.5 px-3 rounded-xl border border-white/5 bg-neutral-900/80 text-neutral-400 hover:text-white hover:border-amber-500/30 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại lưu trữ
                  </button>

                  <div className="relative overflow-hidden p-6 rounded-3xl border border-white/5 bg-gradient-to-r from-amber-500/10 to-transparent">
                    <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase">Danh mục bài giảng</span>
                    <h2 className="text-2xl font-black text-white mt-1.5">{selectedWeek.title}</h2>
                    <p className="text-xs text-neutral-400 mt-1">Ngày lưu trữ chính thức: {selectedWeek.date}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/20">
                        <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3">Tổng quan & Trải nghiệm thực tế</h3>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {selectedWeek.content.intro}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">Chi tiết sản phẩm đã thực hành</h3>
                        <div className="space-y-3.5">
                          {selectedWeek.content.exercises.map((ex, idx) => (
                            <div key={idx} className="relative overflow-hidden p-5 rounded-2xl border border-white/5 bg-neutral-900/40 hover:border-white/10 transition-all">
                              <h4 className="text-xs font-extrabold text-amber-300 mb-2">{ex.name}</h4>
                              <p className="text-xs text-neutral-300 leading-relaxed mb-4">{ex.desc}</p>
                              <a 
                                href={ex.link} 
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
                              >
                                Tải xuống / Xem chi tiết sản phẩm &rarr;
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/20">
                        <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-3">Tư duy đúc kết</h3>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {selectedWeek.content.keyTakeaway}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>

        {/* --- THANH DOCK 3D THU PHÓNG TƯƠNG TÁC (3D DOCK ZOOM) --- */}
        <div className="mt-6 px-4 py-3 rounded-2xl border border-white/10 bg-neutral-950/60 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl flex items-center gap-5 transition-all">
          {[
            { tab: 'profile', icon: User, label: "Hồ sơ cá nhân" },
            { tab: 'weeks', icon: Folder, label: "Tài liệu học tập" },
          ].map((item, idx) => {
            const isHovered = dockHoveredIdx === idx;
            const isNeighbor = dockHoveredIdx !== null && Math.abs(dockHoveredIdx - idx) === 1;
            
            // Thiết kế hiệu ứng thu phóng giống macOS Dock
            let sizeClass = 'scale-100';
            if (isHovered) sizeClass = 'scale-125 -translate-y-2';
            else if (isNeighbor) sizeClass = 'scale-110 -translate-y-1';

            return (
              <button
                key={item.tab}
                onClick={() => { setCurrentTab(item.tab); setSelectedWeek(null); }}
                onMouseEnter={() => setDockHoveredIdx(idx)}
                onMouseLeave={() => setDockHoveredIdx(null)}
                className={`relative p-3.5 rounded-2xl transition-all duration-300 ${
                  currentTab === item.tab 
                    ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-neutral-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                } ${sizeClass}`}
              >
                <item.icon className="w-5.5 h-5.5" />
                
                {/* Tooltip */}
                <span className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-neutral-200 text-[10px] font-bold py-1 px-2.5 rounded-lg opacity-0 transition-opacity pointer-events-none border border-white/10 whitespace-nowrap ${
                  isHovered ? 'opacity-100' : ''
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}