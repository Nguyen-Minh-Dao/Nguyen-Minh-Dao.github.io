// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Apple, Wifi, Battery, Search, ChevronLeft, ChevronRight, 
  Terminal, Code, Cpu, Globe, Database, Server, 
  User, ArrowLeft, Maximize2, Minus, X, LayoutTemplate, Folder, BookOpen,
  Zap, Lightbulb, MessageSquare, Target, Users, Landmark, Briefcase, CheckCircle
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

  /* Hiệu ứng Sóng lượn nhẹ nhàng */
  @keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-wave-slow { animation: wave 30s linear infinite; }
  .animate-wave-fast { animation: wave 20s linear infinite; }

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
        if (entry.isIntersecting) setInView(true);
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
            style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 50%)` }}
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

const AppleLogo = ({ className = "" }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" height="14" width="14" className={className}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const BackgroundWaves = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#000000]"></div>
    
    {/* Sóng lượn chậm */}
    <div className="absolute bottom-0 left-0 w-[200%] h-[400px] animate-wave-slow opacity-[0.15]">
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3b82f6" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,165.3C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
    
    {/* Sóng lượn nhanh hơn một chút tạo hiệu ứng giao thoa */}
    <div className="absolute bottom-0 left-0 w-[200%] h-[350px] animate-wave-fast opacity-[0.1]">
      <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill="#8b5cf6" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
  </div>
);

const TopBar = ({ activeTab }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getAppName = () => {
    if (activeTab === 'about') return '1. Giới thiệu';
    if (activeTab === 'projects' || activeTab === 'project_detail') return '2. Dự án';
    if (activeTab === 'summary') return '3. Tổng kết';
    return 'Portfolio';
  };

  return (
    <div className="h-7 w-full bg-neutral-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-[13px] font-medium text-neutral-300 z-50 relative">
      <div className="flex items-center space-x-4 cursor-default">
        <AppleLogo className="hover:text-white transition-colors" />
        <span className="font-bold text-white">{getAppName()}</span>
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
  const [activeTab, setActiveTab] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);

  const gridProjects = [
    { 
      id: 1, 
      title: 'Thực hành File Explorer', 
      category: 'Bài 1: Máy tính và các thiết bị ngoại vi',
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
          text: 'Ở cột bên trái, nhấp vào This PC, sau đó nhấp đúp vào một ổ đĩa không phải ổ hệ thống. Nếu chỉ có ổ C:, hãy vào thư mục Documents.',
          images: ['https://i.postimg.cc/RVxC9B8L/image.png']
        },
        {
          type: 'step',
          heading: 'Tạo thư mục mới',
          text: 'Nhấp chuột phải vào một khoảng trống -> chọn New -> Folder. Đặt tên thư mục là ThucHanh_NguyenVanA. Nhấn Enter.',
          images: ['https://i.postimg.cc/N067JYWZ/image.png', 'https://i.postimg.cc/L6JkdjcP/image.png']
        },
        {
            type: 'step',
            heading: 'Vào thư mục vừa tạo',
            text: 'Nhấp đúp vào thư mục ThucHanh_NguyenVanA.',
            images: ['https://i.postimg.cc/y6b9TkDV/image.png']
        }
      ]
    },
    { 
      id: 2, 
      title: 'Tìm kiếm và Đánh giá thông tin học thuật', 
      category: 'Bài 2: Khai thác dữ liệu và thông tin',
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
            type: 'table',
            heading: 'Đánh giá tài liệu tham khảo',
            headers: ['Tài liệu', 'Tác giả', 'NXB', 'Phương pháp', 'Trích dẫn'],
            rows: [
                ['CMOS Analog Circuit Design', 'Allen, P.E.', 'Oxford', 'Quy trình thiết kế từng bước', '7000+'],
                ['Design of Analog CMOS ICs', 'Behzad Razavi', 'McGraw-Hill', 'Phân tích lý thuyết, mô hình hóa', '10000+']
            ]
        }
      ]
    },
    { 
      id: 3, 
      title: 'Kỹ thuật Viết Prompt và Tối ưu AI', 
      category: 'Bài 3: Tổng quan về trí tuệ nhân tạo',
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
            { label: 'Tạo câu hỏi', value: 'Tạo bộ câu hỏi ôn tập cho một chủ đề.' }
          ]
        },
        {
          type: 'text_list',
          heading: '2. Khung nguyên tắc cốt lõi: C.R.E.A.T.E Framework',
          items: [
            { label: 'C - Character', value: 'Luôn xác định tư cách chuyên môn cho AI.' },
            { label: 'R - Request', value: 'Nhiệm vụ cần phải rõ ràng, tránh đa nghĩa.' },
            { label: 'T - Type of Output', value: 'Chỉ định hình thức trình bày.' }
          ]
        }
      ]
    },
    { 
      id: 4, 
      title: 'Báo cáo: Trải nghiệm Công cụ cộng tác', 
      category: 'Bài 4: Giao tiếp và hợp tác trong MT số',
      icon: Users,
      color: 'text-indigo-400',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', 
      desc: 'Trải nghiệm ứng dụng các công cụ quản lý dự án và giao tiếp trực tuyến.',
      content: [
        {
          type: 'text_list',
          heading: 'I. Lựa chọn công cụ',
          items: [
            { label: 'Quản lý dự án', value: 'Microsoft Planner - Trực quan hóa công việc bằng Kanban.' },
            { label: 'Giao tiếp nhóm', value: 'Messenger - Thảo luận và giải quyết vấn đề tức thời.' },
            { label: 'Lưu trữ tài nguyên', value: 'Google Drive - Cấu trúc lưu trữ khoa học, bảo mật.' }
          ]
        }
      ]
    },
    { 
      id: 5, 
      title: 'Sáng tạo nội dung với AI: Gà Rán Giòn', 
      category: 'Bài 5: Sáng tạo nội dung số',
      icon: Target,
      color: 'text-red-400',
      img: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&q=80&w=800', 
      desc: 'Ứng dụng Claude, Gemini và Canva AI để chuyển ngữ, biên tập bài viết.',
      content: [
        {
          type: 'step',
          heading: 'Quy trình sáng tạo',
          content: [
            {text: 'Dự án này là một bài viết hướng dẫn nấu ăn hoàn chỉnh, được xây dựng dựa trên công thức gốc của Chef Joshua Weissman.'},
            {text: 'Sử dụng Claude cho việc dịch thuật tinh chỉnh văn phong, Gemini để sáng tạo tiêu đề, và Canva AI thiết kế hình ảnh.'}
          ]
        }
      ]
    },
    { 
      id: 6, 
      title: 'Chính sách Liêm chính học thuật (UET)', 
      category: 'Bài 6: An toàn và liêm chính MT số',
      icon: Landmark,
      color: 'text-emerald-400',
      img: 'https://www.pymnts.com/wp-content/uploads/2023/08/AI-regulation.jpg', 
      desc: 'Phân tích chính sách liêm chính học thuật và ứng dụng AI có trách nhiệm.',
      content: [
        {
          type: 'table',
          heading: 'Nguyên tắc cá nhân về sử dụng AI',
          headers: ['#', 'Nguyên tắc', 'Áp dụng cụ thể'],
          rows: [
            ['1', 'Tự đọc trước, AI hỗ trợ sau', 'Đảm bảo tự hiểu ngữ cảnh và có thể phát hiện lỗi sai của AI.'],
            ['2', 'Khai báo minh bạch', 'Luôn ghi chú rõ ràng công cụ AI đã dùng và mục đích.'],
            ['3', 'Giữ quá trình tư duy cốt lõi', 'Chỉ dùng AI cho các bước hỗ trợ tìm kiếm, định dạng.']
          ]
        }
      ]
    }
  ];

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
            {block.text && <p className="text-neutral-300 leading-relaxed text-lg ml-11">{block.text}</p>}
            {block.images && block.images.map((img, imgIdx) => (
              <div key={imgIdx} className="ml-11 rounded-xl overflow-hidden border border-white/10 bg-black/50 mt-4 shadow-lg">
                <img src={img} alt={block.heading} className="w-full object-contain max-h-[500px]" />
              </div>
            ))}
            {block.content && block.content.map((subItem, subIdx) => (
              <div key={subIdx} className="space-y-4 mt-4">
                {subItem.text && <p className="text-neutral-300 leading-relaxed text-lg ml-11">{subItem.text}</p>}
                {subItem.images && subItem.images.map((img, imgIdx) => (
                  <div key={`sub-img-${imgIdx}`} className="ml-11 rounded-xl overflow-hidden border border-white/10 bg-black/50 mt-4 shadow-lg">
                    <img src={img} alt={`${block.heading} phần ${subIdx + 1}`} className="w-full object-contain max-h-[500px]" />
                  </div>
                ))}
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
              <table className="w-full text-left border-collapse min-w-[700px]">
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
    <div className="min-h-screen bg-black text-neutral-200 font-sans overflow-hidden flex flex-col selection:bg-blue-500/30 relative">
      <BackgroundWaves />
      <style>{globalStyles}</style>
      <TopBar activeTab={activeTab} />

      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 z-10">
        <div className="relative z-10 w-full max-w-7xl h-[88vh] bg-neutral-900/60 backdrop-blur-[40px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(255,255,255,0.02)] border border-white/10 flex flex-col overflow-hidden">
          
          {/* Mac OS Window Controls & Tabs */}
          <div className="flex flex-col border-b border-white/10 bg-black/30 shrink-0">
            <div className="h-10 w-full flex items-center px-4 justify-between">
              <div className="flex space-x-2 w-1/4">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer flex items-center justify-center group"><X size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer flex items-center justify-center group"><Minus size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer flex items-center justify-center group"><Maximize2 size={8} className="text-black/0 group-hover:text-black/80 transition-colors" /></div>
              </div>
              
              <div className="flex justify-center gap-2 sm:gap-6 text-sm font-medium">
                <button onClick={() => setActiveTab('about')} className={`pb-1 transition-all ${activeTab === 'about' ? 'text-white border-b-2 border-blue-400' : 'text-neutral-500 hover:text-neutral-300'}`}>1. Giới thiệu</button>
                <button onClick={() => setActiveTab('projects')} className={`pb-1 transition-all ${activeTab === 'projects' || activeTab === 'project_detail' ? 'text-white border-b-2 border-blue-400' : 'text-neutral-500 hover:text-neutral-300'}`}>2. Dự án</button>
                <button onClick={() => setActiveTab('summary')} className={`pb-1 transition-all ${activeTab === 'summary' ? 'text-white border-b-2 border-blue-400' : 'text-neutral-500 hover:text-neutral-300'}`}>3. Tổng kết</button>
              </div>

              <div className="flex w-1/4 justify-end">
                {activeTab === 'project_detail' && (
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 text-xs text-white transition-all"
                  >
                    <ArrowLeft size={12} /> Quay lại
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto mac-scrollbar relative p-6 md:p-10">
            
            {/* TRANG 1: GIỚI THIỆU */}
            {activeTab === 'about' && (
              <div className="space-y-12 animate-scroll max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/10 pb-8">
                   <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)] shrink-0 bg-black/40">
                       <img 
                          src="https://i.postimg.cc/Mpsf6x9B/bo-mau-be.png" 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                   </div>
                   <div className="text-center md:text-left">
                       <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2"><AnimatedText text="Nguyễn Minh Đạo" /></h1>
                       <p className="text-blue-400 text-lg mb-1 font-medium">Mã sinh viên: 25022158</p>
                       <p className="text-neutral-300">Ngành: Công nghệ Kĩ thuật Điện tử - Viễn thông</p>
                   </div>
                </div>

                <div className="grid gap-8">
                   <section>
                       <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><User className="text-blue-400" /> Sở thích cá nhân</h2>
                       <ul className="grid gap-3 text-neutral-300 ml-2">
                           <li className="flex items-center gap-3"><CheckCircle size={16} className="text-blue-500" /> Tìm hiểu về kiến trúc vi mạch và các hệ thống nhúng.</li>
                           <li className="flex items-center gap-3"><CheckCircle size={16} className="text-blue-500" /> Nghiên cứu ứng dụng Trí tuệ nhân tạo (AI) trong kỹ thuật.</li>
                           <li className="flex items-center gap-3"><CheckCircle size={16} className="text-blue-500" /> Lập trình, thiết kế nội dung số và làm việc nhóm trực tuyến.</li>
                       </ul>
                   </section>

                   <section>
                       <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Target className="text-green-400" /> Mục tiêu học tập & Định hướng</h2>
                       <p className="text-neutral-300 leading-relaxed ml-2 text-lg">
                           Mục tiêu dài hạn của tôi là trở thành một Kỹ sư Điện tử - Viễn thông xuất sắc, đặc biệt trong lĩnh vực thiết kế vi mạch CMOS. Định hướng phát triển của tôi là trở thành một kỹ sư đa nhiệm, biết cách làm chủ và tích hợp các công cụ số mới nhất (như AI, quản trị dự án Cloud) để tối ưu hóa quy trình làm việc và giải quyết những bài toán kỹ thuật phức tạp.
                       </p>
                   </section>

                   <section>
                       <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Briefcase className="text-yellow-400" /> Mục tiêu của Portfolio</h2>
                       <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 text-neutral-300">
                           <p>✨ <strong>Thể hiện các kỹ năng số đã học:</strong> Là minh chứng trực quan cho việc áp dụng thành thạo các công cụ số, AI vào học tập và công việc thực tế.</p>
                           <p>📁 <strong>Lưu trữ sản phẩm cá nhân:</strong> Tạo ra một không gian số tập trung, chuyên nghiệp để dễ dàng truy cập và chia sẻ với đối tác, nhà tuyển dụng.</p>
                           <p>📈 <strong>Theo dõi hành trình phát triển:</strong> Nơi hệ thống hóa kiến thức, nhìn lại tiến độ bản thân để vạch ra chiến lược trau dồi cho tương lai.</p>
                       </div>
                   </section>
                </div>
              </div>
            )}

            {/* TRANG 2: DỰ ÁN */}
            {activeTab === 'projects' && (
              <div className="animate-scroll max-w-6xl mx-auto space-y-6">
                <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Các bài tập đã hoàn thành</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridProjects.map((proj, idx) => (
                    <ScrollReveal key={proj.id} delay={idx * 0.1}>
                      <FlashlightCard onClick={() => { setSelectedProject(proj); setActiveTab('project_detail'); }} className="h-full min-h-[380px] flex flex-col">
                         <div className="h-44 -mx-6 -mt-6 mb-4 overflow-hidden border-b border-white/10 relative shrink-0">
                            <img src={proj.img} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                         </div>
                         <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-blue-400">{proj.category}</p>
                         <h4 className="text-lg font-bold text-white mb-2 leading-snug">{proj.title}</h4>
                         <p className="text-neutral-400 flex-1 text-sm line-clamp-3">{proj.desc}</p>
                         <div className="mt-4 flex items-center text-blue-400 text-sm font-medium shrink-0">
                           Xem chi tiết dự án <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                         </div>
                      </FlashlightCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}

            {/* TRANG 2 - CHI TIẾT DỰ ÁN */}
            {activeTab === 'project_detail' && selectedProject && (
              <div className="animate-scroll max-w-5xl mx-auto space-y-8 min-h-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-white/10 pb-6">
                  {selectedProject.icon && <selectedProject.icon size={48} className={`shrink-0 ${selectedProject.color}`} />}
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{selectedProject.title}</h1>
                    <p className="text-blue-400 font-medium mt-2 text-lg">{selectedProject.category}</p>
                  </div>
                </div>
                <div className="space-y-12 mt-8">
                  {selectedProject.content && selectedProject.content.map((block, i) => renderContentBlock(block, i))}
                </div>
              </div>
            )}

            {/* TRANG 3: TỔNG KẾT */}
            {activeTab === 'summary' && (
              <div className="space-y-8 animate-scroll max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-white border-b border-white/10 pb-6 mb-8"><AnimatedText text="Tổng kết Dự án Portfolio" /></h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Trải nghiệm & Cảm nhận */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg hover:bg-white/10 transition-colors h-full">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><MessageSquare className="text-pink-400" /> Trải nghiệm & Cảm nhận</h2>
                        <p className="text-neutral-300 leading-relaxed text-lg">
                            Quá trình xây dựng Portfolio số và hệ thống hóa lại toàn bộ bài tập là một trải nghiệm mở rộng tư duy thực sự. Không chỉ dừng lại ở lý thuyết sách vở, tôi đã được trải nghiệm sự vận hành của dữ liệu trực tuyến, sự kỳ diệu của việc làm chủ AI, và tầm quan trọng của hợp tác mạng lưới. Nó biến không gian làm việc số trở thành một "đòn bẩy" thực sự mạnh mẽ, giúp nâng cao năng suất cá nhân lên nhiều lần nếu biết sử dụng đúng nguyên tắc.
                        </p>
                    </div>
                    
                    {/* Card 2: Kiến thức & Kỹ năng */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg hover:bg-white/10 transition-colors h-full">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Lightbulb className="text-yellow-400" /> Kiến thức & Kỹ năng quan trọng nhất</h2>
                        <ul className="space-y-4 text-neutral-300 text-lg">
                            <li className="flex gap-3">
                                <span className="text-blue-400 font-bold mt-1">1.</span> 
                                <div><strong>Kỹ năng Prompt Engineering:</strong> Nắm vững tư duy framework (C.R.E.A.T.E) để giao tiếp, ép AI đưa ra kết quả phân tích chất lượng sâu, cấu trúc chuẩn mực.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-400 font-bold mt-1">2.</span> 
                                <div><strong>Quản lý dự án hợp tác:</strong> Vận dụng thành thạo Planner và hệ thống phân cấp thư mục Drive để vận hành một team trực tuyến.</div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-blue-400 font-bold mt-1">3.</span> 
                                <div><strong>Liêm chính học thuật:</strong> Nắm vững đạo đức trong việc sử dụng nội dung AI khởi tạo, biến AI thành công cụ hỗ trợ tư duy chứ không phải thay thế tư duy.</div>
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: Tâm đắc & Thách thức */}
                    <div className="md:col-span-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-8 shadow-lg mt-4">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Target className="text-blue-400" /> Điểm tâm đắc & Thách thức lớn nhất</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                            <div>
                                <h3 className="text-xl font-bold text-emerald-400 mb-3 border-b border-emerald-400/20 pb-2">✨ Điều tâm đắc nhất</h3>
                                <p className="text-neutral-300 text-lg leading-relaxed">
                                    Tôi thực sự tâm đắc với khả năng <strong>Cá nhân hóa quy trình phân tích qua AI</strong>. Khi tự mình trải nghiệm việc thiết lập các vai trò chi tiết cho mô hình ngôn ngữ lớn (ví dụ: bóc tách tài liệu vi mạch, sáng tạo nội dung), kết quả thu được vượt xa một công cụ tìm kiếm thông thường. Việc nắm trong tay khả năng "điều hướng AI" mang lại cảm giác làm chủ công nghệ rất lớn.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-400 mb-3 border-b border-red-400/20 pb-2">🧗 Thách thức đã vượt qua</h3>
                                <p className="text-neutral-300 text-lg leading-relaxed">
                                    Thách thức lớn nhất là việc <strong>đồng bộ hóa quá trình làm việc nhóm trực tuyến</strong> trong thời gian đầu (xung đột tên file, trôi tin nhắn). Tôi đã khắc phục bằng cách thiết lập rõ ràng "Bộ quy tắc ứng xử nhóm", áp dụng Kanban Board nghiêm ngặt để tracking từng đầu mục. Qua đó, tôi nhận ra quản trị công nghệ cũng chính là quản trị con người.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}