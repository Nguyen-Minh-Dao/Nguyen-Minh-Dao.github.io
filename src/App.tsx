// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Apple, Wifi, Battery, Search, ChevronLeft, ChevronRight, 
  Terminal, Code, Cpu, Globe, Database, Server, 
  User, ArrowLeft, Maximize2, Minus, X, LayoutTemplate, Folder, BookOpen,
  Zap, Lightbulb, MessageSquare, Target, Users, Landmark, Award, Moon, Sun,
  Settings, Sliders, Volume2, ShieldAlert
} from 'lucide-react';

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

  @keyframes scale-up-window {
    0% { transform: scale(0.9) translateY(40px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  .animate-window-open {
    animation: scale-up-window 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes dock-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .hover-bounce:hover {
    animation: dock-bounce 0.6s ease infinite;
  }

  /* macOS Custom Scrollbar styling depending on theme */
  .dark-theme {
    --sb-thumb: #404040;
    --sb-track: rgba(0, 0, 0, 0.2);
  }
  .light-theme {
    --sb-thumb: #c1c1c1;
    --sb-track: rgba(255, 255, 255, 0.2);
  }
  .mac-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .mac-scrollbar::-webkit-scrollbar-track {
    background: var(--sb-track);
    border-radius: 4px;
  }
  .mac-scrollbar::-webkit-scrollbar-thumb {
    background: var(--sb-thumb);
    border-radius: 4px;
  }
`;

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

const FlashlightCard = ({ children, className = "", onClick, isDarkMode }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const cardBg = isDarkMode ? 'bg-neutral-900/60 border-white/10' : 'bg-white/70 border-black/10';
  const glowColorBg = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)';
  const glowColorBorder = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border backdrop-blur-md cursor-pointer group transition-colors duration-500 ${cardBg} ${className}`}
    >
      {isHovered && (
        <>
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColorBg}, transparent 50%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-10 p-[1px] rounded-xl"
            style={{
              background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColorBorder}, transparent 50%)`,
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

const AppleLogo = ({ className = "" }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" height="14" width="14" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Custom states inspired by macOS-style portfolios
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [aboutMacOpen, setAboutMacOpen] = useState(false);
  const [windowState, setWindowState] = useState('open'); // 'open', 'minimized', 'closed'
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(70);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);

  // Focus Search input when spotlight opens
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (spotlightOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [spotlightOpen]);

  // Keyboard shortcut listener for Cmd+K or Ctrl+K (Spotlight Search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setControlCenterOpen(false);
        setAboutMacOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // DATA DỰ ÁN GIỮ NGUYÊN 100%
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
        { type: 'step', heading: 'Mở File Explorer', text: 'Nhấn tổ hợp phím Windows + E hoặc nhấp vào biểu tượng thư mục màu vàng trên thanh tác vụ.', images: ['https://i.postimg.cc/sXnfsQk4/image.png'] },
        { type: 'step', heading: 'Truy cập ổ đĩa/thư mục', text: 'Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống (ví dụ: ổ D: hoặc E:). Nếu chỉ có ổ C:, hãy vào thư mục Documents.', images: ['https://i.postimg.cc/RVxC9B8L/image.png'] },
        { type: 'step', heading: 'Tạo thư mục mới', text: 'Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_hotensinhvien (ví dụ: ThucHanh_NguyenVanA). Nhấn Enter.', images: ['https://i.postimg.cc/N067JYWZ/image.png', 'https://i.postimg.cc/L6JkdjcP/image.png'] },
        { type: 'step', heading: 'Vào thư mục vừa tạo', text: 'Nhấp đúp vào thư mục ThucHanh_NguyenVanA.', images: ['https://i.postimg.cc/y6b9TkDV/image.png'] },
        { type: 'step', heading: 'Tạo tệp tin văn bản', text: 'Nhấp chuột phải vào khoảng trống -> New -> Text Document. Đặt tên là GhiChu.txt. Nhấn Enter.', images: ['https://i.postimg.cc/V65BWTc1/image.png', 'https://i.postimg.cc/6qvrDv3k/image.png'] },
        { type: 'step', heading: 'Đổi tên tệp tin', text: 'Nhấp chuột phải vào tệp GhiChu.txt -> chọn Rename. Đổi tên thành GhiChuQuanTrong.txt. Nhấn Enter.', images: ['https://i.postimg.cc/8zPFvvGG/image.png', 'https://i.postimg.cc/tg878mxC/image.png'] },
        { type: 'step', heading: 'Tạo thư mục con', text: 'Trong thư mục ThucHanh_NguyenVanA, nhấp chuột phải -> New -> Folder. Đặt tên là TaiLieu.', images: ['https://i.postimg.cc/59SNmtnj/image.png', 'https://i.postimg.cc/nztp48mw/image.png'] },
        { type: 'step', heading: 'Sao chép tệp tin (Copy & Paste)', text: 'Nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Copy (hoặc chọn tệp rồi nhấn Ctrl + C). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống bên trong -> chọn Paste (hoặc nhấn Ctrl + V). Bây giờ bạn có một bản sao của tệp trong thư mục TaiLieu.', images: ['https://i.postimg.cc/8c53WwZn/image.png', 'https://i.postimg.cc/281MScbL/image.png'] },
        { type: 'step', heading: 'Di chuyển tệp tin (Cut & Paste)', text: 'Quay lại thư mục ThucHanh_NguyenVanA. Tạo một tệp mới tên là DiChuyen.txt. Nhấp chuột phải vào tệp DiChuyen.txt -> chọn Cut (hoặc chọn tệp rồi nhấn Ctrl + X). Nhấp đúp vào thư mục TaiLieu, nhấp chuột phải vào khoảng trống -> chọn Paste (hoặc nhấn Ctrl + V). Tệp gốc đã biến mất khỏi vị trí cũ và chỉ còn ở vị trí mới.', images: ['https://i.postimg.cc/NM0bPFRT/image.png', 'https://i.postimg.cc/yd55mc2k/image.png'] },
        { type: 'step', heading: 'Xóa tệp tin', text: 'Trong thư mục TaiLieu, nhấp chuột phải vào tệp GhiChuQuanTrong.txt -> chọn Delete. Tệp sẽ được chuyển vào Thùng rác (Recycle Bin).', images: ['https://i.postimg.cc/TP1CthVp/image.png'] },
        { type: 'step', heading: 'Xóa vĩnh viễn', text: 'Chọn tệp DiChuyen.txt, nhấn giữ phím Shift và nhấn phím Delete. Một cảnh báo sẽ hiện ra. Nếu đồng ý, tệp sẽ bị xóa vĩnh viễn mà không qua Thùng rác.', images: ['https://i.postimg.cc/G3FJJvWf/image.png'] },
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
        { type: 'text_list', heading: 'Đề tài, phạm vi tìm kiếm', items: [ { label: 'Đề tài', value: 'Mạch khuếch đại vi sai' }, { label: 'Phạm vi tìm kiếm', value: 'Cấu trúc vi mạch CMOS' } ], images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'] },
        { type: 'text_list', heading: 'Tìm kiếm', items: [ { label: 'Cơ sở dữ liệu học thuật', value: 'Compact Two-Stage CMOS Operational Amplifier with Enhanced Gain and Bandwidth via Cascode and Negative Capacitance Techniques (Google Scholar)' }, { label: 'Tạp chí khoa học chuyên ngành', value: 'A Design Methodology for RF/mmWave LNAs in 22 nm FD-SOI with Cross-Coupling-Aware Nested Inductors and On-Chip Baluns' }, { label: 'Sách chuyên khảo', value: 'Design of Analog CMOS Integrated Circuits - Behzad Razavi' }, { label: 'Nguồn mở Internet', value: 'Design of OP-AMP using CMOS technology & its application (ieeexplore.ieee.org/document/7755384)' }, { label: 'Khác', value: 'Deep reinforcement learning and Bayesian optimization based OpAmp design across the CMOS process space (ScienceDirect)' } ] },
        { type: 'table', heading: 'Đánh giá tài liệu tham khảo', headers: ['Tài liệu', 'Tác giả', 'NXB', 'Phương pháp', 'Trích dẫn'], rows: [ ['CMOS Analog Circuit Design', 'Allen, P.E.', 'Oxford', 'Quy trình thiết kế từng bước', '7000+'], ['Design of Analog CMOS ICs', 'Behzad Razavi', 'McGraw-Hill', 'Phân tích lý thuyết, mô hình hóa', '10000+'], ['A low-power low-noise CMOS amplifier', 'R.R. Harrison', 'IEEE JSSC', 'Chế tạo thực tế và đo lường', '3000+'] ] }
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
        { type: 'text_list', heading: '1. Phân tích Prompt cơ bản', items: [ { label: 'Tóm tắt tài liệu', value: 'Sử dụng prompt cơ bản để tóm tắt một tài liệu học thuật.' }, { label: 'Giải thích khái niệm', value: 'Yêu cầu AI giải thích một khái niệm phức tạp.' }, { label: 'Tạo câu hỏi', value: 'Tạo bộ câu hỏi ôn tập cho một chủ đề.' } ], images: [ 'https://i.postimg.cc/7PSmX0TX/image.png', 'https://i.postimg.cc/RC1Lwmk4/image.png', 'https://i.postimg.cc/1thDN7Mr/image.png', 'https://i.postimg.cc/tCCWPxdS/image.png', 'https://i.postimg.cc/bw4tKFXf/image.png', 'https://i.postimg.cc/1tQNzn5v/image.png' ] },
        { type: 'text_list', heading: '2. Phân tích Prompt cải tiến', items: [ { label: 'Tóm tắt tài liệu', value: 'Cải tiến độ chi tiết, ngữ cảnh và vai trò.' }, { label: 'Giải thích khái niệm', value: 'Ràng buộc thêm các định dạng và phân loại thông tin.' }, { label: 'Tạo câu hỏi', value: 'Áp dụng định dạng khắt khe để AI phân bổ đúng trọng số chú ý.' } ], images: [ 'https://i.postimg.cc/QdKBkkFM/image.png', 'https://i.postimg.cc/25p1HbvS/image.png', 'https://i.postimg.cc/Hxzjs6hq/image.png', 'https://i.postimg.cc/8kys2nWW/image.png', 'https://i.postimg.cc/GhVt28Xd/image.png', 'https://i.postimg.cc/nLtLK88P/image.png', 'https://i.postimg.cc/gJzk5v0p/image.png', 'https://i.postimg.cc/NFVs5Skw/image.png' ] },
        { type: 'text_list', heading: '3. Phân tích Prompt nâng cao', items: [ { label: 'Tóm tắt nâng cao', value: 'Cung cấp yêu cầu "phải cung cấp phần giải thích chi tiết" để kích hoạt Chain-of-Thought.' }, { label: 'Giải thích khái niệm', value: 'Yêu cầu áp dụng phương pháp First Principles (Tư duy nguyên bản) để bóc tách và đơn giản hóa các thuật ngữ.' }, { label: 'Tạo câu hỏi', value: 'Áp dụng Prompt cấu trúc theo thang đo Bloom và yêu cầu AI suy luận từng bước (Step-by-step) cho mỗi lựa chọn.' } ], images: [ 'https://i.postimg.cc/GmPRCHVc/image.png', 'https://i.postimg.cc/yxJB4n4P/image.png', 'https://i.postimg.cc/J0BwdnjC/image.png', 'https://i.postimg.cc/BZdtZPYG/image.png', 'https://i.postimg.cc/3RSgLjT5/image.png', 'https://i.postimg.cc/zBBhRLgJ/image.png', 'https://i.postimg.cc/dtd50XF5/image.png', 'https://i.postimg.cc/zvhFVL94/image.png' ] },
        { type: 'text_list', heading: '4. Tại sao Prompt cải tiến & nâng cao hiệu quả hơn?', items: [ { label: 'Giới hạn không gian dữ liệu', value: 'Khi thêm các yếu tố ngữ cảnh, vai của AI, các từ khóa, thì AI sẽ giới hạn không gian dữ liệu (latent space) vào một cụm từ vựng cụ thể, giúp tự động điều chỉnh độ phức tạp của ngôn từ.' }, { label: 'Cơ chế tự chú ý', value: 'Khi prompt yêu cầu một định dạng khắt khe, AI buộc phải phân bổ trọng số chú ý để phân loại thông tin theo đúng yêu cầu, giúp hệ thống hóa thông tin.' }, { label: 'Kỹ thuật Chain-of-Thought', value: 'Việc ép AI giải thích chi tiết sẽ tạo ra các token trung gian để diễn giải logic trước khi kết luận, giúp câu trả lời mang tính chính xác tuyệt đối.' } ] },
        { type: 'text_list', heading: '5. Khung nguyên tắc cốt lõi: C.R.E.A.T.E Framework', items: [ { label: 'C - Character (Gán vai trò)', value: 'Luôn xác định tư cách chuyên môn cho AI.' }, { label: 'R - Request (Yêu cầu cốt lõi)', value: 'Nhiệm vụ cần phải rõ ràng, tránh đa nghĩa.' }, { label: 'E - Explanation (Giải thích bối cảnh)', value: 'Cho AI biết đầu ra sẽ được dùng để làm gì và cho ai.' }, { label: 'A - Adjustments (Ràng buộc)', value: 'Đưa ra các giới hạn về độ dài, ngôn từ hoặc những điều cấm kỵ.' }, { label: 'T - Type of Output (Định dạng đầu ra)', value: 'Chỉ định hình thức trình bày.' }, { label: 'E - Extras (Thông tin bổ sung)', value: 'Cung cấp tư duy mẫu (Few-shot) hoặc yêu cầu suy luận (Chain-of-thought).' } ] },
        { type: 'step', heading: '6. Tư duy "Người giao việc - Thực tập sinh"', text: 'Hãy xem AI như một thực tập sinh xuất sắc nhưng không biết đọc suy nghĩ. Bạn giao việc càng chi tiết, có tiêu chí đánh giá rõ ràng, "thực tập sinh" AI càng trả về kết quả hoàn hảo ở ngay lần thử đầu tiên. Hơn nữa, hãy dùng kỹ thuật "Chia để trị": Đối với các vấn đề quá phức tạp, đừng gom tất cả vào một prompt. Hãy yêu cầu AI lập dàn ý trước, sau đó dùng các prompt tiếp theo để phát triển từng phần.', images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'] }
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
        { type: 'text_list', heading: 'Thông tin cá nhân', items: [ { label: 'Họ và tên', value: 'Nguyễn Minh Đạo' }, { label: 'Mã sinh viên', value: '25022158' }, { label: 'Nhóm', value: '17' } ] },
        { type: 'text_list', heading: 'I. Lựa chọn công cụ', items: [ { label: 'Quản lý dự án', value: 'Microsoft Planner - Trực quan hóa khối lượng công việc, theo dõi tiến độ và quản lý thời hạn (deadline) của từng cá nhân.' }, { label: 'Giao tiếp nhóm', value: 'Messenger - Đảm bảo thông tin được xuyên suốt, hỗ trợ thảo luận nhanh chóng và giải quyết các vấn đề phát sinh tức thời.' }, { label: 'Lưu trữ và chia sẻ tệp', value: 'Google Drive - Xây dựng kho lưu trữ tài nguyên chung với cấu trúc khoa học, bảo mật và dễ dàng tìm kiếm.' }, { label: 'Soạn thảo tài liệu cộng tác', value: 'Google Docs - Hỗ trợ nhiều người cùng biên tập, chỉnh sửa văn bản theo thời gian thực mà không làm gián đoạn tiến trình.' } ] },
        { type: 'step', heading: 'II. Trải nghiệm sử dụng công cụ trực tuyến', content: [ { text: 'Ngay từ giai đoạn khởi động dự án, tôi đã tham gia thiết lập không gian làm việc trên Microsoft Planner. Thay vì chỉ liệt kê công việc một cách đơn thuần, tôi đã áp dụng phương pháp Kanban, chia dự án thành các nhóm công việc cụ thể như: To-do, Doing, và Done.', images: [ 'https://i.postimg.cc/LXWhGN0F/image.png', 'https://i.postimg.cc/J795kq4W/image.png' ] }, { text: 'Nhận thức được tầm quan trọng của việc quản lý dữ liệu, tôi đã chủ động đề xuất và thiết lập hệ thống lưu trữ trên Google Drive. Tôi đã tạo ra một cấu trúc thư mục với nhiều cấp độ để tránh tình trạng lộn xộn khi số lượng tệp tin tăng lên.' }, { text: 'Đặc biệt, các tệp tin được tải lên đều tuân thủ quy tắc đặt tên thống nhất: Tên Dự Án_Tên Người Làm_Tên Tài Liệu. Để bảo vệ dữ liệu nhưng vẫn đảm bảo sự phối hợp, tôi đã thiết lập quyền truy cập: cấp quyền "Người chỉnh sửa" cho các thành viên nhóm và "Người xem" cho các đối tượng khác.', images: [ 'https://i.postimg.cc/tJhZPF2G/image.png', 'https://i.postimg.cc/HkWcccMZ/image.png', 'https://i.postimg.cc/vmkcN0NJ/image.png', 'https://i.postimg.cc/8cVs1jDZ/image.png' ] }, { text: 'Tôi không chỉ viết phần kịch bản được giao mà còn theo dõi và góp ý cho các thành viên khác. Tôi đã tận dụng tính năng "Nhận xét" để highlight các đoạn cần chỉnh sửa và tag thành viên để họ nhận được thông báo ngay lập tức.', images: [ 'https://i.postimg.cc/qv7qMfVB/image.png', 'https://i.postimg.cc/vmgmfWZv/image.png' ] }, { text: 'Messenger được chọn làm không gian giao tiếp chính nhờ tính phổ biến. Tôi đã tham gia thảo luận cực kỳ sôi nổi, đóng góp ý kiến (hơn 10 lượt/tuần). Tôi chủ động gửi các liên kết (link) tài liệu từ Google Drive, nhắc nhở deadline từ Planner, và sẵn sàng hỗ trợ khi thành viên khác gặp khó khăn.', images: [ 'https://i.postimg.cc/y6X8m67B/image.png', 'https://i.postimg.cc/dt5QfWkK/image.png', 'https://i.postimg.cc/qRHpKSYc/image.png' ] } ] },
        { type: 'text_list', heading: 'III. Thách thức và Giải pháp tương tác nhóm', items: [ { label: 'Thách thức 1: Trôi tin nhắn trên Messenger', value: 'Vấn đề: Các tin nhắn quan trọng như link Drive, file báo cáo dễ bị trôi đi. Khi một thành viên cần tìm lại tài liệu để làm việc, họ phải lướt lại lịch sử tin nhắn hoặc liên tục hỏi lại vào trong nhóm, mất nhiều thời gian và công sức.\nGiải pháp: Tôi sử dụng tính năng “Ghim tin nhắn" cho những thông báo, tin nhắn quan trọng. Ngoài ra, ngay từ đầu tôi đã quy định không nhắn linh tinh vào trong nhóm chat.' }, { label: 'Thách thức 2: Quản lý tập tin không hiệu quả', value: 'Vấn đề: Ban đầu, nhóm đưa lên rất nhiều file tài liệu với việc đặt tên lộn xộn kiểu "Tài liệu không có tiêu đề", "Tài liệu không có tiêu đề (1)", "tonghop", gây bối rối không biết đâu là file chuẩn nhất để làm tiếp.\nGiải pháp cá nhân áp dụng: Tôi bảo mọi người đặt tên file theo quy tắc cố định: Đặt tên file theo cú pháp “Tên nhóm_Tên người làm_Tên file”, nếu là bản chỉnh sửa thì thêm phiên bản.' } ] }
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
        { type: 'text_list', heading: '1. Tổng quan dự án', items: [ { label: 'Người thực hiện', value: 'Nguyễn Minh Đạo - 25022158' }, { label: 'Tên dự án', value: 'Bài viết công thức nấu món Gà Rán Giòn Tại Nhà' }, { label: 'Nguồn gốc', value: 'Công thức của Chef Joshua Weissman - dịch & tích hợp sang tiếng Việt' }, { label: 'Công cụ AI', value: 'Claude, Gemini, Canva AI' } ], images: [ 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200' ] },
        { type: 'step', heading: '2. Giới thiệu dự án & Mục tiêu', content: [ {text: 'Dự án này là một bài viết hướng dẫn nấu ăn hoàn chỉnh về món Gà Rán Giòn Tại Nhà, được xây dựng dựa trên công thức gốc của Chef Joshua Weissman (joshuaweissman.com). Mục tiêu của dự án không chỉ là dịch thuật đơn thuần, mà là tạo ra một bài viết hoàn chỉnh bằng tiếng Việt, có giọng văn gần gũi, dễ hiểu với người đọc Việt Nam, đồng thời bổ sung mẹo thực tế từ trải nghiệm cá nhân.'}, { text: 'Để hoàn thiện sản phẩm, ba nhóm công cụ AI đã được sử dụng kết hợp: (1) Claude cho việc dịch thuật, tinh chỉnh văn phong và cấu trúc bài viết; (2) Gemini của Google cho việc sáng tạo tiêu đề và mô tả hấp dẫn; (3) Canva AI cho việc thiết kế hình ảnh minh họa phù hợp với nội dung ẩm thực.' } ] },
        { type: 'step', heading: '3. Nguyên liệu', content: [ {text: 'Phần gà và nước ướp:'}, {text: '                  1 con gà nguyên con (khoảng 1,5 – 2 kg) – hoặc thay bằng 1 kg đùi/cánh gà tùy sở thích'}, {text: '                  480 ml sữa buttermilk (hoặc thay bằng sữa tươi + 1 muỗng canh giấm, để 10 phút)'}, {text: '                  2 muỗng canh muối hạt (kosher salt hoặc muối biển)'}, {text: '                  1 muỗng cà phê đường'}, {text: '                  1,5 muỗng cà phê bột ngọt (MSG) – tùy chọn, giúp tăng umami'}, {text: '                  1 muỗng canh bột tỏi'}, {text: '                  2 muỗng cà phê ớt paprika xông khói (smoked paprika)'}, {text: '                  1 muỗng cà phê bột ớt cayenne'}, {text: 'Phần áo bột và chiên:'}, {text: '                  3,3 lít dầu thực vật hoặc dầu hướng dương (để chiên ngập)'}, {text: '                  375 g bột mì đa dụng'}, {text: '                  60 g bột khoai tây hoặc bột bắp (giúp lớp vỏ giòn hơn)'}, {text: '                  1 muỗng canh muối hạt'}, {text: '                  1 muỗng cà phê bột ngọt'}, {text: '                  1 muỗng cà phê bột ớt cayenne'}, {text: '                  1 muỗng cà phê bột tỏi'}, {text: '                  ½ muỗng cà phê bột hành tây'}, {text: '                   2 muỗng cà phê tiêu đen xay thô'}, {text: '                   1 muỗng cà phê lá oregano sấy khô'}, { images: [ 'https://i.postimg.cc/WzHW0x8p/image.png' ] } ] },
        { type: 'step', heading: '4. Sơ chế gà', content: [ { text: 'Đặt gà ngửa, dùng dao nhỏ sắc rạch qua phần da nối giữa đùi và ngực. Lật gà lại, bẻ phần đùi ra phía sau cho đến khi khớp bật ra. Cắt theo đường mỡ để tách rời đùi gà. Tiếp tục bẻ và cắt để tách đùi ra thành phần đùi trên (thigh) và chân (drumstick).' }, { text: 'Tách cánh gà tương tự: kéo cánh ra, bẻ cho khớp bật, rồi cắt theo đường mỡ để tách hoàn toàn.' }, { text: 'Dùng dao chặt lấy ức gà: lấy xương sống ra trước, sau đó lách dao dọc theo xương ức để tách từng miếng ức. Phần xương cốt có thể dùng để nấu nước dùng.' }, { text: 'Pha hỗn hợp nước ướp: trộn đều buttermilk, muối, đường, bột ngọt (nếu dùng), bột tỏi, paprika và cayenne trong một tô lớn. Ngâm gà vào, đảm bảo nước ướp thấm cả dưới da. Bọc kín và để tủ lạnh ít nhất 1 giờ, tốt nhất là qua đêm (tối đa 2 ngày).' } ] },
        { type: 'step', heading: '5. Tẩm bột', content: [ { text: 'Trộn đều bột mì, bột khoai tây, muối, bột ngọt, cayenne, bột tỏi, bột hành, tiêu và oregano trong một tô lớn.' }, { text: 'Lấy gà ra khỏi nước ướp, để ráo trên vỉ. Múc ⅓ chén hỗn hợp bột vào nước ướp còn lại, khuấy đều. Nhúng tay vào nước ướp đặc này, vảy từng chút nhỏ vào bột khô rồi trộn đều – lặp lại 2 lần nữa để tạo ra những mảnh bột vụn nhỏ (đây là bí quyết tạo lớp vỏ sần sùi giòn rụm!).' }, { text: 'Nhúng từng miếng gà vào nước ướp đặc, rồi lăn qua hỗn hợp bột, ấn nhẹ để bột bám đều, kể cả dưới da. Để riêng trên khay.' } ] },
        { type: 'step', heading: '6. Chiên gà', content: [ { text: 'Đun dầu trong nồi đáy dày (khoảng 7 lít) đến 177°C (350°F). Nên chia chiên thành 2–3 mẻ để dầu không bị nguội đột ngột.' }, { text: 'Chiên gà từng mẻ, không để nồi quá chật. Mảnh nhỏ (cánh, chân): 10–15 phút; mảnh lớn (đùi, ức): 15–20 phút. Duy trì nhiệt độ dầu 163–177°C. Gà chín khi có màu vàng nâu đẹp và nhiệt kế cắm vào phần dày nhất đọc 74°C (165°F).' }, { text: 'Vớt gà ra để ráo trên vỉ, đặt trên khay giấy thấm dầu. Để nguội 2–3 phút rồi dùng ngay.' } ] },
        { type: 'step', heading: '7. Mẹo hay từ đầu bếp', text: 'Bí quyết tạo lớp vỏ sần sùi giòn rụm: Múc vài muỗng nước ướp đặc vào hỗn hợp bột khô, vảy và trộn đều để tạo ra những mảnh bột vụn nhỏ trước khi lăn gà. Ngoài ra, đừng bỏ qua "oyster meat" - phần ngon nhất của con gà!' }
      ]
    },
    { 
      id: 6, 
      title: 'Phân tích Chính sách của Trường Đại học Công nghệ (UET) về sử dụng AI', 
      category: 'Nghiên cứu Chính sách',
      icon: Landmark,
      color: 'text-emerald-400',
      img: 'https://www.pymnts.com/wp-content/uploads/2023/08/AI-regulation.jpg', 
      desc: 'Khảo sát và phân tích chính sách của Trường Đại học Công nghệ về liêm chính học thuật và ứng dụng AI.',
      content: [
        { type: 'step', heading: '1. Tổng quan chính sách hiện hành tại UET', text: 'Trường Đại học Công nghệ (UET) hiện chưa ban hành văn bản chính sách riêng về AI. Tuy nhiên, nhà trường điều chỉnh qua Quy chế đào tạo của ĐHQGHN, quy định rõ hành vi vi phạm liêm chính học thuật (sao chép, gian lận). Hướng dẫn của Bộ GD&ĐT (5/2026) cũng nhấn mạnh việc ứng dụng AI một cách minh bạch và trung thực.', images: [ 'https://trangedu.com/wp-content/uploads/2023/01/truong-dai-hoc-cong-nghe-dhqghn-tuyen-sinh.jpg.webp' ] },
        { type: 'text_list', heading: '2. Quan điểm và đánh giá', items: [ { label: 'Vai trò cốt lõi', value: 'Tư duy con người vẫn là cốt lõi. AI chỉ là công cụ hỗ trợ xử lý dữ liệu thô, phát hiện lỗi và đưa ra kết luận vẫn thuộc về người dùng.' }, { label: 'Chính sách rõ ràng', value: 'Cần thiết lập chính sách rõ ràng để tránh gây bất an cho sinh viên. UET cần cụ thể hóa hướng dẫn cho từng môn học.' }, { label: 'Trách nhiệm cá nhân', value: 'Dù chính sách ra sao, người quyết định sử dụng AI có đạo đức hay không vẫn là sinh viên. Cần cam kết với sự trung thực học thuật.' } ], images: [ 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200' ] },
        { type: 'step', heading: 'IV. BỘ NGUYÊN TẮC CÁ NHÂN VỀ SỬ DỤNG AI CÓ TRÁCH NHIỆM TRONG HỌC TẬP', text: 'Dựa trên phân tích chính sách, trải nghiệm thực tế và phân tích đạo đức trên, tôi xây dựng bộ 6 nguyên tắc cá nhân về sử dụng AI có trách nhiệm trong học tập và nghiên cứu:' },
        { type: 'table', heading: 'Chi tiết 6 nguyên tắc', headers: ['#', 'Nguyên tắc', 'Áp dụng cụ thể'], rows: [ ['1', 'Tự đọc trước, AI hỗ trợ sau', 'Trước khi dùng AI tóm tắt hay phân tích tài liệu, luôn đọc ít nhất phần abstract và kết luận của tài liệu gốc. Điều này đảm bảo tôi hiểu ngữ cảnh và có thể phát hiện lỗi sai của AI.'], ['2', 'Luôn kiểm chứng số liệu và trích dẫn', 'Mọi số liệu, tên tác giả, năm xuất bản, và tuyên bố thực tế từ đầu ra AI đều phải được đối chiếu với nguồn gốc trước khi đưa vào bài nộp. Không tin tuyệt đối vào đầu ra của AI.'], ['3', 'Khai báo minh bạch và đầy đủ', 'Luôn ghi chú rõ ràng công cụ AI đã dùng, mục đích sử dụng và phần nội dung AI đóng góp. Thực hiện ngay cả khi quy định môn học không bắt buộc – đây là hành động thể hiện sự trung thực học thuật.'], ['4', 'Giữ quá trình tư duy cốt lõi cho bản thân', 'Các bước đòi hỏi tư duy phân tích cao – như xác định luận điểm chính, đánh giá tính logic của lập luận, đưa ra kết luận – luôn tự thực hiện. Dùng AI cho các bước hỗ trợ như tìm kiếm, định dạng, và kiểm tra diễn đạt.'], ['5', 'Đảm bảo kết quả phản ánh đúng năng lực thực tế', 'Trước khi nộp bài có dùng AI, tự hỏi: "Nếu giảng viên hỏi tôi về bất kỳ nội dung nào trong bài, tôi có thể giải thích và bảo vệ không?" Nếu không, cần học lại phần đó trước khi nộp.'], ['6', 'Tôn trọng giới hạn của từng môn học và ngữ cảnh', 'Đọc kỹ quy định của từng môn về AI trước khi bắt đầu bài tập. Trong trường hợp không rõ ràng, chủ động hỏi giảng viên thay vì tự ý diễn giải theo hướng có lợi cho mình.'] ] },
        { type: 'step', heading: '4.1. Liên kết giữa nguyên tắc và phân tích đạo đức', text: 'Sáu nguyên tắc trên được xây dựng để trực tiếp giải quyết ba vấn đề đạo đức đã phân tích: Nguyên tắc 3 và 6 giải quyết ranh giới hỗ trợ/gian lận; Nguyên tắc 1 và 2 giải quyết vấn đề quyền sở hữu trí tuệ và độ chính xác; Nguyên tắc 4 và 5 bảo vệ quá trình học tập và phát triển kỹ năng thực sự.' }
      ]
    }
  ];

  const filteredSearchItems = () => {
    if (!searchQuery) return [];
    
    const items = [
      { id: 'about', title: 'Về tôi / Giới thiệu bản thân', category: 'Trang' },
      { id: 'home', title: 'Xem toàn bộ Dự án của tôi', category: 'Trang' },
      { id: 'summary', title: 'Báo cáo Tổng kết & Kỹ năng số', category: 'Trang' }
    ];

    gridProjects.forEach(proj => {
      items.push({
        id: `project_${proj.id}`,
        title: proj.title,
        category: `Dự án - ${proj.category}`,
        rawProj: proj
      });
    });

    return items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleSearchSelect = (item) => {
    if (item.id.startsWith('project_')) {
      setSelectedProject(item.rawProj);
      setActiveTab('project_detail');
    } else {
      setActiveTab(item.id);
      setSelectedProject(null);
    }
    setSpotlightOpen(false);
    setSearchQuery('');
  };

  const openProject = (proj) => {
    setSelectedProject(proj);
    setActiveTab('project_detail');
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveTab('home');
  };

  const textMainClass = isDarkMode ? 'text-white' : 'text-neutral-950';
  const textBodyClass = isDarkMode ? 'text-neutral-300' : 'text-neutral-700';
  const borderLightClass = isDarkMode ? 'border-white/5' : 'border-black/5';
  const borderPillClass = isDarkMode ? 'border-white/10 bg-black/50' : 'border-black/10 bg-neutral-100';

  const renderContentBlock = (block, i) => {
    switch (block.type) {
      case 'step':
        return (
          <div key={i} className={`space-y-4 border-b pb-10 last:border-0 ${borderLightClass}`}>
            <h3 className={`text-2xl font-bold flex items-center gap-3 ${textMainClass}`}>
               <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                 {i + 1}
               </span>
               {block.heading}
            </h3>
            {block.text && <p className={`leading-relaxed text-lg ml-11 ${textBodyClass}`}>{block.text}</p>}
            {block.images && block.images.map((img, imgIdx) => (
              <div key={imgIdx} className={`ml-11 rounded-xl overflow-hidden border mt-4 shadow-lg ${borderPillClass}`}>
                <img src={img} alt={block.heading} className="w-full object-contain max-h-[500px]" />
              </div>
            ))}
            {block.content && block.content.map((subItem, subIdx) => (
              <div key={subIdx} className="space-y-4 mt-4">
                {subItem.text && <p className={`leading-relaxed text-lg ml-11 ${textBodyClass}`}>{subItem.text}</p>}
                {subItem.images && subItem.images.map((img, imgIdx) => (
                  <div key={`sub-img-${imgIdx}`} className={`ml-11 rounded-xl overflow-hidden border mt-4 shadow-lg ${borderPillClass}`}>
                    <img src={img} alt={`${block.heading} phần ${subIdx + 1}`} className="w-full object-contain max-h-[500px]" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      
      case 'text_list':
        return (
          <div key={i} className={`space-y-4 border-b pb-10 last:border-0 ${borderLightClass}`}>
            <h3 className={`text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4 ${textMainClass}`}>{block.heading}</h3>
            <ul className="space-y-4 ml-4">
              {block.items.map((item, idx) => (
                <li key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-lg">
                  <span className={`font-medium shrink-0 sm:w-1/3 md:w-1/4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.label}:</span>
                  <span className={`leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>{item.value}</span>
                </li>
              ))}
            </ul>
            {block.images && block.images.map((img, imgIdx) => (
              <div key={imgIdx} className={`rounded-xl overflow-hidden border mt-6 shadow-lg ${borderPillClass}`}>
                <img src={img} alt={block.heading} className="w-full object-contain max-h-[500px]" />
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div key={i} className={`space-y-4 border-b pb-10 last:border-0 ${borderLightClass}`}>
            <h3 className={`text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-4 ${textMainClass}`}>{block.heading}</h3>
            <div className={`overflow-x-auto rounded-xl border shadow-lg mac-scrollbar ${isDarkMode ? 'border-white/10 bg-black/40' : 'border-black/10 bg-neutral-50'}`}>
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className={`font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'bg-white/5 text-neutral-300' : 'bg-neutral-200/50 text-neutral-700'}`}>
                  <tr>
                    {block.headers.map((th, idx) => (
                      <th key={idx} className={`p-4 border-b whitespace-nowrap ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`text-[13px] ${isDarkMode ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  {block.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={`border-b transition-colors ${isDarkMode ? 'hover:bg-white/5 border-white/5 last:border-0' : 'hover:bg-black/5 border-black/5 last:border-0'}`}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`p-4 align-top leading-relaxed ${cIdx === 0 ? 'font-medium text-blue-500 dark:text-blue-300' : ''}`}>
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

  const NavItem = ({ id, label, icon: Icon }) => {
    const isActive = activeTab === id || (id === 'home' && activeTab === 'project_detail');
    return (
      <button 
        onClick={() => {
          setActiveTab(id);
          if (id !== 'home') setSelectedProject(null);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg' 
            : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200 border border-transparent'
        }`}
      >
        <Icon size={18} />
        <span className="font-medium text-sm hidden sm:block">{label}</span>
      </button>
    );
  };

  // Adaptive background depending on theme
  const bgImage = isDarkMode 
    ? "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')"
    : "url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2564&auto=format&fit=crop')";

  return (
    <div 
      className={`min-h-screen font-sans overflow-hidden flex flex-col selection:bg-blue-500/30 relative transition-all duration-700 ${
        isDarkMode ? 'bg-black text-neutral-200 dark-theme' : 'bg-neutral-100 text-neutral-800 light-theme'
      }`}
      style={{
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `brightness(${brightness}%)`
      }}
    >
      <div className={`absolute inset-0 bg-black/20 z-0 pointer-events-none transition-opacity ${isDarkMode ? 'opacity-40' : 'opacity-10'}`} />
      <style>{globalStyles}</style>

      {/* TOP MENU BAR */}
      <div className={`h-7 w-full border-b flex items-center justify-between px-4 text-[13px] font-medium z-50 relative select-none ${
        isDarkMode ? 'bg-neutral-900/80 border-white/10 text-neutral-300' : 'bg-white/80 border-black/10 text-neutral-700'
      } backdrop-blur-md`}>
        <div className="flex items-center space-x-4 cursor-default">
          <button 
            onClick={() => setAboutMacOpen(true)}
            className="focus:outline-none focus:bg-white/15 p-1 rounded transition-colors"
          >
            <AppleLogo className="hover:text-white transition-colors" />
          </button>
          <span className="font-bold">{activeTab === 'home' || activeTab === 'project_detail' ? 'Dự án' : activeTab === 'about' ? 'Giới thiệu' : 'Tổng kết'}</span>
          
          {/* Spotlight Launcher Option in Menu */}
          <button 
            onClick={() => setSpotlightOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1.5 px-1.5 py-0.5 rounded text-xs text-neutral-400 bg-white/5 border border-white/10"
          >
            <Search size={10} />
            <span className="hidden sm:inline">Tìm kiếm</span>
            <kbd className="hidden md:inline text-[9px] bg-white/10 px-1 rounded">⌘K</kbd>
          </button>
        </div>

        <div className="flex items-center space-x-4 cursor-default">
          {/* Control Center Trigger */}
          <button 
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className={`flex items-center gap-2 p-1 rounded-md hover:bg-white/10 transition-all ${controlCenterOpen ? 'bg-white/10' : ''}`}
          >
            <Wifi size={14} className={wifiOn ? 'text-blue-400' : 'text-neutral-500'} />
            <Battery size={14} />
            <Sliders size={14} />
          </button>
          
          <div className="hidden sm:flex items-center gap-1">
            <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' })}</span>
            <span>{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* SPOTLIGHT SEARCH (CMD+K) MODAL */}
      {spotlightOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
          <div className="absolute inset-0" onClick={() => setSpotlightOpen(false)} />
          <div className="relative w-full max-w-2xl bg-neutral-900/90 border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden animate-window-open text-white">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Search className="text-neutral-400" size={20} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Tìm trang, dự án hoặc báo cáo... (ví dụ: Prompt, Gà Rán)"
                className="w-full bg-transparent border-none outline-none text-lg text-white placeholder-neutral-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-neutral-400">ESC</span>
            </div>

            {/* Results */}
            <div className="mt-3 max-h-72 overflow-y-auto mac-scrollbar">
              {searchQuery ? (
                filteredSearchItems().length > 0 ? (
                  <div className="space-y-1">
                    {filteredSearchItems().map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchSelect(item)}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-between group"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-neutral-200 group-hover:text-white">{item.title}</span>
                          <span className="text-xs text-neutral-500 group-hover:text-blue-200">{item.category}</span>
                        </div>
                        <ChevronRight size={14} className="text-neutral-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-neutral-500 text-sm">
                    Không tìm thấy nội dung phù hợp. Thử từ khóa khác!
                  </div>
                )
              ) : (
                <div className="p-4 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Gợi ý tìm kiếm nhanh</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button onClick={() => { setActiveTab('about'); setSpotlightOpen(false); }} className="p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-left">👋 Về tôi</button>
                    <button onClick={() => { setActiveTab('home'); setSpotlightOpen(false); }} className="p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-left">📁 Các bài thực hành</button>
                    <button onClick={() => { setSelectedProject(gridProjects[2]); setActiveTab('project_detail'); setSpotlightOpen(false); }} className="p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-left">⚡ Prompt Engineering</button>
                    <button onClick={() => { setSelectedProject(gridProjects[3]); setActiveTab('project_detail'); setSpotlightOpen(false); }} className="p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 text-left">🤝 Kỹ năng làm việc nhóm</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT THIS MAC (Apple System Info) MODAL */}
      {aboutMacOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center">
          <div className="absolute inset-0" onClick={() => setAboutMacOpen(false)} />
          <div className="relative w-full max-w-sm bg-neutral-900/95 border border-white/15 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 overflow-hidden animate-window-open text-white text-center">
            
            {/* Header / Control Bar */}
            <div className="absolute top-3 left-3">
              <button 
                onClick={() => setAboutMacOpen(false)} 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-red-900 font-bold text-[8px]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 mt-2">
              <AppleLogo className="text-white w-14 h-14" />
              <div>
                <h3 className="text-lg font-bold">UET Sequoia</h3>
                <span className="text-[11px] text-neutral-400 font-mono">Phiên bản 15.0 (Cá nhân hóa)</span>
              </div>

              {/* Hardware / Student Info Table */}
              <div className="w-full border-t border-white/10 pt-4 text-xs space-y-2.5 text-left max-w-[280px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Tên Chủ Sở Hữu</span>
                  <span className="font-mono">Nguyễn Minh Đạo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Mã Sinh Viên</span>
                  <span className="font-mono text-blue-400">25022158</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Phân Khúc/Ngành</span>
                  <span className="font-mono">Điện tử - Viễn thông</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Đại học</span>
                  <span className="font-mono">UET - ĐHQGHN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-semibold">Serial Number</span>
                  <span className="font-mono text-emerald-400">CLASS_17_SEC_UET</span>
                </div>
              </div>

              <button 
                onClick={() => setAboutMacOpen(false)}
                className="mt-4 px-4 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-xs rounded-full"
              >
                Đóng thông tin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTROL CENTER DROPDOWN */}
      {controlCenterOpen && (
        <div className="absolute top-8 right-4 z-50 w-80 bg-neutral-950/90 border border-white/15 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] p-4 text-white animate-window-open select-none">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Wifi Toggle */}
            <button 
              onClick={() => setWifiOn(!wifiOn)} 
              className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${wifiOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <Wifi size={18} />
              <div className="text-left">
                <p className="text-xs font-semibold">Wi-Fi</p>
                <p className="text-[10px] opacity-75">{wifiOn ? 'Đang bật' : 'Đã tắt'}</p>
              </div>
            </button>

            {/* Bluetooth Toggle */}
            <button 
              onClick={() => setBluetoothOn(!bluetoothOn)} 
              className={`p-3 rounded-xl flex items-center gap-3 transition-colors ${bluetoothOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <Cpu size={18} />
              <div className="text-left">
                <p className="text-xs font-semibold">Thiết bị</p>
                <p className="text-[10px] opacity-75">{bluetoothOn ? 'Hoạt động' : 'Tạm dừng'}</p>
              </div>
            </button>
          </div>

          {/* Slider Controls */}
          <div className="space-y-3 border-t border-white/10 pt-3">
            {/* Screen Brightness Slider */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Độ sáng màn hình</span>
                <span className="font-mono">{brightness}%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                <Sun size={14} className="text-yellow-400" />
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={brightness} 
                  onChange={(e) => setBrightness(e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Volume Slider */}
            <div>
              <div className="flex justify-between text-xs text-neutral-400 mb-1">
                <span>Âm lượng ảo</span>
                <span className="font-mono">{volume}%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                <Volume2 size={14} className="text-blue-400" />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-xs">
            <span className="text-neutral-400">Giao diện hệ thống</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/5"
            >
              {isDarkMode ? <Sun size={12} className="text-yellow-400" /> : <Moon size={12} className="text-indigo-400" />}
              <span>{isDarkMode ? 'Sáng' : 'Tối'}</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 z-0">
        
        {/* WINDOW CONTAINER */}
        {windowState !== 'closed' && (
          <div 
            className={`relative z-10 w-full max-w-7xl h-[85vh] backdrop-blur-[50px] rounded-xl flex flex-col overflow-hidden transition-all duration-700 border shadow-2xl ${
              windowState === 'minimized' ? 'opacity-0 scale-50 translate-y-[200px] pointer-events-none' : 'opacity-100 scale-100'
            } ${
              isDarkMode 
                ? 'bg-gradient-to-br from-neutral-900/70 to-black/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)]' 
                : 'bg-gradient-to-br from-white/80 to-neutral-50/90 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.8)]'
            }`}
          >
            
            {/* WINDOW HEADER (Traffic Lights & Controls) */}
            <div className={`h-12 w-full border-b flex items-center px-4 justify-between shrink-0 transition-all duration-500 ${
              isDarkMode ? 'bg-black/30 border-white/10' : 'bg-white/35 border-black/10'
            }`}>
              <div className="flex space-x-2 w-1/4 sm:w-1/3">
                {/* Traffic buttons actually interactive */}
                <button 
                  onClick={() => setWindowState('closed')}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center group focus:outline-none"
                  title="Đóng ứng dụng"
                >
                  <X size={8} className="text-black/0 group-hover:text-black/80 transition-colors" />
                </button>
                <button 
                  onClick={() => setWindowState('minimized')}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer flex items-center justify-center group focus:outline-none"
                  title="Thu nhỏ vào Dock"
                >
                  <Minus size={8} className="text-black/0 group-hover:text-black/80 transition-colors" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen().catch(() => {});
                    } else {
                      document.exitFullscreen();
                    }
                  }}
                  className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer flex items-center justify-center group focus:outline-none"
                  title="Chế độ toàn màn hình"
                >
                  <Maximize2 size={8} className="text-black/0 group-hover:text-black/80 transition-colors" />
                </button>
              </div>

              <div className={`w-2/4 sm:w-1/3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden transition-colors duration-500 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <LayoutTemplate size={14} className="shrink-0" /> 
                <span className="truncate">Cá nhân hóa Portfolio</span>
              </div>

              <div className="flex w-1/4 sm:w-1/3 justify-end">
                {activeTab === 'project_detail' && (
                  <button 
                    onClick={closeProject}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
                      isDarkMode 
                        ? 'bg-white/10 hover:bg-white/20 border-white/5 text-white' 
                        : 'bg-black/5 hover:bg-black/10 border-black/5 text-neutral-800'
                    }`}
                  >
                    <ArrowLeft size={12} /> Quay lại
                  </button>
                )}
              </div>
            </div>

            {/* MAIN LAYOUT (SIDEBAR + CONTENT) */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* SIDEBAR NAVIGATION */}
              <div className={`w-16 sm:w-56 border-r flex flex-col items-center sm:items-start px-2 sm:px-4 py-6 gap-3 shrink-0 transition-colors duration-500 ${
                isDarkMode ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white/20'
              }`}>
                 <NavItem id="about" label="Giới thiệu" icon={User} />
                 <NavItem id="home" label="Dự án của tôi" icon={Folder} />
                 <NavItem id="summary" label="Tổng kết" icon={Award} />
              </div>

              {/* CONTENT AREA */}
              <div className="flex-1 overflow-y-auto mac-scrollbar relative">
                
                {/* TRANG GIỚI THIỆU */}
                {activeTab === 'about' && (
                  <div className="p-8 md:p-12 space-y-10 max-w-4xl mx-auto animate-scroll">
                    <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 mt-2 pb-10 border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <div className={`w-40 h-40 rounded-full mb-3 shrink-0 overflow-hidden border-2 flex items-center justify-center transition-all duration-500 ${
                        isDarkMode 
                          ? 'border-[#ff00ff] shadow-[0_0_15px_#ff00ff,0_0_30px_rgba(255,0,255,0.6)] bg-black/40' 
                          : 'border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.4)] bg-neutral-100'
                      }`}>
                          <img 
                              src="https://i.postimg.cc/Mpsf6x9B/bo-mau-be.png" 
                              alt="Avatar"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.outerHTML = `<span class="text-3xl font-bold ${textMainClass}">NMD</span>`;
                              }}
                            />
                      </div>
                      <div className="space-y-4 text-center md:text-left overflow-hidden">
                        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis ${textMainClass}`}>
                          <AnimatedText text="Nguyễn Minh Đạo" />
                        </h1>
                        <div className={`text-lg md:text-xl font-medium space-y-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          <p>Mã sinh viên: 25022158</p>
                          <p>Ngành: Công nghệ Kĩ thuật Điện tử - Viễn thông</p>
                        </div>
                        <p className={`pt-2 max-w-xl text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Sở thích cá nhân: Đam mê nghiên cứu các công nghệ mới, thiết kế phần cứng vi mạch, thích đọc sách về công nghệ và khoa học máy tính.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FlashlightCard isDarkMode={isDarkMode} className="h-full">
                        <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                          <Target className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} /> Định hướng phát triển
                        </h3>
                        <p className={`leading-relaxed text-lg ${textBodyClass}`}>
                          Mục tiêu học tập của tôi là nắm vững nền tảng Điện tử - Viễn thông, đồng thời cập nhật liên tục các xu hướng công nghệ mới. Định hướng tương lai là trở thành một Kỹ sư phần cứng giỏi, có khả năng tích hợp AI vào quy trình thiết kế và tối ưu hóa hệ thống vi mạch điện tử.
                        </p>
                      </FlashlightCard>

                      <FlashlightCard isDarkMode={isDarkMode} className="h-full">
                        <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                          <Globe className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} /> Mục tiêu Portfolio
                        </h3>
                        <ul className={`leading-relaxed text-lg space-y-3 list-disc list-inside ${textBodyClass}`}>
                          <li><strong>Thể hiện kỹ năng số:</strong> Số hóa toàn bộ các bài tập và dự án cá nhân một cách trực quan.</li>
                          <li><strong>Lưu trữ & Truy cập:</strong> Tạo một không gian tập trung để dễ dàng tìm kiếm, đánh giá sự tiến bộ của bản thân qua từng giai đoạn học tập.</li>
                          <li><strong>Chia sẻ kiến thức:</strong> Chia sẻ kinh nghiệm và các công cụ công nghệ đến bạn bè và cộng đồng.</li>
                        </ul>
                      </FlashlightCard>
                    </div>
                  </div>
                )}

                {/* TRANG DỰ ÁN (HOME) */}
                {activeTab === 'home' && (
                  <div className="p-8 md:p-12 space-y-10 max-w-6xl mx-auto animate-scroll">
                    <div className="space-y-6">
                      <h2 className={`text-3xl font-bold border-b pb-4 ${textMainClass} ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>Kho Lưu Trữ Bài Tập & Dự Án</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {gridProjects.map((proj, idx) => (
                          <ScrollReveal key={proj.id} delay={idx * 0.1}>
                            <FlashlightCard isDarkMode={isDarkMode} onClick={() => openProject(proj)} className="h-full min-h-[360px] flex flex-col">
                              <div className={`h-40 -mx-6 -mt-6 mb-4 overflow-hidden border-b relative shrink-0 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              </div>
                              <h4 className={`text-lg font-bold mb-2 leading-snug ${textMainClass}`}>{proj.title}</h4>
                              <p className={`flex-1 text-sm line-clamp-3 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{proj.desc}</p>
                              <div className={`mt-4 flex items-center text-sm font-medium shrink-0 group-hover:translate-x-2 transition-transform ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                Xem chi tiết <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                              </div>
                            </FlashlightCard>
                          </ScrollReveal>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TRANG CHI TIẾT DỰ ÁN */}
                {activeTab === 'project_detail' && selectedProject && (
                  <div className="animate-scroll p-8 md:p-12 max-w-5xl mx-auto space-y-8 min-h-full">
                    <div className={`flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      {selectedProject.icon && <selectedProject.icon size={48} className={`shrink-0 ${selectedProject.color}`} />}
                      <div>
                        <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${textMainClass}`}>{selectedProject.title}</h1>
                        {selectedProject.category && (
                          <p className={`font-medium mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{selectedProject.category}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-12 mt-8">
                      {selectedProject.content && selectedProject.content.map((block, i) => renderContentBlock(block, i))}
                    </div>
                  </div>
                )}

                {/* TRANG TỔNG KẾT */}
                {activeTab === 'summary' && (
                  <div className="p-8 md:p-12 space-y-10 max-w-5xl mx-auto animate-scroll">
                    <h1 className={`text-3xl sm:text-4xl font-extrabold leading-tight border-b pb-6 mb-8 ${textMainClass} ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      Tổng kết & Nhìn lại chặng đường
                    </h1>
                    
                    <div className="space-y-8">
                      <FlashlightCard isDarkMode={isDarkMode} className="border-l-4 border-blue-500">
                        <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                          <Lightbulb className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} /> Trải nghiệm và Cảm nhận cá nhân
                        </h3>
                        <p className={`leading-relaxed text-lg ${textBodyClass}`}>
                          Việc thực hiện dự án Portfolio này là một hành trình thực sự thú vị và bổ ích. Đây không chỉ là nơi lưu trữ các bài tập đơn thuần, mà còn là cơ hội để tôi hệ thống hóa lại toàn bộ những kiến thức, kỹ năng số đã học được trong suốt học phần. Qua từng bước xây dựng nội dung và tối ưu hiển thị, tôi cảm nhận rõ sự tiến bộ của bản thân trong tư duy tổ chức thông tin và khả năng ứng dụng công nghệ vào thực tiễn.
                        </p>
                      </FlashlightCard>

                      <FlashlightCard isDarkMode={isDarkMode} className="border-l-4 border-emerald-500">
                        <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                          <Code className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'} /> Những Kiến thức & Kỹ năng quan trọng nhất
                        </h3>
                        <ul className={`leading-relaxed text-lg space-y-4 ${textBodyClass}`}>
                          <li className="flex gap-3">
                            <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                            <span><strong>Kỹ năng khai thác và sử dụng AI (Prompt Engineering):</strong> Học cách tối ưu hóa câu lệnh để giao tiếp và khai thác sức mạnh của các mô hình ngôn ngữ lớn như ChatGPT, Claude, Gemini.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                            <span><strong>Kỹ năng làm việc nhóm trực tuyến:</strong> Sử dụng thành thạo các công cụ cộng tác như Google Drive, Microsoft Planner, Google Docs để quản lý tiến độ, dữ liệu dự án hiệu quả.</span>
                          </li>
                          <li className="flex gap-3">
                            <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓</span>
                            <span><strong>Tư duy Liêm chính học thuật:</strong> Nắm vững nguyên tắc đạo đức khi sử dụng AI, biết cách trích dẫn, khai báo nguồn và giữ lại cốt lõi tư duy của bản thân.</span>
                          </li>
                        </ul>
                      </FlashlightCard>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FlashlightCard isDarkMode={isDarkMode} className="border-t-4 border-yellow-500">
                          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                            <Award className={isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} /> Điểm tâm đắc nhất
                          </h3>
                          <p className={`leading-relaxed ${textBodyClass}`}>
                            Điều tôi tâm đắc nhất là việc vận dụng thành công các Framework (nhu C.R.E.A.T.E) trong việc tối ưu Prompt AI, điều này giúp tôi tiết kiệm được rất nhiều thời gian trong học tập và nghiên cứu. Bên cạnh đó, việc xây dựng được một Portfolio trực quan thế này giúp tôi cảm thấy tự hào về những nỗ lực đã bỏ ra.
                          </p>
                        </FlashlightCard>

                        <FlashlightCard isDarkMode={isDarkMode} className="border-t-4 border-red-500">
                          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${textMainClass}`}>
                            <MessageSquare className={isDarkMode ? 'text-red-400' : 'text-red-600'} /> Thách thức gặp phải
                          </h3>
                          <p className={`leading-relaxed ${textBodyClass}`}>
                            Thách thức lớn nhất trong quá trình xây dựng Portfolio là việc tổng hợp và định dạng lại khối lượng nội dung đồ sộ từ nhiều bài tập khác nhau sao cho khoa học, đồng bộ và thẩm mỹ. Ngoài ra, việc làm quen với các công cụ tạo lập Website/Portfolio cũng đòi hỏi sự kiên nhẫn tìm tòi trong những ngày đầu.
                          </p>
                        </FlashlightCard>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* REBOUND SHORTCUT ON DESKTOP IF CLOSED OR MINIMIZED */}
        {(windowState === 'closed' || windowState === 'minimized') && (
          <button 
            onClick={() => setWindowState('open')}
            className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl backdrop-blur-md text-white transition-all transform hover:scale-105 active:scale-95 animate-window-open"
          >
            <Folder size={48} className="text-yellow-400" />
            <span className="text-xs font-semibold">Mở Lại Cửa Sổ Portfolio</span>
          </button>
        )}
      </div>

      {/* PREMIUM DYNAMIC MAC-STYLE DOCK */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center pointer-events-auto">
        <div className={`flex items-end gap-3 px-4 py-2.5 rounded-2xl border backdrop-blur-2xl transition-all shadow-2xl ${
          isDarkMode 
            ? 'bg-neutral-900/60 border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]' 
            : 'bg-white/60 border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.2)]'
        }`}>
          {/* Dock Icon: About */}
          <button 
            onClick={() => { setActiveTab('about'); setSelectedProject(null); setWindowState('open'); }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none ${
              activeTab === 'about' && windowState === 'open' ? 'bg-blue-500 text-white' : 'bg-white/10'
            }`}
            title="Giới thiệu"
          >
            <User size={22} />
          </button>

          {/* Dock Icon: Projects */}
          <button 
            onClick={() => { setActiveTab('home'); setSelectedProject(null); setWindowState('open'); }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none ${
              (activeTab === 'home' || activeTab === 'project_detail') && windowState === 'open' ? 'bg-blue-500 text-white' : 'bg-white/10'
            }`}
            title="Dự án"
          >
            <Folder size={22} />
          </button>

          {/* Dock Icon: Summary */}
          <button 
            onClick={() => { setActiveTab('summary'); setSelectedProject(null); setWindowState('open'); }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none ${
              activeTab === 'summary' && windowState === 'open' ? 'bg-blue-500 text-white' : 'bg-white/10'
            }`}
            title="Tổng kết"
          >
            <Award size={22} />
          </button>

          <div className="w-[1px] h-8 bg-white/20 mx-1" />

          {/* Dock Icon: Spotlight Search */}
          <button 
            onClick={() => setSpotlightOpen(true)}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none"
            title="Tìm kiếm thông minh (⌘K)"
          >
            <Search size={22} className="text-blue-400" />
          </button>

          {/* Dock Icon: Control Center (Sliders) */}
          <button 
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none"
            title="Trung tâm điều khiển"
          >
            <Sliders size={22} className="text-emerald-400" />
          </button>

          {/* Dock Icon: Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center transition-all hover:scale-125 hover:-translate-y-2 hover-bounce focus:outline-none"
            title={isDarkMode ? "Giao diện Sáng" : "Giao diện Tối"}
          >
            {isDarkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-indigo-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}