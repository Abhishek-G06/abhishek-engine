import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Project, ProjectInsert } from "@/hooks/use-projects";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectInsert) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProjectForm = ({ project, onSubmit, onCancel, isLoading }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [tagsStr, setTagsStr] = useState(project?.tags?.join(", ") ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [imageUrl, setImageUrl] = useState(project?.image_url ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [displayOrder, setDisplayOrder] = useState(project?.display_order ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
      live_url: liveUrl,
      github_url: githubUrl,
      image_url: imageUrl,
      featured,
      display_order: displayOrder,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="React, TypeScript, Node.js" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input id="liveUrl" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input id="githubUrl" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input id="order" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(Number(e.target.value))} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {project ? "Update" : "Create"} Project
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
