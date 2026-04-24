import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  FileText,
  Search,
  Calendar,
  Tag,
  Star,
  Trash2,
  Edit3,
  ChevronRight,
  Hash,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  CheckSquare,
  Quote,
  Check,
  X,
  FileDown,
} from "lucide-react";
import { useKernel } from "../../store/kernel";

const Not: React.FC = () => {
  const notNotes = useKernel((state) => state.notNotes);
  const createProject = useKernel((state) => state.createNotNotesProject);
  const selectProject = useKernel((state) => state.selectNotNotesProject);
  const approveDeliverable = useKernel((state) => state.approveDeliverable);
  const rejectDeliverable = useKernel((state) => state.rejectDeliverable);
  const updateArtifact = useKernel((state) => state.updateArtifact);

  const projects = Object.values(notNotes.projects);
  const currentProject = notNotes.currentProjectId 
    ? notNotes.projects[notNotes.currentProjectId] 
    : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editArtifact, setEditArtifact] = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.artifact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    const title = prompt("Enter project title:", "New Project");
    if (title) {
      createProject(title);
    }
  };

  const handleSaveArtifact = () => {
    if (currentProject) {
      updateArtifact(currentProject.id, editArtifact);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (currentProject && !isEditing) {
      setEditArtifact(currentProject.artifact);
    }
  }, [currentProject, isEditing]);

  return (
    <div className="h-full flex bg-[#0F111A] text-white">
      {/* Sidebar */}
      <div className="w-80 bg-[#161B22] border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h2 className="text-sm font-black uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
            <FileText size={16} />
            Artifacts
          </h2>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={14}
            />
            <input
              type="text"
              placeholder="Search artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleCreateProject}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all"
          >
            <Plus size={14} />
            NEW PROJECT
          </button>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={`p-3 rounded-lg mb-1 cursor-pointer transition-all border ${
                currentProject?.id === project.id
                  ? "bg-purple-500/20 border-purple-500/50"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={14} className={currentProject?.id === project.id ? "text-purple-400" : "text-gray-500"} />
                <span className="text-xs font-medium truncate">{project.title}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-1">
                Updated {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Pending Deliverables Section */}
        {notNotes.pendingDeliverables.length > 0 && (
          <div className="p-4 border-t border-white/10 bg-purple-900/10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3">
              Incoming Deliverables ({notNotes.pendingDeliverables.length})
            </h3>
            <div className="space-y-2">
              {notNotes.pendingDeliverables.map((d) => (
                <div key={d.id} className="bg-white/5 border border-white/10 p-2 rounded-lg text-[10px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-purple-300">{d.agentName}</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => approveDeliverable(d.id)}
                        className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded transition-colors"
                        title="Approve & Append"
                      >
                        <Check size={12} />
                      </button>
                      <button 
                        onClick={() => rejectDeliverable(d.id)}
                        className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                        title="Reject"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 line-clamp-2 italic">"{d.content}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {currentProject ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-white/10 bg-[#161B22]/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-white">{currentProject.title}</h1>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-500 uppercase tracking-tighter">
                  <FileDown size={10} />
                  {currentProject.deliverables.length} Deliverables
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded text-xs font-bold transition-all"
                  >
                    <Edit3 size={14} />
                    EDIT MANUALLY
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-gray-400 hover:text-white text-xs font-bold transition-all"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleSaveArtifact}
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-bold transition-all"
                    >
                      SAVE ARTIFACT
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Editor/Viewer */}
            <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent)]">
              {isEditing ? (
                <div className="h-full p-8 max-w-4xl mx-auto">
                  <textarea
                    ref={editorRef}
                    value={editArtifact}
                    onChange={(e) => setEditArtifact(e.target.value)}
                    placeholder="Compile your final deliverable here..."
                    className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-300 leading-relaxed font-mono text-sm placeholder-white/10"
                  />
                </div>
              ) : (
                <div className="p-12 max-w-4xl mx-auto">
                  <div className="prose prose-invert prose-purple max-w-none">
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm selection:bg-purple-500/30">
                      {currentProject.artifact || "No content yet. Approve some deliverables to start building."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <FileText size={40} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Active Project</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Create a new project or select an existing one to start compiling agent deliverables into final artifacts.
              </p>
              <button
                onClick={handleCreateProject}
                className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-900/20"
              >
                Start Your First Artifact
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Not;
