// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Apple, Wifi, Battery, Search, ChevronLeft, ChevronRight, 
  Terminal, Code, Cpu, Globe, Database, Server, 
  User, ArrowLeft, Maximize2, Minus, X, LayoutTemplate, Folder, BookOpen,
  Zap, Lightbulb, MessageSquare, Target, Users, Landmark
} from 'lucide-react';

// --- INJECTED CUSTOM CSS (Animations & Styles) ---
const globalStyles = `
  @keyframes slide-down-clip {
    0% { transform: translateY(-50px); clip-path: inset(100% 0 0 0); filter: blur(8px); }
    100% { transform: translateY(0); clip-path: inset(0 0 0 0); filter: blur(0); }
  }
  .animate-text-clip {
    animation: slide-down-clip 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes scroll-reveal {
    0% { transform: translateY(40px) scale(0.95); filter: blur(15px); clip-path: inset(30% 0 30% 0); }
    100% { transform: translateY(0) scale(1); filter: blur(0); clip-path: inset(0 0 0 0); }
  }
  .animate-scroll {
    animation: scroll-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .hide-pre-scroll {
    visibility: hidden;
  }

  @keyframes col-clip {
    0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); filter: brightness(0); }
    100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); filter: brightness(1); }
  }
  .animate-col {
    animation: col-clip 1.5s cubic-bezier(0.8, 0, 0.2, 1) both;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }
  .animate-marquee-slow {
    display: flex;
    width: max-content;
    animation: marquee 40s linear infinite reverse;
  }
  .alpha-mask {
    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  }

  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .beam-btn-wrapper {
    position: relative;
    border-radius: 9999px;
    padding: 1px;
    overflow: hidden;
    display: inline-flex;
    cursor: pointer;
  }
  .beam-btn-bg {
    position: absolute;
    inset: -150%;
    background: conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(100, 150, 255, 0.8) 20%, transparent 40%);
    animation: spin 3s linear infinite;
    clip-path: circle(0%);
    transition: clip-path 0.4s ease;
  }
  .beam-btn-wrapper:hover .beam-btn-bg {
    clip-path: circle(100%);
  }
  .beam-btn-content {
    position: relative;
    background: #171717;
    border-radius: 9999px;
    padding: 0.5rem 1.5rem;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 500;
  }

  .carousel-container {
    perspective: 1000px;
    transform-style: preserve-3d;
  }
  .carousel-card {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .mac-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .mac-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .mac-scrollbar::-webkit-scrollbar-thumb {
    background: #404040;
    border-radius: 4px;
  }
`;

// --- COMPONENTS ---

const AnimatedText = ({ text, className = "" }) => {
  return (
    <span className={`inline-flex flex-nowrap ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="animate-text-clip inline-block whitespace-pre"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${inView ? 'animate-scroll' : 'hide-pre-scroll'} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const BeamButton = ({ children, onClick, icon: Icon }) => (
  <div className="beam-btn-wrapper" onClick={onClick}>
    <div className="beam-btn-bg" />
    <div className="beam-btn-content">
      {Icon && <Icon size={18} />}
      {children}
    </div>
  </div>
);

const FlashlightCard = ({ children, className = "", onClick }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md cursor-pointer group ${className}`}
    >
      {isHovered && (
        <>
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 50%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10 p-[1px] rounded-xl"
            style={{
              background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 50%)`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        </>
      )}
      <div className="relative z-20 h-full p-6 flex flex-col">{children}</div>
    </div>
  );
};

const Marquee = ({ children, slow = false }) => (
  <div className="w-full overflow-hidden alpha-mask py-8">
    <div className={slow ? 'animate-marquee-slow' : 'animate-marquee'}>
      <div className="flex shrink-0 items-center px-4 space-x-12">{children}</div>
      <div className="flex shrink-0 items-center px-4 space-x-12">{children}</div>
    </div>
  </div>
);

const AppleLogo = ({ className = "" }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" height="14" width="14" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const TopBar = ({ activeTab }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const appName = 
    activeTab === 'home' ? 'Portfolio' : 
    activeTab === 'project_detail' ? 'Dự án' : 
    activeTab === 'about' ? 'Giới thiệu' : 'Liên hệ';

  return (
    <div className="h-7 w-full bg-neutral-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-[13px] font-medium text-neutral-300 z-50 relative">
      <div className="flex items-center space-x-4 cursor-default">
        <AppleLogo className="hover:text-white transition-colors" />
        <span className="font-bold text-white">{appName}</span>
        <span className="hover:text-white transition-colors hidden sm:inline-block">File</span>
        <span className="hover:text-white transition-colors hidden sm:inline-block">Edit</span>
        <span className="hover:text-white transition-colors hidden sm:inline-block">View</span>
        <span className="hover:text-white transition-colors hidden md:inline-block">Window</span>
        <span className="hover:text-white transition-colors hidden md:inline-block">Help</span>
      </div>
      <div className="flex items-center space-x-4 cursor-default">
        <Wifi size={14} />
        <span>{time.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' })}</span>
        <span>{time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const gridProjects = [
    { 
      id: 1, 
      title: 'Thực hành File Explorer', 
      category: 'Kỹ năng hệ điều hành',
      icon: Folder,
      color: 'text-yellow-400',
      img: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/file-explorer.jpg', 
      desc: 'Hướng dẫn chi tiết các thao tác quản lý tệp tin và thư mục cơ bản trên hệ điều hành Windows.',
      content: [
        {
          type: 'step',
          heading: 'Mở File Explorer',
          text: 'Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.',
          images: ['https://i.postimg.cc/sXnfsQk4/image.png']
        },
        {
          type: 'step',
          heading: 'Truy cập ổ đĩa/thư mục',
          text: 'Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:). Nếu chỉ có ổ C:, hãy vào thư mục Documents.',
          images: ['https://i.postimg.cc/RVxC9B8L/image.png']
        },
        {
          type: 'step',
          heading: 'Tạo thư mục mới',
          text: 'Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_hotensinhvien (ví dụ: ThucHanh_NguyenVanA). Nhấn Enter.',
          images: ['https://i.postimg.cc/N067JYWZ/image.png', 'https://i.postimg.cc/L6JkdjcP/image.png']
        },
        {
            type: 'step',
            heading: 'Vào thư mục vừa tạo',
            text: 'Nhấp đúp vào thư mục ThucHanh_NguyenVanA.',
            images: ['https://i.postimg.cc/y6b9TkDV/image.png']
        },
        {
            type: 'step',
            heading: 'Tạo tệp tin văn bản',
            text: 'Nhấp chuột phải vào khoảng trống -> New -> Text Document. Đặt tên là GhiChu.txt. Nhấn Enter.',
            images: ['https://i.postimg.cc/V65BWTc1/image.png', 'https://i.postimg.cc/6qvrDv3k/image.png']
        },
        {
            type: 'step',
            heading: 'Đổi tên tệp tin',
            text: 'Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename. Đổi tên thành GhiChuQuanTrong.txt. Nhấn Enter.',
            images: ['https://i.postimg.cc/8zPFvvGG/image.png', 'https://i.postimg.cc/tg878mxC/image.png']
        },
        {
            type: 'step',
            heading: 'Tạo thư mục con',
            text: 'Trong thư mục ThucHanh_NguyenVanA, nhấp chuột phải -> New -> Folder. Đặt tên là TaiLieu.',
            images: ['https://i.postimg.cc/59SNmtnj/image.png', 'https://i.postimg.cc/nztp48mw/image.png']
        },
        {
            type: 'step',
            heading: 'Sao chép tệp tin (Copy & Paste)',
            text: 'Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V). Bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.',
            images: ['https://i.postimg.cc/8c53WwZn/image.png', 'https://i.postimg.cc/281MScbL/image.png']
        },
        {
            type: 'step',
            heading: 'Di chuyển tệp tin (Cut & Paste)',
            text: 'Quay lại thư mục ThucHanh_NguyenVanA. Tạo một tệp mới tên là DiChuyen.txt. Nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V). Tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.',
            images: ['https://i.postimg.cc/NM0bPFRT/image.png', 'https://i.postimg.cc/yd55mc2k/image.png']
        },
        {
            type: 'step',
            heading: 'Xóa tệp tin',
            text: 'Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete. Tệp sẽ được chuyển vào Thùng rác (Recycle Bin).',
            images: ['https://i.postimg.cc/TP1CthVp/image.png']
        },
        {
            type: 'step',
            heading: 'Xóa vĩnh viễn',
            text: 'Chọn tệp DiChuyen.txt, nhấn giữ phím Shift và nhấn phím Delete. Một cảnh báo sẽ hiện ra. Nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.',
            images: ['https://i.postimg.cc/G3FJJvWf/image.png']
        },
      ]
    },
    { 
      id: 2, 
      title: 'Tìm kiếm và Đánh giá thông tin học thuật', 
      category: 'Nghiên cứu khoa học',
      icon: BookOpen,
      color: 'text-blue-400',
      img: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800', 
      desc: 'Khảo sát, phân loại và đánh giá độ tin cậy của các tài liệu chuyên ngành về vi mạch CMOS.',
      content: [
        {
          type: 'text_list',
          heading: 'Đề tài, phạm vi tìm kiếm',
          items: [
            { label: 'Đề tài', value: 'Mạch khuếch đại vi sai' },
            { label: 'Phạm vi tìm kiếm', value: 'Cấu trúc vi mạch CMOS' }
          ],
          images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200']
        },
        {
          type: 'text_list',
          heading: 'Tìm kiếm',
          items: [
            { label: 'Cơ sở dữ liệu học thuật', value: 'Compact Two-Stage CMOS Operational Amplifier with Enhanced Gain and Bandwidth via Cascode and Negative Capacitance Techniques (Google Scholar)' },
            { label: 'Tạp chí khoa học chuyên ngành', value: 'A Design Methodology for RF/mmWave LNAs in 22 nm FD-SOI with Cross-Coupling-Aware Nested Inductors and On-Chip Baluns' },
            { label: 'Sách chuyên khảo', value: 'Design of Analog CMOS Integrated Circuits - Behzad Razavi' },
            { label: 'Nguồn mở Internet', value: 'Design of OP-AMP using CMOS technology & its application (ieeexplore.ieee.org/document/7755384)' },
            { label: 'Khác', value: 'Deep reinforcement learning and Bayesian optimization based OpAmp design across the CMOS process space (ScienceDirect)' }
          ]
        },
        {
            type: 'table',
            heading: 'Đánh giá tài liệu tham khảo',
            headers: ['Tài liệu', 'Tác giả', 'NXB', 'Phương pháp', 'Trích dẫn'],
            rows: [
                ['CMOS Analog Circuit Design', 'Allen, P.E.', 'Oxford', 'Quy trình thiết kế từng bước', '7000+'],
                ['Design of Analog CMOS ICs', 'Behzad Razavi', 'McGraw-Hill', 'Phân tích lý thuyết, mô hình hóa', '10000+'],
                ['A low-power low-noise CMOS amplifier', 'R.R. Harrison', 'IEEE JSSC', 'Chế tạo thực tế và đo lường', '3000+']
            ]
        }
      ]
    },
    { 
      id: 3, 
      title: 'Kỹ thuật Viết Prompt và Tối ưu AI', 
      category: 'Kỹ năng Prompt Engineering',
      icon: Zap,
      color: 'text-orange-400',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', 
      desc: 'Phân tích và tối ưu hóa câu lệnh để khai thác tối đa hiệu quả từ các mô hình ngôn ngữ lớn (LLM).',
      content: [
        {
          type: 'text_list',
          heading: '1. Phân tích Prompt cơ bản',
          items: [
            { label: 'Tóm tắt tài liệu', value: 'Sử dụng prompt cơ bản để tóm tắt một tài liệu học thuật.' },
            { label: 'Giải thích khái niệm', value: 'Yêu cầu AI giải thích một khái niệm phức tạp.' },
            { label: 'Tạo câu hỏi', value: 'Tạo bộ câu hỏi ôn tập cho một chủ đề.' }
          ],
          images: [
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+1]+Tóm+tắt+cơ+bản',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+2]+Tóm+tắt+cơ+bản',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+3]+Giải+thích+cơ+bản',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+4]+Giải+thích+cơ+bản',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+5]+Tạo+câu+hỏi+cơ+bản',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+6]+Tạo+câu+hỏi+cơ+bản'
          ]
        },
        {
          type: 'text_list',
          heading: '2. Phân tích Prompt cải tiến',
          items: [
            { label: 'Tóm tắt tài liệu', value: 'Cải tiến độ chi tiết, ngữ cảnh và vai trò.' },
            { label: 'Giải thích khái niệm', value: 'Ràng buộc thêm các định dạng và phân loại thông tin.' },
            { label: 'Tạo câu hỏi', value: 'Áp dụng định dạng khắt khe để AI phân bổ đúng trọng số chú ý.' }
          ],
          images: [
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+7]+Tóm+tắt+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+8]+Tóm+tắt+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+9]+Giải+thích+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+10]+Giải+thích+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+11]+Giải+thích+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+12]+Giải+thích+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+13]+Tạo+câu+hỏi+cải+tiến',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+14]+Tạo+câu+hỏi+cải+tiến'
          ]
        },
        {
          type: 'text_list',
          heading: '3. Phân tích Prompt nâng cao',
          items: [
            { label: 'Tóm tắt nâng cao', value: 'Cung cấp yêu cầu "phải cung cấp phần giải thích chi tiết" để kích hoạt Chain-of-Thought.' }
          ],
          images: [
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+15]+Prompt+nâng+cao',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+16]+Prompt+nâng+cao',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+17]+Prompt+nâng+cao',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+18]+Prompt+nâng+cao'
          ]
        },
        {
          type: 'text_list',
          heading: '4. Tại sao Prompt cải tiến & nâng cao hiệu quả hơn?',
          items: [
            { label: 'Giới hạn không gian dữ liệu', value: 'Khi thêm các yếu tố ngữ cảnh, vai của AI, các từ khóa, thì AI sẽ giới hạn không gian dữ liệu (latent space) vào một cụm từ vựng cụ thể, giúp tự động điều chỉnh độ phức tạp của ngôn từ.' },
            { label: 'Cơ chế tự chú ý', value: 'Khi prompt yêu cầu một định dạng khắt khe, AI buộc phải phân bổ trọng số chú ý để phân loại thông tin theo đúng yêu cầu, giúp hệ thống hóa thông tin.' },
            { label: 'Kỹ thuật Chain-of-Thought', value: 'Việc ép AI giải thích chi tiết sẽ tạo ra các token trung gian để diễn giải logic trước khi kết luận, giúp câu trả lời mang tính chính xác tuyệt đối.' }
          ]
        },
        {
          type: 'text_list',
          heading: '5. Khung nguyên tắc cốt lõi: C.R.E.A.T.E Framework',
          items: [
            { label: 'C - Character (Gán vai trò)', value: 'Luôn xác định tư cách chuyên môn cho AI.' },
            { label: 'R - Request (Yêu cầu cốt lõi)', value: 'Nhiệm vụ cần phải rõ ràng, tránh đa nghĩa.' },
            { label: 'E - Explanation (Giải thích bối cảnh)', value: 'Cho AI biết đầu ra sẽ được dùng để làm gì và cho ai.' },
            { label: 'A - Adjustments (Ràng buộc)', value: 'Đưa ra các giới hạn về độ dài, ngôn từ hoặc những điều cấm kỵ.' },
            { label: 'T - Type of Output (Định dạng đầu ra)', value: 'Chỉ định hình thức trình bày.' },
            { label: 'E - Extras (Thông tin bổ sung)', value: 'Cung cấp tư duy mẫu (Few-shot) hoặc yêu cầu suy luận (Chain-of-thought).' }
          ]
        },
        {
          type: 'step',
          heading: '6. Tư duy "Người giao việc - Thực tập sinh"',
          text: 'Hãy xem AI như một thực tập sinh xuất sắc nhưng không biết đọc suy nghĩ. Bạn giao việc càng chi tiết, có tiêu chí đánh giá rõ ràng, "thực tập sinh" AI càng trả về kết quả hoàn hảo ở ngay lần thử đầu tiên. Hơn nữa, hãy dùng kỹ thuật "Chia để trị": Đối với các vấn đề quá phức tạp, đừng gom tất cả vào một prompt. Hãy yêu cầu AI lập dàn ý trước, sau đó dùng các prompt tiếp theo để phát triển từng phần.',
          images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200']
        }
      ]
    },
    { 
      id: 4, 
      title: 'Báo cáo cá nhân: Trải nghiệm và Kỹ năng sử dụng Công cụ cộng tác', 
      category: 'Kỹ năng làm việc nhóm',
      icon: Users,
      color: 'text-indigo-400',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', 
      desc: 'Báo cáo cá nhân về trải nghiệm, ứng dụng và kỹ năng giải quyết vấn đề với các công cụ quản lý dự án và giao tiếp trực tuyến.',
      content: [
        {
          type: 'text_list',
          heading: 'Thông tin cá nhân',
          items: [
            { label: 'Họ và tên', value: 'Nguyễn Minh Đạo' },
            { label: 'Mã sinh viên', value: '25022158' },
            { label: 'Nhóm', value: '17 – 7Teen' }
          ]
        },
        {
          type: 'text_list',
          heading: 'I. Lựa chọn công cụ',
          items: [
            { label: 'Quản lý dự án', value: 'Microsoft Planner - Trực quan hóa khối lượng công việc, theo dõi tiến độ và quản lý thời hạn (deadline) của từng cá nhân.' },
            { label: 'Giao tiếp nhóm', value: 'Messenger - Đảm bảo thông tin được xuyên suốt, hỗ trợ thảo luận nhanh chóng và giải quyết các vấn đề phát sinh tức thời.' },
            { label: 'Lưu trữ và chia sẻ tệp', value: 'Google Drive - Xây dựng kho lưu trữ tài nguyên chung với cấu trúc khoa học, bảo mật và dễ dàng tìm kiếm.' },
            { label: 'Soạn thảo tài liệu cộng tác', value: 'Google Docs - Hỗ trợ nhiều người cùng biên tập, chỉnh sửa văn bản theo thời gian thực mà không làm gián đoạn tiến trình.' }
          ]
        },
        {
          type: 'step',
          heading: 'II. Trải nghiệm sử dụng công cụ trực tuyến',
          text: 'Trong bối cảnh làm việc nhóm trực tuyến ngày càng trở nên phổ biến, việc nắm vững và vận dụng linh hoạt các công cụ cộng tác là kỹ năng không thể thiếu. Sự kết hợp của 4 công cụ này giúp tối ưu hóa hiệu suất cá nhân. Messenger được chọn làm không gian giao tiếp chính nhờ tính phổ biến. Tôi đã tham gia thảo luận cực kỳ sôi nổi, đóng góp ý kiến (hơn 10 lượt/tuần). Tôi chủ động gửi các liên kết (link) tài liệu từ Google Drive, nhắc nhở deadline từ Planner, và sẵn sàng hỗ trợ khi thành viên khác gặp khó khăn.',
          images: [
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+1]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+2]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+3]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+4]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+5]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+6]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+7]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+8]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+9]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+10]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+11]',
            'https://placehold.co/800x400/1e1e1e/fff?text=[Image+12]'
          ]
        },
        {
          type: 'text_list',
          heading: 'III. Thách thức và Giải pháp tương tác nhóm',
          items: [
            { label: 'Thách thức 1: Trôi tin nhắn trên Messenger', value: 'Vấn đề: Các tin nhắn quan trọng như link Drive, file báo cáo dễ bị trôi đi. Khi một thành viên cần tìm lại tài liệu để làm việc, họ phải lướt lại lịch sử tin nhắn hoặc liên tục hỏi lại vào trong nhóm, mất nhiều thời gian và công sức.\nGiải pháp: Tôi sử dụng tính năng “Ghim tin nhắn" cho những thông báo, tin nhắn quan trọng. Ngoài ra, ngay từ đầu tôi đã quy định không nhắn linh tinh vào trong nhóm chat.' },
            { label: 'Thách thức 2: Quản lý tập tin không hiệu quả', value: 'Vấn đề: Ban đầu, nhóm đưa lên rất nhiều file tài liệu với việc đặt tên lộn xộn kiểu "Tài liệu không có tiêu đề", "Tài liệu không có tiêu đề (1)", "tonghop", gây bối rối không biết đâu là file chuẩn nhất để làm tiếp.\nGiải pháp cá nhân áp dụng: Tôi bảo mọi người đặt tên file theo quy tắc cố định: Đặt tên file theo cú pháp “Tên nhóm_Tên người làm_Tên file”, nếu là bản chỉnh sửa thì thêm phiên bản.' }
          ]
        }
      ]
    },
    { 
      id: 5, 
      title: 'Sáng tạo nội dung với AI: Gà Rán Giòn Tại Nhà', 
      category: 'AI Content Creation',
      icon: Target,
      color: 'text-red-400',
      img: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&q=80&w=800', 
      desc: 'Ứng dụng các công cụ AI tạo sinh (Claude, Gemini) để chuyển ngữ, biên tập bài viết công thức nấu ăn.',
      content: [
        {
          type: 'text_list',
          heading: '1. Tổng quan dự án',
          items: [
            { label: 'Người thực hiện', value: 'Nguyễn Minh Đạo - 25022158' },
            { label: 'Tên dự án', value: 'Bài viết công thức nấu món Gà Rán Giòn Tại Nhà' },
            { label: 'Nguồn gốc', value: 'Công thức của Chef Joshua Weissman - dịch & tích hợp sang tiếng Việt' },
            { label: 'Công cụ AI', value: 'Claude, Gemini, Canva AI' }
          ],
          images: [
            'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200'
          ]
        },
        {
          type: 'step',
          heading: '2. Giới thiệu dự án & Mục tiêu',
          text: 'Mục tiêu của dự án không chỉ là dịch thuật đơn thuần, mà là tạo ra một bài viết hoàn chỉnh bằng tiếng Việt, có giọng văn gần gũi, dễ hiểu với người đọc Việt Nam, đồng thời bổ sung mẹo thực tế từ trải nghiệm cá nhân.',
          images: [
            'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&q=80&w=1200'
          ]
        },
        {
          type: 'step',
          heading: '3. Mẹo hay từ đầu bếp',
          text: 'Bí quyết tạo lớp vỏ sần sùi giòn rụm: Múc vài muỗng nước ướp đặc vào hỗn hợp bột khô, vảy và trộn đều để tạo ra những mảnh bột vụn nhỏ trước khi lăn gà. Ngoài ra, đừng bỏ qua "oyster meat" - phần ngon nhất của con gà!',
          images: [
            'https://images.unsplash.com/photo-1589301773954-473d0dce14e7?auto=format&fit=crop&q=80&w=1200'
          ]
        }
      ]
    },
    { 
      id: 6, 
      title: 'Phân tích Chính sách của Trường Đại học Công nghệ (UET) về sử dụng AI', 
      category: 'Nghiên cứu Chính sách',
      icon: Landmark,
      color: 'text-emerald-400',
      img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', 
      desc: 'Khảo sát và phân tích chính sách của Trường Đại học Công nghệ về liêm chính học thuật và ứng dụng AI.',
      content: [
        {
          type: 'step',
          heading: '1. Tổng quan chính sách hiện hành tại UET',
          text: 'Trường Đại học Công nghệ (UET) hiện chưa ban hành văn bản chính sách riêng về AI. Tuy nhiên, nhà trường điều chỉnh qua Quy chế đào tạo của ĐHQGHN, quy định rõ hành vi vi phạm liêm chính học thuật (sao chép, gian lận). Hướng dẫn của Bộ GD&ĐT (5/2026) cũng nhấn mạnh việc ứng dụng AI một cách minh bạch và trung thực.',
          images: [
            'https://trangedu.com/wp-content/uploads/2023/01/truong-dai-hoc-cong-nghe-dhqghn-tuyen-sinh.jpg.webp'
          ]
        },
        {
          type: 'text_list',
          heading: '2. Quan điểm và đánh giá',
          items: [
            { label: 'Vai trò cốt lõi', value: 'Tư duy con người vẫn là cốt lõi. AI chỉ là công cụ hỗ trợ xử lý dữ liệu thô, phát hiện lỗi và đưa ra kết luận vẫn thuộc về người dùng.' },
            { label: 'Chính sách rõ ràng', value: 'Cần thiết lập chính sách rõ ràng để tránh gây bất an cho sinh viên. UET cần cụ thể hóa hướng dẫn cho từng môn học.' },
            { label: 'Trách nhiệm cá nhân', value: 'Dù chính sách ra sao, người quyết định sử dụng AI có đạo đức hay không vẫn là sinh viên. Cần cam kết với sự trung thực học thuật.' }
          ],
          images: [
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200'
          ]
        }
      ]
    }
  ];

  const openProject = (proj) => {
    setSelectedProject(proj);
    setActiveTab('project_detail');
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveTab('home');
  };

  const renderContentBlock = (block, i) => {
    switch (block.type) {
      case 'step':
        return (
          <div key={i} className="space-y-4 border-b border-white/5 pb-10 last:border-0">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
               <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                 {i + 1}
               </span>
               {block.heading}
            </h3>
            <p className="text-neutral-300 leading-relaxed text-lg ml-11">{block.text}</p>
            {block.images && block.images.map((img, imgIdx) => (
              <div key={imgIdx} className="ml-11 rounded-xl overflow-hidden border border-white/10 bg-black/50 mt-4 shadow-lg">
                <img src={img} alt={block.heading} className="w-full object-contain max-h-[500px]" />
              </div>
            ))}
          </div>
        );
      
      case 'text_list':
        return (
          <div key={i} className="space-y-4 border-b border-white/5 pb-10 last:border-0">
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">{block.heading}</h3>
            <ul className="space-y-4 ml-4">
              {block.items.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-lg">
                  <span className="text-neutral-400 font-medium shrink-0 sm:w-1/3 md:w-1/4">{item.label}:</span>
                  <span className="text-neutral-200 leading-relaxed">{item.value}</span>
                </li>
              ))}
            </ul>
            {block.images && block.images.map((img, imgIdx) => (
              <div key={imgIdx} className="rounded-xl overflow-hidden border border-white/10 bg-black/50 mt-6 shadow-lg">
                <img src={img} alt={block.heading} className="w-full object-contain max-h-[500px]" />
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div key={i} className="space-y-4 border-b border-white/5 pb-10 last:border-0">
            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-emerald-500 pl-4">{block.heading}</h3>
            <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg bg-black/40 mac-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-white/5 text-neutral-300 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    {block.headers.map((th, idx) => (
                      <th key={idx} className="p-4 border-b border-white/10 whitespace-nowrap">{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-neutral-300 text-[13px]">
                  {block.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`p-4 align-top leading-relaxed ${cIdx === 0 ? 'font-medium text-blue-300' : ''}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen bg-black text-neutral-200 font-sans overflow-hidden flex flex-col selection:bg-blue-500/30 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
      <style>{globalStyles}</style>
      <TopBar activeTab={activeTab} />

      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 z-0">
        <div className="relative z-10 w-full max-w-7xl h-[85vh] bg-gradient-to-br from-neutral-900/70 to-black/90 backdrop-blur-[50px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(255,255,255,0.02)] border border-white/10 flex flex-col overflow-hidden">
          
          <div className="h-12 w-full bg-black/30 border-b border-white/10 flex items-center px-4 justify-between shrink-0">
            <div className="flex space-x-2 w-1/4 sm:w-1/3">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center group"><X size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer flex items-center justify-center group"><Minus size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer flex items-center justify-center group"><Maximize2 size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
            </div>
            <div className="w-2/4 sm:w-1/3 text-xs sm:text-sm font-semibold text-neutral-400 flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden">
              <LayoutTemplate size={14} className="shrink-0" /> 
              <span className="truncate">Portfolio</span>
            </div>
            <div className="flex w-1/4 sm:w-1/3 justify-end">
              {activeTab === 'project_detail' && (
                <button 
                  onClick={closeProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 text-xs font-medium text-white transition-all hover:scale-105 active:scale-95"
                >
                  <ArrowLeft size={12} /> Back to Home
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mac-scrollbar relative">
            {activeTab === 'home' && (
              <div className="p-8 md:p-12 space-y-10 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-2">
                  <div className="w-32 h-32 rounded-full bg-white shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden"></div>
                  <div className="space-y-4 text-center md:text-left overflow-hidden">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis">
                      <AnimatedText text="Portfolio" />
                    </h1>
                    <ScrollReveal delay={0.4}>
                      <h2 className="text-xl md:text-2xl text-blue-400 font-medium">
                        [Sinh viên ngành Công nghệ Kĩ thuật Điện tử - Viễn thông]
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.6} className="pt-4">
                      <BeamButton icon={Terminal} onClick={() => document.getElementById('projects-grid').scrollIntoView({ behavior: 'smooth' })}>
                        View My Work
                      </BeamButton>
                    </ScrollReveal>
                  </div>
                </div>

                <div id="projects-grid" className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Các bài tập / Dự án</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridProjects.map((proj, idx) => (
                      <ScrollReveal key={proj.id} delay={idx * 0.1}>
                        <FlashlightCard onClick={() => openProject(proj)} className="h-full min-h-[360px] flex flex-col">
                           <div className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden border-b border-white/10 relative shrink-0">
                              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                           </div>
                           {/* Xóa class line-clamp-2 để hiển thị toàn bộ tiêu đề */}
                           <h4 className="text-lg font-bold text-white mb-2 leading-snug">{proj.title}</h4>
                           <p className="text-neutral-400 flex-1 text-sm line-clamp-3">{proj.desc}</p>
                           <div className="mt-4 flex items-center text-blue-400 text-sm font-medium shrink-0">
                             Explore Project <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                           </div>
                        </FlashlightCard>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'project_detail' && selectedProject && (
              <div className="animate-scroll p-8 md:p-12 max-w-5xl mx-auto space-y-8 min-h-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden border-b border-white/10 pb-6">
                  {selectedProject.icon && <selectedProject.icon size={48} className={`shrink-0 ${selectedProject.color}`} />}
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{selectedProject.title}</h1>
                    {selectedProject.category && (
                      <p className="text-blue-400 font-medium mt-2">{selectedProject.category}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-12 mt-8">
                  {selectedProject.content && selectedProject.content.map((block, i) => renderContentBlock(block, i))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}