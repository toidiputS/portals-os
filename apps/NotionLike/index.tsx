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
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  starred: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Page {
  id: string;
  title: string;
  content: string;
  children: string[];
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotionLike: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Getting Started",
      content:
        "Welcome to your Notion-like workspace! This is a demo of the note-taking functionality.",
      tags: ["welcome", "tutorial"],
      starred: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Project Ideas",
      content:
        "1. AI-powered task manager\n2. Smart calendar integration\n3. Voice-to-text notes",
      tags: ["ideas", "project"],
      starred: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      title: "Workspace",
      content: "Your main workspace",
      children: ["2", "3"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Personal",
      content: "Personal notes and thoughts",
      children: [],
      parentId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Work",
      content: "Professional projects and notes",
      children: [],
      parentId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedPage, setSelectedPage] = useState<Page | null>(pages[0]);
  const [view, setView] = useState<"notes" | "pages">("pages");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      tags: [],
      starred: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  const createPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: "New Page",
      content: "",
      children: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setIsEditing(true);
    setEditTitle(newPage.title);
    setEditContent(newPage.content);
  };

  const saveNote = () => {
    if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              title: editTitle || "Untitled Note",
              content: editContent,
              updatedAt: new Date(),
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote(
        updatedNotes.find((n) => n.id === selectedNote.id) || null
      );
      setIsEditing(false);
    }
  };

  const savePage = () => {
    if (selectedPage) {
      const updatedPages = pages.map((page) =>
        page.id === selectedPage.id
          ? {
              ...page,
              title: editTitle || "Untitled Page",
              content: editContent,
              updatedAt: new Date(),
            }
          : page
      );
      setPages(updatedPages);
      setSelectedPage(
        updatedPages.find((p) => p.id === selectedPage.id) || null
      );
      setIsEditing(false);
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const toggleStar = (noteId: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, starred: !note.starred } : note
      )
    );
  };

  const addTag = (noteId: string, tag: string) => {
    if (tag.trim()) {
      setNotes(
        notes.map((note) =>
          note.id === noteId && !note.tags.includes(tag)
            ? { ...note, tags: [...note.tags, tag], updatedAt: new Date() }
            : note
        )
      );
    }
  };

  const removeTag = (noteId: string, tagToRemove: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              tags: note.tags.filter((tag) => tag !== tagToRemove),
              updatedAt: new Date(),
            }
          : note
      )
    );
  };

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setView("pages")}
              className={`px-3 py-1 rounded text-sm ${
                view === "pages"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Pages
            </button>
            <button
              onClick={() => setView("notes")}
              className={`px-3 py-1 rounded text-sm ${
                view === "notes"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Notes
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Create Button */}
          <button
            onClick={view === "notes" ? createNote : createPage}
            className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            {view === "notes" ? "New Note" : "New Page"}
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto">
          {view === "notes" ? (
            <div className="p-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    selectedNote?.id === note.id
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  } border border-transparent`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(note.id);
                        }}
                        aria-label={
                          note.starred
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        className={`p-1 rounded ${
                          note.starred
                            ? "text-yellow-500"
                            : "text-gray-400 hover:text-yellow-500"
                        }`}
                      >
                        <Star
                          size={14}
                          fill={note.starred ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              {filteredPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    selectedPage?.id === page.id
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  } border border-transparent`}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {page.title}
                    </span>
                    {page.children.length > 0 && (
                      <ChevronRight size={14} className="text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedNote || selectedPage ? (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {view === "notes" ? (
                    <>
                      <FileText size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {selectedNote ? "Note" : "No note selected"}
                      </span>
                    </>
                  ) : (
                    <>
                      <FileText size={18} className="text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {selectedPage ? "Page" : "No page selected"}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditTitle(
                          selectedNote?.title || selectedPage?.title || ""
                        );
                        setEditContent(
                          selectedNote?.content || selectedPage?.content || ""
                        );
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={view === "notes" ? saveNote : savePage}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 bg-white">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title..."
                    className="w-full text-3xl font-bold border-none outline-none placeholder-gray-300"
                  />
                  <textarea
                    ref={editorRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Start writing..."
                    className="w-full h-96 border-none outline-none resize-none placeholder-gray-400 text-gray-700 leading-relaxed"
                  />
                </div>
              ) : (
                <div className="max-w-4xl">
                  <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    {selectedNote?.title || selectedPage?.title}
                  </h1>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {selectedNote?.content ||
                        selectedPage?.content ||
                        "No content"}
                    </div>
                  </div>

                  {/* Tags for notes */}
                  {selectedNote && selectedNote.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag size={16} className="text-gray-400" />
                        {selectedNote.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {view === "notes" ? "No note selected" : "No page selected"}
              </h3>
              <p className="text-gray-500">
                {view === "notes"
                  ? "Select a note from the sidebar or create a new one"
                  : "Select a page from the sidebar or create a new one"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotionLike;
