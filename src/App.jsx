import React from "react";
import { useState, useEffect, useRef } from "react";

import emailjs from "@emailjs/browser";
// image
import p1 from "./assets/santin.png";
import legendCinema from "./assets/legendCinema.png";
import eteccenter from "./assets/eteccenter.png";
import computerstore from "./assets/computerstore.png";

// icon
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Globe,
  Download,
  Moon,
  Sun,
  Flame,
  Wallpaper,
  PenTool,
} from "lucide-react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const myRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll(".scroll-animate");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "HTML/CSS", level: 90, icon: Code },
    { name: "JavaScript", level: 85, icon: Code },
    { name: "React", level: 80, icon: Code },
    { name: "UI/UX Design", level: 75, icon: Palette },
    { name: "Responsive Design", level: 88, icon: Smartphone },
    { name: "Web Performance", level: 70, icon: Globe },
    { name: "Tailwind & Boostrap", level: 92, icon: Flame },
    { name: "Photoshop & Illustator", level: 50, icon: Wallpaper },
    { name: "Corel Draw", level: 70, icon: PenTool },
  ];

  const projects = [
    {
      title: "Legend Cinemas",
      description:
        "Legend Cinema is a website that I created when I completed the Web Development class at the Technology Center.",
      image: legendCinema,
      tech: ["React", "JavaScript", "TailwindCSS", "HTML"],
      github: "#",
      live: "#",
    },
    {
      title: "ETEC Center",
      description:
        "A digital presence for ETEC Center, showcasing programs, admissions, and events with a clean and professional design.",
      image: eteccenter,
      tech: ["Vite.js", "Swiper", "Tailwind CSS"],
      github: "#",
      live: "#",
    },
    {
      title: "Computer Store",
      description:
        "A digital storefront for a computer store, highlighting latest products, promotions, and customer support features.",
      image: computerstore,
      tech: ["JavaScript", "Weather API", "CSS3", "React+Vite.js"],
      github: "#",
      live: "#",
    },
  ];
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_01hxlhe", // My with your service ID
        "template_9m249ms", // My template ID
        form.current,
        "8Cem4kUIkvCK4MTkp" // My public key
      )
      .then(
        () => {
          setIsSending(false);
          setIsModalOpen(true); //show modal
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setIsSending(false);
          console.log("Error:", error.text);
          alert("Failed to send message ❌");
        }
      );
  };

  // Downloand cv script
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV.pdf";
    link.download = "My-CV.pdf";
    link.click();
  };

  return (
    <>
      <div
        className={`min-h-screen transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white"
            : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900"
        }`}
      >
        <nav
          className={`fixed top-0 left-0 right-0 z-50  backdrop-blur-xl border-b shadow-sm transition-all duration-500 cursor-pointer ${
            isDarkMode
              ? "bg-slate-900/90 border-slate-700/50"
              : "bg-white/90 border-slate-200/50"
          }`}
        >
          <div className="container mx-auto px-36 py-4">
            <div className="flex items-center justify-between">
              <h1
                className={`text-2xl font-serif font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ${
                  isDarkMode ? "text-transparent" : "text-blue-600"
                }`}
              >
                O.SanTin
              </h1>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex space-x-8">
                  {["home", "about", "skills", "works", "contact"].map(
                    (item) => (
                      <a
                        key={item}
                        href={`#${item}`}
                        className={`capitalize transition-all duration-300 hover:text-blue-600 relative group ${
                          activeSection === item
                            ? "text-blue-600"
                            : isDarkMode
                            ? "text-slate-300"
                            : "text-slate-700"
                        }`}
                      >
                        {item === "works" ? "My Works" : item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 group-hover:w-full" />
                        {activeSection === item && (
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                        )}
                      </a>
                    )
                  )}
                </div>
                <button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={` transition-all duration-300 ${
                    isDarkMode
                      ? "text-slate-300  hover:text-blue-400"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Welcome Section */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-animate"
          data-section="home"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%239C92AC" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
              }}
            ></div>

            <div
              className={`absolute w-96 h-96 rounded-full blur-3xl animate-float ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600/30 to-purple-600/20"
                  : "bg-gradient-to-r from-blue-200/40 to-purple-200/30"
              }`}
              style={{
                left: `${15 + mousePosition.x * 0.03}%`,
                top: `${25 + mousePosition.y * 0.03}%`,
              }}
            ></div>
            <div
              className={`absolute w-80 h-80 rounded-full blur-2xl animate-float ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600/25 to-blue-600/15"
                  : "bg-gradient-to-r from-purple-200/35 to-blue-200/25"
              }`}
              style={{
                right: `${10 + mousePosition.x * 0.025}%`,
                bottom: `${20 + mousePosition.y * 0.025}%`,
                animationDelay: "2s",
              }}
            ></div>
            <div
              className={`absolute w-64 h-64 rounded-full blur-xl animate-float ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/10"
                  : "bg-gradient-to-r from-blue-200/30 to-purple-200/20"
              }`}
              style={{
                left: `${55 + mousePosition.x * 0.02}%`,
                top: `${55 + mousePosition.y * 0.02}%`,
                animationDelay: "4s",
              }}
            ></div>

            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full animate-particle-float ${
                  isDarkMode ? "bg-blue-400/40" : "bg-blue-400/60"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1
              className={`text-6xl md:text-8xl font-serif font-bold mb-8 text-balance`}
            >
              <span className={`${isDarkMode ? "text-whited" : "text-black"}`}>
                Hello, I'm
              </span>
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text animate-pulse">
                SanTin
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-pretty leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              A passionate junior front-end developer crafting beautiful,
              modern, and functional web experiences with cutting-edge
              technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#works">
                <button className="text-[16px] rounded-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-purple-500/60  w-36 h-12  hover-glow bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-700 text-white">
                  View My Work
                </button>
              </a>
              <button
                variant="outline"
                size="lg"
                onClick={handleDownload}
                className={`text-[16px] rounded-sm  w-44 h-12 border-[1px] hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/20  flex m-0 justify-center items-center   transition-all duration-300 border-slate-500 hover:border-blue-400 hover:bg-slate-700 bg-transparent  hover:text-white ${
                  isDarkMode ? "text-white" : "text-slate-600"
                }`}
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </button>
            </div>
          </div>
        </section>

        {/* About Section  */}
        <section
          id="about"
          className="py-20 scroll-animate"
          data-section="about"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2
                className={`text-4xl font-serif font-bold text-center mb-12 ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src={p1}
                    alt="Oerun SanTin"
                    className="rounded-lg shadow-lg w-full h-[70%]"
                  />
                </div>
                <div className="space-y-6">
                  <h2
                    className={`text-[20px] leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-800"
                    }`}
                  >
                    My Name: Oeurn SanTin
                  </h2>
                  <p
                    className={`text-lg leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-800"
                    }`}
                  >
                    I'm a dedicated junior front-end developer with a passion
                    for creating intuitive and visually appealing web
                    applications. With a strong foundation in modern web
                    technologies, I enjoy turning complex problems into simple,
                    beautiful designs.
                  </p>
                  <p
                    className={`text-lg leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-800"
                    }`}
                  >
                    My journey in web development started with curiosity and has
                    evolved into a commitment to continuous learning and
                    improvement. I believe in writing clean, maintainable code
                    and creating user experiences that make a difference.
                  </p>
                  <div className="flex space-10 gap-4">
                    <a
                      href="https://github.com/SanTin-Developer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        variant="outline"
                        size="sm"
                        className={`transition-all duration-300 flex border-[1px] m-0 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-600 justify-center w-24 h-8 rounded-sm items-center ${
                          isDarkMode
                            ? "border-slate-600 text-slate-300 hover:border-purple-200 hover:bg-white hover:text-slate-800 "
                            : "border-slate-400 text-slate-800 hover:bg-slate-100 "
                        }`}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </button>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/san-tin-b146b7383/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        variant="outline"
                        size="sm"
                        className={`transition-all duration-300 flex border-[1px] m-0 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-600 justify-center w-28 h-8 rounded-sm items-center  ${
                          isDarkMode
                            ? "border-slate-600 text-slate-300 hover:border-purple-200 hover:bg-white hover:text-slate-800"
                            : "border-slate-400 text-slate-800 hover:bg-slate-100 bg-transparent"
                        }`}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKill section */}
        <section
          id="skills"
          className={`py-24 scroll-animate transition-all duration-500 ${
            isDarkMode ? "bg-slate-800/50" : "bg-slate-50/50"
          }`}
          data-section="skills"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-5xl lg:grid-cols-1 font-serif font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className=" grid md:grid-cols-2 min-w-sm  sm:grid-cols-1 sm:justify-center lg:grid-cols-3 gap-10 max-w-7xl mx-auto ">
              {skills.map((skill, index) => (
                <main
                  key={skill.name}
                  className={`group  border-[1px] hover:shadow-blue-500/30 p-4 rounded-2xl hover:rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl  cursor-pointer backdrop-blur-sm shadow-sm    ${
                    isDarkMode
                      ? "bg-slate-800/80 border-slate-700 hover:border-blue-500"
                      : "bg-white/80 border-slate-200 hover:border-blue-300"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="text-center pb-4">
                    <skill.icon className="w-16 h-16 mx-auto mb-6 text-blue-600 group-hover:text-purple-600 transition-all duration-500 group-hover:scale-110" />
                    <span
                      className={`text-xl font-serif ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`w-full rounded-full h-3 overflow-hidden ${
                        isDarkMode ? "bg-slate-700" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1500 ease-out group-hover:animate-pulse"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p
                      className={`text-sm mt-3 text-center font-medium ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {skill.level}%
                    </p>
                  </div>
                </main>
              ))}
            </div>
          </div>
        </section>

        {/*my work section */}
        <section
          id="works"
          className="py-24 scroll-animate"
          data-section="works"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Work
            </h2>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 sm:justify-center lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {projects.map((project, index) => (
                <nav
                  key={project.title}
                  className={`group overflow-hidden py-7 border-[1px]  rounded-xl hover-lift cursor-pointer backdrop-blur-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-purple-700/30 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-slate-800/80 border-slate-700 hover:border-blue-500"
                      : "bg-white/80 border-slate-200 hover:border-blue-300"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <main className="relative overflow-hidden h-56 ">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        isDarkMode ? "from-slate-800/80" : "from-white/80"
                      }`}
                    ></div>
                    <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        size="sm"
                        variant="secondary"
                        className={`hover-glow ${
                          isDarkMode
                            ? "bg-slate-800/90 text-slate-300"
                            : "bg-white/90 text-slate-700"
                        }`}
                      >
                        <Github className="w-4 h-4" />
                      </button>
                      <button
                        size="sm"
                        variant="secondary"
                        className={`hover-glow ${
                          isDarkMode
                            ? "bg-slate-800/90 text-slate-300"
                            : "bg-white/90 text-slate-700"
                        }`}
                      >
                        <ExternalLink
                          href="legend-cinema-livid.vercel.app"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </main>
                  <span className="pb-1 ">
                    <div
                      className={`text-xl font-serif group-hover:text-blue-600 transition-colors duration-300 px-1 ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {project.title}
                    </div>
                    <div
                      className={`text-sm leading-relaxed px-1 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {project.description}
                    </div>
                  </span>
                  <div>
                    <div className="flex flex-wrap gap-2 px-1">
                      {project.tech.map((tech) => (
                        <div
                          key={tech}
                          variant="secondary"
                          className={`text-xs ${
                            isDarkMode
                              ? "bg-blue-900/50 text-blue-300 border-blue-700"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </nav>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-24 scroll-animate transition-all duration-500 ${
            isDarkMode ? "bg-slate-800/50" : "bg-slate-50/50"
          }`}
          data-section="contact"
        >
          <div className="container mx-auto px-10">
            <h2 className="text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="max-w-2xl mx-auto">
              <nav
                className={`hover:shadow-xl hover:shadow-blue-400/40 hover:border-[2px] hover:-translate-y-2 backdrop-blur-sm shadow-sm transition-all p-3 rounded-xl border-[1px] duration-300 ${
                  isDarkMode
                    ? "bg-slate-800/80 border-slate-700"
                    : "bg-white/80 border-slate-200"
                }`}
              >
                <main className="text-center grid pb-8">
                  <span
                    className={`text-3xl font-serif ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Ready to Collaborate?
                  </span>
                  <span
                    className={`text-lg mt-3 ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    I'm always excited about new opportunities and interesting
                    projects
                  </span>
                </main>
                <main className="space-y-8">
                  <form ref={form} onSubmit={sendEmail}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className={`text-sm font-medium mb-3 block ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Name
                        </label>
                        <input
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full rounded-sm border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                            isDarkMode
                              ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                              : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-sm font-medium mb-3 block ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          required
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full rounded-sm border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                            isDarkMode
                              ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                              : "bg-white border-slate-200"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className={`text-sm font-medium mb-3 mt-2 block ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Message
                      </label>
                      <textarea
                        placeholder="Tell me about your project or idea..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                        className={`w-full rounded-sm border resize-none border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition  ${
                          isDarkMode
                            ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                            : "bg-white border-slate-200"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full flex text-lg text-center justify-center rounded-sm py-4 m-0  bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white border-0 shadow-lg hover:shadow-xl"
                    >
                      {" "}
                      <Mail className="w-7 items-center" />
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </main>
              </nav>
            </div>
          </div>
        </section>

        {/* Modal alert */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center   bg-opacity-50 z-50">
            <div
              className={`bg-white rounded-xl p-6 max-w-sm mx-auto text-center shadow-lg ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white"
                  : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900"
              }`}
            >
              <h2 className="text-lg font-bold mb-2">✅ Message Sent</h2>
              <p className="mb-4">
                Thank you! Your message has been successfully sent.
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* footer  */}
        <footer
          className={`py-12 border-t backdrop-blur-sm transition-all duration-500 ${
            isDarkMode
              ? "border-slate-700 bg-slate-900/80"
              : "border-slate-200 bg-white/80"
          }`}
        >
          <div className="container mx-auto px-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p
                className={`text-center md:text-left ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                © 2025 Mr.SanTin Crafted with passion, precision, and modern web
                technologies.
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/SanTin-Developer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    variant="ghost"
                    size="sm"
                    className={`hover:text-blue-600 transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                  </button>
                </a>
                <a
                  href="https://www.linkedin.com/in/san-tin-b146b7383/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    variant="ghost"
                    size="sm"
                    className={`hover:text-blue-600 transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </a>
                <a href="mailto:santin0601oeurn@gmail.com">
                  <button
                    variant="ghost"
                    size="sm"
                    className={`hover:text-blue-600 transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
