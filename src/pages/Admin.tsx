import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-projects";
import type { Project, ProjectInsert } from "@/hooks/use-projects";
import ProjectForm from "@/components/admin/ProjectForm";
import SortableProjectCard from "@/components/admin/SortableProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import GitHubImport from "@/components/admin/GitHubImport";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Plus, LogOut, ArrowLeft, Github, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showGitHub, setShowGitHub] = useState(false);
  const [search, setSearch] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !projects) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(projects, oldIndex, newIndex);

    // Update display_order for all affected items
    try {
      await Promise.all(
        reordered.map((p, i) =>
          updateProject.mutateAsync({ id: p.id, display_order: i })
        )
      );
      toast.success("Order updated");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleToggleVisibility = async (project: Project) => {
    await updateProject.mutateAsync({ id: project.id, visible: !project.visible });
    toast.success(project.visible ? "Hidden" : "Visible");
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    const query = search.toLowerCase();
    if (!query) return projects;
    return projects.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [projects, search]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Logged in successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCreate = async (data: ProjectInsert) => {
    try {
      await createProject.mutateAsync(data);
      toast.success("Project created");
      setShowForm(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (data: ProjectInsert) => {
    if (!editingProject) return;
    try {
      await updateProject.mutateAsync({ id: editingProject.id, ...data });
      toast.success("Project updated");
      setEditingProject(null);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleGitHubImport = async (projects: ProjectInsert[]) => {
    try {
      for (const p of projects) {
        await createProject.mutateAsync(p);
      }
      toast.success(`Imported ${projects.length} project(s)`);
      setShowGitHub(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <h1 className="text-xl font-bold text-foreground">Project Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={() => setShowGitHub(true)}>
              <Github className="w-4 h-4 mr-2" />
              Import from GitHub
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading projects...</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={filteredProjects.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid gap-4">
                {filteredProjects.map((project) => (
                  <SortableProjectCard
                    key={project.id}
                    project={project}
                    onEdit={setEditingProject}
                    onDelete={handleDelete}
                    onToggleVisibility={handleToggleVisibility}
                  />
                ))}
                {filteredProjects.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">
                    {search ? "No projects match your search." : "No projects yet. Add your first one!"}
                  </p>
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </main>

      {/* Create Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[calc(85vh-8rem)] pr-4">
                <ProjectForm
                  onSubmit={handleCreate}
                  onCancel={() => setShowForm(false)}
                  isLoading={createProject.isPending}
                />
            </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(85vh-8rem)] pr-4">
              {editingProject && (
                <ProjectForm
                  project={editingProject}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingProject(null)}
                  isLoading={updateProject.isPending}
                />
              )}
          </div>
        </DialogContent>
      </Dialog>
      {/* GitHub Import Dialog */}
      <Dialog open={showGitHub} onOpenChange={setShowGitHub}>
        <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Import from GitHub</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(85vh-8rem)] pr-4">
            <GitHubImport
              onImport={handleGitHubImport}
              isImporting={createProject.isPending}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
