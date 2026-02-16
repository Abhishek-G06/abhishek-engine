import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-projects";
import type { Project, ProjectInsert } from "@/hooks/use-projects";
import ProjectForm from "@/components/admin/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import GitHubImport from "@/components/admin/GitHubImport";
import { Pencil, Trash2, Plus, LogOut, Star, ArrowLeft, Github, Eye, EyeOff } from "lucide-react";
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
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">{projects?.length ?? 0} projects</p>
          <div className="flex gap-2">
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
          <div className="grid gap-4">
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate ${project.visible ? 'text-foreground' : 'text-muted-foreground line-through'}`}>{project.title}</h3>
                      {project.featured && <Star className="w-4 h-4 text-primary fill-primary" />}
                      {!project.visible && <span className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Hidden</span>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {project.tags?.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateProject.mutateAsync({ id: project.id, visible: !project.visible }).then(() => toast.success(project.visible ? 'Hidden' : 'Visible'))}
                      title={project.visible ? 'Hide from portfolio' : 'Show on portfolio'}
                    >
                      {project.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setEditingProject(project)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {projects?.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No projects yet. Add your first one!</p>
            )}
          </div>
        )}
      </main>

      {/* Create Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(85vh-8rem)]">
              <div className="pr-4">
                <ProjectForm
                  onSubmit={handleCreate}
                  onCancel={() => setShowForm(false)}
                  isLoading={createProject.isPending}
                />
              </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(85vh-8rem)]">
            <div className="pr-4">
              {editingProject && (
                <ProjectForm
                  project={editingProject}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingProject(null)}
                  isLoading={updateProject.isPending}
                />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      {/* GitHub Import Dialog */}
      <Dialog open={showGitHub} onOpenChange={setShowGitHub}>
        <DialogContent className="max-w-lg w-[calc(100%-2rem)]">
          <DialogHeader>
            <DialogTitle>Import from GitHub</DialogTitle>
          </DialogHeader>
          <GitHubImport
            onImport={handleGitHubImport}
            isImporting={createProject.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
