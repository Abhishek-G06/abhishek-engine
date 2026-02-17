import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star, Eye, EyeOff, GripVertical, Camera, Loader2 } from "lucide-react";
import type { Project } from "@/hooks/use-projects";

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (project: Project) => void;
  onCaptureScreenshot?: (project: Project) => void;
  isCapturing?: boolean;
}

const SortableProjectCard = ({ project, onEdit, onDelete, onToggleVisibility, onCaptureScreenshot, isCapturing }: SortableProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <Card ref={setNodeRef} style={style} className={isDragging ? "shadow-lg" : ""}>
      <CardContent className="p-4 flex items-center justify-between">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 mr-2 text-muted-foreground hover:text-foreground touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold truncate ${project.visible ? "text-foreground" : "text-muted-foreground line-through"}`}>
              {project.title}
            </h3>
            {project.featured && <Star className="w-4 h-4 text-primary fill-primary" />}
            {!project.visible && (
              <span className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Hidden</span>
            )}
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
          {onCaptureScreenshot && project.live_url && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCaptureScreenshot(project)}
              disabled={isCapturing}
              title="Capture screenshot"
            >
              {isCapturing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onToggleVisibility(project)}
            title={project.visible ? "Hide from portfolio" : "Show on portfolio"}
          >
            {project.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => onEdit(project)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onDelete(project.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SortableProjectCard;
